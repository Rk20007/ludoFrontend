import React from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LiveBattleCard from "../../Components/Card/LiveBattleCard";

const LiveBattle = ({ data }) => {
  const my_id = localStorage.getItem("userId");
  const sortArr = data && data?.sort((a, b) => {
    if (a?.createdBy?._id === my_id && b?.createdBy?._id !== my_id) {
      return -1;
    } else if (a?.createdBy?._id !== my_id && b?.createdBy?._id === my_id) {
      return 1;
    } else {
      return 0;
    }
  });
  
  return (
    <div>
      <div className="openBattle-title">
        <LocalFireDepartmentIcon sx={{ color: "red" }} />
        <div className="penBattel-title">Live Battles</div>
      </div>
      <div className="openbattle-main-section">
        {sortArr?.length &&
          sortArr?.map((item) => <LiveBattleCard data={item} />)}
      </div>
    </div>
  );
};

export default LiveBattle;
