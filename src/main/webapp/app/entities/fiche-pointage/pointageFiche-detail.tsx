
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {  Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import { getEntity,getEntitiesPointage } from './fiche-pointage.reducer';
import { IFichePointage } from 'app/shared/model/fiche-pointage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { getEntity as getProjet } from 'app/entities/projet/projet.reducer';


export interface IFichePointageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FichePointagePointagesDetail = (props: IFichePointageDetailProps) => {
  const [modal, setModal] = useState(false);
  const [dateJourPointage,setDateJourPointage]=useState('')
  const [projet,setProjet]=useState('')
  


  const { fichePointageEntity,fichePointageList,projetEntity,loading } = props;

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    props.getEntitiesPointage(Number(props.match.params.id));
    setModal(true);
  }, []);

  useEffect(() => {
    if(fichePointageEntity!=null && fichePointageEntity.dateJour && fichePointageEntity.projet.id ){
    setDateJourPointage(fichePointageEntity.dateJour);
    setProjet(fichePointageEntity.projet.libelle);
    window.console.log(fichePointageEntity);
  }
  });


  const toggle = () => setModal(!modal);
  
  return (

    <Modal isOpen={modal}  style={{maxWidth: '1600px', width: '80%'}}>
              <ModalHeader> 
                <Row>
                    <Col xs="auto">
                          <b>Date : </b>  {dateJourPointage}
                    </Col>
                    <Col xs="auto">
                           <b>Projet : </b>  {projet}
                    </Col>
                </Row>
                                   
              </ModalHeader>
              <ModalBody>
              <div className="table-responsive">
                  {fichePointageList && fichePointageList.length > 0 ? (
                    <Table respfichePointageListonsive>
                      <thead>
                        <tr>
                          <th className="hand" >
                            <Translate contentKey="global.field.id">ID</Translate> 
                          </th>
                          <th>
                            <Translate contentKey="ibamApp.pointage.employe">Employe</Translate>
                          </th>
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.presenceMatin">Presence Matin</Translate>
                          </th>
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.presenceAPM">Presence APM</Translate>
                          </th>
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.nbrHeureSup">Nbr Heure Sup</Translate>
                          </th>
                         
                          <th/>
                        </tr>
                      </thead>
                      <tbody>
                        {fichePointageList.map((pointage,i) => (
                          <tr key={`entity-${i}`}>
                            <td>{pointage.id}</td>
                            <td>  {pointage.employe.prenom+""+pointage.employe.nom+"("+pointage.employe.matricule+")"}</td>
                            <td><input type="checkbox"   name={pointage.id+"3"} checked={pointage.presenceMatin}/> </td>
                            <td><input type="checkbox"   name={pointage.id+"4"}  checked={pointage.presenceAPM}/></td>
                            <td>{pointage.nbrHeureSup}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    !loading && (
                      <div className="alert alert-warning">
                        <Translate contentKey="ibamApp.pointage.home.notFound">No Pointages found</Translate>
                      </div>
                    )
                    )}
                  </div> 
          

              </ModalBody>
              <ModalFooter>
                <Button tag={Link} to="/fiche-pointage" color="primary" onClick={toggle}>
                  OK
                </Button>
              </ModalFooter>
            </Modal>
    
      
 );
};

const mapStateToProps = (storeState: IRootState) => ({
  fichePointageList: storeState.fichePointage.entitiespointage,
  fichePointageEntity: storeState.fichePointage.entity,
  projetEntity: storeState.projet.entity,
  loading: storeState.fichePointage.loading
});

const mapDispatchToProps = {getProjet, getEntity,getEntitiesPointage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FichePointagePointagesDetail);
