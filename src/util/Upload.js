import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

const cld = new Cloudinary({ cloud: { cloudName: "dpllsfbuo" } });

export const handleUpload = async (imgData) => {
  const data = new FormData();
  data.append("file", imgData);
  data.append("upload_preset", "ml_default");
  data.append("cloud_name", "dpllsfbuo");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dpllsfbuo/image/upload",
      data
    );
    return res.data.url;
  } catch (error) {
    console.log("error", error.message);
    return error;
  }
};
