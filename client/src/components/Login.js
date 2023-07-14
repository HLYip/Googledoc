import React from 'react'
import GoogleButton from 'react-google-button'
import {auth, googleProvider} from './../config/firebase'
import {onAuthStateChanged,signInWithPopup} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateUserData } from '../service/UserService' 

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(async (res) => {
        console.log(res.user)
        localStorage.setItem("userEmail", res.user.email);
        localStorage.setItem("username", res.user.displayName);
        // Update user data in Firestore
        await updateUserData(res.user);
      });
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      console.log(res);
      if(res){
        navigate('/home')
      } else {
        navigate('/')
      }
    })
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
      <GoogleButton onClick={signInWithGoogle}/>
    </div>
  )
}

export default Login