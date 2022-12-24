import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Register from './pages/Register';
import Group from './pages/Group';
const App =() => {

  return <>
      <RecoilRoot>{}

          <Router>
              <Routes>
                  <Route path="/" element={<Home/>}></Route>
                  <Route path="/Login" element ={<Login />}></Route>
                  <Route path="/Register" element={<Register />}></Route>
                  <Route path="/group/" element={<Category/>}></Route>
                  </Routes>
          </Router>
      </RecoilRoot>
      
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
