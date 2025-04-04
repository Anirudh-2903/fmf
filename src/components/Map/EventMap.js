import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map, Marker , AdvancedMarker , Pin , useMarkerRef, InfoWindow,useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import '../../styles/SampleMap.css'
import fmf from '../../assets/images/Findmyfacility_RGB_Portrait-Without_Text.png'
import Spinner from 'react-bootstrap/Spinner';
const EventMap = ({details,loading,setLoading}) => {


    const {output} = details

    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const [selectedMarker, setSelectedMarker] = React.useState(null);

    const coordinates=[
    { lat: 51.510848, lng: -0.110344 }, // South
    { lat: 51.511848, lng: -0.109344 }, // East
    { lat: 51.511848, lng: -0.111344 }, // West
    { lat: 51.512348, lng: -0.109844 }, // North-East
    { lat: 51.510348, lng: -0.109844 }, // South-East
    { lat: 51.510348, lng: -0.111844 }, // South-West
    // North-West
];

    const handleClick=()=>{

    }

    const handleMouseOver = (items) =>{

        setSelectedMarker(items)
        setInfoWindowShown(true)

    }

    const handleMouseOut = () =>{

        setSelectedMarker(null);
        setInfoWindowShown(false)

    }

    const mapStyles = [
        {
            "featureType": "road",
            "stylers": [
                { "visibility": "on" }
            ]
        }
        ]

        return (
            <>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <APIProvider apiKey="AIzaSyCjYemnQG_XW3JLmu3HifVheyWXFrFrjf4">
                  <Map
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: 51.511848, lng: -0.110344 }}
                    defaultZoom={15}
                    mapId="DEMO_MAP_ID"
                    //options ={{styles : mapStyles}}
                  >
                    {output.map((items, index) => {

                      if (!items.geo){
                          return null;
                      }
                      const position = {
                        lat: items.geo.latitude,
                        lng: items.geo.longitude
                      };

                      return (
                        <AdvancedMarker
                          key={items.id}
                          ref={markerRef}
                          position={position}
                          onClick={handleClick}
                        >
                          <img
                            src={fmf}
                            width={32}
                            height={32}
                            onMouseEnter={() => handleMouseOver(items)}
                            onMouseLeave={handleMouseOut}
                          />
                        </AdvancedMarker>
                      );
                    })}

          
                    {infoWindowShown && (
                      <InfoWindow anchor={marker} onClose={handleMouseOut}>
                      <div className="info-window-content">
                        <img
                          src={selectedMarker.imageUrl}
                          alt="sample image"
                          className="info-window-image"
                        />
                        <div className="bookable-badge">Bookable</div>
                        <div>
                          <h4 style={{ textAlign: "left" }}>{selectedMarker.name}</h4>
                          <p style={{ textAlign: "left" }}>{selectedMarker.providerName}</p>
                          <p style={{ textAlign: "left" }}>{selectedMarker.location}</p>
                        </div>
                      </div>
                    </InfoWindow>                    
                    )}
                  </Map>
                </APIProvider>
              )}
            </>
          );          
}

export default EventMap;
