import React from 'react'
import SearchPage from '../SearchPage'
import ToggleBar from './ToggleBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import '../../styles/HomePage.css'
import EventMap from "./EventMap";
import Header from "../Header";
import Events from '../Events/Events';


const Overview = ({details,updateFilters,setSportNr,setClassNr,loading,setLoading}) => {


    console.log(details,'HOME')
    return (
        <>
            <SearchPage updateFilters={updateFilters}/>
            <Container fluid style={{ marginTop: "10px", height: "100vh" }}>
            <Row className="h-100">
                {/* Sidebar on the left */}
                <Col xl={1} className="d-flex flex-column h-100 p-0" style={{ overflowY: 'auto', width:"60px" }}>
                <ToggleBar details={details} updateFilters={updateFilters} />
                </Col>

                {/* Nearby Reservations */}
                <Col xl={3} className="d-flex flex-column h-100 p-0" style={{ overflowY: 'auto' }}>
                <h2>Nearby Reservations</h2>
                <div className='shrink-wrapper'>
                    <Events
                    details={details}
                    updateFilters={updateFilters}
                    cardsPerRow={1}
                    setSportNr={setSportNr}
                    setClassNr={setClassNr}
                    loading={loading}
                    setLoading={setLoading}
                    />
                </div>
                </Col>

                {/* Event Map */}
                <Col xl={8} className="d-flex h-100 p-0" style={{ overflowY: 'auto' }}>
                <EventMap details={details} loading={loading} setLoading={setLoading} />
                </Col>
            </Row>
            </Container>

        </>
    )
}

export default Overview