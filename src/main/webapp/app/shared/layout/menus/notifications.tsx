import React, { useState, useEffect } from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationsList } from './notifications-list';

export interface INotificationProps {
  getNotifs: Function;
  notifsList: any;
  updateNotif: Function;
}

export const Notifications = (props: INotificationProps) => {
  const [counter, setcounter] = useState(0);
  const style = { borderRadius: '5px', height: '100%', backgroundColor: '' };
  style.backgroundColor = counter !== 0 ? '#dc3545' : '#ffffff2e';

  const { getNotifs, notifsList, updateNotif } = props;

  const handleCounterChange = (value: number) => {
    setcounter(value);
  };

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav className="d-flex align-items-center" style={style}>
        <FontAwesomeIcon icon={faBell} style={{ fontSize: '18px' }} />
        {counter !== 0 ? <span>{counter}</span> : null}
      </DropdownToggle>
      <DropdownMenu
        style={{
          width: '500px',
          left: '-20rem',
          minHeight: '500px',
          maxHeight: '500px',
          overflow: 'auto',
          padding: '10px'
        }}
      >
        <DropdownItem header style={{ textAlign: 'center' }}>
          Notifications
        </DropdownItem>
        <DropdownItem divider />
        <NotificationsList
          notificationsListCount={handleCounterChange}
          getNotifs={getNotifs}
          notifsList={notifsList}
          updateNotif={updateNotif}
        />
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notifications;
