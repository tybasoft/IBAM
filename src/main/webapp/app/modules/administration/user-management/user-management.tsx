import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { Card, CardBody, CardTitle, Col, Modal, ModalHeader, Form, FormGroup, Label, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { locales, languages } from 'app/config/translation';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getUsers, updateUser, createUser, getRoles, deleteUser, ACTION_TYPES } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import NavbarSearch from 'app/new-template/components/search/Search';
import { filter } from 'lodash';
import { Import } from 'app/shared/Repport/import';
import { apiUrl } from 'app/entities/materiau/materiau.reducer';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';

import * as Icon from 'react-feather';
export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const UserManagement = (props: IUserManagementProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityModel, setEntityModel] = useState(props.user);

  useEffect(() => {
    props.getRoles();

    props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const toggleActive = user => () =>
    props.updateUser({
      ...user,
      activated: !user.activated
    });

  const openDetails = (id: number) => {
    setSelectedEntity(id);
    console.log('Opening entity id : ', id);
  };

  const confirmDelete = (id: string) => {
    if (confirm("Voulez vous supprimer l'élément avec ID " + id)) {
      props.deleteUser(id);
    }
  };

  const editEntity = entity => {
    setEntityModel(entity);
    console.log(entity, entityModel);
    setModalOpen(true);
  };

  const handleClose = () => {
    setEntityModel(props.user);
    setModalOpen(false);
  };

  const saveEntity = (event, errors, values) => {
    let entity;
    console.log('Entity :', errors, values);

    if (errors.length === 0) {
      entity = {
        ...entityModel,
        ...values
      };

      if (entityModel === props.user) {
        props.createUser(entity);
      } else {
        props.updateUser(entity);
      }
      handleClose();
    }
  };

  const { users, account, match, totalItems } = props;
  return (
    users && (
      <Fragment>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <CardTitle className="row" style={{ margin: 0 }}>
                  <Translate contentKey="userManagement.home.title">Fonctions</Translate>
                  {/* <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                    <NavbarSearch search={filter} clear={props.getUsers} />
                  </Form> */}
                </CardTitle>
                <p>
                  {' '}
                  <Translate contentKey="userManagement.home.description">fonction</Translate>
                </p>

                <div className="form-group mb-3 form-group-compose text-center">
                  <Button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="btn float-left btn-raised btn-danger  my-2 shadow-z-2"
                  >
                    <Icon.Plus size={18} className="mr-1" /> <Translate contentKey="entity.action.create">Fonction</Translate>
                  </Button>
                </div>
                {users && users.length > 0 ? (
                  <Table striped>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('login')}>
                          <Translate contentKey="userManagement.login">Login</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('email')}>
                          <Translate contentKey="userManagement.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                        <th className="hand" onClick={sort('langKey')}>
                          <Translate contentKey="userManagement.langKey">Lang Key</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="userManagement.profiles">Profiles</Translate>
                        </th>
                        <th className="hand" onClick={sort('createdDate')}>
                          <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('lastModifiedBy')}>
                          <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
                          <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr id={user.login} key={`user-${i}`}>
                          <td onClick={() => openDetails(user.id)}>
                            <Button tag={Link} to={`${match.url}/${user.login}`} color="link" size="sm">
                              {user.id}
                            </Button>
                          </td>
                          <td onClick={() => openDetails(user.id)}>{user.login}</td>
                          <td onClick={() => openDetails(user.id)}>{user.email}</td>
                          <td>
                            {user.activated ? (
                              <Button color="success" onClick={toggleActive(user)}>
                                <Translate contentKey="userManagement.activated">Activated</Translate>
                              </Button>
                            ) : (
                              <Button color="danger" onClick={toggleActive(user)}>
                                <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                              </Button>
                            )}
                          </td>
                          <td onClick={() => openDetails(user.id)}>{user.langKey}</td>
                          <td onClick={() => openDetails(user.id)}>
                            {user.authorities
                              ? user.authorities.map((authority, j) => (
                                  <div key={`user-auth-${i}-${j}`}>
                                    <Badge color="info">{authority}</Badge>
                                  </div>
                                ))
                              : null}
                          </td>
                          <td onClick={() => openDetails(user.id)}>
                            <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                          </td>
                          <td onClick={() => openDetails(user.id)}>{user.lastModifiedBy}</td>
                          <td onClick={() => openDetails(user.id)}>
                            <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                          </td>
                          <td>
                            <Icon.Edit onClick={() => editEntity(user)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(user.login)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="alert alert-warning">No Entreprises found</div>
                )}
                <div className={users && users.length > 0 ? '' : 'd-none'}>
                  <Row className="justify-content-center">
                    <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
                  </Row>
                  <Row className="justify-content-center">
                    <JhiPagination
                      activePage={pagination.activePage}
                      onSelect={handlePagination}
                      maxButtons={5}
                      itemsPerPage={pagination.itemsPerPage}
                      totalItems={props.totalItems}
                    />
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
          <ModalHeader toggle={() => handleClose()}>
            <Translate contentKey="userManagement.home.createOrEditLabel">Create or edit a User</Translate>
          </ModalHeader>
          {/* <AddTodo /> */}
          <AvForm model={entityModel} onSubmit={saveEntity}>
            <ModalBody>
              <Row>
                <Col md={12}>
                  <AvGroup>
                    <Label for="login">
                      <Translate contentKey="userManagement.login">Login</Translate>
                    </Label>
                    <AvField
                      type="text"
                      className="form-control"
                      name="login"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: translate('register.messages.validate.login.required')
                        },
                        pattern: {
                          value: '^[_.@A-Za-z0-9-]*$',
                          errorMessage: translate('register.messages.validate.login.pattern')
                        },
                        minLength: {
                          value: 1,
                          errorMessage: translate('register.messages.validate.login.minlength')
                        },
                        maxLength: {
                          value: 50,
                          errorMessage: translate('register.messages.validate.login.maxlength')
                        }
                      }}
                      // value={user.login}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label for="firstName">
                      <Translate contentKey="userManagement.firstName">First Name</Translate>
                    </Label>
                    <AvField
                      type="text"
                      className="form-control"
                      name="firstName"
                      validate={{
                        maxLength: {
                          value: 50,
                          errorMessage: translate('entity.validation.maxlength', { max: 50 })
                        }
                      }}
                      // value={user.firstName}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label for="lastName">
                      <Translate contentKey="userManagement.lastName">Last Name</Translate>
                    </Label>
                    <AvField
                      type="text"
                      className="form-control"
                      name="lastName"
                      validate={{
                        maxLength: {
                          value: 50,
                          errorMessage: translate('entity.validation.maxlength', { max: 50 })
                        }
                      }}
                      // value={user.lastName}
                    />
                    <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvField
                      name="email"
                      label={translate('global.form.email.label')}
                      placeholder={translate('global.form.email.placeholder')}
                      type="email"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: translate('global.messages.validate.email.required')
                        },
                        email: {
                          errorMessage: translate('global.messages.validate.email.invalid')
                        },
                        minLength: {
                          value: 5,
                          errorMessage: translate('global.messages.validate.email.minlength')
                        },
                        maxLength: {
                          value: 254,
                          errorMessage: translate('global.messages.validate.email.maxlength')
                        }
                      }}
                    />
                  </AvGroup>
                  <AvGroup check>
                    <Label>
                      <AvInput
                        type="checkbox"
                        name="activated"
                        value={entityModel.activated || false}
                        checked={entityModel.activated || false}
                        disabled={!entityModel.id}
                      />{' '}
                      <Translate contentKey="userManagement.activated">Activated</Translate>
                    </Label>
                  </AvGroup>
                  <AvGroup>
                    <Label for="langKey">
                      <Translate contentKey="userManagement.langKey">Language Key</Translate>
                    </Label>
                    <AvField type="select" className="form-control" name="langKey" value={entityModel.langKey || locales[0]}>
                      {locales.map(locale => (
                        <option value={locale} key={locale}>
                          {languages[locale].name}
                        </option>
                      ))}
                    </AvField>
                  </AvGroup>
                  <AvGroup>
                    <Label for="authorities">
                      <Translate contentKey="userManagement.profiles">Profiles</Translate>
                    </Label>
                    <AvInput type="select" className="form-control" name="authorities" value={entityModel.authorities} multiple>
                      {props.roles.map(role => (
                        <option value={role} key={role}>
                          {role}
                        </option>
                      ))}
                    </AvInput>
                  </AvGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {/* <div className="form-actions"> */}
              <Button onClick={() => handleClose()} color="warning" className="mr-1" type="button">
                <Icon.X size={16} className="mr-2" color="#FFF" />
                <Translate contentKey="entity.action.cancel">Entreprises</Translate>
              </Button>
              <Button color="primary" type="submit">
                <Icon.CheckSquare size={16} className="mr-2" color="#FFF" />
                <Translate contentKey="entity.action.save">Entreprises</Translate>
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        {/* {selectedEntity !== null && (
          <FonctionDetails selectedEntity={selectedEntity} setSelectedEntity={openDetails} isOpen={selectedEntity !== null} />
        )} */}
      </Fragment>
    )
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  roles: storeState.userManagement.authorities,
  user: storeState.userManagement.user
});

const mapDispatchToProps = { getUsers, getRoles, updateUser, createUser, deleteUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
