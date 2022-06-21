import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TrainInfodata from "./TrainInfodata";
import AdminLoginPage from "./AdminLoginPage";
import UserRegistration from "./UserRegistration";
import AdminOps from "./AdminOps";
import UserOperations from "./UserOperations";
import UserLogin from "./UserLogin";
import UserReservation from "./UserReservation";
import InsertTrain from "./InsertTrain";
import UpdateTrain from "./UpdateTrain";
import CancelTicket from "./CancelTicket";
import Ticket from "./Ticket";
import TrainList from "./TrainList";
import './Login.css';
import ViewTicket from "./ViewTicket";


const App = () => {
  
  return (
    <div className="middlecontent">
      <div >
      <Router>
        <Routes>
          <Route path="/" element={<TrainInfodata />} />
          <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/AdminOps" element={<AdminOps />} />
          <Route path="/UserOperations" element={<UserOperations />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserReservation" element={<UserReservation />} />
          <Route path="/InsertTrain" element={<InsertTrain />} />
          <Route path="/UpdateTrain"element={<UpdateTrain/>}/>
          <Route path="/CancelTicket"element={<CancelTicket/>}/>
          <Route path="/Ticket"element={<Ticket/>}/>
          <Route path="/ViewTicket"element={<ViewTicket/>}/>
          <Route path="/TrainList"element={<TrainList/>}/>
        </Routes>
      </Router>
      </div>
    </div>
  );
};

export default App;
