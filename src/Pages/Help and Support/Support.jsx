import React, { useEffect, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { adminGetSetting } from "../../API/API";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState();

  const getData = async () => {
    const getReponse = await adminGetSetting();
    setData(getReponse?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const openLinkInNewTab = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main style={{ paddingBottom: "5em" }}>
      <div className="support-heading">Contact us</div>
      <div className="support-container-image">
        <img
          src="https://starludo.club/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact.65073660.png&w=384&q=75"
          style={{ marginLeft: "2em", width: "80%", marginRight: "2em" }}
        />
      </div>
      <div className="support-container-btn-btn">
        <button
          className="support-page-btn-call"
          onClick={() => openLinkInNewTab(data?.whatsAppLink)}
        >
          <WhatsAppIcon fontSize="large" /> Support
        </button>
        <div className="support-container-btn-btn-2">
          <button
            className="support-page-btn-call-instagram"
            onClick={() => openLinkInNewTab(data?.instagramLink)}
          >
            <InstagramIcon fontSize="large" /> Support
          </button>
          <button
            className="support-page-btn-call-telegram"
            onClick={() => openLinkInNewTab(data?.telegramLink)}
          >
            <TelegramIcon fontSize="large" /> Support
          </button>
        </div>
      </div>
      <div className="support-container-address">
        <div className="support-container-address-title">Address:</div>
        <div className="support-container-address-desc">
          Shubhash Chowk,gurgoan, 122001
        </div>
      </div>
    </main>
  );
};

export default Support;
