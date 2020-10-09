import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Modal, Card, Button, CardTitle, CardText, Col, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { Translate, Storage, translate } from 'react-jhipster';

import { uploadFile } from './report.reducer';

interface ImportProps extends DispatchProps, StateProps {
  apiUrl: string;
}
export const Import = (props: ImportProps) => {
  const divRef = React.createRef<HTMLInputElement>();
  const [File, setFile] = useState(null);

  const Upload = () => {
    console.log('Uploading', File, event);
    const file = new FormData();
    file.append('file', File);
    file.append('filename', File.name);
    const res = props.uploadFile(file, props.apiUrl);
    console.log('Upload state', res);
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.tva.home.createOrEditLabel">
            <Translate contentKey="global.import.title">ibamApp.tva.home.createOrEditLabel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <br></br>
          <Row xs="2">
            <Col>
              <Card body className="card text-white bg-dark mb-3 text-center">
                <input
                  id="entreprise-image"
                  type="file"
                  name="imageFile"
                  accept=".csv"
                  hidden
                  ref={divRef}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFile(event.target.files[0])}
                />
                <FontAwesomeIcon
                  onClick={() => divRef.current.click()}
                  style={{ alignSelf: 'center', cursor: 'pointer' }}
                  icon="cloud"
                  size="7x"
                />
                <CardText>
                  <Translate contentKey="global.import.instruction">ibamApp.tva.home.createOrEditLabel</Translate>{' '}
                </CardText>
                <br></br>
                {File && <p>{File.name}</p>}
                {File && (
                  <Button onClick={Upload}>
                    <Translate contentKey="global.import.upload">ibamApp.tva.home.createOrEditLabel</Translate>
                  </Button>
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tvaEntity: storeState.tva.entity,
  loading: storeState.tva.loading,
  updating: storeState.tva.updating,
  updateSuccess: storeState.tva.updateSuccess
});

const mapDispatchToProps = {
  uploadFile
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Import);
