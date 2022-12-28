import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,useLocation  } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Group from './pages/Group';
import TimeTracker from './pages/TimeTracker';
import Nav from './pages/Nav';
import './index.css';
import { ModalProvider } from "./containers/Modal";
const App =() => {
  function getPage(elem){
    return <div className='relative w-full h-[calc(100%-50px)] flex flex-row'> 
      <div className='w-[250px] h-full  '></div>
      <div className='w-[calc(100%-250px)] h-full bg-gray-gainsboro rounded-tl-[30px]'>
      {elem}
      </div>
      </div>
  }
  function getLR(elem){
    return <div className='bg-gray-gainsboro'>{elem}</div>
  }
  return <div className='app bg-gray-silver w-screen h-screen flex flex-col'>
         <ModalProvider>
          {/* <div className='w-screen'><Nav /></div>  */}
          <Router>
            <div className='w-full'><Nav /></div> 
           
            <Routes>
              {/* <Route path="/" element={<Home/>}></Route> */}
              <Route path="/Login" element ={<Login />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="/Groups" element={getPage(<Groups/>)}></Route>
              <Route path="/Groups/:groupId" element={getPage(<Group/>)}></Route>
              <Route path="/TimeTracker" element={getPage(<TimeTracker/>)}></Route>
            </Routes>
          </Router>
          </ModalProvider>
      </div>
      

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
