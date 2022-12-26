import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import Login from './pages/Login';
// import Register from './pages/Register';
import Groups from './pages/Groups';
import Nav from './pages/Nav';
import './index.css';


const App =() => {

  return <div className='bg-lightgrey w-screen h-screen text-white'>
          <Nav />

          <Router>
              <Routes>
                  {/* <Route path="/" element={<Home/>}></Route> */}
                  <Route path="/Login" element ={<Login />}></Route>
                  {/*<Route path="/Register" element={<Register />}></Route>*/}
                  {/*<Route path="/" element={<Groups/>}></Route>*/}
                  </Routes>
          </Router>
      </div>
      

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
