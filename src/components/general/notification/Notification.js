import React, {useEffect, useState} from 'react';
import IconFeather from "../icon/IconFeather";
import "./notification.css";

export function Notification({root, timer, messageType, title, message, icon, position = '', fillIconColor = ''}) {
  const [closeTimeout, setCloseTimeout] = useState(null);
  const icono = messageType === 'success' ? 'check-circle' : messageType === 'warning' ? 'alert-octagon' : 'alert-circle';
  const fillColor = messageType === 'success' ? '' : messageType === 'warning' ? 'orange' : 'red';


  useEffect(() => {
    beginCloseTimeout();
  }, []);

  const closeSnackBar = () => {
    clearTimeout(closeTimeout);
    root.unmount();
  }

  const beginCloseTimeout = () => {
    if (timer) {
      const timeout = setTimeout(() => closeSnackBar(), timer);
      setCloseTimeout(timeout);
    }
  }

  return (
    <div
      className={`snackbar-container ${messageType}-container`}
      onMouseEnter={() => clearTimeout(closeTimeout)}
      onMouseLeave={() => beginCloseTimeout()}
    >
      <div>
        <div className="snackbar-info-container">
          <div>
            <div className={`snackbar-icon ${messageType}-snackbar-icon`}>
              <IconFeather
                className="icon-feather"
                name={icono}
                onClick={() => closeSnackBar()}
                width='32'
                height='32'
                fill={fillColor || 'transparent'}
                stroke='black'
              />
            </div>
          </div>
          <div>
            <h5 style={{fontWeight: 'bold'}} className="rubik-text">{title}</h5>
            <h5 className="muted-rubik-text">  {message}</h5>
          </div>
        </div>
        <div id="content-icon" style={{cursor: 'pointer'}}>
          <div id="close-snackbar-icon">
            <IconFeather
              className="icon-feather"
              name="x"
              onClick={() => closeSnackBar()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}