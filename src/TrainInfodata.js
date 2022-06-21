import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './TrainInfotable.css';
import Axios from "axios";

const Navigation = () => {
  function logout() {
    localStorage.removeItem("TrainNumber");
    localStorage.removeItem("PNR");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("AdminLogin");
    localStorage.removeItem("AdminName");
    navigate("/")
  }

  const navigate = useNavigate();
  if (localStorage.getItem('AdminLogin')) {
    return (
      <>
        <p>
          <button className="btn" onClick={() => navigate("/AdminOps")}>
            Admin Operation
          </button>
          <button className="btn" onClick={() => logout()}>Logout</button>
        </p>
      </>
    )
  } if (localStorage.getItem('UserLogin')) {
    return (
      <>
        <p>
          <button className='btn' onClick={() => navigate('/TrainList')}>Book Ticket</button>
          <button className='btn' onClick={() => navigate('/CancelTicket')}>Previous Ticket</button>
          <button className='btn' onClick={() => logout()}>Logout</button>
        </p>
      </>
    )
  } else {
    return (
      <>
        <p>
          <button className="btn" onClick={() => navigate("/AdminLoginPage")}>
            Admin Login
          </button>
          <button className="btn" onClick={() => navigate("/UserRegistration")}>
            Register
          </button>
          <button className="btn" onClick={() => navigate("/UserLogin")}>User Login</button>
        </p>
      </>
    )
  }
}

function TrainInfodata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("https://localhost:7281/api/Admin/gettraininfo").then((result) =>
      setData(result.data)
    );
    console.log(data);
  }, [data]);
  const navigate = useNavigate();


  return (
    <div className="info">
      <div>
        <div className="container" />
        <div className="hdrdiv"><h1 className="heading">CG TRAINS</h1></div>
        <div>
          <Navigation />
        </div>
        <div>
          <div className="row" style={{ margin: "10px" }}>
          </div>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Train Number</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Available Seats</th>
                <th scope="col">Per Ticket Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.TrainNumber}>
                    <td>{item.TrainNumber}</td>
                    <td>{item.Origin}</td>
                    <td>{item.Destination}</td>
                    <td>{item.ArrivalTime}</td>
                    <td>{item.DepartureTime}</td>
                    <td>{item.NumberOfSeats}</td>
                    <td>{item.TicketCost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TrainInfodata;
