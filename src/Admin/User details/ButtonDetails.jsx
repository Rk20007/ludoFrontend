import React from "react";
import AdminGameHistory from "./AdminGameHistory";
import AdminDepositHistory from "./AdminDepositHistory";
import AdminWithdrawalHistory from "./AdminWithdrawalHistory";
import AdminReferralHistory from "./AdminReferralHistory";
import AdminKyc from "./AdminKyc";
import AdminMerged from "./AdminMerged";
import AdminAllHistory from "./AdminAllHistory";

const ButtonDetails = ({ data }) => {
  const [activeId, setActiveId] = React.useState(1);
  return (
    <div className="user-details-main-button">
      <div className="user-details-main-button-container">
        <button
          className={`${activeId === 1 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(1)}
        >
          Game history
        </button>
        <button
          className={`${activeId === 2 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(2)}
        >
          Deposit history
        </button>
        <button
          className={`${activeId === 3 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(3)}
        >
          Withdrawal history
        </button>
        <button
          className={`${activeId === 4 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(4)}
        >
          Referral History{" "}
        </button>
        <button
          className={`${activeId === 5 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(5)}
        >
          KYC
        </button>
        <button
          className={`${activeId === 6 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(6)}
        >
          Merged
        </button>
        <button
          className={`${activeId === 7 && "btn-user-active"} btn-uer-details`}
          onClick={() => setActiveId(7)}
        >
          All History
        </button>
      </div>
      <div className="user-details-second-container">
        {(() => {
          if (activeId === 1) {
            return <AdminGameHistory data={data} />;
          }
          if (activeId === 2) {
            return <AdminDepositHistory data={data} />;
          }
          if (activeId === 3) {
            return <AdminWithdrawalHistory data={data} />;
          }
          if (activeId === 4) {
            return <AdminReferralHistory data={data} />;
          }
          if (activeId === 5) {
            return <AdminKyc data={data} />;
          }
          if (activeId === 6) {
            return <AdminMerged data={data} />;
          }
          if (activeId === 7) {
            return <AdminAllHistory data={data} />;
          }
        })()}
      </div>
    </div>
  );
};

export default ButtonDetails;
