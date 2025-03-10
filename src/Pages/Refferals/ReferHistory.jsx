import React, { useEffect, useState } from "react";
import GameCard from "../../Components/Card/GameCard";
import ReferCard from "../../Components/Card/ReferCard";
import { ReferHistorynAPI } from "../../API/API";

const ReferHistory = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await ReferHistorynAPI();
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-title">Refer History</div>
      {!data.length > 0 ? (
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
            No Refer History !
          </div>
        </div>
      ) : (
        <div className="transaction-history-card-container">
          {data.map((item) => (
            <ReferCard data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferHistory;
