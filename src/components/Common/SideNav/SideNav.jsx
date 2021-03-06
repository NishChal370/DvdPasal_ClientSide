import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './sideNav.css';
import { DownIcon, HomeImg } from '../../../assets/images';
import jwt_decode from "jwt-decode";

function SideNav({HandlerNavbarVisible}) {
      const navigate = useNavigate();
      const location = useLocation().pathname;
      const [userType, setUserType] = useState('');
      const [showSubNav, setShowSideNav] = useState({members :false, dvd :false, inventory :false, loan :false, admin:false, setting: false});
      

      const changePageHandler=({pageName})=>{

            HandlerNavbarVisible();
            (pageName !== 'dashboard')&&(window.scrollBy(0, 620));
            (['dashboard', 'catelog'].includes(pageName)) && showSubNavHandler({navbarName: pageName});

            (pageName === 'dashboard')
                  ? navigate('/')
                  : navigate(pageName)
                  
      }

      const showSubNavHandler=({navbarName})=>{

            showSubNav[navbarName] = !showSubNav[navbarName];

            Object.keys(showSubNav).forEach(navBar => {
                  (navBar !== navbarName) &&(
                        showSubNav[navBar] =  false
                  )
            });

            setShowSideNav({...showSubNav});
      }

      useEffect(()=>{
            if(localStorage.getItem('token') !== null){
                  let type= jwt_decode(localStorage.getItem('token'))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                  setUserType(type);
            }
            
      },[])

      return (
            <nav id='side-nav' className= 'sideNav hideSideNav'>
                  <button onClick={HandlerNavbarVisible}>Close</button>

                  <div id='nav-div' className='side-nav-contents'>

                        <ul>
                              <li className={`nav-item curser--on-hover `} name='dashboard' >
                                    <a className={`nav-link ${(location === '/')? 'active':''}`} onClick={()=>changePageHandler({pageName :'dashboard'})}> 
                                          <span> <span><img className='sidenav-icon' src={HomeImg} alt="" /></span> Dashboard</span>
                                    </a>
                              </li>

                              <li className={`nav-item curser--on-hover ${(location.includes('catelog'))? 'active':''}`} name='catelog' onClick={()=>changePageHandler({pageName :'catelog'})}>
                                    <a className={`nav-link`}>
                                          <span>Catalogue</span>
                                    </a>
                              </li>


                              <li className={`nav-item curser--on-hover `} name='members' >
                                    <a className={`nav-link ${(location.includes('members') || showSubNav.members)? 'active':''}`} onClick={()=>showSubNavHandler({navbarName:'members'})}>
                                          <span>Members</span>
                                          <img id='side-nav-icon'  className={` ${(showSubNav.members)?'icon---up':''}`} src={DownIcon} alt=""/>
                                          
                                    </a>

                                    <span  className={` ${(showSubNav.members)? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                {[{link:'/members', name:'members', title:'Members'},
                                                {link:'/members/register', name:'members/register', title:'Register Member'},
                                                {link:'/members/inactive', name:'members/inactive', title:'Inactive Members'},].map(({link, name, title}, index)=>{return(
                                                      
                                                      <li key={`memeberSubNav${index}`} className={`${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name})}>
                                                            <a><i>{title}</i></a>
                                                      </li>
                                                )})}
                                          </ul>
                                    </span>
                              </li>


                              <li className={`nav-item curser--on-hover `} name='add-dvd'>
                                    <a className={`nav-link ${(location.includes('dvd/') || showSubNav.dvd)? 'active':''}`} onClick={()=>showSubNavHandler({navbarName:'dvd'})}>
                                          <span>DVD</span>
                                          <img id='side-nav-icon'  className={` ${(showSubNav.dvd)?'icon---up':''}`} src={DownIcon} alt=""/>
                                    </a>

                                    <span  className={` ${(showSubNav.dvd)? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                {[{link:'/dvd/add', name:'dvd/add', title:'Add DVD'}, 
                                                {link:'/dvd/unpopular', name:'dvd/unpopular', title:'Unpopular DVDs'}, 
                                                {link:'/dvd/oldDvds', name:'dvd/oldDvds', title:'Old DvD Stock'}].map(({link, name, title}, index)=>{return(
                                                      
                                                      <li key={`dvdSideNav${index}`} className={` ${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name})}>
                                                            <a><i>{title}</i></a>
                                                      </li>
                                                )})}
                                          </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='inventory' >
                                    <a className={`nav-link ${(location.includes('inventory') || showSubNav.inventory)? 'active':''}`} onClick={()=>showSubNavHandler({navbarName:'inventory'})}>
                                          <span>Inventory</span>
                                          <img id='side-nav-icon'  className={` ${(showSubNav.inventory)?'icon---up':''}`} src={DownIcon} alt=""/>
                                    </a>

                                    <span  className={` ${(showSubNav.inventory)? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                <li className={` ${(location==='/inventory/dvdcopies')? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :'inventory/dvdcopies'})}>
                                                      <a><i>DVD copies Detail</i></a>
                                                </li>
                                          </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='loan' >
                                    <a className={`nav-link ${(location.includes('loan') || showSubNav.loan)? 'active':''}`} onClick={()=>showSubNavHandler({navbarName:'loan'})}>
                                          <span>Loan</span>
                                          <img id='side-nav-icon'  className={` ${(showSubNav.loan)?'icon---up':''}`} src={DownIcon} alt=""/>
                                    </a>
                                    <span  className={` ${(showSubNav.loan)? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                {[{link:'/loan/detail', name: 'loan/detail', title:'Loan Detail'},
                                                {link:'/loan/add', name: 'loan/add', title:'Add Loan'}, 
                                                {link:'/loan/currentLoans', name: 'loan/currentLoans', title:'Current Loans'}].map(({link, name, title}, index)=>{return(

                                                      <li key={`laonSideNav${index}`} className={` ${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name})}>
                                                            <a><i>{title}</i></a>
                                                      </li>
                                                )})}
                                          </ul>
                                    </span>
                              </li>

                              {(userType === 'Admin')&&(

                                    <li className={`nav-item curser--on-hover `} name='loan' >
                                          <a className={`nav-link ${(location.includes('loan') || showSubNav.admin)? 'active':''}`} onClick={()=>showSubNavHandler({navbarName:'admin'})}>
                                                <span>Admin</span>
                                                <img id='side-nav-icon'  className={` ${(showSubNav.admin)?'icon---up':''}`} src={DownIcon} alt=""/>
                                          </a>
                                          <span  className={` ${(showSubNav.admin)? 'show-side-subnav':'hide-side-subnav'}`}>
                                                <ul>
                                                      {[{link:'/admin/registerUser', name: 'admin/registerUser', title:'Add User'},
                                                      {link:'/admin/userDetail', name: 'admin/userDetail', title:'Users Detail'},
                                                      {link:'/admin/changePassword', name: 'admin/changePassword', title:'Change Password'},
                                                      {link:'/admin/profile', name: 'admin/profile', title:'My Profile'},
                                                      ].map(({link, name, title}, index)=>{return(
                                                            <li key={`laonSideNav${index}`} className={` ${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name})}>
                                                                  <a><i>{title}</i></a>
                                                            </li>
                                                      )})}
                                                </ul>
                                          </span>
                                    </li>
                              )}

                              {(userType !== 'Admin')&&(
                                    <li className={`nav-item curser--on-hover `} name='loan' >
                                          <a className={`nav-link ${(location.includes('setting') || showSubNav.setting)? 'active':''}`} onClick={()=>showSubNavHandler({navbarName:'setting'})}>
                                                <span>Setting</span>
                                                <img id='side-nav-icon'  className={` ${(showSubNav.setting)?'icon---up':''}`} src={DownIcon} alt=""/>
                                          </a>
                                          <span  className={` ${(showSubNav.setting)? 'show-side-subnav':'hide-side-subnav'}`}>
                                                <ul>
                                                      {[{link:'/setting/changePassword', name: 'setting/changePassword', title:'Change Password'},
                                                      {link:'/setting/profile', name: 'setting/profile', title:'My Profile'},
                                                      ].map(({link, name, title}, index)=>{return(
                                                            <li key={`settingSideNav${index}`} className={` ${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name})}>
                                                                  <a><i>{title}</i></a>
                                                            </li>
                                                      )})}
                                                </ul>
                                          </span>
                                    </li>
                              )}
                              
                        </ul>

                  </div>
            </nav>
      )
}

export default SideNav