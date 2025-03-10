import React, { useEffect, useState } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import OpenBattleCard from "../../Components/Card/OpenBattleCard";

const OpenBattel = ({ data }) => {
  const [isshow, setShow] = useState(null);

  useEffect(() => {
    setShow(
      data?.filter((item) => item.showButton === "waiting").length > 0
        ? true
        : false
    );
  }, [data]);

  return (
    <div>
      <div className="openBattle-title">
        <LocalFireDepartmentIcon sx={{ color: "red" }} />
        <div className="penBattel-title">Open Battles</div>
      </div>
      <div className="openbattle-main-section">
        {data?.map((item) => (
          <OpenBattleCard data={item} isshow={isshow} wholeData={data}/>
        ))}
      </div>
    </div>
  );
};

export default OpenBattel;
