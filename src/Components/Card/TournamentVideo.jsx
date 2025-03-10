import React from "react";

const TournamentVideo = () => {
  const handleRedirect = () => {
    window.location.href = "https://www.youtube.com/@zhyrxjod_gaming";
  };

  return (
    <div
      className="recharge-top-main"
      style={{ cursor: "pointer" }}
      onClick={handleRedirect}
    >
      <div className="tournament-tile-2">How to Play?</div>
      <img src="/youtubebtn.png" style={{ height: "3.5em" }} />
    </div>
  );
};

export default TournamentVideo;
