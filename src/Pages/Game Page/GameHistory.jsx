import React, { useEffect } from "react";
import GameCard from "../../Components/Card/GameCard";
import { gameHistoryAPI } from "../../API/API";

const GameHistory = () => {
  const [gameHistory, setGameHistory] = React.useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    const response = await gameHistoryAPI();
    setGameHistory(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-title">Game History</div>
      {!gameHistory.length > 0 ? (
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
            No Game History !
          </div>
        </div>
      ) : (
        <div className="transaction-history-card-container">
          {gameHistory.map((item) => (
            <GameCard
              data={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameHistory;
