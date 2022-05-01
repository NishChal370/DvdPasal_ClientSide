import React from 'react'
import './sideNav.css'
import { useLocation, useNavigate } from 'react-router-dom';


function SideNav({HandlerNavbarVisible}) {
      const navigate = useNavigate();
      const location = useLocation().pathname;
      

      const changePageHandler=(name)=>{
            HandlerNavbarVisible();

            (name !== 'dashboard')&&(window.scrollBy(0, 620));

            (name === 'dashboard')
                  ? navigate('/')
                  : navigate(name)
                  
      }

      return (
            <nav id='side-nav' className= 'sideNav hideSideNav'>
                  <button onClick={HandlerNavbarVisible}>Close Me</button>
                  <div id='nav-div' className='side-nav-contents'>
                        {/* <p><FaRegDotCircle/>Catelog</p> */}
                        {/* {['Dashboard', 'Catelog', 'Members', ]} */}
                        <ul>
                              <li className={`nav-item curser--on-hover `} name='dashboard' >
                                    <a className={`nav-link ${(location === '/')? 'active':''}`} onClick={()=>changePageHandler('dashboard')}> 
                                          <span>Dashboard</span>
                                    </a>
                              </li>

                              <li className={`nav-item curser--on-hover ${(location.includes('catelog'))? 'active':''}`} name='catelog' onClick={()=>changePageHandler('catelog')}>
                                    <a className={`nav-link`}>
                                          <span>Catalog</span>
                                    </a>
                              </li>
                              <li className={`nav-item curser--on-hover `} name='members' >
                                    <a className={`nav-link ${(location.includes('members'))? 'active':''}`} onClick={()=>changePageHandler('members')}>
                                          <span>Members</span>
                                    </a>
                                    <span  className={` ${(location.includes('members'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                    <ul>
                                          <li className={` ${(location==='/members')? 'sub-active':''}`} onClick={()=>changePageHandler('members')}><a><i>Members</i></a></li>
                                          <li className={` ${(location === '/members/register')? 'sub-active':''}`} onClick={()=>changePageHandler('members/register')}><a><i>Register Member</i></a></li>
                                    </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='add-dvd'>
                                    <a className={`nav-link ${(location.includes('add-dvd'))? 'active':''}`} onClick={()=>changePageHandler('add-dvd')}>
                                          <span>DVD</span>
                                    </a>
                              </li>
                        </ul>
                  </div>
            </nav>
      )
}

export default SideNav