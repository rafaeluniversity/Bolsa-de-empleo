import ReactDOM from 'react-dom/client';
import React from "react";
import { Notification } from './Notification';


export const TriggerNotification = (timer, title, message, type, icon, fillIconColor = '') => {
  const validMessageTypes = ['error', 'info', 'warning', 'success'];
  if (!validMessageTypes.includes(type)) {
    throw Error("Invalid snackbar message type");
  }

  const rootNotification = ReactDOM.createRoot(document.getElementById('snackbar-fixed-container'));
  rootNotification.render(
    <Notification root={rootNotification} timer={timer} messageType={type} title={title} message={message} icon={icon} fillIconColor={fillIconColor} />
  );
}