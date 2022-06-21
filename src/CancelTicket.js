import { React, useState, useEffect } from "react";
import axios from "axios";
import './CancelTicket.css';
import { useNavigate } from "react-router-dom";

function CancelTicket() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7281/api/UserReservation/userticket/${localStorage.getItem('UserName')}`)
            .then((result) => setData(result.data));
    }, [data]);
    function can(pnr,tn,not) {
        console.log(pnr);
        axios.delete("https://localhost:7281/api/UserReservation/cancelticket/" + pnr+"/"+tn+"/"+not)
            .then(function (response) {
                console.log(response);
                alert(response.data);
            }).catch(function (error) {
                console.log(error);
            });
    }
    function viewticket(pnr){
        localStorage.setItem("PNR",pnr);
        navigate('/ViewTicket');
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
                    <h1>Ticket Cancellation</h1>
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
                            <th scope="col">PNR</th>
                            <th scope="col">TrainNumber</th>
                            <th scope="col">JourneyDate</th>
                            <th scope="col">NumberOfTickets</th>
                            <th scope="col">Payment</th>
                            <th scope="col">TravelClass</th>
                            <th scope="col">View Ticket</th>
                            <th scope="col">Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item.TrainNumber}>
                                    <td>{item.PNR}</td>
                                    <td>{item.TrainNumber}</td>
                                    <td>{item.JourneyDate}</td>
                                    <td>{item.NumberOfTickets}</td>
                                    <td>{item.Payment}</td>
                                    <td>{item.TravelClass}</td>
                                    <td><button className='btn' onClick={()=>viewticket(item.PNR)}>View Ticket</button></td>
                                    <td><button className='btn' onClick={() => can(item.PNR,item.TrainNumber,item.NumberOfTickets)}>Cancel</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CancelTicket