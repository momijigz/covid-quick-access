import React,{useState} from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import './sidebar.styles.css';
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

function App() {

  let [sidebarStatus, setSidebarStatus] = useState({ sidebarOpen: false });

  function onSetSidebarOpen(open) {
    setSidebarStatus(sidebarStatus = { sidebarOpen: open });
  }

  const sidebarContent = () => {
    return (
      <div className="sidebar-container">
        <div className="container p-4 bg-light sidebar-cont text-center">
        <i style={{fontSize: '5em'}} className="fas fa-map-marked-alt sidebar-icon"></i>
        </div>
        <div className="pl-5 pr-5 pt-3">
        <button className="btn btn-danger t-font font-weight-bold w-100">PANIC</button>
        </div>
        <hr className="sidebar-divider" />
        <div className="pl-5 pr-5">
          <NavLink activeClassName='is-active' className="sidebar-font" to="/nearby">
          <i className="fas fa-map-marked-alt sidebar-icon"></i>
            <span className="ml-3"><b>NEARBY HELP</b></span>
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
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Sidebar
          sidebar={sidebarContent()}
          open={sidebarStatus.sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          styles={{ sidebar: { background: "#32383D", color: 'white' } }}
        >
          <nav className="navbar navbar-dark bg-dark">
            <button onClick={() => onSetSidebarOpen(true)} className="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
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
          </Switch>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
