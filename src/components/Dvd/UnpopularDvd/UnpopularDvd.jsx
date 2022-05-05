import React, { useEffect, useState } from 'react'
import './unpopular.css'
import { DataNotFoundImg } from '../../../assets/images';
import { Get_Dvd_Unpopular } from '../../../API/UserService';



function UnpopularDvd() {

      const [unpouplarDvds, setUnpopularDvds] = useState();
      
      const get_dvd_unpopular =()=>{
            Get_Dvd_Unpopular()
                  .then(({data})=>{
                        setUnpopularDvds([...data]);
                  })
                  .catch(({response})=>{
                        console.log("ERROR ON get_dvd_unpopular");
                  })
      }

      useEffect(()=>{
            get_dvd_unpopular();
      },[])

      return (
            <div id='unpopularDvd' style={{marginTop:'2rem'}}>
                  <section id='unpopular-dvd-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Unpopular Dvds</p>
                        </nav>
                        <hr />

                        <section>
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th scope="col">DVD Title</th>
                                                <th scope="col">Date Release</th>
                                                <th scope="col">No. of Copies</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Studio</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {unpouplarDvds !== undefined &&(
                                                unpouplarDvds.map(({dvDName, dateReleased, numCopies, price, studio},index)=>{return(
                                                      <tr key={`unpopular${index}`}>
                                                            <td>{dvDName}</td>
                                                            <td>{dateReleased}</td>
                                                            <td>{numCopies}</td>
                                                            <td>{price}</td>
                                                            <td>{studio}</td>
                                                      </tr>
                                                )})
                                          )}
                                          
                                    </tbody>
                              </table>
                              {(unpouplarDvds !== undefined)&&(unpouplarDvds.length<=0)&&(
                                          <img style={{width:'30rem', marginLeft:'40%'}} src={DataNotFoundImg} alt="div" />
                              )}
                        </section>
                  </section>
            </div>
      )
}

export default UnpopularDvd