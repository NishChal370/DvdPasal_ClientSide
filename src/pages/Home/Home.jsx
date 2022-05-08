import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './home.css'
// import SideNav from '../../components/SideNav/SideNav';
import { SideNav } from '../../components';
import { SlidingCard } from '../../components/Dashboard';
import { app_banner, admin_banner, loan_banner, member_banner, catalog_banner, copy_banner, NavCompassIcon, dvd_banner } from '../../assets/images';
import { AXIOS } from '../../API/Constant';


function Home() {
  const location = useLocation().pathname;

  let topCoverImage = app_banner;

  const hasLocation = (place) => {
    if (location.includes(place)) {
      return location;
    }
  }

  console.log(location);

  const [titleName, setTitleName] = useState()

  switch (location) {
    case hasLocation("catelog"):
      topCoverImage = catalog_banner;
      break;
    case hasLocation("inventory"):
      topCoverImage = copy_banner;
      break;
    case hasLocation("dvd/"):
      topCoverImage = dvd_banner;
      break;
    case hasLocation("loan"):
      topCoverImage = loan_banner;
      break;
    case hasLocation("members"):
      topCoverImage = member_banner;
      break;
    case hasLocation("setting"):
    case hasLocation("admin"):
      topCoverImage = admin_banner;
      break;
    default:
      topCoverImage = app_banner;
  }

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
  }

  const closeSideNav = () => {
    let nav = document.getElementById('side-nav');
    nav.classList.replace('showSideNav', 'hideSideNav');
  }

  const logoutHandler = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('is_login');
    localStorage.removeItem('is_checked');
    AXIOS.defaults.headers['Authorization'] = null;

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
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={HandlerNavbarVisible}>
          <img style={{ zIndex: '1', position: 'absolute', width: '4rem', left: '3%', marginTop: '2rem', position: 'absolute', backgroundColor: 'none' }} src={NavCompassIcon} alt="" />
          <label style={{ zIndex: '1', position: 'absolute', width: '4rem', left: '3%', marginTop: '6rem', position: 'absolute', backgroundColor: 'none', color: 'white' }} htmlFor="Navbar">Navigation</label>
        </div>
      )}

      <div style={{ display: 'flex' }}>

        <SideNav HandlerNavbarVisible={HandlerNavbarVisible} />

        <div id='main' >
          <section>
            <div id='banner-container'>
              <img className='top-img' id='banner-img' src={topCoverImage} alt="" />
              {(topCoverImage == app_banner) ? <div id='app-title'>Ropey DvD</div> : <div></div>}

            </div>
            <div>
              <span className='ps-4' style={{ display: 'flex', justifyContent: 'flex-end' }}>


                {(localStorage.getItem('is_login'))
                  ? (
                    <button id='logout-button' onClick={logoutHandler}>Logout</button>
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