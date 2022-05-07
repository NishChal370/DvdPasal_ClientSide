import React, { useEffect, useState } from 'react';
import './catelog.css';
import Swal from 'sweetalert2';
import { Get_DVD_Details } from '../../API/UserService';
import { DvdImg2, RightIcon } from '../../assets/images';
import { dateConverter } from '../../components';


function Catelog() {
      const [itemIndex, setItemIndex] = useState({ start: 0, end: 8 })
      const [dvdDetails, setDvdDetails] = useState();

      const get_dvd_details = () => {

            Get_DVD_Details()
                  .then(({ data }) => {
                        setDvdDetails(data);

                        itemIndex.end = (data.length >= 8) ? 8 : data.length;
                        setItemIndex({ ...itemIndex });
                  })
                  .catch(({ response }) => {
                        Swal.fire(
                              'Error !!',
                              response.data.title,
                              'error'
                        )
                        console.log("error");
                  })
      }


      useEffect(() => {
            get_dvd_details();
      }, [])
      return (
            <div id='catelog-wrapper'>
                  <section>
                        <h1 className='fw-bolder fs-1 moving-text---effect'>Catalogue</h1>
                  </section>
                  <hr />

                  <section id='cards-section'>
                        {dvdDetails !== undefined && (
                              dvdDetails.slice(itemIndex.start, itemIndex.end).map(({ dvdName, dvdProducer, dvdStudio, dvDimages, dateReleased, dvdCategory, standardCharge, penaltyCharge, actors }, index) => {
                                    return (
                                          <div className="catelog-dvd-card" key={`catelog-card${index}`}>
                                                <div className="catelog-dvd-card-body">
                                                      <div className="catelog-dvd-card-front">
                                                            <img src={dvDimages[0].image64} onError={(e) => e.target.src = DvdImg2} className="dvd-image card-img-top img-fluid" alt="dvd-img" />
                                                            <div className="card-body p-1">
                                                                  <span id='title-span'>
                                                                        <p id='catelog-title' className='fs-3 fw-bold mb-1'>{dvdName}</p>
                                                                  </span>

                                                                  <div id='catelog-info-container' style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                                                                        <p className='p-0 m-0 '><span style={{ fontWeight: 'bold' }}>Producer:</span> {dvdProducer['producerName']}</p>
                                                                        <p className='p-0 m-0'><span style={{ fontWeight: 'bold' }}>Studio:</span> {dvdStudio['studioName']}</p>
                                                                        <p className='p-0 m-0'><span style={{ fontWeight: 'bold' }}>Release Date:</span> {dateConverter(dateReleased)}</p>
                                                                        <p className='p-0 m-0'><span style={{ fontWeight: 'bold' }}>Category:</span> {dvdCategory.categoryDescription}</p>
                                                                        <p className='p-0 m-0' ><span style={{ fontWeight: 'bold' }}>Age Limit:</span> <span className={`badge rounded-pill ${(dvdCategory.ageRestricted) ? 'bg-danger' : 'bg-success'}`}>{(dvdCategory.ageRestricted) ? 'Adults' : 'Family'}</span></p>
                                                                        <p className='p-0 m-0' ><span style={{ fontWeight: 'bold' }}>Penalty:</span> {penaltyCharge}</p>
                                                                        <p className='p-0 m-0'><span style={{ fontWeight: 'bold' }}>Price:</span> {standardCharge}</p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      <div className="catelog-dvd-card-back">
                                                            <h2>Cast Members</h2>
                                                            <hr />
                                                            <div>
                                                                  {actors.map(({ actorName, actorLastName, profileUrl }, index) => {
                                                                        return (
                                                                              <p key={`actors${index}`}>
                                                                                    <a class="name-link" target="_blank" href={'http://' + profileUrl} >{`${actorName} ${actorLastName}`}</a>
                                                                              </p>
                                                                        )
                                                                  })}
                                                            </div>

                                                      </div>
                                                </div>
                                          </div>
                                    )
                              })
                        )}

                        {dvdDetails === undefined && (
                              <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                              </div>
                        )}

                  </section>



            </div>


      )
}

export default Catelog