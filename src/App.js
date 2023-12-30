import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { useState} from 'react'
import NavBar from './component/NavBar';
import News from './component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



const  App =()=> {
  const pageSize=5;
  
  const [progress,setProgress]=useState(0)

    return (
      <div>
      <LoadingBar
      height={4}
        color='#f11946'
        progress={progress}
      />
        <Router>
        <NavBar /> 
        {/* <News pagesize={pageSize} country="in" category='general'/>   */}
        <Routes>

          <Route path="/" element={<News  setProgress={setProgress} key="general" pagesize={pageSize} country="in" category="general" />} />
          <Route path="/business" element={<News setProgress={setProgress} key="business" pagesize={pageSize} country="in" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} pagesize={pageSize} country="in" category='entertainment'/>}/>
          <Route path="/health" element={<News setProgress={setProgress} pagesize={pageSize} country="in" category='health'/>}/>
          <Route path="/science" element={<News setProgress={setProgress} pagesize={pageSize} country="in" category='science'/>}/>
          <Route path="/sports" element={<News setProgress={setProgress} pagesize={pageSize} country="in" category='sports'/>}/>
          <Route path="/technology" element={<News setProgress={setProgress} pagesize={pageSize} country="in" category='technology'/>}/>
        </Routes>

        </Router>
      </div>
    )
  }

export default App