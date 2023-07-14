import React from 'react';
import './Home.css';
import Logout from './Logout';
import {addDocument} from './../service/DocService'
import DocList from './DocList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const user = localStorage.getItem("username")

  return (
    <div>
        <ToastContainer/>
      <Logout/>
      <div className='welcome'>
       {` Welcome ${user}`}
       </div>
      <DocList/>
    </div>
  );
};

export default Home;