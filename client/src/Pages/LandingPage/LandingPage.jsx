import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./LandingPage.css"

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className='landing--page'>
      <div className="navbar">
        <span className='title'>PawDopt</span>
      </div>
      <div className="container">
        <h3>Adopt,<br /> Dont Shop.</h3>
        <h5>We will help you find a new home for you beloved pet. <br />
        Or look for a new one. Or both.</h5>

        <span className="btn-container">
            <button className='btn' onClick={() => navigate('/login')} >Adopt Now</button>
            <button className='btn'>Explore</button>
        </span>
      </div>
      <footer>
      Image by <a href="https://www.freepik.com/free-vector/adopt-pet-concept_7912232.htm#query=dog%20adopt%20flat%20illustration&position=3&from_view=search&track=ais">Freepik</a>
      </footer>
    </div>
  )
}

export default LandingPage
