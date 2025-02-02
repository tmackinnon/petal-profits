import React, { useRef, useEffect } from 'react';
import './App.scss';
import logo from './petalprofit.png';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Budget from './components/Budget';
import Home from './components/Home';
import Garden from './components/Garden';
import Account from './components/Account';
import TransactionsProvider from './hooks/TransactionsProvider';


export default function App(props){

    return (
      <BrowserRouter>
      <div className="App">

        <nav className="navBar">
          <span className="logo">
            <img src={logo} alt="Petal Profits" />
          </span>
          <div className='navBar-items'>
          <div className="navButton">
              <Link to="/">HOME</Link>
          </div>
          <div className="navButton">
            <Link to="/transactions">MY BUDGET</Link>
          </div>
          <div className="navButton">
            <Link to="/garden">MY GARDEN</Link>
          </div>
          {/* <div className="navButton">
            <Link to="/account">MY ACCOUNT</Link>
          </div> */}
          </div>
        </nav>

      <TransactionsProvider>
      <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path='/transactions' Component={Budget}/>
        <Route path='/garden' Component={Garden}/>
        <Route path='/account' Component={Account}/>
      </Routes>
      </TransactionsProvider>

      </div>
      </BrowserRouter>
    )
};
