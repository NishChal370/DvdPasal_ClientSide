import React from 'react'
import './home.css'
import { Dashboard } from '../index'


function Home() {

  const HandlerNavbarVisible=()=>{
    let nav= document.getElementById('side-nav');
  
    (nav.className.includes('hideSideNav'))
      ? nav.classList.replace('hideSideNav','showSideNav')
      : nav.classList.replace('showSideNav','hideSideNav')
  }

  return (
    <>
    <div style={{position: 'relative'}}>
      <button style={{zIndex:'1', position: 'absolute', position:'absolute'}} onClick={HandlerNavbarVisible}>open side bar</button>
    </div>
    
    <div style={{display: 'flex'}}>
      <nav id='side-nav' className= 'sideNav hideSideNav'>
        <button onClick={HandlerNavbarVisible}>CLICK</button>
        <p>Iam nav</p>
      </nav>

      <Dashboard/>
    </div>
    </>
  )
}

export default Home

/**<div style={{display: 'flex'}}>
      <nav id='side-nav' className= 'sideNav hideSideNav'>
        <button onClick={HandlerNavbarVisible}>CLICK</button>
        <p>Iam nav</p>
      </nav>
      
      <Dashboard HandlerNavbarVisible={HandlerNavbarVisible}/>
    </div> */