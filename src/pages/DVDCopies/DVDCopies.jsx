import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Delete_Dvd_Copy_By_Id, Get_All_Dvd_Copies } from '../../API/UserService'
import { DeleteIcon } from '../../assets/images';
import AddDvdFormModel from './AddDvdFormModel';
import './dvdCopies.css'



function DVDCopies() {
      const [wantToRefresh, setWantToRefresh] = useState(false);
      const [allDvdCopyDetail, setAllDvdCopies] = useState();

      const get_all_dvd_copies=()=>{
            Get_All_Dvd_Copies()
                  .then(({data})=>{

                        setAllDvdCopies(data);
                  })
                  .catch(({response})=>{
                        console.log(response);
                  })
      }

      const delete_dvd_by_id =(dvdId)=>{
            Delete_Dvd_Copy_By_Id(dvdId)
                  .then(({data})=>{
                        Swal.fire(
                              'Deleted Sucessfully!',
                              data,
                              'success'
                        ) 

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
            const day = date.getDay();

            return day + " " + month + " " + year
      }

      useEffect(()=>{
            get_all_dvd_copies();
      },[wantToRefresh])

      return (
            <div id='dvdCopies' style={{marginTop:'2rem'}}>
                  
                  <section id='dvd-Copies-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Available DVDs</p>
                              <aside>          
                                    <button className=" add-dvd-button" role="button"type="button"data-bs-toggle="modal" data-bs-target="#dvdCopiesModel" data-bs-whatever="@mdo">Add new DVD</button>                           
                              </aside> 
                        </nav>
                        <hr />

                        <AddDvdFormModel refreshPage={refreshPage}/>

                        <section>
                              <table class="table">
                                    <thead>
                                          <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Purchase Date</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Copy Id</th>
                                                <th scope="col">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {allDvdCopyDetail !== undefined &&(
                                                allDvdCopyDetail.map(({datePurchased, dvdTitle, copyId}, index)=>{return(
                                                      <tr>
                                                            <th scope="row">{index}</th>
                                                            <td>{dateConverter(datePurchased)}</td>
                                                            <td>{dvdTitle}</td>
                                                            <td>{copyId}</td>
                                                            <td><span className='delete-icon-image'><img src={DeleteIcon} alt="delete-btn" onClick={()=>delete_dvd_by_id(copyId)} /></span></td>
                                                      </tr>
                                                )})
                                          )}
                                          
                                    </tbody>
                              </table>
                        </section>
                  </section>
            </div>

      )
}

export default DVDCopies