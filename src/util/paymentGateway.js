/**
 * Normalizes gateway create-order / check-status payloads so minor backend field
 * name differences still work (EKQR / UPIGateway style keys).
 */

export function extractGatewayMeta(resData) {
  const inner = resData?.data ?? resData;
  if (!inner || typeof inner !== "object") return {};

  const merged = { ...inner };
  const extra = inner.payment || inner.order || inner.result || inner.data;
  if (extra && typeof extra === "object") {
    Object.assign(merged, extra);
  }

  const m = merged;
  const rawUrl =
    m.paymentUrl ||
    m.payment_url ||
    m.redirectUrl ||
    m.redirect_url ||
    m.gatewayUrl ||
    m.gateway_url ||
    m.checkoutUrl ||
    m.checkout_url ||
    m.payUrl ||
    m.pay_url ||
    m.redirect ||
    (typeof m.url === "string" && /^https?:\/\//i.test(m.url.trim())
      ? m.url.trim()
      : null);

  return {
    transactionId: m.transactionId || m.transaction_id || m._id || m.txnId,
    orderId: m.orderId || m.order_id || m.merchantOrderId || m.merchant_order_id,
    paymentRef: m.paymentRef || m.payment_id || m.payId,
    gatewayTxnId: m.gatewayTxnId || m.gateway_txn_id,
    paymentUrl: rawUrl,
    qrImage:
      m.qrImage ||
      m.qrCode ||
      m.qrcode ||
      m.qr_url ||
      m.qrCodeUrl ||
      m.qr_string,
    upiLink:
      m.upiLink ||
      m.upi_intent ||
      m.upiIntent ||
      m.payment_link ||
      m.paymentLink ||
      m.payLink ||
      m.intentUrl,
  };
}

/** Full browser redirect to gateway checkout (EKQR / UPIGateway style). */
export function pickPaymentRedirectUrl(meta) {
  if (!meta?.paymentUrl || typeof meta.paymentUrl !== "string") return null;
  const u = meta.paymentUrl.trim();
  if (/^https?:\/\//i.test(u)) return u;
  return null;
}

export function buildStatusBody(meta) {
  const body = {};
  if (meta.transactionId) body.transactionId = meta.transactionId;
  if (meta.orderId) body.orderId = meta.orderId;
  if (meta.paymentRef) body.paymentRef = meta.paymentRef;
  if (meta.gatewayTxnId) body.gatewayTxnId = meta.gatewayTxnId;
  return body;
}

/** True when backend reports payment completed / wallet credited. */
export function parsePaidFromResponse(res) {
  const root = res?.data;
  if (!root) return false;
  if (root.paid === true || root.approved === true) return true;

  const p = root.data ?? root;
  if (!p || typeof p !== "object") return false;
  if (p.paid === true || p.approved === true || p.isPaid === true || p.success === true)
    return true;

  const nested = p.transaction ?? p.txn ?? p.order ?? {};
  const status =
    nested.status ??
    p.status ??
    p.payment_status ??
    p.paymentStatus ??
    p.state;
  if (typeof status === "boolean") return status;
  if (typeof status === "number") return status === 1;
  if (typeof status === "string") {
    const u = status.toUpperCase();
    return (
      u === "SUCCESS" ||
      u === "PAID" ||
      u === "COMPLETED" ||
      u === "APPROVED" ||
      u === "SUCCESSFUL"
    );
  }
  return false;
}

export function resolveQrImageSrc(qrImage) {
  if (!qrImage || typeof qrImage !== "string") return null;
  const t = qrImage.trim();
  if (
    t.startsWith("http://") ||
    t.startsWith("https://") ||
    t.startsWith("data:")
  )
    return t;
  if (/^[A-Za-z0-9+/=]+$/.test(t) && t.length > 80)
    return `data:image/png;base64,${t}`;
  return null;
}

/**
 * Gateway redirect-back / callback URLs often append ?status=success, ?payment=success, etc.
 * Backend credits wallet before user returns; we only need to show success and go to history.
 */
export function readPaymentReturnFromSearch(searchString) {
  const q = new URLSearchParams(
    searchString || (typeof window !== "undefined" ? window.location.search : "")
  );
  const status = (
    q.get("status") ||
    q.get("payment_status") ||
    q.get("paymentStatus") ||
    q.get("gateway_status") ||
    q.get("txnStatus") ||
    ""
  ).toUpperCase();

  const successFlag =
    q.get("success") === "1" ||
    q.get("success") === "true" ||
    q.get("payment_success") === "1" ||
    status === "SUCCESS" ||
    status === "PAID" ||
    status === "COMPLETED" ||
    status === "OK" ||
    status === "APPROVED";

  const failedFlag =
    q.get("success") === "0" ||
    q.get("success") === "false" ||
    status === "FAILED" ||
    status === "FAILURE" ||
    status === "CANCELLED" ||
    status === "CANCELED" ||
    q.get("failed") === "1";

  return { success: successFlag, failed: failedFlag, status };
}
