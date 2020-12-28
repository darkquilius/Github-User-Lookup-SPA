import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import {useGlobalContext } from '../context/context';
const Dashboard = () => {
  const {isLoading} = useGlobalContext();

  if(isLoading){
    return(
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="loading" />
      </main>
    )
  }

  else{
    return(
      <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    )
  }
};

export default Dashboard;
