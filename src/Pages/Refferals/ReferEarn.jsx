import React, { useEffect, useState } from "react";
import RefCard1 from "../../Components/Card/RefCard1";
import RefCard2 from "../../Components/Card/RefCard2";
import ReferCard3 from "../../Components/Card/ReferCard3";
import { ReferNEarnAPI } from "../../API/API";

const ReferEarn = () => {
  const [data, setData] = useState({});
  const getData = async () => {
    const response = await ReferNEarnAPI();
    setData(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="refer-earn-main">
      <RefCard1 data={data} />
      <RefCard2 data={data} />
      <ReferCard3 data={data} />
    </div>
  );
};

export default ReferEarn;
