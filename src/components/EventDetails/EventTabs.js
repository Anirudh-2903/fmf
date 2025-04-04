import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
//import cross from '../../assets/images/cross.png'
//import tick from '../../assets/images/Tick.png'

const cross = '/cross.png';
const tick = '/Tick.png'

function EventTabs(props) {
  const [key, setKey] = useState('contact');

  return (
    <Tabs
      id="event-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3" 
      style={{ flexGrow: 0, minHeight: '50px', overflowY: 'auto', marginLeft: "20px" }}
      variant='underline'
    >
      <Tab eventKey="contact" title="Contact Info">
      <div style={{ minHeight: '80px', marginLeft:"20px" }}>
        <p>{props.data.eventDetails.organiserName}</p>
        <p>{props.data.eventDetails.organiserPhone}</p>
        <p>{props.data.eventDetails.address}</p>
      </div>
      </Tab>
      <Tab eventKey="amenities" title="Amenities">
        <div
          style={{ minHeight: '80px', marginLeft: "20px" }}
          className="selected-badges d-flex justify-content-center flex-wrap"
        >
          {props.data.eventDetails.amenityFeature ? (
            props.data.eventDetails.amenityFeature.map((element, index) => (
              <Stack key={index} gap={2}>
                <Badge bg="secondary" className="me-2 mb-2 text-wrap badge-auto-width">
                  {element.name} 
                  <img
                    src={element.value ? tick : cross}
                    alt="Img"
                    style={{width:"10px",height:"10px",marginLeft:"5px"}}
                  />
                </Badge>
              </Stack>
            ))
          ) : (
            <p>No amenities available</p>
          )}
        </div>
      </Tab>
    </Tabs>
  );
}

export default EventTabs;