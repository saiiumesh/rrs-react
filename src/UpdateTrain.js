// import './back.css';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css'
export default function Updatetrain() {
    const [Out, setOut] = useState([]);
    const [TrainNumber, setTrainNumber] = useState('');
    const [Origin, setOrigin] = useState('');
    const [Destination, setDestination] = useState('');
    const [DepartureTime, setDepartureTime] = useState('');
    const [ArrivalTime, setArrivalTime] = useState('');
    const [NumberOfSeats, setNumberOfSeats] = useState('');
    const [TicketCost, setTicketCost] = useState('');

    const navigate= new useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7281/api/TrainInfo/${localStorage.getItem('TrainNumber')}`)
            .then(function (response) {
                setOut(response.data[0]);
                setTrainNumber(response.data[0].TrainNumber);
                setOrigin(response.data[0].Origin);
                setDestination(response.data[0].Destination);
                setDepartureTime(response.data[0].DepartureTime);
                setArrivalTime(response.data[0].ArrivalTime);
                setNumberOfSeats(response.data[0].NumberOfSeats);
                setTicketCost(response.data[0].TicketCost);
                console.log(response.data);
            });
    }, []);

    function handleSubmit(e){

        const Data = {
            "TrainNumber":localStorage.getItem('TrainNumber'),
            "Origin": Origin.toUpperCase(),
            "Destination": Destination.toUpperCase(),
            "DepartureTime": DepartureTime,
            "ArrivalTime": ArrivalTime,
            "NumberOfSeats": NumberOfSeats,
            "TicketCost": TicketCost
        };
        console.log(Data);
        axios.put(`https://localhost:7281/api/Admin/Puttrain/${localStorage.getItem('TrainNumber')}`,Data)
            .then(function (response) {
                console.log(response.data);
                alert("Updated Successfully..");
                navigate('/AdminOps');
            }).catch(function(error){
                console.log(error);
            });
        e.preventDefault();
    }


    return (
        <div className='Login'>
            <form className='Userform' >
            <h1>UPDATE TRAIN</h1>
            <br/>
                <label id="fn">Train Number</label>
                <input required type="number" readOnly value={localStorage.getItem('TrainNumber')} ></input>
                <label>Origin</label>
                <input required type="text" defaultValue={Out.Origin} onChange={event => setOrigin(event.target.value)}></input>
                <label>Destination</label>
                <input required type="text" defaultValue={Out.Destination} onChange={event => setDestination(event.target.value)}></input>
                <label>Departure Time</label>
                <input required type="datetime-local" defaultValue={Out.DepartureTime} onChange={event => setDepartureTime(event.target.value)}></input>
                <label>Arrival Time</label>
                <input required type="datetime-local" min={(DepartureTime)} disabled={(DepartureTime.length)? false:true} defaultValue={Out.ArrivalTime} onChange={event => setArrivalTime(event.target.value)}></input>
                <label>Available Seats</label>
                <input required type="number" defaultValue={Out.NumberOfSeats} onChange={event => setNumberOfSeats(event.target.value)}></input>
                <label>Ticket Cost</label>
                <input required type="number" defaultValue={Out.TicketCost} onChange={event => setTicketCost(event.target.value)}></input>

                <button className="btn" onClick={(e)=>handleSubmit(e)}>Update</button>
            </form><br /><br />

        </div>
    )
}
