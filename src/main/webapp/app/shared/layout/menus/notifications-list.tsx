import React, { useState, useEffect } from 'react';
import { Button, Card, Col, CardSubtitle, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate } from 'react-jhipster';

export interface INotificationProps {
  notificationsListCount: Function;
  getNotifs: Function;
  notifsList: any;
  updateNotif: Function;
}

export const NotificationsList = (props: INotificationProps) => {
  const [notiff, setnotiff] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { getNotifs, notifsList, notificationsListCount, updateNotif } = props;

  const showNotif = async notif => {
    setnotiff(notif);
    toggle();
    if (notif.visualise === false) {
      await Object.assign(notif, { visualise: true });
      updateNotif(notif);
    }
  };

  useEffect(() => {
    getNotifs();
  }, []);

  useEffect(() => {
    if (notifsList.length > 0) {
      const unreadNotifications = notifsList.filter(notif => {
        return notif.visualise === false;
      });
      notificationsListCount(unreadNotifications.length);
      notifsList.sort((a, b) => {
        const x = new Date(a.date);
        const y = new Date(b.date);
        return x < y ? 1 : x > y ? -1 : 0;
      });
      notifsList.sort((a, b) => {
        return a.visualise - b.visualise;
      });
    }
  }, [props.notifsList]);

  return notifsList.length === 0 ? (
    <div className="d-flex justify-content-center align-items-center notif-menu-body">
      <div className="alert alert-warning">
        <Translate contentKey="ibamApp.notification.home.notFound">No Notifications found</Translate>
      </div>
    </div>
  ) : (
    <div>
      {notifsList.map(notif => {
        const notifStyle = { backgroundColor: '' };
        notif.visualise === false ? (notifStyle.backgroundColor = '#ff000052') : null;
        return (
          <Col className="notif" key={notif.id} style={notifStyle}>
            <Card>
              <CardBody>
                <CardTitle>
                  <span>{notif.libelle}</span>
                  <span style={{ float: 'right' }}>{notif.date}</span>
                </CardTitle>
                <CardText>{notif.description}</CardText>
                <Button
                  color="info"
                  onClick={() => {
                    showNotif(notif);
                  }}
                >
                  <Translate contentKey="ibamApp.notification.buttonShow">voir</Translate>
                </Button>
              </CardBody>
            </Card>
          </Col>
        );
      })}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{notiff !== null && notiff.libelle}</ModalHeader>
        <ModalBody>{notiff !== null && notiff.description} </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <Translate contentKey="ibamApp.notification.buttonCancel">annuler</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NotificationsList;
