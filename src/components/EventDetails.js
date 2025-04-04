import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // import calendar css
import '../styles/Event.css'
import { format } from 'date-fns';
import badminton from '../assets/images/badminton.jpg'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
//import cross from '../assets/images/cross.png'
//import tick from '../assets/images/Tick.png'
//import location from '../assets/images/Location.png'
import EventTabs from './EventDetails/EventTabs';
import "bootstrap-icons/font/bootstrap-icons.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Modal } from 'react-bootstrap';

const cross = '/cross.png';
const tick = '/Tick.png'
const location = '/Location.png'

const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(false);
  const [eventDates,setEventDates] = useState([])
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ email: '', phone: '' });

  useEffect(() => {
    setLoading(true)
    fetch(`https://api-test.findmyfacility.com/v1/events/${id}/details/slots`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetching details');
        }
        return res.json();
      })
      .then(data => {
        setEventDetails(data);
      })
      .catch(error => console.error(error))
      .finally(()=>setLoading(false));

  }, [id]);

  useEffect(()=>{

    console.log("Event details use Effect call")
    if(eventDetails){
      const dates = eventDetails.eventSlots.map(slot => slot.startDate.substring(0, 10));
      setEventDates(dates)
    }

    if (eventDetails?.eventSlots) {
      handleDaySelect(new Date());
    }

  },[eventDetails])

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  const isEventDate = (date) => {
    const formattedDate = formatDate(date); 
    return eventDates.includes(formattedDate);
  };
  
  const handleDateChange = (date) => {

    setDate(date);
  };

  const handleTimeSelect = (event) => {
    setSelectedTime(!selectedTime);
  };

  const handleDaySelect = (selectedDate) =>{
    setSelectedTime(false);

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');


    const slots = eventDetails.eventSlots

    const filteredTime=slots.filter((date2) => date2.startDate.includes(formattedDate) && date2.endDate.includes(formattedDate));


    const formattedTimeSlots = filteredTime.map(time => {
      const start = new Date(time.startDate);
      const end = new Date(time.endDate);
      const startTime = `${start.getUTCHours().toString().padStart(2, '0')}:${start.getUTCMinutes().toString().padStart(2, '0')}`;
      const endTime = `${end.getUTCHours().toString().padStart(2, '0')}:${end.getUTCMinutes().toString().padStart(2, '0')}`;
      //return `${startTime} - ${endTime}`;
      return {time:`${startTime} - ${endTime}`,duration : time.duration , price : time.price,checkoutUrl: time.checkoutUrl ,organiserPhone:time.organiserPhone,organiserEmail:time.organiserEmail}
    });
    setTimeSlots(formattedTimeSlots)

  }

  const handleOpenDialog = (email, phone) => {
    setDialogData({ email, phone });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderBookTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Book Now
    </Tooltip>
  );

  const renderContactTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Contact
    </Tooltip>
  );

  return (
    loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    ) : (
      eventDetails ? (
        <>
          {/* Full-Width Header with Image */}
          <div className='image-container'>
            <img
              src={eventDetails.eventDetails.photoUrl ? eventDetails.eventDetails.photoUrl[0] : badminton}
              alt="Event"
              className="event-image"
            />
            <h1 className="event-heading">{eventDetails.eventDetails.organiserName}</h1>
          </div>
  
          <Container className="event-page" style={{ height: '100%', minHeight: '100vh', maxHeight: '100vh' }}>
            <Row className="g-4"> {/* 'g-4' adds gutter (spacing) between columns */}
              {/* About the Facility Section (Left) */}
              <Col md={8} className="about-venue d-flex flex-column justify-content-between">
                {/* First Section (Top) */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', textAlign: 'left', flexGrow: '0' }}>
                    <img
                      src={eventDetails.eventDetails.isCoached ? tick : cross}
                      alt="Event"
                      width="15"
                      height="15"
                      className="cross-image"
                    />
                    <p style={{ marginLeft: '10px'}}><strong>Coached activity?</strong></p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', textAlign: 'left', flexGrow: '0' }}>
                    <img
                      src={eventDetails.eventDetails.membershipRequired ? tick : cross}
                      alt="Event"
                      width="15"
                      height="15"
                      className="cross-image"
                    />
                    <p style={{ marginLeft: '10px' }}> <strong>Membership required?</strong></p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', textAlign: 'left', flexGrow: '0' }}>
                  <img
                      src={location}
                      alt="Event"
                      width="15"
                      height="15"
                      className="cross-image"
                    />
                    
                    
                    <p style={{ marginLeft: '10px' }}><strong>{eventDetails.eventDetails.organiserName}</strong></p>
                  </div>
              </div>

                {/* Middle Section (Center) */}
                <div style={{ textAlign: 'left', flexGrow: '0', marginBottom: '20px', marginTop: '15px' }}>
                  <h2 style={{ fontFamily: "'Subheading', serif" }}>About the Activity</h2>
                  <p>{eventDetails.eventDetails.organiserDescription}</p>
                </div>
  
                {/* Last Section (Bottom) */}
                <div className="contact-details" style={{ textAlign: 'left', border: '1px solid #7800ff', padding: '20px', marginTop: 'auto' }}>
                    <Row className="my-4 details-section">
                        <EventTabs data={eventDetails}/>
                    </Row>
                </div>

              </Col>
  
              {/* Booking Section (Right) */}
              <Col md={4}>
                <Row className="book-section" style={{ backgroundColor: '#7E42F5', padding: '20px', borderRadius: '8px', color: 'white' }}>
                  <h2>Book Now</h2>
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    onClickDay={handleDaySelect}
                    tileContent={({ date, view }) => {
                      if (view === 'month' && isEventDate(date)) {
                        return (
                          <div className="event-dot">
                            {/* This adds a small dot below the date */}
                            <span style={{
                              display: 'block',
                              marginTop: '2px',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#7800ff',
                              margin: '0 auto'
                            }}></span>
                          </div>
                        );
                      }
                      return null;
                    }}
                    className="mb-4 calendar-custom"
                  />
  
                  <div className="time-slots">
                    {timeSlots && timeSlots.length > 0 ? (
                      timeSlots.map((time, index) => (
                        <>
                        <Button
                          key={index}
                          variant={selectedTime ? 'primary' : 'outline-primary'}
                          onClick={handleTimeSelect}
                          className="time-slot mb-2"
                          style={{ backgroundColor: 'white', color: '#7E42F5', borderColor: '#7E42F5', fontSize: '12px' }}
                        >
                          <span style={{ marginRight: '10px' }}>{time.time}</span>
                          <span style={{ marginRight: '10px' }}>£{(time.price % 1 === 0) ? time.price : time.price.toFixed(2)}</span>
                          <span>{time.duration}</span>
                        </Button>
                        
                        {time.checkoutUrl!=="" ?
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderBookTooltip}
                        >
                          <i class="bi bi-journal-plus h1" style={{cursor:"pointer"}} 
                          onClick={()=>{
                            window.open(time.checkoutUrl,'_blank')}}></i>
                        </OverlayTrigger> : 
                        <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderContactTooltip}
                      >
                        <i class="bi bi-envelope h1" style={{cursor:"pointer"}} 
                        onClick={() => handleOpenDialog(time.organiserEmail, time.organiserPhone)}></i>
                      </OverlayTrigger>
                      
                      }

                        {/*
                        <Button className="mt-3" style={{ backgroundColor: 'white', color: '#7E42F5', width: '100%' }}>
                        Book now
                        </Button>
                        */}
                        </>
                      ))

                      
                    ) : (
                      <h4>No slots for this day</h4>
                    )}


                    <Modal show={open} onHide={handleCloseDialog} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Contact Information</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div style={{ marginBottom: '10px' }}>
                          <strong>Email:</strong> {dialogData.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {dialogData.phone}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="mt-3" style={{ backgroundColor: 'white', color: '#7E42F5', width: '100%' }} onClick={handleCloseDialog}>
                          Close
                        </Button>
                      </Modal.Footer>
                      </Modal>
                  </div>
                </Row>

                <Row className="mt-4">
                <p><strong>Please Note</strong>: Open data only contains sessions that occur in the next 2 weeks on a rolling basis. Please check back again for future sessions.</p>
              </Row>

              <Row className="mt-4">
                <Card style={{ border: 'none', marginBottom: '10px' }}>
                  <Card.Body>
                  <Card.Title style={{ fontFamily: "'Subheading', serif",textAlign:"center" }}>Add your activity</Card.Title>
                    <Card.Text>Do you have one or more activities to promote? Add yours now.</Card.Text>
                    <Button
                      style={{ backgroundColor: "#7800ff" }}
                      onClick={() => window.location.href = 'https://www.findmyfacility.com/facility-signup'}
                    >
                      Add activity
                    </Button>
                  </Card.Body>
                </Card>

                <Card style={{ border: 'none' }}>
                  <Card.Body>
                    <Card.Title style={{ fontFamily: "'Subheading', serif",textAlign:"center" }}>Claim this listing</Card.Title>
                    <Card.Text>Is this your business? Claim it now to update and edit all details.</Card.Text>
                    <Button
                      style={{ backgroundColor: "#7800ff" }}
                      onClick={() => window.location.href = 'https://www.findmyfacility.com/claim-this-page'}
                    >
                      Claim now
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <h1>No data to show</h1>
      )
    )
  );
}  

export default EventDetails;


