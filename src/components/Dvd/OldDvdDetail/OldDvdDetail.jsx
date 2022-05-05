import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './oldDvdDetails.css';
import { DataNotFoundImg, DeleteIcon } from '../../../assets/images';
import { Delete_All_Old_Dvds, Delete_Dvd_Copy_By_Id, Get_All_Old_Dvds } from '../../../API/UserService';


function OldDvdDetail() {
      const [wantToRefresh, setWantToRefresh] = useState(false);
      const [oldDvdList, setOldDvdsList] = useState();

      const get_all_dvds_copy =()=>{
            Get_All_Old_Dvds()
                  .then(({data})=>{
                        setOldDvdsList(data);
                  })
                  .catch(({response})=>{
                        console.log(response);
                        console.log("ERROR ON GET ALL OLD DVD DETAILS");
                  })
      }


      const delete_all_old_dvd=()=>{
            Delete_All_Old_Dvds()
                  .then(({data})=>{
                        Swal.fire(
                              'Deleted Sucessfully!',
                              data,
                              'success'
                        );

                        refreshPage();
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data.title,
                              'error'
                        )
                  })
      }

      

      const delete_dvd_by_id =(dvdId)=>{
            Delete_Dvd_Copy_By_Id(dvdId)
                  .then(({data})=>{
                        Swal.fire(
                              'Deleted Sucessfully!',
                              data,
                              'success'
                        );

                        refreshPage();
                  })
                  .catch((response)=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data.title,
                              'error'
                        )


                  })
      }

      const refreshPage = ()=>{
            let appyRefresh = !wantToRefresh;
            setWantToRefresh(appyRefresh);
      }

      const dateConverter = (dateStr) => {
            const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let date = new Date(dateStr);
            const year = date.getFullYear()
            const month = monthsList[date.getMonth()];
            const day = date.getDate();

            return day + " " + month + " " + year
      }



      useEffect(()=>{
            get_all_dvds_copy();
      },[wantToRefresh])

      return (
            <div id='oldDvd' style={{marginTop:'2rem'}}>
                  
                  <section id='old-dvd-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Old Dvds In Stock</p>
                              <aside>          
                                    <button className="delete-all-button" role="button" onClick={delete_all_old_dvd}>Delete All</button>    
                              </aside> 
                        </nav>
                        <hr />

                        <section>
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Dvd Name</th>
                                                <th scope="col">Purchase Date</th>
                                                <th scope="col">Copy Id</th>
                                                <th scope="col">Total Loans</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                              
                                          {oldDvdList !== undefined &&(
                                                
                                                oldDvdList.map(({dvdName, datePurchase, copyId, totalLoans, price}, index)=>{return(
                                                      <tr>
                                                            <th scope="row">{index}</th>
                                                            <td>{dvdName}</td>
                                                            <td>{dateConverter(datePurchase)}</td>
                                                            <td>{copyId}</td>
                                                            <td>{totalLoans}</td>
                                                            <td>{price}</td>
                                                            <td><span className='delete-icon-image'><img src={DeleteIcon} alt="delete-btn" onClick={()=>delete_dvd_by_id(copyId)} /></span></td>
                                                      </tr>
                                                )})
                                          )}

                                         
                                          
                                    </tbody>
                              </table>
                              
                        
                              {(oldDvdList !== undefined)&&(oldDvdList.length<=0)&&(
                                          <img style={{width:'30rem', marginLeft:'40%'}} src={DataNotFoundImg} alt="div" />
                              )}

                              
                        </section>

                        

                  </section>
            </div>
      )
}

export default OldDvdDetail