import React from 'react'
import './sideNav.css'
import { useLocation, useNavigate } from 'react-router-dom';


function SideNav({HandlerNavbarVisible}) {
      const navigate = useNavigate();
      const location = useLocation().pathname;
      

      const changePageHandler=(name)=>{
            HandlerNavbarVisible();

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
                              <li className={`nav-item curser--on-hover ${(location === '/')? 'active':''}`} name='dashboard' onClick={()=>changePageHandler('dashboard')}>
                                    <a className={`nav-link`}>
                                          <span>Dashboard</span>
                                    </a>
                              </li>

                              <li className={`nav-item curser--on-hover ${(location.includes('catelog'))? 'active':''}`} name='catelog' onClick={()=>changePageHandler('catelog')}>
                                    <a className={`nav-link`}>
                                          <span>Catalog</span>
                                    </a>
                              </li>
                              <li className={`nav-item curser--on-hover ${(location.includes('members'))? 'active':''}`} name='members' onClick={()=>changePageHandler('members')}>
                                    <a className={`nav-link`}>
                                          <span>Members</span>
                                    </a>
                              </li>
                              <li className={`nav-item curser--on-hover ${(location.includes('add-dvd'))? 'active':''}`} name='members' onClick={()=>changePageHandler('add-dvd')}>
                                    <a className={`nav-link`}>
                                          <span>DVD</span>
                                    </a>
                              </li>
                        </ul>
                  </div>
            </nav>
      )
}

export default SideNav