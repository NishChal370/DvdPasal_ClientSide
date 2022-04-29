import React from 'react'
import './catelog.css'
import { DvdImg2 } from '../../assets/images'


function Catelog() {
      return (
            <div id='catelog-wrapper'>
                  <section>
                        <h1 className='fw-bolder fs-1 moving-text---effect'>Catelog</h1>
                  </section>
                  <hr />
                  
                  <section>
                  {
                        [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10].map((data,index)=>{return(
                              <div className="catelog-dvd-card" key={`catelog-card${index}`}>
                                    <div className="catelog-dvd-card-body">
                                          <div className="catelog-dvd-card-front">
                                                <img src={DvdImg2} className="card-img-top" alt="dvd-img"/>
                                                <div className="card-body">
                                                      <p className='fs-4 fw-bold mb-1'>I the title of the dvd</p>
                                                      <div style={{textAlign:'left', paddingLeft: '1rem'}}>
                                                            <p className='p-0 m-0 '>Producer: </p>
                                                            <p className='p-0 m-0'>Studio: </p>
                                                            <p className='p-0 m-0'>Release Date: </p>
                                                      </div>
                                                      
                                                      {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                </div>
                                          </div>
                                          <div className="catelog-dvd-card-back">
                                                <h2>Cast Members</h2> 
                                                <hr />
                                                <div>
                                                      <p>Architect & Engineer</p> 
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>Architect & Engineer</p> 
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                      <p>We love that guy</p>
                                                </div>
                                                
                                          </div>
                                    </div>
                              </div>
                        )})
                  }
                  </section>
            </div>

            
      )
}

export default Catelog