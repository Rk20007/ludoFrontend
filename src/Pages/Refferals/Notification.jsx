import React, { useEffect, useState } from "react";
import { NotificationAPI } from "../../API/API";
import dayjs from "dayjs";

const Notification = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await NotificationAPI();
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Notification-main">
      <div className="Notification-title">Notification</div>
      <div className="Notification-card-main">
        {data.length > 0 &&
          data.map((item) => {
            return (
              <div className="Notification-card">
                <div>Date - {dayjs(item.createdAt).format("DD/MM/YYYY")}</div>
                <div>Message - {item.message}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notification;
