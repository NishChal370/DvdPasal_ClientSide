import React, { useEffect, useState } from 'react'
import './catelog.css'
import { DvdImg2, RightIcon } from '../../assets/images'
import { Get_DVD_Details } from '../../API/UserService';
import Swal from 'sweetalert2';


function Catelog() {
      const [itemIndex, setItemIndex] = useState({start:0, end: 8}) 
      const [dvdDetails, setDvdDetails]= useState();

      const get_dvd_details=()=>{
            Get_DVD_Details()
                  .then(({data})=>{
                        setDvdDetails(data);
                        console.log(data.length);
                        itemIndex.end = (data.length>=8) ?8: data.length;
                        setItemIndex({...itemIndex});
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Error !!',
                              response.data.title,
                              'error'
                        )
                  })
      }

      const changePageHandler=({target})=>{
            // if(target.name === 'back'){
                 
            //       itemIndex.start = itemIndex.end;
            //       itemIndex.end = (itemIndex.end+8 >dvdDetails.length) ?dvdDetails.length :itemIndex.end+8;
                  
            // }
            // else if (target.name === 'front'){
            //       console.log(itemIndex);
            //       itemIndex.end = (itemIndex.start+8 >=dvdDetails.length) ?dvdDetails.length :itemIndex.start+8;;
            //       itemIndex.start = (itemIndex.start+8 >=dvdDetails.length) ?itemIndex.start :itemIndex.start+8;
            //       console.log(itemIndex);
            //       console.log(dvdDetails);
            // }

            // setItemIndex({...itemIndex});
      }

      const dateConverter=(dateStr)=>{
            const  monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let date = new Date(dateStr);
            const year = date.getFullYear()
            const month = monthsList[date.getMonth()];
            const day = date.getDay();

            return day+" "+month+" "+year
      }

      useEffect(()=>{
            get_dvd_details();
      },[])
      return (
            <div id='catelog-wrapper'>
                  <section>
                        <h1 className='fw-bolder fs-1 moving-text---effect'>Catelog</h1>
                  </section>
                  <hr />
                  
                  <section>
                  {dvdDetails !== undefined &&(
                        dvdDetails.slice(itemIndex.start, itemIndex.end).map(({dvdName, dvdProducer, dvdStudio, dateReleased, dvdCategory, standardCharge, penaltyCharge, actors},index)=>{return(
                              <div className="catelog-dvd-card" key={`catelog-card${index}`}>
                                    <div className="catelog-dvd-card-body">
                                          <div className="catelog-dvd-card-front">
                                                <img src={DvdImg2} className="card-img-top" alt="dvd-img"/>
                                                <div className="card-body p-1">
                                                      <p className='fs-3 fw-bold mb-1'>{dvdName}</p>
                                                      <div style={{textAlign:'left', paddingLeft: '1rem'}}>
                                                            <p className='p-0 m-0 '>Producer: {dvdProducer['producerName']}</p>
                                                            <p className='p-0 m-0'>Studio: {dvdStudio['studioName']}</p>
                                                            <p className='p-0 m-0'>Release Date: {dateConverter(dateReleased)}</p>
                                                            <p className='p-0 m-0'>Cateogary: {dvdCategory.categoryDescription}</p>
                                                            <p className='p-0 m-0' >Age Limit: <span className={`badge rounded-pill ${(dvdCategory.ageRestricted)?'bg-danger': 'bg-success'}`}>{(dvdCategory.ageRestricted)? 'Adults': 'Family'}</span></p>
                                                            <p className='p-0 m-0' >Penalty: {penaltyCharge}</p>
                                                            <p className='p-0 m-0'>Price: {standardCharge}</p>
                                                            
                                                            {/* <p className='p-0 m-0'>age Restriced: {dvdCategory.ageRestricted}</p> */}
                                                      </div>
                                                      
                                                      {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                </div>
                                          </div>
                                          <div className="catelog-dvd-card-back">
                                                <h2>Cast Members</h2> 
                                                <hr />
                                                <div>
                                                      {actors.map(({actorName, actorLastName}, index)=>{return(
                                                            <p>{`${actorName} ${actorLastName}`}</p> 
                                                      )})}
                                                </div>
                                                
                                          </div>
                                    </div>
                              </div>
                        )})
                  )}
                  </section>
                  {dvdDetails !== undefined &&(
                        <>
                        <hr />
                        <section className='d-flex justify-content-end'>
                              <span className='d-flex gap-2 pagination--button'>
                                    <i class="fas fa-arrow-alt-circle-left"></i>
                                    <img src={RightIcon} name='back' alt="back-icon"  onClick={changePageHandler}/>
                                    {(itemIndex.end < dvdDetails.length) && (
                                          <img src={RightIcon} name='front'alt="front-icon" onClick={changePageHandler}/>
                                    )}
                                    
                              </span>
                              
                        </section>
                        </>
                  )}
                  
            </div>

            
      )
}

export default Catelog