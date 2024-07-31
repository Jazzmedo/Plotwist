
import React, { Component} from 'react'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './components/Home/style.css';
import './main.css';
import './components/Episode/epi.css';
import './components/Home/style.css';
import './components/Item/item.css';
import './components/Season/season.css';
import './components/navbar/navbar.css';
import './components/people/people.css';
import './components/Episode/epi.css';
import Navbar from './components/navbar/Navbar';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }
}


