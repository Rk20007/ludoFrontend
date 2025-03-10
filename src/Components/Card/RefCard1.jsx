import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

const RefCard1 = ({ data }) => {
  const linkCopied = () => {
    navigator.clipboard.writeText(data?.referalCode);
    toast.success("Copied to clipboard");
  };

  const handleShareOnWhatsApp = () => {
    const referralLink = `${import.meta.env.VITE_API_URL}/login?refer=${
      data?.referalCode
    }`;
    const message = `Hi friends, play R1battel and earn 10000 daily.Download Indian App R1battel
      R1battel, पर लूडो खेल कर या दोस्तों को शेयर कर के पैसा जीतो और तुरंत अपने Bank या UPI में ट्रांसफर कर सकते है।
      दोस्तो को शेयर करने पर उनका आपको लाइफ टाइम 2% कमीशन दिया जाएगा  
      100% भरोसेमंद प्लेटफार्म। 24 hours support ${referralLink}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="refcard1-main">
      <img src="/earn.gif" className="refcard1-img-gif" />
      <div className="refcard1-title-1">Earn Now Unlimited 🥳</div>
      <div className="refcard1-title-2">
        Refer & Earn {data?.referralAmountPercentage}%
      </div>
      <div className="refcard1-title-3-main">
        <div className="refcard1-title-3">
          Your Refer Code: {data?.referalCode}
        </div>
        <ContentCopyIcon
          sx={{ color: "white", cursor: "pointer" }}
          fontSize="small"
          onClick={linkCopied}
        />
      </div>
      <div className="refcard1-title-4">
        Total Refers: {data?.totalReferrars}
      </div>
      <div className="refcard1-title-4">
        Total Earnings: {data?.totalReferralEarning}
      </div>
      <button className="refcard1-btn" onClick={handleShareOnWhatsApp}>
        Share On WhatsApp
      </button>
    </div>
  );
};

export default RefCard1;
