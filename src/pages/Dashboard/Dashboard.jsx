import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { DataNotFoundImg, DvdImg, FilterIcon, SearchIcon2 } from '../../assets/images'
import { Get_Available_Dvd_By_Lastname, Get_Dvd_By_Lastname, Get_Dvd_Title } from '../../API/UserService';
import { dateConverter } from '../../components';


//Get_Dvd_Title
function Dashboard() {
      const [dvdDetails, setDvdDetails] = useState();
      const [showFilter, setShowFilter] = useState(false);
      const [search, setSearch] = useState({lastname:'', showAvailable: false});

      const get_dvd_title=()=>{
            Get_Dvd_Title()
                  .then(({data})=>{

                        setDvdDetails(data);
                  })
                  .catch(({response})=>{

                        alert("error in dashboard get all dvd detail")
                  })
      }

      // const dateConverter=(dateStr)=>{
      //       const  monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      //       let date = new Date(dateStr);
      //       const year = date.getFullYear()
      //       const month = monthsList[date.getMonth()];
      //       const day = date.getDate();

      //       return day+" "+month+" "+year
      // }


      const searchInputHandler=({target})=>{
            const {name, value} =  target;

            (name === 'lastname')
                  ? search['lastname'] = value
                  : search['showAvailable'] = !search['showAvailable'];
            
            (search.lastname === '')&&(
                  get_dvd_title()
            )

            setSearch({...search});
      }



      const get_dvd_by_lastName =()=>{
            Get_Dvd_By_Lastname(search.lastname)
                  .then(({data})=>{
                        setDvdDetails(data);
                  })    
                  .catch(({response})=>{
                        console.log(response);
                  })
      }


      const get_available_dvd_by_lastname=()=>{
            Get_Available_Dvd_By_Lastname()
                  .then(({data})=>{
                        setDvdDetails(data);
                  })
                  .catch(({response})=>{
                        console.log(response);
                  })
      }

      const showErrorMessage=()=>{
            document.getElementById('lastname-input').focus();
            document.getElementById('lastname-input').classList.add('error');

            setInterval(function(){ 
                  document.getElementById('lastname-input').classList.remove('error');
            }, 2000);
            
      }

      const submitSearchHandler=()=>{
            (search.lastname === '')
                  ? showErrorMessage()
                  : (search.showAvailable)
                        ? get_available_dvd_by_lastname()
                        : get_dvd_by_lastName();
      }

      const showFilterHandler=()=>{
            setShowFilter(!showFilter);
      }

      useEffect(()=>{
            get_dvd_title();
      },[])

      return (
      <div id='dashboard'>
            <section id='available-dvds-wrapper'>
                  <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>DVDs in store</p>
                        <aside  style={{display:'flex', flexDirection:'column',justifyContent:'flex-end'}}>
                              {/* <h3>Filter</h3> */}
                              <div className='filter---button' onClick={showFilterHandler}>
                                    <img src={FilterIcon} alt="" />
                                    <h4>Filter</h4>
                              </div>
                              
                              <span className={`filter--inputs-${showFilter?'show':'hide'}`}>
                                    <div style={{display:'flex',marginTop: 'auto', gap:'0.2rem', backgroundColor:'white'}}>
                                          <input className='mt-1' type="checkbox" name="showAvailable" id="showAvailable-chekbox"  value={search.showAvailable} onChange={searchInputHandler}/>
                                          <p className='p-0 m-0 fw-bold mb-2'>Availables DvDs</p>
                                    </div>
                                    <span>
                                          <input type="text" name="lastname" id="lastname-input"  placeholder='Search...' value={search.lastname} onChange={searchInputHandler}/>
                                          <img src={SearchIcon2} alt=""  onClick={submitSearchHandler}/>
                                    </span>
                                    
                              </span>
                        </aside>
                  </nav>
                  
                  <hr />
                  
                  {/* cards */}
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap:'3rem', minHeight:'40rem'}}>

                        {(dvdDetails !== undefined) &&(dvdDetails.map(({dvdName, dateReleased,dvDimages, standardCharge, dvdCategory, actors})=>{return(
                              <div className="card dvd-card" style={{maxHeight:'30rem'}}>
                                    <div className="card-body p-0">
                                    <img src={dvDimages[0].image64} onError={(e) => e.target.src = DvdImg} className="dvd-image card-img-top img-fluid" alt="dvd-img" />
                                          <article className='p-3'>
                                                <span>
                                                      <p className="fs-3 p-0 m-0" style={{fontWeight:'bold', textAlign:'center'}} >{dvdName}</p>
                                                </span>
                                                <p className="fs-5 p-0 m-0"><span style={{fontWeight:'bold'}}>Release Date:</span> {dateConverter(dateReleased)}</p>
                                                <p className="fs-5 p-0 m-0"><span style={{fontWeight:'bold'}}>Price:</span> {standardCharge}</p>
                                                <p className="fs-5 p-0 m-0"><span style={{fontWeight:'bold'}}>Category:</span> {dvdCategory['categoryDescription']}</p>
                                                <p className="fs-5 p-0 m-0"><span style={{fontWeight:'bold'}}>Actor:</span> {`${actors[0].actorName} ${actors[0].actorLastName}`}</p>
                                                <p className="fs-5 p-0 m-0"><span style={{fontWeight:'bold'}}>AgeLimit:</span> <span className={`badge rounded-pill ${(dvdCategory.ageRestricted)?'bg-danger': 'bg-success'}`}>{(dvdCategory.ageRestricted)? 'Adults': 'Family'}</span></p>
                                          </article>
                                    </div>
                              </div>
                        )}))}

                        {/* not found img */}
                        {(dvdDetails !== undefined)&&(dvdDetails.length<=0)&&(
                              <img style={{width:'30rem', marginLeft:'120%'}} src={DataNotFoundImg} alt="div" />
                        )}

                  </div>
                  
            </section>
      </div>
    
      )
}

export default Dashboard