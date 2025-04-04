import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import badminton from '../../assets/images/badminton.jpg'
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import EventPagination from "./EventPagination"
import Spinner from 'react-bootstrap/Spinner';
import '../../App.css' ;
import { useNotification } from '../../contexts/NotificationProvider';

const Events= ({details,updateFilters, cardsPerRow,setSportNr,setClassNr,loading,setLoading}) => {

  const { type, isBookable ,geo_radial, sportNr, classNr, limit, page,activityTypes,age_lte, age_gte, priceAdult_lte, gender,output,radius } = details;
  const [output2,setOutput2] = useState(output)
  const navigate = useNavigate();
  const {notify} = useNotification();


  const handleClick = (id)=>{

    navigate(`/home/event/${id}`)

}
  useEffect(()=>{
    const queryParams = new URLSearchParams({
      type,
      isBookable : isBookable.toString(),
      sportNr: sportNr.toString(),
      classNr: classNr.toString(),
      geo_radial: geo_radial,
      limit : limit.toString(),
      page : page.toString(),
      });

    if(priceAdult_lte){
      queryParams.append('priceAdult_lte',priceAdult_lte.toString())
    }

    //if(age_lte){
    //  queryParams.append('age_lte',age_lte.toString())
    //}

    //if(age_gte){
    //  queryParams.append('age_gte',age_gte.toString())
    //}

    if(gender){
      queryParams.append('gender',gender.toString())
    }

    if (Array.isArray(activityTypes)) {
      const activityParams = activityTypes.map((items) => {
        if (items.split(' ').length > 1) {
          return items.split(' ').join('%20');
        }
        return items;
      });

      const activityParamString = activityParams.join(',');
      queryParams.append('activityTypes', activityParamString);
      console.log(activityParamString, "Params");
    }

    var url ;
    if(page>1){
      const newQueryParams=new URLSearchParams({
        geo_radial: geo_radial,
        limit : limit.toString(),
        page : page.toString(),
        });
      url = `https://api-test.findmyfacility.com/v1/testEvents?${newQueryParams}`
    }
    else{
      url =`https://api-test.findmyfacility.com/v1/events?${queryParams}`
    }
    //const url =`https://api-test.findmyfacility.com/v1/events?${queryParams}`
    //const egurl ='https://api-test.findmyfacility.com/v1/events?isBookable=false&geo_radial=51.511848%2C-0.110344%2C5&limit=10&page=1&sportNr=0&classNr=0'
    setLoading(true)
    fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
        .then(res => {
          if (!res.ok) {
            // If the response is not OK, throw an error with the status text
            throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then(data => {
          // Process the received data
          setOutput2(data.events);
          //setSportNr(data.sportNr);
          //setClassNr(data.classNr);
        })
        .catch(error => {
          // Handle both HTTP and network errors
          console.error('An error occurred:', error.message);
          alert('Invalid location or no location entered');

          // Optional: Set a state to indicate an error has occurred
          // setError(true);
        }).finally(()=>setLoading(false));


  },[type,geo_radial,limit,page,priceAdult_lte,gender,activityTypes])

  useEffect(() => {
    updateFilters({ output2 });
  }, [output2]);

  function increaseRadius(event){
    updateFilters(
      {location :
        {radius : parseInt(event.target.value),
        latitude : geo_radial.split(',')[0] , 
        longitude : geo_radial.split(',')[1]}
      })
  }
  
  return (
<>
  {loading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" />
    </div>
  ) : output2.length > 0 ? (
    <div>
      <Row className="g-4 mt-2">
        {output2.map((events) => (
          <Col key={events.id} xs={12} md={cardsPerRow === 1 ? 12 : 6}>
            <Card onClick={() => handleClick(events.id)} className="card">
              <div className="card-image-wrapper">
                <Card.Img
                  variant="top"
                  src={events.imageUrl && events.imageUrl.length > 0 ? events.imageUrl[0] : badminton}
                  className="card-image"
                />
              </div>
              <Card.Body className="card-body">
                {/* Title and Price */}
                <div className="d-flex justify-content-between card-row">
                  <Card.Title className="card-title">{events.name}</Card.Title>
                  <Card.Text className="card-price">£{events.price.toFixed(2)}</Card.Text>
                </div>

                {/* Provider and Distance */}
                <div className="d-flex justify-content-between card-row">
                  <Card.Text className="card-provider">{events.providerName}</Card.Text>
                  <Card.Text className="card-distance">
                    {events.distance ? `${events.distance} miles` : ''}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <EventPagination page={page} updateFilters={updateFilters} />
      </div>
    </div>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h2>No Results found within {radius} miles</h2>
      <button
        onClick={increaseRadius}
        value={parseInt(radius) + 5}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#7800ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Click here to show results within {parseInt(radius) + 5} miles
      </button>
    </div>
  )}
</>



  )
  };


export default Events;