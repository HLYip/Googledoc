import React from 'react'
import './Home.css'
import {auth} from './../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const logout = async () => {
        try{
            await signOut(auth);
            console.log("signed out ")
            alert("succesfully logged out")
            navigate('/')

        }catch(err){
            console.error(err)
        }
    };


  return (
    <div className='logout-ctn'>
      <button onClick={logout} className="logout-btn">Log out</button>
      </div>
  )
}

export default Logout