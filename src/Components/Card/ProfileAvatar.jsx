import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { profileDataUpdate } from "../../API/API";

const ProfileAvatar = ({ data, getData }) => {
  const [isEdit, setEdit] = useState(true);
  const [editData, setEditData] = useState();

  const updateProfile = async () => {
    await profileDataUpdate(editData);
    getData();
    setEdit(true);
  };

  useEffect(() => {
    setEditData(data?.name);
  }, [data]);


  return (
    <div className="profile-avatar-container">
      <div className="profile-avatar-img-container">
        <img src="/user.jpeg" className="profile-avatar-img" />
      </div>
      {isEdit ? (
        <div className="profile-username">
          <div className="profile-avatar-name">{data?.name}</div>
          <CreateIcon sx={{ color: "gray" }} onClick={() => setEdit(false)} />
        </div>
      ) : (
        <div>
          <TextField
            id="outlined-basic"
            label="Edit UserName"
            variant="outlined"
            value={editData}
            onChange={(e) => setEditData(e.target.value)}
          />
          <div className="profile-avatar-btn-group">
            <button
              className="profile-avatar-btn-cancel"
              onClick={() => setEdit(true)}
            >
              Cancel
            </button>
            <button className="profile-avatar-btn-save" onClick={updateProfile}>
              Save
            </button>
          </div>
        </div>
      )}
      <div className="profile-avatar-number">{data?.mobileNo}</div>
    </div>
  );
};

export default ProfileAvatar;
