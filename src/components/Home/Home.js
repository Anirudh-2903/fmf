import React from 'react'
import SearchPage from '../SearchPage'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import SideBar from '../SideBar';
import Events from '../Events/Events';
import MapButton from './MapButton';
import map from '../../assets/images/map.png'
import Header from "../Header";

const Home = ({details,updateFilters,setSportNr,setClassNr,loading,setLoading}) => {

  return (
    <>
    <div className='mb-4' >
      <SearchPage updateFilters={updateFilters} />
    </div>
      <div className="d-flex" style={{ minHeight: "100vh"}}>
        <Container fluid className="p-3" style={{ maxWidth: "1100px" }}>
          <Row className="justify-content-start">
            {/* Sidebar on the left */}
            <Col xl={5}>
              <Row className="align-items-start">
                <div style={{position: "relative",width:"100%",maxWidth:"400px",marginBottom:"20px"}} >
                  <img
                      src={map}
                      alt="Background"
                      style={{width:"100%",height:"auto",borderRadius:"8px"}}
                  />
                  <div className="overlay-content" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <MapButton details={{ details }} />
                  </div>
                </div>
              </Row>
              <Row className="align-items-start">
                <h2>Filter Results</h2>
                <SideBar updateFilters={updateFilters} details={details} />
              </Row>
            </Col>
  
            {/* Dashboard on the right */}
            <Col xl={7}>
              <Row className="align-items-start">
                <h2>Nearby Reservations</h2>
                <Events details={details} updateFilters={updateFilters} cardsPerRow={2} setSportNr={setSportNr} setClassNr={setClassNr} loading={loading} setLoading={setLoading}/>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
  
}

export default Home;