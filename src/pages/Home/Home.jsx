import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './home.css'
// import SideNav from '../../components/SideNav/SideNav';
import { SideNav } from '../../components';
import { SlidingCard } from '../../components/Dashboard';
import { Cartoon, Cartoon3, Cartoon4, NavCompassIcon } from '../../assets/images';


function Home() {
  const location = useLocation().pathname;
  let topCoverImage = (location.includes('catelog')) ? Cartoon3 : (location.includes('members')) ? Cartoon : Cartoon4
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(localStorage.getItem('is_login'));

  const HandlerNavbarVisible = () => {
    let nav = document.getElementById('side-nav');

    let sideDiv = document.getElementById('nav-div');

    if (sideDiv.className.includes('side-nav-contents')) {
      sideDiv.classList.replace('side-nav-contents', 'side-nav-hidden-contents')
    }
    else {
      sideDiv.classList.replace('side-nav-hidden-contents', 'side-nav-contents')
    }

    (nav.className.includes('hideSideNav'))
      ? nav.classList.replace('hideSideNav', 'showSideNav')
      : nav.classList.replace('showSideNav', 'hideSideNav')



    // TODO Add ul animation.
  }

  const closeSideNav = () => {
    let nav = document.getElementById('side-nav');
    nav.classList.replace('showSideNav', 'hideSideNav');
  }

  const logoutHandler = () => {
    localStorage.clear();
    //move to dashboard
    navigate('/');
    setIsLogin(false);
    closeSideNav();
  }


  const changePageHandler = ({ target }) => {
    const { id } = target;

    if (id === 'login-button') {
      navigate('/login');
    }
  }


  return (
    <>
      {/* to open side nav */}
      {isLogin && (
        <div style={{ position: 'relative', cursor: 'pointer' }}  onClick={HandlerNavbarVisible}>
          <img style={{ zIndex: '1', position: 'absolute', width: '4rem', left: '3%', marginTop: '2rem', position: 'absolute', backgroundColor: 'none' }} src={NavCompassIcon} alt="" />
          <label style={{ zIndex: '1', position: 'absolute', width: '4rem', left: '3%', marginTop: '6rem', position: 'absolute', backgroundColor: 'none', color: 'white' }} htmlFor="Navbar">Navigation</label>
        </div>
      )}


      <div style={{ display: 'flex' }}>

        <SideNav HandlerNavbarVisible={HandlerNavbarVisible} />

        <div id='main' >
          <section className='top-img' style={{ backgroundImage: `url(${topCoverImage})` }}>
            <div>
              <span className='ps-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className='p-0 m-0 fs-3'>Ropey DvD Store</p>

                {(localStorage.getItem('is_login'))
                  ? (
                    <button id='login-button' onClick={logoutHandler}>Logout</button>
                  )
                  : (
                    <button id='login-button' onClick={changePageHandler}>Login</button>
                  )
                }

              </span>
            </div>
          </section>


          {(location === '/') && (
            <SlidingCard />
          )}


          {/* it handles nested routes */}
          <Outlet />

        </div>
      </div>
    </>
  )
}

export default Home