import React, { useEffect } from "react";
import Battle1 from "../../Components/Card/Battle1";
import Battle2 from "../../Components/Card/Battle2";
import BattleUpload from "../../Components/Card/BattleUpload";
import { GetBattleAPI } from "../../API/API";

const Battle = () => {
  const location = new URLSearchParams(window.location.search);
  const [data, setData] = React.useState({});
  const getData = async () => {
    const response = await GetBattleAPI(location.get("id"));
    setData(response.data.data);
  };

  useEffect(() => {
    const inetrvalData = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(inetrvalData);
  }, []);

  return (
    <div className="Battle-main">
      <div className="Battle-title">Battle</div>
      <Battle1 data={data} />
      <Battle2 id={location.get("id")} getData={getData} data={data} />
      <div className="battle-text-1">
        <div>RECORD EVERY GAME WHILE PLAYING.</div>
        <div style={{ paddingTop: "1rem" }}>
          FOR CANCELLATION OF GAME, VIDEO PROOF IS NECESSARY.
        </div>
        <div style={{ paddingTop: "1rem" }}>
          • महत्वपूर्ण नोट:कृपया गलत गेम परिणाम अपलोड न करें, अन्यथा आपके वॉलेट
          बैलेंस पर PENALTY लगाई जायगी। गलत रिजल्ट अपडेट करने पर 50 रुपये
          पेनल्टी लगेगी।
        </div>
        <div style={{ paddingTop: "1rem" }}>
          महत्वपूर्ण नोट: यदि आप गेम के परिणामों को अपडेट नहीं करते हैं, तो आपके
          वॉलेट बैलेंस पर जुर्माना लगाया जाएगा। रिजल्ट अपडेट नहीं करने पर 25
          रुपये पेनल्टी लगेगी।
        </div>
      </div>
      {(() => {
        if (data?.isRoomNumberEntryAllowed === true) {
          return (
            <BattleUpload
              id={location.get("id")}
              status={
                data?.resultUpatedBy?.createdUser?.matchStatus
                  ? data?.resultUpatedBy?.createdUser?.matchStatus
                  : null
              }
              data={data}
            />
          );
        } else {
          return (
            <BattleUpload
              id={location.get("id")}
              isTrue={true}
              status={
                data?.resultUpatedBy?.acceptedUser?.matchStatus
                  ? data?.resultUpatedBy?.acceptedUser?.matchStatus
                  : null
              }
              data={data}
            />
          );
        }
      })()}
    </div>
  );
};

export default Battle;
