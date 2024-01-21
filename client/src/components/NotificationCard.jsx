import React from "react";
import "../pages/Notifications/notifications.css";

export function NotificationCard({ notification }) {

    return (
        <div
          className="card-box"
          key={notification.message}
        >
          <div className="card-text">{notification.message}</div>
        </div>
      );
}
