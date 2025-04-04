import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiRangeSlider from 'multi-range-slider-react';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../styles/SideBar.css'

const SideBar = ({ updateFilters, details }) => {
  const { priceAdult_lte, age_lte, age_gte, gender } = details;
  const [maxDuration, setMaxDuration] = useState(3);
  const [maxPrice, setMaxPrice] = useState(priceAdult_lte);
  const [gender2, setGender2] = useState(gender);
  const [difficulty, setDifficulty] = useState(['beginner','intermediate','advance']);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [minAgeValue, setMinAgeValue] = useState(age_lte);
  const [maxAgeValue, setMaxAgeValue] = useState(age_gte);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(48);
  const [ageValue, setAgeValue] = useState('Adult');
  const [freeValue, setFreeValue] = useState('No');
  const [virtualValue, setVirtualValue] = useState('No');

  const handleSliderChange = (e) => {
    setTempMaxPrice(e.target.value);
  };

  const handleSliderMouseUp = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleChange = (value) => {
    setDifficulty((prevDifficulty) =>
      prevDifficulty.includes(value)
        ? prevDifficulty.filter((diff) => diff !== value)
        : [...prevDifficulty, value]
    );
  };

  const handleRadioChange = (value) => {
    setGender2(value);
  };

  const handleAgeInput = (e) => {
    setMinAgeValue(e.minValue);
    setMaxAgeValue(e.maxValue);
  };

  const handleTimeInput = (e) => {
    setStartTime(e.minValue);
    setEndTime(e.maxValue);
  };

  const getTimeLabel = (value) => {
    const hours = Math.floor(value / 2);
    const minutes = value % 2 === 0 ? "00" : "30";
    return hours.toString().padStart(2, "0") + ":" + minutes;
  };

  useEffect(() => {
    updateFilters({ minAgeValue, maxAgeValue, maxPrice, gender2, difficulty });
  }, [minAgeValue, maxAgeValue, maxPrice, gender2, difficulty, updateFilters]);

  return (
    <Container>
    <div className="d-flex mb-3 align-items-start w-100">
    <Form.Group className="w-100">
      <Form.Label className="text-start w-100 mb-4" style={{ fontWeight: 'bold',fontFamily:"Subheading" }}>{ maxPrice <250 ? `Max Price : £${maxPrice}` : `Max Price : £250+`}</Form.Label>
      <Form.Range 
      value={tempMaxPrice} 
      onChange={handleSliderChange} 
      onMouseUp={handleSliderMouseUp} 
      className="custom-range"
      min={0}
      max={250}
      />
      <div style={{ position: 'relative', height: '20px', width: '100%' }}>
        <span 
          style={{ 
            display: 'block', 
            marginTop: '1px', 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            position: 'absolute', 
            left: `${(tempMaxPrice / 280) * 100}%`,  // Position span based on slider value
            transform: 'translateX(-50%)'  // Centers the dot under the thumb
          }}
        >
          { maxPrice <250 ? `£${maxPrice}` : `£250+`}
        </span>
      </div>
    </Form.Group>
  </div>

  <div className="d-flex mb-4 align-items-start w-100">
  <Form.Group className="w-100">
    <Form.Label className="text-start w-100 mb-4" style={{ fontWeight: 'bold', fontFamily: 'Subheading' }}>
    Max Duration: {maxDuration === 3 
    ? `3+ hours` 
    : maxDuration < 1 
        ? `${maxDuration * 60} minutes` 
        : `${maxDuration} hours`}

    </Form.Label>
    
    <Form.Range 
      value={maxDuration} 
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        setMaxDuration(value);
      }} 
      className="custom-range"
      min={0} 
      max={3} 
      step={0.25} 
    />

    <div style={{ position: 'relative', height: '20px', width: '100%' }}>
      <span 
        style={{ 
          display: 'block', 
          marginTop: '1px', 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          position: 'absolute', 
          left: `${(maxDuration / 3.1) * 100}%`, 
          transform: 'translateX(-50%)'  
        }}
      >
        {maxDuration < 1 ? `${maxDuration * 60} mins` : `${maxDuration} hrs`}
      </span>
    </div>
  </Form.Group>

  </div>
      <div className="d-flex mb-3">
        <Form>
          <Form.Label className="text-start w-100 mb-2" style={{ fontWeight: 'bold',fontFamily:"Subheading" }}>Genders</Form.Label>
          <Row>
            <Col style={{ fontFamily:"Default" }}>
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Male only"
                checked={gender2 === 'MaleOnly'}
                onChange={() => handleRadioChange('MaleOnly')}
              />
            </Col>
            <Col>
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Female only"
                checked={gender2 === 'FemaleOnly'}
                onChange={() => handleRadioChange('FemaleOnly')}
              />
            </Col>
            <Col>
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Open for all"
                checked={gender2 === ''}
                onChange={() => handleRadioChange('')}
              />
            </Col>
          </Row>
        </Form>
    </div>
      <div className="d-flex mb-3">
        <Form>
          <Form.Label className="text-start w-100 mb-2" style={{ fontWeight: 'bold',fontFamily:"Subheading" }}>Difficulty</Form.Label>
          <Row>
            <Col>
              <Form.Check className="custom-radio" type="checkbox" label="Beginner" checked={difficulty.includes('beginner')} onChange={() => handleChange('beginner')} />
            </Col>
            <Col>
              <Form.Check className="custom-radio" type="checkbox" label="Intermediate" checked={difficulty.includes('intermediate')} onChange={() => handleChange('intermediate')} />
            </Col>
            <Col>
              <Form.Check className="custom-radio" type="checkbox" label="Advanced" checked={difficulty.includes('advance')} onChange={() => handleChange('advance')} />
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex flex-column mb-3 text-start">
        <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Subheading' }}>
          Start Time - End Time: {getTimeLabel(startTime)} - {getTimeLabel(endTime)}
        </Form.Label>
        <MultiRangeSlider
          min={0}
          max={48}  // 48 steps (representing 30-minute intervals from 00:00 to 23:59)
          step={1}  // Each step represents 30 minutes
          minValue={startTime}
          maxValue={endTime}
          onInput={handleTimeInput}
          ruler={false}
          minCaption={getTimeLabel(startTime)}
          maxCaption={getTimeLabel(endTime)}
          subSteps={true}
          barInnerColor='#7800ff'
          barLeftColor='#7800ff'
          barRightColor='#7800ff'
        />
      </div>
      <div className="d-flex flex-column mb-3  text-start">
        <Form.Label style={{ fontWeight: 'bold',fontFamily:"Subheading" }}>Age Range: {minAgeValue} - {maxAgeValue}</Form.Label>
        <MultiRangeSlider
          min={0}
          max={100}
          step={5}
          minValue={minAgeValue}
          maxValue={maxAgeValue}
          onInput={handleAgeInput}
          ruler={false}
          barInnerColor='#7800ff'
          barLeftColor='#7800ff'
          barRightColor='#7800ff'
        />
      </div>
      <Container className="px-0">
  <Row className="mb-3 align-items-center justify-content-between w-100">
    <Col xs={6} md={5} className="text-start">
      <Form.Label>Only for children or adults?</Form.Label>
    </Col>
    <Col xs={6} md={5} className="d-flex justify-content-end">
      <ButtonGroup>
        {['Child', 'Adult'].map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`age-${idx}`}
            type="radio"
            style={{
              backgroundColor: ageValue === radio ? "#7800ff" : "transparent",
              color: ageValue === radio ? "white" : "#7800ff",
              borderColor: "#7800ff",
              marginRight: '5px',
              width: '60px',
            }}
            name="age"
            value={radio}
            checked={ageValue === radio}
            onChange={(e) => setAgeValue(e.target.value)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Col>
  </Row>

  <Row className="mb-3 align-items-center justify-content-between w-100">
    <Col xs={6} md={5} className="text-start">
      <Form.Label>Show only free events?</Form.Label>
    </Col>
    <Col xs={6} md={5} className="d-flex justify-content-end">
      <ButtonGroup>
        {['Yes', 'No'].map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`free-${idx}`}
            type="radio"
            style={{
              backgroundColor: freeValue === radio ? "#7800ff" : "transparent",
              color: freeValue === radio ? "white" : "#7800ff",
              borderColor: "#7800ff",
              marginRight: '5px',
              width: '60px',
            }}
            name="free"
            value={radio}
            checked={freeValue === radio}
            onChange={(e) => setFreeValue(e.target.value)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Col>
  </Row>

  <Row className="mb-3 align-items-center justify-content-between w-100">
    <Col xs={6} md={5} className="text-start">
      <Form.Label className="mb-2" style={{ fontWeight: 'bold', fontFamily: "Subheading" }}>Virtual only</Form.Label>
      <p className="mb-0">Show only online events?</p>
    </Col>
    <Col xs={6} md={5} className="d-flex justify-content-end">
      <ButtonGroup>
        {['Yes', 'No'].map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`virtual-${idx}`}
            type="radio"
            style={{
              backgroundColor: virtualValue === radio ? "#7800ff" : "transparent",
              color: virtualValue === radio ? "white" : "#7800ff",
              borderColor: "#7800ff",
              marginRight: '5px',
              width: '60px',
            }}
            name="virtual"
            value={radio}
            checked={virtualValue === radio}
            onChange={(e) => setVirtualValue(e.target.value)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Col>
  </Row>
</Container>


    </Container>
  );
};

export default SideBar;
