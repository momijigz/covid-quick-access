import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import './sidebar.styles.css';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import HomeComponent from './components/home.component';
import NearbyCentersComponent from './components/nearby-centers.component';
import ImportantLinksComponent from './components/important-links.component';
import PanicComponent from './components/panic.component';
import SettingsComponent from './components/settings.component';

function App() {



  let [sidebarStatus, setSidebarStatus] = useState({ sidebarOpen: false });
  let [selectedArea, setSelectedArea] = useState({
    city: '',
    country: ''
  })



  function onSetSidebarOpen(open) {
    setSidebarStatus(sidebarStatus = { sidebarOpen: open });
  }

  useEffect(() => {
    if (localStorage.getItem('area')) {
      $('#initialSettingsModal').modal({ show: false });
    }
    else {
      $('#initialSettingsModal').modal({ show: true, backdrop: 'static', keyboard: false });
    }
  }, [])

  const ShowSettingsModal = () => {
    return (
      <div class="modal fade in" id="initialSettingsModal" tabindex="-1" role="dialog" aria-labelledby="initialSettingsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div style={{ backgroundColor: '#343A40' }} className="card-img-top text-center p-5">
              <span style={{ fontSize: '2em' }} className="text-white t-font"><strong>COVID<b className="t-color">QA</b></strong></span>
            </div>
            <div class="card-body">
              <h5 class="card-title">Welcome To COVID-QA</h5>
              <p class="card-text">Please select a country and its corresponding city to proceed.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const sidebarContent = () => {
    return (
      <div className="sidebar-container">
        <div className="container px-5 pt-5 pb-4 text-center">
          <span style={{ fontSize: '2em' }} className="text-white t-font"><strong>COVID<b className="t-color">QA</b></strong></span>
          <div style={{ fontSize: '0.65em', maxWidth: '15em' }} className="text-white t-font">
            QUICK ACCESS TO IMPORTANT RESOURCES
        </div>
        </div>

        <div className="pl-5 pr-5">
          <NavLink activeClassName='is-active-b' className="btn btn-danger t-font font-weight-bold w-100" to="/panic">PANIC</NavLink>
        </div>
        <hr className="sidebar-divider" />
        <div className="pl-5 pr-5">
          <NavLink activeClassName='is-active' className="sidebar-font" to="/nearby">
            <i className="fas fa-map-marked-alt sidebar-icon"></i>
            <span className="ml-3"><b>HELP NEARBY</b></span>
          </NavLink>
        </div>
        <hr className="sidebar-divider" />
        <div className="pl-5 pr-5">
          <NavLink activeClassName='is-active' exact={true} className="sidebar-font" to="/">
            <i className="fas fa-home sidebar-icon"></i>
            <span className="ml-3">Dashboard</span>
          </NavLink>
        </div>
        <hr className="sidebar-divider" />
        <div className="pl-5 pr-5">
          <NavLink activeClassName='is-active' className="sidebar-font" to="/imp-links">
            <i className="fas fa-exclamation-circle sidebar-icon"></i>
            <span className="ml-3">Important Links</span>
          </NavLink>
        </div>
        <hr className="sidebar-divider" />
        <div className="pl-5 pr-5">
          <NavLink activeClassName='is-active' className="sidebar-font" to="/settings">
            <i className="fas fa-cog sidebar-icon"></i>
            <span className="ml-3">Settings</span>
          </NavLink>
        </div>
        <div style={{ fontSize: '0.65em', color: 'gray' }} className="text-center mt-5">
          <div>Version 1.0.0</div>
          <div>Copyright 2020 - All Rights Reserved</div>
        </div>
      </div >
    )
  }

  return (
    <div className="App">
      <Router>
        <Sidebar
          sidebar={sidebarContent()}
          open={sidebarStatus.sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          styles={{
            sidebar: {
              color: 'white',
              backgroundColor: '#343A40'
            }
          }}
        >
          <nav className="navbar navbar-dark bg-dark">
            <button onClick={() => onSetSidebarOpen(true)} className="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <span className="text-white t-font"><strong>COVID<b className="t-color">QA</b></strong></span>
          </nav>
          <ShowSettingsModal />
          <Switch>
            <Route exact path="/">
              <HomeComponent />
            </Route>
            <Route path="/nearby">
              <NearbyCentersComponent />
            </Route>
            <Route path="/imp-links">
              <ImportantLinksComponent />
            </Route>
            <Route path="/panic">
              <PanicComponent />
            </Route>
            <Route path="/settings">
              <SettingsComponent />
            </Route>
          </Switch>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
