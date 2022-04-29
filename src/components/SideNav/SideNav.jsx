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
                  <div>
                        {/* <p><FaRegDotCircle/>Catelog</p> */}
                        <ul>
                              <li className={`nav-item curser--on-hover ${(location === '/')? 'active':''}`} name='dashboard' onClick={()=>changePageHandler('dashboard')}>
                                    <a className={`nav-link`}>
                                          <span>Dashboard</span>
                                    </a>
                              </li>

                              <li className={`nav-item curser--on-hover ${(location.includes('catelog'))? 'active':''}`} name='catelog' onClick={()=>changePageHandler('catelog')}>
                                    <a className={`nav-link`}>
                                          <span>Catelog</span>
                                    </a>
                              </li>
                        </ul>
                  </div>
            </nav>
      )
}

export default SideNav