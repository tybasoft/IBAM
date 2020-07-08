import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {  AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Col, Row, Table,Container } from 'reactstrap';
import { Link} from 'react-router-dom';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities } from '../test/test.reducer';
import { filterEmployees } from '../test/test.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { Employe } from '../employe/employe';



export interface IPointageJourProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointageJour = (props: IPointageJourProps) => {


    useEffect(() => {
    props.getProjets();
   
  },[]);

  useEffect(() => {
    props.getEntities();
   
  },[]);


    const { projets,employeList,loading,projectid} = props;  


    
  return (
    <div>

            <AvForm >
                <AvGroup>
                <AvInput id="employe-projet" type="select" className="form-control" 
                name="projet.id" 
                onChange={(e) => {
                  filterEmployees(this.props.employeList,e.target.value)
                }}>
                  <option value="" key="0"    />
                  {projets ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}  >
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup> 
            
 <div className="table-responsive">
        { employeList &&   employeList.length > 0 ? (
          <Table responsive  >
            <thead>
              <tr  >
                <th className="hand" >
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>  
                <th className="hand" >
                  <Translate contentKey="ibamApp.employe.matricule">Matricule</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand">
                  <Translate contentKey="ibamApp.employe.nomcomplet">Nom et Prenom</Translate> <FontAwesomeIcon icon="sort" />
                </th>
               <th className="hand" >
                  <Translate contentKey="ibamApp.pointage.presenceMatin">Nb / Heure Matin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
               
               <th className="hand" >
                  <Translate contentKey="ibamApp.pointage.presenceAPM">Nb / Heure Après-midi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
        
                 <th className="hand" >
                  <Translate contentKey="ibamApp.pointage.nbrHeureSup">Nb / H,sup</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                 <th className="hand" >
                  <Translate contentKey="ibamApp.pointage.remarques">Observation</Translate> <FontAwesomeIcon icon="sort" />
           </th>   
      </tr>
            </thead>
            <tbody>
             
              { employeList.map((employe, i)=> (
                <tr   key={employe.id}  >
                  <td>{employe.id} </td>
                  <td>{employe.matricule}</td>
                  <td>{employe.nom} {employe.prenom}</td>
                  <td><input type="checkbox" checked/></td>
                  <td><input type="checkbox" checked/></td>
                  <td><input type="text"  name="nbsup"/></td>
                  <td><input type="text"  name="observation"/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ibamApp.employe.home.notFound">No Employes found</Translate>
            </div>
          )
        )}
      </div>  

      
                           <button >Save</button>
                        
          </AvForm>


          
   </div>
       
  );
};


const mapStateToProps = (storeState: IRootState) => ({
    projets: storeState.projet.entities,
    employeList : storeState.employe.currList,
    loading: storeState.employe.loading,
    projectid :storeState.employe.projectid
});

const mapDispatchToProps = {
  getProjets,
  getEntities,
  filterEmployees

  
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PointageJour);
