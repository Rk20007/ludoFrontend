import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { adminGetSetting, adminSocialUpdate } from "../../API/API";
import toast from "react-hot-toast";

const SocialMedia = () => {
  const [payload, setpayload] = useState({
    whatsAppLink: "",
    instagramLink: "",
    telegramLink: "",
  });

  const SendData = async () => {
    const response = await adminSocialUpdate(payload);
    if (response.data.statusCode === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const getData = async () => {
    const response = await adminGetSetting();
    setpayload({
      whatsAppLink: response.data.data.whatsAppLink,
      instagramLink: response.data.data.instagramLink,
      telegramLink: response.data.data.telegramLink,
    });
  };

  useEffect (() => {
    getData();
  }, []);

  return (
    <div>
      <h1>SocialMedia</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "50%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter Whatsapp Support"
          variant="outlined"
          value={payload.whatsAppLink}
          onChange={(e) =>
            setpayload({ ...payload, whatsAppLink: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Enter Instagram Support"
          variant="outlined"
          value={payload.instagramLink}
          onChange={(e) =>
            setpayload({ ...payload, instagramLink: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Enter Telegram Support"
          variant="outlined"
          value={payload.telegramLink}
          onChange={(e) =>
            setpayload({ ...payload, telegramLink: e.target.value })
          }
        />
        <Button variant="contained" onClick={SendData}>
          Save
        </Button>
      </div>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>Current Whatsapp link: {payload.whatsAppLink}</div>
        <div>Current Instagram link: {payload.instagramLink}</div>
        <div>Current Telegram link: {payload.telegramLink}</div>
      </div>
    </div>
  );
};

export default SocialMedia;
