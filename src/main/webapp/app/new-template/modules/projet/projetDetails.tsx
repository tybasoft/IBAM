import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
// import { getEntity, RapportConsommation } from './projet.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};
// export interface IProjetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjetDetails = props => {
  //    useEffect(() => {
  //      props.getEntity(props.match.params.id);
  //    }, []);
  const getConsommationRepport = () => {
    const res = props.RapportConsommation(props.match.params.id);
  };
  const { projetEntity } = props;

  const onClick = e => {
    /* eslint-disable no-console */
    console.log('Map clicked', e);
    console.log('Lat', e.latLng.lat());
    console.log('Lng', e.latLng.lng());
  };

  return (
    <Row>
      <Col md="8">
        {/* <h2>
                 <Translate contentKey="ibamApp.projet.detail.title">Projet</Translate> [<b>{projetEntity.id}</b>]
               </h2> */}
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.projet.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{projetEntity.reference}</dd>
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.projet.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{projetEntity.libelle}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.projet.description">Description</Translate>
            </span>
          </dt>
          <dd>{projetEntity.description}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="ibamApp.projet.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projetEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="ibamApp.projet.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projetEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="nbrEmploye">
              <Translate contentKey="ibamApp.projet.nbrEmploye">Nbr Employe</Translate>
            </span>
          </dt>
          <dd>{projetEntity.nbrEmploye}</dd>
          <dt>
            <span id="budget">
              <Translate contentKey="ibamApp.projet.budget">Budget</Translate>
            </span>
          </dt>
          <dd>{projetEntity.budget}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.projet.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{projetEntity.adresse}</dd>
          <dt>
            <span id="ville">
              <Translate contentKey="ibamApp.projet.ville">Ville</Translate>
            </span>
          </dt>
          <dd>{projetEntity.ville}</dd>
          <dt>
            <span id="pays">
              <Translate contentKey="ibamApp.projet.pays">Pays</Translate>
            </span>
          </dt>
          <dd>{projetEntity.pays}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.projet.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{projetEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.projet.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projetEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.projet.entreprise">Entreprise</Translate>
          </dt>
          <dd>{projetEntity.entreprise ? projetEntity.entreprise.nomCommercial : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.projet.horaire">Horaire</Translate>
          </dt>
          <dd>{projetEntity.horaire ? projetEntity.horaire.libelle : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.projet.depot">Depot</Translate>
          </dt>
          <dd>{projetEntity.depot ? projetEntity.depot.libelle : ''}</dd>
        </dl>
        {projetEntity.latitude && projetEntity.longitude && (
          <div className="mt-2 mb-2">
            <LoadScript googleMapsApiKey="AIzaSyC3ptr9KQuVbnjrokZLtgQH01RLrtQeWMA">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: projetEntity.latitude, lng: projetEntity.longitude }}
                zoom={10}
                onClick={onClick}
              >
                <Marker position={{ lat: projetEntity.latitude, lng: projetEntity.longitude }} />
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        )}
        {(!projetEntity.latitude || !projetEntity.longitude) && (
          <p>
            <Translate contentKey="ibamApp.projet.nolocal">Aucune information trouvée sur la géolocalisation du projet.</Translate>
          </p>
        )}
        {/*        
        <Button onClick={getConsommationRepport} replace color="success">
          <span className="d-none d-md-inline">
            <Translate contentKey="ibamApp.materiel.detail.consommation">Rapport de consommation</Translate>
          </span>
        </Button>  */}
      </Col>
    </Row>
  );
};

export default ProjetDetails;
// const mapStateToProps = ({ projet }: IRootState) => ({
//   projetEntity: projet.entity
// });

// const mapDispatchToProps = { getEntity, RapportConsommation };

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

// export default connect(mapStateToProps, mapDispatchToProps)(ProjetDetail);
