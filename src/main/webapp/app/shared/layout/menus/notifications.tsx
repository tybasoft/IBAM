import React, { useState } from 'react';
import { Translate } from 'react-jhipster';

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
  const style = { backgroundColor: '' };
  style.backgroundColor = counter !== 0 ? '#dc3545' : '#ffffff2e';

  const { getNotifs, notifsList, updateNotif } = props;

  const handleCounterChange = (value: number) => {
    setcounter(value);
  };

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav className="d-flex align-items-center notif-dropdown" style={style}>
        <FontAwesomeIcon icon={faBell} className="notif-icon" />
        {counter !== 0 ? <span>{counter}</span> : null}
      </DropdownToggle>
      <DropdownMenu className="notif-menu">
        <DropdownItem header className="notif-menu-header">
          <Translate contentKey="ibamApp.notification.header">Notifications</Translate>
        </DropdownItem>
        <DropdownItem divider className="notif-menu-divider" />
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
