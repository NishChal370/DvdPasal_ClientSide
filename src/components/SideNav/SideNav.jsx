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
                                          <li className={` ${(location === '/members/inactive')? 'sub-active':''}`} onClick={()=>changePageHandler('members/inactive')}><a><i>Inactive Member</i></a></li>
                                    </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='add-dvd'>
                                    <a className={`nav-link ${(location.includes('add-dvd'))? 'active':''}`} onClick={()=>changePageHandler('add-dvd')}>
                                          <span>DVD</span>
                                    </a>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='inventory' >
                                    <a className={`nav-link ${(location.includes('inventory'))? 'active':''}`} onClick={()=>changePageHandler('inventory/dvdcopies')}>
                                          <span>Inventory</span>
                                    </a>
                                    <span  className={` ${(location.includes('inventory'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                    <ul>
                                          <li className={` ${(location==='inventory/dvdcopies')? 'sub-active':''}`} onClick={()=>changePageHandler('inventory/dvdcopies')}><a><i>DVD copies Detail</i></a></li>
                                          <li className={` ${(location==='inventory/dvdcopies')? 'sub-active':''}`} onClick={()=>changePageHandler('inventory/dvdcopies')}><a><i>Search DVD Copy</i></a></li>
                                          <li className={` ${(location==='inventory/dvdcopies')? 'sub-active':''}`} onClick={()=>changePageHandler('inventory/dvdcopies')}><a><i>Old DvD Stock</i></a></li>
                                    </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='loan' >
                                    <a className={`nav-link ${(location.includes('loan'))? 'active':''}`} onClick={()=>changePageHandler('loan/detail')}>
                                          <span>Loan</span>
                                    </a>
                                    <span  className={` ${(location.includes('loan'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                    <ul>
                                          <li className={` ${(location==='loan/detail')? 'sub-active':''}`} onClick={()=>changePageHandler('loan/detail')}><a><i>Loan Detail</i></a></li>
                                          <li className={` ${(location==='loan/add')? 'sub-active':''}`} onClick={()=>changePageHandler('loan/add')}><a><i>Add Loan</i></a></li>
                                    </ul>
                                    </span>
                              </li>
                        </ul>
                  </div>
            </nav>
      )
}

export default SideNav