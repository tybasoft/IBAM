import React, { Component, Fragment, useEffect, useState } from 'react';
// import CustomTabs from '../../components/tabs/customTabs';
// import ContentHeader from '../../components/contentHead/contentHeader';
// import ContentSubHeader from '../../components/contentHead/contentSubHeader';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';

import * as Icon from 'react-feather';

//Prism
// eslint-disable-next-line
import Prism from 'prismjs'; //Include JS
import 'prismjs/themes/prism-okaidia.css'; //Include CSS
import { PrismCode } from 'react-prism'; //Prism Component
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

import { getEntities, createEntity } from '../../entities/fonction/fonction.reducer';
import fonction from 'app/entities/fonction/fonction';

const Fonction = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fonctionList } = props;

  const saveEntity = (event, errors, values) => {
    //     let imageStorageName;
    //     let image;
    let entity;
    //     const imageData = new FormData();
    if (errors.length === 0) {
      entity = {
        //   ...entrepriseEntity,
        ...values
      };

      console.log('Entity :', entity);

      // if (isNew) {
      //   if (imageFile) {
      //     image = uploadNewImage(values);
      //     entity.image = image;
      //   }
      props.createEntity(entity);
      setModalOpen(false);
      //     }
      //     else {
      //         if (entrepriseEntity.image == null) {
      //           if (imageFile) {
      //             image = uploadNewImage(values);
      //             entity.image = image;
      //           }
      //           props.updateEntity(entity);
      //         } else if (imageDeleted) {
      //           entity.image = null;

      //           if (imageFile) {
      //             image = uploadNewImage(values);
      //             entity.image = image;
      //           }
      //           props.deleteImageFile(entrepriseEntity.image.path.substr(24));
      //           setimageID(entrepriseEntity.image.id);
      //           props.updateEntity(entity);
      //         } else {
      //           image = {
      //             id: entrepriseEntity.image.id,
      //             titre: values.nomCommercial,
      //             path: entrepriseEntity.image.path.substr(27)
      //           };
      //           entity.image = image;

      //           if (imageFile) {
      //             (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
      //             entity.image = image;
      //             imageData.append('file', imageFile);
      //             imageData.append('storageName', imageStorageName);

      //             props.deleteImageFile(entrepriseEntity.image.path.substr(24));
      //             props.uploadImage(imageData);
      //           }
      //           props.updateEntity(entity);
      //         }
      //       }
    }
  };
  //   entrepriseList = this.props.entrepriseList;

  //   componentDidMount() {
  //     this.props.getEntities();
  //   }

  //   render() {
  return (
    <Fragment>
      {/* <ContentHeader>Basic Tables </ContentHeader>
        <ContentSubHeader>
          All table styles are inherited in Bootstrap 4, meaning any nested tables will be styled in the same manner as the parent.
        </ContentSubHeader> */}
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle>Fonctions</CardTitle>
              <p>Une description courte sur ce module.</p>
              <div className="form-group form-group-compose text-center">
                <button type="button" onClick={() => setModalOpen(true)} className="btn btn-raised btn-danger btn-block my-2 shadow-z-2">
                  <Icon.Plus size={18} className="mr-1" /> Ajouter
                </button>
              </div>
              {fonctionList && fonctionList.length > 0 ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Libelle</th>
                      <th>Description</th>
                      <th>Competences</th>
                      {/* <th>Capital</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {fonctionList.map((fonction, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          {/* <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="link" size="sm"> */}
                          {fonction.id}
                          {/* </Button> */}
                        </td>
                        <td>{fonction.libelle}</td>
                        <td>{fonction.description}</td>
                        <td>{fonction.competences}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">No Entreprises found</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="md">
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Ajouter une entreprise</ModalHeader>
        {/* <AddTodo /> */}
        <AvForm model={{}} onSubmit={saveEntity}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="libelle">Libelle</Label>
                  <AvField className="form-control" type="text" name="libelle" id="libelle" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <AvField className="form-control" type="text" name="description" id="description" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="competences">Competences</Label>
                  <AvField className="form-control" type="text" name="competences" id="competences" required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Enregistrer
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </Fragment>
  );
};
// }

const mapStateToProps = ({ fonction }: IRootState) => ({
  fonctionList: fonction.entities,
  loading: fonction.loading
});

const mapDispatchToProps = {
  getEntities,
  createEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Fonction);

// export default Entreprise;
