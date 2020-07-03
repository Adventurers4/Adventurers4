import React from 'react';
import Login from './Login.js';
import Signup from "./Signup.js";
import Note from "./Note.js";
import Home from "./Home.js";
import './App.css';
// import ReactDOM from 'react-dom'; 
// import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   {/* <Login/>
    //   <Route path="/Login" component={Login} /> */}
    //   <HashRouter>
    //     <div>
    //       <h1>Notes App</h1>
    //       <nav>
    //       <ul>
    //         <li><NavLink to="/">Home</NavLink></li>
    //         <li><NavLink to="/login">Login</NavLink></li>
    //         <li><NavLink to="/Signup">Signup</NavLink></li>
    //         {/* <li><NavLink to="/Note">Note</NavLink></li> */}
    //       </ul>
    //       </nav>
    //       <div className="content">
    //         <Route exact path="/" component={Home} />
    //         <Route path="/login" component={Login} />
    //         <Route path="/Signup" component={Signup} />
    //         <Route path="/Note" component={Note} />
    //       </div>
    //     </div>
    //   </HashRouter>



    // </div>

    <div className="App" >
      {/* <Login/>
      <Route path="/Login" component={Login} /> */}
      <HashRouter>
        <div>
          <header>
            <h1 >Notes App </h1>
            <nav>
              <ul >
                <li ><NavLink to="/">Home</NavLink></li>
                <li ><NavLink to="/login">Login</NavLink></li>
                <li ><NavLink to="/Signup">Signup</NavLink></li>
                {/* <li><NavLink to="/Note">Note</NavLink></li> */}
              </ul>
            </nav>
          </header>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Note" component={Note} />
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
