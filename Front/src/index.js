import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,useLocation  } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Group from './pages/Group';
import TimeTracker from './pages/TimeTracker';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Nav from './pages/Nav';
import Menu from './pages/Menu';
import Home from './pages/Home';
import './index.css';
import { ModalProvider } from "./containers/Modal";

const App =() => {
  function getPage(elem){
    return <div className='relative w-full h-[calc(100%-50px)] flex flex-row' style={{zoom: "80%"}}> 
      <div className='w-[250px] h-full flex '>{<Menu />}</div>
      <div className='w-[calc(100%-250px)] h-full bg-grey-circle rounded-tl-[30px]'>
      {elem}
      </div>
      </div>
  }
  function getLR(elem){
    return <div className='bg-grey-circle'>{elem}</div>
  }
  return <div className='app w-screen h-screen bg-gray-silver flex flex-col'>
         <ModalProvider>
          {/* <div className='w-screen'><Nav /></div>  */}
          <Router>
            <div className='w-full'><Nav /></div> 
           
            <Routes>
              <Route path="/" element={
                localStorage.getItem("userEmail") === "" ? 
                    getLR(<Login />)
                    :
                    getPage(<TimeTracker/>)
                }></Route>
              <Route path="/Login" element ={getLR(<Login />)}></Route>
              <Route path="/Register" element={getLR(<Register />)}></Route>
              <Route path="/Groups" element={getPage(<Groups/>)}></Route>
              <Route path="/Groups/:groupId" element={getPage(<Group/>)}></Route>
              <Route path="/TimeTracker" element={getPage(<TimeTracker/>)}></Route>
              <Route path="/Projects" element={getPage(<Projects/>)}></Route>
              <Route path="/Projects/:projectId" element={getPage(<Project/>)}></Route>

            </Routes>
          </Router>
          </ModalProvider>
      </div>
      

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
