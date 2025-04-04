import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Dropdown,Badge,CloseButton } from 'react-bootstrap';
import { usePlacesWidget } from 'react-google-autocomplete';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/SearchPage.css'
import Select from 'react-select';
import { useNotification } from '../contexts/NotificationProvider';

const SearchPage = ({ updateFilters }) => {
  const [sports, setSports] = useState([]);
  const [selectedsports,setSelectedsports] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [validated, setValidated] = useState(false);
  const [locationError, setLocationError] = useState(false); 
  const {notify,silence} = useNotification();


  const updateValues = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(location)

    if (!location) {
      notify('error', "No location entered")
      setLocationError(true); // Show error for location
      setValidated(false);    // Do not trigger global validation
      e.stopPropagation();
      return;
    } 
    else {
      setLocationError(false); // Hide location error
    }
    
    console.log('Latitude:', latitude, 'Longitude:', longitude);
    updateFilters({ latitude, longitude,selectedsports});
  };

  useEffect(() => {
    fetch('https://api.findmyfacility.com/v1/allSports')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error calling the All Sports API');
        }
        return res.json();
      })
      .then(data => {
        setSports(data.concept);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearchClass = (value) => {
    setSearchInput(value);
    if (value === '') {
      setFilteredClasses([]);
    } else {
      const filtered = sports.filter((cls) =>
        cls.prefLabel.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredClasses(filtered);
    }
  };

  const handleDropDownClick = (value) => {
    if (!selectedsports.some((sport) => sport.id === value.id)) {
      setSelectedsports([...selectedsports, value]);
    }
    setSearchInput('');
    setFilteredClasses([]);
  };

  const handlePlaceSelect = (place) => {
    setLocation(place.formatted_address);
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    console.log('Latitude from place:', lat, 'Longitude from place:', lng);

    setLatitude(lat);
    setLongitude(lng);
  };
  const handleRemoveSport = (id) => {
    setSelectedsports(selectedsports.filter((sport) => sport.id !== id));
  };

  const { ref: locationRef } = usePlacesWidget({
    apiKey: 'AIzaSyCjYemnQG_XW3JLmu3HifVheyWXFrFrjf4',
    onPlaceSelected: (place) => handlePlaceSelect(place),
    options: {
      types: ['(cities)'],
      componentRestrictions: { country: 'uk' }, // Restrict to specific country if needed
    },
  });

  const handleLocationChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);

    if (inputValue === '') {
      setLatitude(null);
      setLongitude(null);
    }
  };

  
  return (
      <>
        { /*
      <div className="search-page">
        <h1 className="search-title">Start a new search</h1>
        <p>Discover a UK sport or class at a facility near you , or even where <br/> you're planning to go</p>
        <div className="search-form">
          <Form className="w-50">
            <Row className="align-items-center">
            <div className="d-flex flex-wrap">
              <Col>
              
              <Form.Control
              placeholder="Type a sport or class"
              value={searchInput}
              onChange={(e) => handleSearchClass(e.target.value)}
              className='mb-4'
            />
              <div className="d-flex flex-wrap">
              {selectedsports.map((sport) => (
                <Badge key={sport.id} bg="primary" className="me-2 mb-2 d-flex align-items-center">
                {sport.name}
                <CloseButton
                  onClick={() => handleRemoveSport(sport.id)}
                  variant="white"
                  aria-label="Remove"
                  className="ms-2"
                />
              </Badge>
              ))}
            </div>
            {filteredClasses.length > 0 && (
              <Dropdown.Menu show >
                {filteredClasses.map((cls) => (
                  <Dropdown.Item key={cls.id} onClick={() => handleDropDownClick(cls)}>
                    {cls.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
              
              </Col>
              <Col >
                <Form.Control
                  ref={locationRef}
                  placeholder="Type a location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
              <Col  >
                <Button as="input" type="submit" value="Search" onClick={(e) => { updateValues(e); }} />
              </Col>
              </div>
            </Row>
          </Form>
        </div>
      </div>
      */}
        <div className="search-page">
          <div className="search-form">
            <Form noValidate validated={validated} onSubmit={updateValues}>
              <Row className="justify-content-center">
                {/* Sport/Class and Location Inputs in One Row */}
                <Col xs={12} md={9} className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Control
                    placeholder="Type a sport or class"
                    value={searchInput}
                    onChange={(e) => handleSearchClass(e.target.value)}
                    className="search-input"
                  />
                  <Form.Group controlId="location" className="d-flex justify-content-between align-items-center "> 
                  <Form.Control
                    ref={locationRef}
                    placeholder="Type a location" 
                    value={location}
                    onChange={(e) => handleLocationChange(e)}
                    className={`search-input ms-3 ${locationError ? 'is-invalid' : ''}`}
                    required
                  />
                  <Form.Control.Feedback type="invalid" style={{ display: locationError ? 'block' : 'none' }}>
                    Please provide a valid location.
                  </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    value="Search"
                    // onClick={(e) => updateValues(e)}
                    className="search-button ms-3"
                    style={{ backgroundColor: "#7800ff" }}
                  >
                    Search
                  </Button>
                </Col>

                {/* Selected Sports Badges */}
                <Col xs={12} className="text-center mb-3">
                  <div className="selected-badges d-flex justify-content-center flex-wrap">
                    {selectedsports.map((sport) => (
                      <Badge key={sport.id} bg="secondary" className="me-2 mb-2 d-flex align-items-center">
                        {sport.prefLabel}
                        <CloseButton
                          onClick={() => handleRemoveSport(sport.id)}
                          //variant="white"
                          aria-label="Remove"
                          className="ms-2"
                        />
                      </Badge>
                    ))}
                  </div>
                </Col>

                {/* Filtered Classes Dropdown */}
                {filteredClasses.length > 0 && (
                  <Col xs={12} md={9} className="mb-3">
                    <Dropdown.Menu show>
                      {filteredClasses.map((cls) => (
                        <Dropdown.Item key={cls.id} onClick={() => handleDropDownClick(cls)}>
                          {cls.prefLabel}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Col>
                )}
              </Row>
            </Form>
          </div>
        </div>


      </>
  );
};

export default SearchPage;
