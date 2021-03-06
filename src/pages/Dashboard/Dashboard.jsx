import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { DataNotFoundImg, DvdImg, FilterIcon, SearchIcon2 } from '../../assets/images'
import { Get_Available_Dvd_By_Lastname, Get_Dvd_By_Lastname, Get_Dvd_Title } from '../../API/UserService';
import { dateConverter } from '../../components';


//Get_Dvd_Title
function Dashboard() {
      const [dvdDetails, setDvdDetails] = useState();
      const [showFilter, setShowFilter] = useState(false);
      const [search, setSearch] = useState({ lastname: '', showAvailable: false });

      const get_dvd_title = () => {
            Get_Dvd_Title()
                  .then(({ data }) => {

                        setDvdDetails(data);
                  })
                  .catch(({ response }) => {

                        alert("error in dashboard get all dvd detail")
                  })
      }


      const searchInputHandler = ({ target }) => {
            const { name, value } = target;

            (name === 'lastname')
                  ? search['lastname'] = value
                  : search['showAvailable'] = !search['showAvailable'];

            (search.lastname === '') && (
                  get_dvd_title()
            )

            setSearch({ ...search });
      }



      const get_dvd_by_lastName = () => {
            Get_Dvd_By_Lastname(search.lastname)
                  .then(({ data }) => {
                        setDvdDetails(data);
                  })
                  .catch(({ response }) => {
                        console.log(response);
                  })
      }


      const get_available_dvd_by_lastname = () => {
            Get_Available_Dvd_By_Lastname(search.lastname)
                  .then(({ data }) => {
                        setDvdDetails(data);
                  })
                  .catch(({ response }) => {
                        console.log(response);
                  })
      }

      const showErrorMessage = () => {
            document.getElementById('lastname-input').focus();
            document.getElementById('lastname-input').classList.add('error');

            setInterval(function () {
                  document.getElementById('lastname-input').classList.remove('error');
            }, 2000);

      }

      const submitSearchHandler = () => {
            (search.lastname === '')
                  ? showErrorMessage()
                  : (search.showAvailable)
                        ? get_available_dvd_by_lastname()
                        : get_dvd_by_lastName();
      }

      const showFilterHandler = () => {
            setShowFilter(!showFilter);
      }

      useEffect(() => {
            get_dvd_title();
      }, [])

      return (
            <div id='dashboard'>
                  <section id='available-dvds-wrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>DVDs in store</p>
                              <aside style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

                                    <div className='filter---button' onClick={showFilterHandler}>
                                          <img src={FilterIcon} alt="" />
                                          <h4>Filter</h4>
                                    </div>

                                    <div className={`filter--inputs-${showFilter ? 'show' : 'hide'}`}>
                                      
                                          <div id='search-div'>
                                                <input type="text" name="lastname" id="lastname-input" placeholder='Search...' value={search.lastname} onChange={searchInputHandler} />
                                                <img src={SearchIcon2} alt="" onClick={submitSearchHandler} id="search-img"/>
                                          </div>
                                          
                                          <div className="form-check form-switch" style={{ display: 'flex', marginTop: 'auto', gap: '0.2rem', backgroundColor: 'white', justifyContent:"flex-end" }}>
                                                <input className='mt-1 form-check-input' type="checkbox" name="showAvailable" id="showAvailable-chekbox" value={search.showAvailable} onChange={searchInputHandler} />
                                                <label htmlFor="showAvailable-chekbox" id='switch-label'>Available DvDs</label>
                                          </div>

                                    </div>
                              </aside>
                        </nav>

                        <hr />

                        {/* cards */}
                        <div id='dvd-item-cards' >

                              {(dvdDetails !== undefined) && (dvdDetails.map(({ dvdName, dateReleased, dvDimages, standardCharge, dvdCategory, actors }, index) => {
                                    return (
                                          <div className="card dvd-card" data-bs-toggle="tooltip" data-bs-placement="top" title={dvdName} style={{ maxHeight: '30rem' }} key={`dvdInStore${index}`}>
                                                <div className="card-body p-0">
                                                      <img src={(dvDimages !== null) && dvDimages[0].image64} onError={(e) => e.target.src = DvdImg} className="dvd-image card-img-top img-fluid" alt="dvd-img" />
                                                      <article className='p-3'>
                                                            <span id='dvd-name-span'>
                                                                  <p id='dvd-name-p' className="fs-3 p-0 m-0">{dvdName}</p>
                                                            </span>
                                                            <p className="fs-5 p-0 m-0"><span style={{ fontWeight: 'bold' }}>Release Date:</span> {dateConverter(dateReleased)}</p>
                                                            <p className="fs-5 p-0 m-0"><span style={{ fontWeight: 'bold' }}>Price:</span> {standardCharge}</p>
                                                            <p className="fs-5 p-0 m-0"><span style={{ fontWeight: 'bold' }}>Category:</span> {(dvdCategory.length > 0 ) && dvdCategory['categoryDescription']}</p>
                                                            <p className="fs-5 p-0 m-0"><span style={{ fontWeight: 'bold' }}>Actor:</span> {`${actors[0].actorName} ${actors[0].actorLastName}`}</p>
                                                            <p className="fs-5 p-0 m-0"><span style={{ fontWeight: 'bold' }}>Age Limit:</span> <span className={`badge rounded-pill ${(dvdCategory.ageRestricted) ? 'bg-danger' : 'bg-success'}`}>{(dvdCategory.ageRestricted) ? 'Adults' : 'Family'}</span></p>
                                                      </article>
                                                </div>
                                          </div>
                                    )
                              }))}

                              {/* not found img */}
                              {(dvdDetails !== undefined) && (dvdDetails.length <= 0) && (
                                    <img style={{ width: '30rem', marginLeft: '120%' }} src={DataNotFoundImg} alt="div" />
                              )}

                        </div>

                  </section>
            </div>

      )
}

export default Dashboard