import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './sideNav.css';
import { CatelogIcon, DownIcon, HomeImg } from '../../assets/images';


function SideNav({HandlerNavbarVisible}) {
      const navigate = useNavigate();
      const location = useLocation().pathname;
      

      const changePageHandler=({pageName, closeSideNav})=>{

            if(closeSideNav){
                  HandlerNavbarVisible();
                  (pageName !== 'dashboard')&&(window.scrollBy(0, 620));
            }

            (pageName === 'dashboard')
                  ? navigate('/')
                  : navigate(pageName)
                  
      }

      return (
            <nav id='side-nav' className= 'sideNav hideSideNav'>
                  <button onClick={HandlerNavbarVisible}>Close</button>

                  <div id='nav-div' className='side-nav-contents'>

                        <ul>
                              <li className={`nav-item curser--on-hover `} name='dashboard' >
                                    <a className={`nav-link ${(location === '/')? 'active':''}`} onClick={()=>changePageHandler({pageName :'dashboard', closeSideNav: true})}> 
                                          <span> <span><img className='sidenav-icon' src={HomeImg} alt="" /></span> Dashboard</span>
                                    </a>
                              </li>

                              <li className={`nav-item curser--on-hover ${(location.includes('catelog'))? 'active':''}`} name='catelog' onClick={()=>changePageHandler({pageName :'catelog', closeSideNav :true})}>
                                    <a className={`nav-link`}>
                                          <span>Catalogue</span>
                                    </a>
                              </li>


                              <li className={`nav-item curser--on-hover `} name='members' >
                                    <a className={`nav-link ${(location.includes('members'))? 'active':''}`} onClick={()=>changePageHandler({pageName :'members', closeSideNav :false})}>
                                          <span>Members</span>
                                          <img id='side-nav-icon'  className={` ${(location.includes('members'))?'icon---up':''}`} src={DownIcon} alt=""/>
                                          
                                    </a>

                                    <span  className={` ${(location.includes('members'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                {[{link:'/members', name:'members', title:'Members'},
                                                {link:'/members/register', name:'members/register', title:'Register Member'}].map(({link, name, title}, index)=>{return(
                                                      
                                                      <li key={`memeberSubNav${index}`} className={`${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name, closeSideNav :true})}>
                                                            <a><i>{title}</i></a>
                                                      </li>
                                                )})}
                                          </ul>
                                    </span>
                              </li>


                              <li className={`nav-item curser--on-hover `} name='add-dvd'>
                                    <a className={`nav-link ${(location.includes('dvd/add'))? 'active':''}`} onClick={()=>changePageHandler({pageName :'dvd/add', closeSideNav :false})}>
                                          <span>DVD</span>
                                          <img id='side-nav-icon'  className={` ${(location.includes('/dvd/'))?'icon---up':''}`} src={DownIcon} alt=""/>
                                    </a>

                                    <span  className={` ${(location.includes('dvd/'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                {[{link:'/dvd/add', name:'dvd/add', title:'Add DVD'}, 
                                                {link:'/dvd/unpopular', name:'dvd/unpopular', title:'Unpopular DVDs'}, 
                                                {link:'/dvd/oldDvds', name:'dvd/oldDvds', title:'Old DvD Stock'}].map(({link, name, title}, index)=>{return(
                                                      
                                                      <li key={`dvdSideNav${index}`} className={` ${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name, closeSideNav :true})}>
                                                            <a><i>{title}</i></a>
                                                      </li>
                                                )})}
                                          </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='inventory' >
                                    <a className={`nav-link ${(location.includes('inventory'))? 'active':''}`} onClick={()=>changePageHandler({pageName :'inventory/dvdcopies', closeSideNav :false})}>
                                          <span>Inventory</span>
                                          <img id='side-nav-icon'  className={` ${(location.includes('inventory'))?'icon---up':''}`} src={DownIcon} alt=""/>
                                    </a>

                                    <span  className={` ${(location.includes('inventory'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                <li className={` ${(location==='/inventory/dvdcopies')? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :'inventory/dvdcopies', closeSideNav :true})}>
                                                      <a><i>DVD copies Detail</i></a>
                                                </li>
                                          </ul>
                                    </span>
                              </li>

                              <li className={`nav-item curser--on-hover `} name='loan' >
                                    <a className={`nav-link ${(location.includes('loan'))? 'active':''}`} onClick={()=>changePageHandler({pageName :'loan/detail', closeSideNav :false})}>
                                          <span>Loan</span>
                                          <img id='side-nav-icon'  className={` ${(location.includes('loan'))?'icon---up':''}`} src={DownIcon} alt=""/>
                                    </a>
                                    <span  className={` ${(location.includes('loan'))? 'show-side-subnav':'hide-side-subnav'}`}>
                                          <ul>
                                                {[{link:'/loan/detail', name: 'loan/detail', title:'Loan Detail'},
                                                {link:'/loan/add', name: 'loan/add', title:'Add Loan'}, 
                                                {link:'/loan/currentLoans', name: 'loan/currentLoans', title:'Current Loans'}].map(({link, name, title}, index)=>{return(

                                                      <li key={`laonSideNav${index}`} className={` ${(location===link)? 'sub-active':''}`} onClick={()=>changePageHandler({pageName :name, closeSideNav :true})}>
                                                            <a><i>{title}</i></a>
                                                      </li>
                                                )})}
                                          </ul>
                                    </span>
                              </li>
                        </ul>

                  </div>
            </nav>
      )
}

export default SideNav