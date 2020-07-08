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
import { AvFeedback,  AvField } from 'availity-reactstrap-validation';



export interface IPointageJourProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointageJour = (props: IPointageJourProps) => {
  const [filter, setFilter] = useState('');


    useEffect(() => {
    props.getProjets();
   
  },[]);

  useEffect(() => {
    props.getEntities();
   
  },[]);
  const { projets,employeList,loading,projectid} = props;  
     
  const saveEntity = (event, errors, values) => {
    const tab=[];
    let cmpt=0;
    if (errors.length === 0) {
      
           employeList.map((employe,i=0)=>{
                  
             tab[i]={

              "dateJour": "12/02/2020",
              "presenceMatin" :Object.values(values)[cmpt+1],
              "presenceAPM" :Object.values(values)[cmpt+2],
              "nbrHeureSup" : Object.values(values)[cmpt+3],
              "remarques" : Object.values(values)[cmpt+4],
              "employe" : {
                "id" : employe.id
              }
             }
            cmpt+=4;
            i++;
           }
    )
        
      window.console.log(tab);
          }
  };
  


    const changeFilter = evt => setFilter(evt.target.value);
    const filterFn = l => l.matricule.toUpperCase().includes(filter.toUpperCase());
  
  
   
  
    
   
    
  return (
    <div>

            <AvForm   onSubmit={saveEntity}>
                <AvGroup>
                <AvInput id="employe-projet" type="select" className="form-control" 
                name="projet.id" 
                value={filter} onChange={changeFilter}>
                  <option value="" key="0"    />
                  {projets ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}  >
                          {otherEntity.libelle}
                        </option>
                      )) 
                    : null}
                </AvInput>
              </AvGroup> 
            
              <span>
        <Translate contentKey="logs.filter">Filter</Translate>
      </span>
      <input type="text" value={filter} onChange={changeFilter} className="form-control" />

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
             
              { employeList.filter(filterFn).map((employe, i)=> (
                <tr   key={employe.id}  >
                  <td>{employe.id} </td>
                  <td>{employe.matricule}</td>
                  <td>{employe.nom} {employe.prenom}</td>
                  <td> <AvInput id={employe.id+"1"} type="checkbox" name={"Matin"+employe.id}/></td>
                  <td> <AvInput id={employe.id+"2"} type="checkbox" name={"APM"+employe.id} /></td>
                  <td> <AvInput id={employe.id+"3"} type="text" name={"nbsup"+employe.id} /></td>
                  <td> <AvInput id={employe.id+"4"} type="text" name={"observation"+employe.id} /></td>
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
         <Button color="primary" id="save-entity" type="submit" >
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>             
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
