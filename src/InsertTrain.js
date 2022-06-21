import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InsertTrain() {
  let navigate = useNavigate();
  const [TrainNumber, setTrainNumber] = useState('');
  const [Origin, setOrigin] = useState('');
  const [Destination, setDestination] = useState('');
  const [DepartureTime, setDepartureTime] = useState('');
  const [ArrivalTime, setArrivalTime] = useState('');
  const [NumberOfSeats, setNumberOfSeats] = useState('');
  const [TicketCost, setTicketCost] = useState('');

  async function Submit(e) {
    const out = {
      "TrainNumber": TrainNumber,
      "Origin": Origin.toUpperCase(),
      "Destination": Destination.toUpperCase(),
      "DepartureTime": DepartureTime,
      "ArrivalTime": ArrivalTime,
      "NumberOfSeats": NumberOfSeats,
      "TicketCost": TicketCost
    };
    console.log(out);
    axios.post('https://localhost:7281/api/Admin/Posttrain', out)
      .then(function (response) {
        console.log(response.data);
        navigate('/AdminOps')
      })

      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  }
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  return (
    <>
      <div className='Login'>
        <div>

        </div>
        <div className="midcontainer">
          <form className='Userform'>
            <h1>ADD TRAIN</h1>
            <label id="fn">Train Number</label>
            <input required type="number" onChange={event => setTrainNumber(event.target.value)}></input>
            <label>Origin</label>
            <input required type="text" onChange={event => setOrigin(event.target.value)}></input>
            <label>Destination</label>
            <input required type="text" onChange={event => setDestination(event.target.value)}></input>
            <label>Departure Time</label>
            <input required type="datetime-local" min={date.slice(6,)+"-"+date.slice(3,5)+"-"+date.slice(0,2)+"T"+time.slice(0,5)} onChange={event => setDepartureTime(event.target.value)}></input>
            <label>Arrival Time</label>
            <input required type="datetime-local" min={(DepartureTime)} disabled={(DepartureTime.length) ? false : true} onChange={event => setArrivalTime(event.target.value)}></input>
            <label>Available Seats</label>
            <input required type="number" onChange={event => setNumberOfSeats(event.target.value)}></input>
            <label>Ticket Cost</label>
            <input required type="number" onChange={event => setTicketCost(event.target.value)}></input>
            <br />
            <button className="btn" disabled={((TrainNumber.length) && (Origin.length)
              && (Destination.length) && (DepartureTime.length) && (ArrivalTime.length)
              && (NumberOfSeats.length) && (TicketCost.length)) ? false : true} onClick={(e) => Submit(e)}>Add Train</button>
            <br /><br />
          </form><br /><br />

        </div>
      </div>
    </>
  );
}

export default InsertTrain;
