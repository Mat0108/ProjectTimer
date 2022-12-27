import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import Login from './pages/Login';
// import Register from './pages/Register';
import Groups from './pages/Groups';
import Group from './pages/Group';
import Nav from './pages/Nav';
import './index.css';


const App =() => {

  return <div className='bg-lightgrey w-screen h-screen text-white flex flex-col'>
         
          {/* <div className='w-screen'><Nav /></div>  */}
          <Router>
            <div className='w-full'><Nav /></div> 
            <div className='w-full h-full flex flex-row'> 
               
              <div className='w-[250px] h-full bg-lightgrey'></div>
              <div className='w-full h-full '>
                <Routes>
                  {/* <Route path="/" element={<Home/>}></Route> */}
                  <Route path="/Login" element ={<Login />}></Route>
                  {/*<Route path="/Register" element={<Register />}></Route>*/}

                  <Route path="/Groups" element={<Groups/>}></Route>
                  <Route path="/Groups/:groupId" element={<Group/>}></Route>
                </Routes>
              </div>
            </div>
           
              
          </Router>
      </div>
      

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
