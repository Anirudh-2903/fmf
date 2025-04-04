import React, { useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideBar from '../SideBar';
import Events from '../Events/Events';
//import filter from '../../assets/images/filter.png'
//import sampleImg from '../../assets/images/filter-icon-sign-symbol-design-free-png.png'
//import cross from '../../assets/images/cross.png'
const cross = '/cross.png';
const filter = '/filter.png'

const ToggleBar = ({ details, updateFilters }) => {
    const [state, setState] = useState({
        isPaneOpenLeft: false,
    });

    return (
        <div id="map-container">
            <div style={{ marginTop: "32px" }}>
                <button onClick={() => setState({ isPaneOpenLeft: true })}>
                    <img
                        src={filter}
                        width="40"
                        height="40"
                        style={{
                            display: 'block',  
                        }}
                            />
                </button>
                            
                {
                /*
                <button onClick={() => setState({ isPaneOpenLeft: true })}>
                    Toggle Btn
                </button>
                */
                }
            </div>
            <SlidingPane
                closeIcon={<div><img
                    src={cross}
                    alt="Event"
                    width="15"
                    height="15"
                    className="cross-image"
                  /></div>}
                isOpen={state.isPaneOpenLeft}
                from="left"
                width="400px"
                onRequestClose={() => setState({ isPaneOpenLeft: false })}
            >
                <Container fluid style={{ display: "flex",height : "100%" }}>
                    <Row className="flex-grow-1">
                        <Col xl={12} xs={12} className="d-flex flex-column">
                            <h2>Filter Results</h2>
                            <div className="flex-grow-1 d-flex">
                                <SideBar updateFilters={updateFilters} details={details} className="w-100" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </SlidingPane>
        </div>
    );
};

export default ToggleBar;

