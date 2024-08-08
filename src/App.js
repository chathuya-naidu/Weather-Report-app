import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TravelWeather from "./components/TravelWeather";
import FarmerWeather from "./components/FarmerWeather";
import EventWeather from "./components/EventWeather";



function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/farmerweather" element={<FarmerWeather/>} />
          <Route path="/travelweather" element={<TravelWeather/>} />
          <Route path="/eventweather" element={<EventWeather/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;