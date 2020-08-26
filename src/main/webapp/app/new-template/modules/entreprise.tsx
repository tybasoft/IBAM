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

import { getEntities, createEntity } from '../../entities/entreprise/entreprise.reducer';

const Entreprise = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    props.getEntities();
  }, []);

  const { entrepriseList } = props;

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
              <CardTitle>Entreprises</CardTitle>
              <p>Une description courte sur ce module.</p>
              <div className="form-group form-group-compose text-center">
                <button type="button" onClick={() => setModalOpen(true)} className="btn btn-raised btn-danger btn-block my-2 shadow-z-2">
                  <Icon.Plus size={18} className="mr-1" /> Ajouter
                </button>
              </div>
              {entrepriseList && entrepriseList.length > 0 ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Entite Juridique</th>
                      <th>Nom Commercial</th>
                      <th>Adresse</th>
                      <th>Capital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrepriseList.map((entreprise, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          {/* <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="link" size="sm"> */}
                          {entreprise.id}
                          {/* </Button> */}
                        </td>
                        <td>{entreprise.entiteJuridique}</td>
                        <td>{entreprise.nomCommercial}</td>
                        <td>{entreprise.adresse}</td>
                        <td>{entreprise.capital}</td>
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
                  <Label for="entiteJuridique">Entité Juridique</Label>
                  <AvField className="form-control" type="text" name="entiteJuridique" id="entiteJuridique" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="nomCommercial">Nom Commercial</Label>
                  <AvField className="form-control" type="text" name="nomCommercial" id="nomCommercial" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="adresse">Adresse</Label>
                  <AvField className="form-control" type="text" name="adresse" id="adresse" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="capital">Capital</Label>
                  <AvField className="form-control" type="text" name="capital" id="capital" required />
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

const mapStateToProps = ({ entreprise }: IRootState) => ({
  entrepriseList: entreprise.entities,
  loading: entreprise.loading
});

const mapDispatchToProps = {
  getEntities,
  createEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Entreprise);

// export default Entreprise;
