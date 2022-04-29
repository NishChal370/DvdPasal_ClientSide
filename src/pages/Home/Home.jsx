import React from 'react'
import './home.css'
import { Dashboard } from '../index'
import { NavCompassIcon } from '../../assets/images';


function Home() {

  const HandlerNavbarVisible=()=>{
    let nav= document.getElementById('side-nav');
  
    (nav.className.includes('hideSideNav'))
      ? nav.classList.replace('hideSideNav','showSideNav')
      : nav.classList.replace('showSideNav','hideSideNav')
  }

  return (
    <>
    <div style={{position: 'relative', cursor:'pointer'}}>
      {/* <button style={{zIndex:'1', position: 'absolute', position:'absolute', backgroundColor:'none'}} onClick={HandlerNavbarVisible}> <img src={NavCompassIcon} alt="" />  </button> */}
      <img style={{zIndex:'1', position: 'absolute', width:'4rem', left:'3%', marginTop:'2rem', position:'absolute', backgroundColor:'none'}} onClick={HandlerNavbarVisible} src={NavCompassIcon} alt="" />
      <label style={{zIndex:'1', position: 'absolute', width:'4rem', left:'3%', marginTop:'6rem', position:'absolute', backgroundColor:'none', color:'white'}} htmlFor="Navbar">Navigation</label>
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