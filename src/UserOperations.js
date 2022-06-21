import React from 'react'
import {useNavigate} from 'react-router-dom'

function UserOperations() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn" onClick={() => navigate('/UserReservation')}>Book Ticket</button>
            <br/>
            <button className="btn" onClick={() => navigate('/CancelTicket')}>Cancel Ticket</button>
            <br/>
            <a href='https://indianhelpline.com/INDIAN-RAILWAYS/' target="blank">help</a>
    </div>
  )
}

export default UserOperations
