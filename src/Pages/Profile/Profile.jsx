import React, { useEffect, useState } from "react";
import ProfileAvatar from "../../Components/Card/ProfileAvatar";
import ButtonSection from "./ButtonSection";
import RefferalSection from "./RefferalSection";
import BattelSection from "./BattelSection";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CancelIcon from "@mui/icons-material/Cancel";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import { profileData } from "../../API/API";

const Profile = () => {
  const [data, setData] = useState({});
  const getData = async () => {
    const profile_data = await profileData();
    setData(profile_data?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <ProfileAvatar data={data} getData={getData} />
      <ButtonSection data={data} />
      <RefferalSection data={data} />
      <div className="profile-battle-section">
        <BattelSection
          title={"Cash Won"}
          count={data?.balance?.cashWon}
          logo={<CurrencyRupeeIcon />}
        />
        <BattelSection
          title={"Battle Played"}
          count={data?.balance?.battlePlayed}
          logo={<CancelIcon sx={{ color: "red" }} />}
        />
        <BattelSection
          title={"Referral Earning"}
          count={data?.balance?.referralEarning}
          logo={<SettingsAccessibilityIcon />}
        />
        <BattelSection
          title={"Penalty"}
          count={data?.balance?.penalty}
          logo={<IntegrationInstructionsOutlinedIcon />}
        />
      </div>
    </main>
  );
};

export default Profile;
