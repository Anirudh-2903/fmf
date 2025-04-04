import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import FMFLogo from '../assets/images/Findmyfacility_RGB_Landscape.png'
import {useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import '../styles/Header.css'

function Header() {

    const navigate = useNavigate();
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <Navbar.Brand
                            className="ms-3"
                            onClick={() => {
                                window.location.href = "https://www.findmyfacility.com";
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "Default",
                                }}
                            >
                                <img
                                    alt=""
                                    src={FMFLogo}
                                    width="200"
                                    height="70"
                                    style={{
                                        display: "block",
                                    }}
                                />
                            </div>
                        </Navbar.Brand>
    
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink} className="dropdown-toggle-custom">
                                <i className="bi bi-list"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-custom">
                                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                                <Dropdown.Divider />
                                <Nav.Link href="https://www.findmyfacility.com/sports">Sports</Nav.Link>
                                <Dropdown.Divider />
                                <Nav.Link href="https://www.findmyfacility.com/facilities">
                                    Facilities
                                </Nav.Link>
                                <Dropdown.Divider />
                                <Nav.Link href="https://www.findmyfacility.com/blog">Blog</Nav.Link>
                                <Dropdown.Divider />
                                <Nav.Link href="https://www.findmyfacility.com/contact-us">Contact</Nav.Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Container>
            </Navbar>
        </>
    );    
}

export default Header;
