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
import { getEntities } from '../employe/employe.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';





export interface IPaiementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Paiement = (props: IPaiementProps) => {


      const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  
  


    useEffect(() => {
    props.getProjets();
   
  }, []);
  
    
   

    const { projets,employeList,loading} = props;  

   
  
    const   handleChange=(e)=>{
      this.props.employeList.filter((el) => el.projet && el.projet.id && (el.projet.id === 1));
    }


    const currentList =employeList.filter((el) => el.projet && el.projet.id && (el.projet.id === 1));
  const date=new Date().toLocaleDateString();

// style={@media(min-width :800px) { .modal-dialog{max-width :900%}}
  return (
    <div>
        
            <AvForm >
               <AvGroup>
                <AvInput id="employe-projet" type="select" className="form-control" 
                name="projet.id" onChange={handleChange} >
                  <option value="" key="0"    />
                  {projets
                    ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id} >
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>

 <div className="table-responsive">
        {  employeList &&  employeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
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
                  <Translate contentKey="ibamApp.paie.nbrJourTravail">NombreJourTravail</Translate> <FontAwesomeIcon icon="sort" />
                </th>
               
               <th className="hand" >
                  <Translate contentKey="ibamApp.paie.montantPay">Montant</Translate> <FontAwesomeIcon icon="sort" />
                </th>
        
                 <th className="hand" >
                  <Translate contentKey="ibamApp.paie.nbrHeurSup">nbrHeureSup</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                 <th className="hand" >
                  <Translate contentKey="ibamApp.paie.remarques">remarque</Translate> <FontAwesomeIcon icon="sort" />
                </th>
              <th>Paiement</th>
               
              </tr>
            </thead>
            <tbody>
             
              {  employeList.map((employe, i)=> (
                <tr key={`entity-${i}`}>
                  <td>{employe.id} </td>
                 <td>{employe.matricule}</td>
                 <td>{employe.nom} {employe.prenom}</td>
                 <td><input type="text"  name="nbrJourTravail"/></td>
                 <td><input type="text"  name="montant"/></td>
                 <td><input type="text"  name="nbsup"/></td>
                 <td><input type="text"  name="remarque"/></td>
              <Button color="primary" id="generer-paie" type="submit">
                <Translate contentKey="entity.action.genererpaie">générer</Translate>
              </Button>
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
          </AvForm>
          
   </div>
       
  );
};


const mapStateToProps = (storeState: IRootState) => ({
    projets: storeState.projet.entities,
    employeList : storeState.employe.entities,
    loading: storeState.employe.loading
    

});

const mapDispatchToProps = {
 
  getProjets,
  getEntities 

  
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paiement);
