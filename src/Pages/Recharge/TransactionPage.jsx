import React, { useEffect } from "react";
import TransCard from "../../Components/Card/TransCard";
import { transactionHistoryAPI } from "../../API/API";
import dayjs from "dayjs";

const TransactionPage = () => {
  const [trans, setTrans] = React.useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    const resposne = await transactionHistoryAPI();
    setTrans(resposne.data.data.transactionList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-title">Transaction History</div>
      {!trans.length > 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src="/NoTrans.svg" />
          <div className="transaction-history-title-text">
            No Transaction History !
          </div>
        </div>
      ) : (
        <div className="transaction-history-card-container">
          {trans?.map((item) => (
            <TransCard
              amount={item?.amount}
              transaction={`${item?.type} ${
                item?.status === "approved" ? "successful" : item?.status
              }`}
              date={dayjs(item?.updatedAt).format("DD/MM/YYYY")}
              time={dayjs(item?.updatedAt).format("HH:mm")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
