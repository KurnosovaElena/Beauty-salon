import React from "react";
import "../pages/Notifications/notifications.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";
import { NotificationCard } from "./NotificationCard";

const CustomTabs = styled(Tabs)({
    indicator: {
      backgroundColor: "#590B11",
      display: "none",
    },
    "& .MuiTabs-indicator": {
      color: "#590B11",
    },
  });
  const CustomTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#590B11",
    },
  });


export function NotificationsMainDiv({ value, handleChange, markAllAsSeen, deleteAllSeen, user }) {
    
    return (
        <div className="notifications-main-div">
          <h1>Уведомления</h1>
          <hr />
          <CustomTabs
            TabIndicatorProps={{ style: { backgroundColor: "#590B11" } }}
            value={value}
            onChange={handleChange}
          >
            <CustomTab label="непросмотренные" value={0} />
            <CustomTab label="просмотренные" value={1} />
          </CustomTabs>
          {value === 0 && (
            <>
              <div className="link-button-1">
                <h1 onClick={() => markAllAsSeen()}>
                  Пометить всё как прочитанное
                </h1>
              </div>
              {user?.unseenNotifications.map((notification) => (
                <NotificationCard notification={notification} />
              ))}
            </>
          )}
          {value === 1 && (
            <>
              <div className="link-button-2">
                <h1 onClick={() => deleteAllSeen()}>Удалить всё</h1>
              </div>
              {user?.seenNotifications.map((notification) => (
                <NotificationCard notification={notification} />
              ))}
            </>
          )}
        </div>
      );
}

