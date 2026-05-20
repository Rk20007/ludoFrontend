import { createPaymentOrder, profileData } from "../API/API";
import {
  extractGatewayMeta,
  pickPaymentRedirectUrl,
  resolveQrImageSrc,
} from "./paymentGateway";

/** 24-char hex Mongo ObjectId */
export function isValidObjectId(id) {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id.trim());
}

/** Gateway create-order body: matches backend required fields. */
export function buildCreateOrderPayload(amountNum, user) {
  const name = (user?.name && String(user.name).trim()) || "User";
  const mobile = String(user?.mobileNo ?? user?.mobile ?? "").trim();
  let email = (user?.email && String(user.email).trim()) || "";
  if (!email) {
    const digits = mobile.replace(/\D/g, "").slice(-10);
    email = digits ? `user${digits}@wallet.app` : "user@wallet.app";
  }

  const userId = (
    user?._id ??
    user?.id ??
    user?.userId ??
    (typeof localStorage !== "undefined" ? localStorage.getItem("userId") : null)
  )
    ?.toString?.()
    ?.trim();

  const payload = {
    amount: amountNum,
    type: "deposit",
    userId,
    customer_name: name,
    customer_email: email,
    customer_mobile: mobile,
    p_info: `Wallet recharge ₹${amountNum}`,
  };

  return { payload, userId };
}

/**
 * Creates a deposit order and returns gateway redirect URL when available.
 * @returns {Promise<{ payUrl: string|null, meta: object|null, error: string|null }>}
 */
export async function startGatewayDeposit(amountNum) {
  if (!amountNum || Number.isNaN(amountNum) || amountNum < 1) {
    return { payUrl: null, meta: null, error: "Amount should be at least ₹50" };
  }

  const profileRes = await profileData();
  if (!profileRes?.data?.data) {
    return {
      payUrl: null,
      meta: null,
      error:
        profileRes?.response?.data?.message ||
        "Profile load failed — cannot start payment",
    };
  }

  const user = profileRes.data.data;
  const { payload: orderBody, userId } = buildCreateOrderPayload(amountNum, user);

  if (!userId || !isValidObjectId(userId)) {
    return {
      payUrl: null,
      meta: null,
      error: "Invalid user id — log out and log in again, then retry.",
    };
  }

  if (!orderBody.customer_mobile) {
    return {
      payUrl: null,
      meta: null,
      error: "Mobile number missing — update your profile and try again",
    };
  }

  const res = await createPaymentOrder(orderBody);

  if (!res?.data?.statusCode) {
    return {
      payUrl: null,
      meta: null,
      error:
        res?.response?.data?.message ||
        res?.message ||
        "Could not start payment — try again later",
    };
  }

  const code = res.data.statusCode;
  if (code !== 200 && code !== 201) {
    return {
      payUrl: null,
      meta: null,
      error: res.data.message || "Could not create payment order",
    };
  }

  const meta = extractGatewayMeta(res.data);
  const payUrl = pickPaymentRedirectUrl(meta);

  if (payUrl) {
    return { payUrl, meta, error: null };
  }

  const hasIds = !!(
    meta.transactionId ||
    meta.orderId ||
    meta.paymentRef ||
    meta.gatewayTxnId
  );
  const hasQrOrUpi = !!(
    meta.qrImage ||
    meta.upiLink ||
    resolveQrImageSrc(meta.qrImage)
  );

  if (!hasIds && !hasQrOrUpi) {
    return {
      payUrl: null,
      meta: null,
      error:
        "Payment link not available — check gateway configuration or try again.",
    };
  }

  return { payUrl: null, meta, error: null };
}
