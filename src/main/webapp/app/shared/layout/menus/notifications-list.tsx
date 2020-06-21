import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardSubtitle, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { INotification } from 'app/shared/model/notification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationProps {
  notificationsListCount: Function;
  getNotifs: Function;
  notifsList: any;
  updateNotif: Function;
}

export const NotificationsList = (props: INotificationProps) => {
  const [unreadNotifs, setunreadNotifs] = useState(null);
  const [notiff, setnotiff] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { getNotifs, notifsList, notificationsListCount, updateNotif } = props;

  const showNotif = notif => {
    setnotiff(notif);
    toggle();
    Object.assign(notif, { visualise: true });
    updateNotif(notif);
  };

  useEffect(() => {
    getNotifs();
  }, []);

  useEffect(() => {
    window.console.log(props.notifsList);

    if (notifsList.length > 0) {
      const unreadNotifications = notifsList.filter(notif => {
        return notif.visualise === false;
      });
      setunreadNotifs(unreadNotifications);
      notificationsListCount(unreadNotifications.length);
      notifsList.sort((a, b) => {
        return a.visualise - b.visualise;
      });
      window.console.log(unreadNotifications);
    }
  }, [props.notifsList]);

  return (
    <div>
      {notifsList.length === 0 ? (
        <div className="alert alert-warning">
          <Translate contentKey="ibamApp.notification.home.notFound">No Notifications found</Translate>
        </div>
      ) : (
        <div>
          {notifsList.map(notif => {
            return (
              <Card key={notif.id} style={{ marginBottom: '10px' }}>
                <CardBody>
                  <CardTitle>{notif.libelle}</CardTitle>
                  <CardSubtitle>{notif.visualise === false ? 'false' : 'true'}</CardSubtitle>
                  <CardText>{notif.description}</CardText>
                  <Button
                    onClick={() => {
                      showNotif(notif);
                    }}
                  >
                    Voir
                  </Button>
                </CardBody>
              </Card>
            );
          })}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{notiff !== null && notiff.libelle}</ModalHeader>
            <ModalBody>{notiff !== null && notiff.description} </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
