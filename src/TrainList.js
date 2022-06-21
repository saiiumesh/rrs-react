import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TrainList() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://localhost:7281/api/Admin/gettraininfo")
            .then((result) => setData(result.data));
    }, [data]);
    const setTrainNumber = (tn) => {
        console.log(tn);
        localStorage.setItem("TrainNumber", tn);
    }
    function logout(){
        localStorage.removeItem("TrainNumber");
        localStorage.removeItem("PNR");
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserLogin");
        navigate("/");
      }
    return (
        <>
            <div >
                <div>
                    <h1>Available Trains</h1>
                </div>
                <div className="fleft">
                <button className='btn' onClick={()=>navigate('/TrainList')}>Book Ticket</button>
                <button className='btn' onClick={()=>navigate('/CancelTicket')}>Previous Ticket</button>
                <button className='btn' onClick={()=>logout()}>Logout</button>
                </div>
                <div className="row" style={{ margin: "10px" }}>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Train Number</th>
                            <th scope="col">Origin</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Arrival Time</th>
                            <th scope="col">Departure Time</th>
                            <th scope="col">Available Seats</th>
                            <th scope="col">Per Ticket Cost</th>
                            <th scope="col">Book Ticket</th>
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
                                    <td>
                                        <Link to='/UserReservation'>
                                            <button className="btn" onClick={() => setTrainNumber(item.TrainNumber)}>Book Ticket</button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TrainList