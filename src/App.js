import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Overview from './components/Map/Overview';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import EventDetails from './components/EventDetails';
import NotificationSnackbar from './components/NotificationSnackBar';
import { NotificationProvider } from './contexts/NotificationProvider';

function App() {

  const [type,setType] = useState('class')
  const [isBookable,setIsBookable] = useState(false)
  const [radius,setRadius] = useState(5)
  const [location,setLocation] =useState(`51.511848,-0.110344,${radius}`)
  const [sportNr,setSportNr] = useState(0)
  const [classNr,setClassNr] = useState(0)
  const [limit,setLimit] = useState(6)
  const [page,setPage] = useState(1)
  const [ageValue, setAgeValue] = useState('Child');
  const [freeValue, setFreeValue] = useState('');
  const [virtualValue, setVirtualValue] = useState('');
  const [minAgeValue, set_minAgeValue] = useState(0);
  const [maxAgeValue, set_maxAgeValue] = useState(100);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(48);
  const [maxDuration,setMaxDuration] = useState(0)
  const [maxPrice,setMaxPrice] = useState(250)
  const [gender,setGender] = useState('')
  const [difficulty,setDifficulty] = useState([])
  const [activityTypes,setActivityTypes] = useState([])
  const [output,setOutput] = useState([])
  const [loading,setLoading] = useState(false)
  

  const inputDetails = {
    type: type,
    isBookable : isBookable,
    geo_radial: location,
    sportNr: sportNr,
    classNr: classNr,
    limit: limit,
    page: page,
    activityTypes:activityTypes,
    radius : radius,
    //ageGroup: ageValue,
    //isFree: freeValue,
    //isVirtual: virtualValue,
    age_lte: minAgeValue,
    age_gte: maxAgeValue,
    //startTime: startTime,
    //endTime: endTime,
    priceAdult_lte: maxPrice,
    gender: gender,
    output : output
  };

  

  const updateFilters = (newFilters) => {

    if ('selectedsports' in newFilters) {
      const sportNames=newFilters.selectedsports.map((sport)=>{
        return sport.name
      })

      setActivityTypes(sportNames)
      //setActivityTypes(newFilters.selectedsports.name);
    }
    // Update location if latitude and longitude are present
    
    if ('latitude' in newFilters && 'longitude' in newFilters) {
      console.log("inside if")
      if (!newFilters.latitude || !newFilters.longitude) {
        console.log("inside if-if")
        setLocation('51.511848,-0.110344,5');
      }
      else { 
        console.log("inside if-else")
        setLocation(`${newFilters.latitude},${newFilters.longitude},5`);
      }
    }
    // else if (newFilters.latitude===' ' && newFilters.longitude===' '){
    //   setLocation(`51.511848,-0.110344,5`);
    // }
  
    // Update minAgeValue if present
    if ('minAgeValue' in newFilters) {
      set_minAgeValue(newFilters.minAgeValue);
    }
  
    // Update maxAgeValue if present
    if ('maxAgeValue' in newFilters) {
      set_maxAgeValue(newFilters.maxAgeValue);
    }
  
    // Update maxPrice if present
    if ('maxPrice' in newFilters) {
      setMaxPrice(newFilters.maxPrice);
    }

    if ('page' in newFilters){
      setPage(newFilters.page)
    }
  
    // Update gender if present
    if ('gender2' in newFilters) {
      setGender(newFilters.gender2);
    }

    if('output2' in newFilters){
      setOutput(newFilters.output2);
    }

    if('location' in newFilters){

      setRadius(newFilters.location.radius)
      setLocation(`${newFilters.location.latitude},${newFilters.location.longitude},${newFilters.location.radius}`);
    }
  };

  console.log(inputDetails)
  return (
    <NotificationProvider>
      <Router>
        <div className="App">
          <div className="content">
            <div className="header">
              <Header />
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    details={inputDetails}
                    updateFilters={updateFilters}
                    setSportNr={setSportNr}
                    setClassNr={setClassNr}
                    loading={loading}
                    setLoading={setLoading}
                  />
                }
              />
              <Route
                path="/home"
                element={
                  <Overview
                    details={inputDetails}
                    updateFilters={updateFilters}
                    setSportNr={setSportNr}
                    setClassNr={setClassNr}
                    loading={loading}
                    setLoading={setLoading}
                  />
                }
              />
              <Route path="/home/event/:id" element={<EventDetails />} />
            </Routes>
            {/* Snackbar outside of Routes to ensure it shows regardless of route */}
            <NotificationSnackbar />
          </div>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
