import React from "react";

const ReferCard3 = ({ data }) => {
  return (
    <div className="refcard3-main">
      <div className="refcard3-title-1">Refer & Earn Rules</div>
      <div className="refcard3-title-2">
        When your friend signs up on Our website or App from your referral link.
      </div>
      <div className="refcard3-title-3">
        You get {data?.referralAmountPercentage} % Commission on
      </div>
      <div className="refcard3-title-4">your referral's winnings.</div>
      <div className="refcard3-title-5">
        Suppose your referral plays a battle for ₹10000 Cash,
      </div>
      <div className="refcard3-title-6">You get ₹200 Cash</div>
    </div>
  );
};

export default ReferCard3;
