import React from "react";
import TournamentTitle from "../../Components/Card/TournamentTitle";
import TournamentVideo from "../../Components/Card/TournamentVideo";
import TournamentCover from "../../Components/Card/TournamentCover";
import TournamentMain from "./TournamentMain";

const Tournament = () => {
  return (
    <div className="tournament-main">
      <TournamentTitle />
      {/* <TournamentVideo /> */}
      {/* <TournamentCover /> */}
      <TournamentMain />
    </div>
  );
};

export default Tournament;
