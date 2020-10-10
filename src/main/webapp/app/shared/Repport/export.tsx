import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Modal, Card, Button, CardTitle, CardText, Col, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getReportEntity } from './report.reducer';
import { toast } from 'react-toastify';
interface ExportProps extends DispatchProps, StateProps {
  apiUrl: string;
  action: string;
}
const Export = (props: ExportProps) => {
  const [Type, setType] = useState(null);
  const [generated, setGenerated] = useState(null);
  const onChange = event => {
    setType(event.target.id);
  };
  const ExportReport = e => {
    if (Type === 'pdf' || Type === 'csv') {
      setGenerated(true);
      toast.success('The file is uploaded successfully-- see Your downloads folder');
      props.getReportEntity(Type, props.apiUrl, props.action);
    } else {
      setGenerated(false);
    }
    e.preventDefault();
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.tva.home.createOrEditLabel">Export a csv/pdf File from database</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <br></br>
          <Row xs="2">
            <Col>
              <Card body className="card text-black  mb-3 ">
                <CardText>Choose the extention:</CardText>

                <label className="form--radio-label">
                  <input type="radio" name="Type" id="pdf" checked={Type === 'pdf'} onChange={onChange} />
                  <span> Pdf</span>
                </label>

                <label className="form--radio-label">
                  <input type="radio" name="Type" id="csv" checked={Type === 'csv'} onChange={onChange} />
                  <span> Csv</span>
                </label>
                <br></br>

                <Button onClick={ExportReport}>Generate</Button>
              </Card>
              {generated != null ? (
                generated ? (
                  <Alert color="success">The file is uploaded successfully-- see Your downloads folder</Alert>
                ) : (
                  <Alert color="danger">Please choose a format</Alert>
                )
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.tva.loading
});

const mapDispatchToProps = {
  getReportEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Export);
