import React from "react";

const TournamentCover = () => {
  return (
    <div>
      <video autoPlay loop muted playsInline className="tournament-cover">
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default TournamentCover;
