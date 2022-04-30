import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './addDvD.css';
import { AddUserImg, CrossImg } from '../../assets/images';
import { Get_Actors_Name, Get_DVD_Cateogaries_Name, Get_Producets_Name, Get_Studios_Name, Post_Dvd_Title } from '../../API/UserService';


let data = {
      "dvdName": "",
      "dateReleased": new Date().toLocaleDateString(),
      "standardCharge": 0,
      "penaltyCharge": 0,
      "dvdCategory": {
            "categoryNumber": 0,
            "categoryDescription": "",
            "ageRestricted": false
      },
      "dvdProducer": {
            "producerNumber": 0,
            "producerName": ""
      },
      "dvdStudio": {
            "studioNumber": 0,
            "studioName": ""
      },
      "dvDimages": [
            {
                  "dvDimageId": 0,
                  "dvDnumber": 0,
                  "image64": ""
            }
      ],
      "actors": [
            {
                  "actorNumber": 0,
                  "actorName": "",
                  "actorLastName": "",
                  "profileUrl": ""
            }
      ]
}


const dvdImg = {
      "dvDimageId": 0,
      "dvDnumber": 0,
      "image64": ""
}
const actor = {
      "actorNumber": 0,
      "actorName": "",
      "actorLastName": "",
      "profileUrl": ""
}


function AddDVD() {
      const [dvdData, setDvdData] = useState({ ...data });
      let [numberOFActors, setNumberOfActors] = useState(1);
      let [numberOFDvdImage, setNumberOfDvdImage] = useState(1);
      const [nameList, setNameList] = useState({ producers: [], studios: [], actors: [], cateogary: [], });
      const [inputNewStatus, setInputNewStatus] = useState({ producer: false, studio: false, actor: { 0: false }, image: { 0: false }, cateogary: false });

      // to allow adding new producer, actor, studio, cateogar {change status of all to add the mention data}
      const handlerAddingNew = (name, index) => {

            clearSelectedValid(name, index);

            (name === 'actor' || name === 'image')
                  ? inputNewStatus[name][index] = !inputNewStatus[name][index]
                  : inputNewStatus[name] = !inputNewStatus[name];

            setInputNewStatus({ ...inputNewStatus })
      }

      const clearSelectedValid = (name, index) => {
            if (name === 'producer') {
                  dvdData.dvdProducer = {
                        "producerNumber": 0,
                        "producerName": ""
                  }
            }
            else if (name === 'actor') {
                  dvdData.actors[index] = {
                        "actorNumber": 0,
                        "actorName": "",
                        "actorLastName": "",
                        "profileUrl": ""
                  }

            }
            else if (name === 'studio') {
                  dvdData.dvdStudio = {
                        "studioNumber": 0,
                        "studioName": ""
                  }
            }
            else if (name === 'cateogary') {
                  dvdData.dvdCategory = {
                        "categoryNumber": 0,
                        "categoryDescription": "",
                        "ageRestricted": false
                  }
            }

            setDvdData({ ...dvdData });
      }

      const addActorHandler = (type) => {
            if (type === 'less') {
                  numberOFActors = (numberOFActors > 1) ? numberOFActors - 1 : numberOFActors;
                  
                  if(numberOFActors > 1){
                        delete inputNewStatus['actor'][numberOFActors];

                        dvdData.actors.pop();
                  }

            }
            else {
                  numberOFActors += 1;

                  dvdData.actors.push({ ...actor });
            }

            setNumberOfActors(numberOFActors);
            setDvdData({ ...dvdData });
            setInputNewStatus({ ...inputNewStatus });



      }

      const inputChangeHandler = ({ target }, index) => {
            // textBoxChangeHandler(target, index);

            (target.tagName === 'SELECT')
                  ? dropDownChangeHandler(target, index)
                  : textBoxChangeHandler(target, index);

      }

      const dropDownChangeHandler = (target, index) => {
            const { id, name, value, selectedOptions } = target;
            console.log(id, name, value,);
            console.log(selectedOptions[0].text);

            if (id.includes('actors')) {
                  dvdData[id][index][name] = value;
            }
            else {
                  dvdData[id][name] = value;
            }


            if (id.includes('dvdProducer')) {

                  dvdData[id]['producerName'] = selectedOptions[0].text;
            }
            else if (id.includes('dvdStudio')) {
                  dvdData[id]['studioName'] = selectedOptions[0].text;
            }
            else if (id.includes('actors')) {

                  dvdData[id][index]['actorName'] = selectedOptions[0].text;
                  dvdData[id][index]['actorLastName'] = '...';
                  dvdData[id][index]['profileUrl'] = '...';

            }
            else if (id.includes('dvdCategory')) {

                  dvdData[id]['categoryDescription'] = selectedOptions[0].text;
            }

            console.log(dvdData);
            setDvdData({ ...dvdData });

      }

      const addImage = (e) => {
            var uploadedImages = e.currentTarget.files;

            let imageList = [];

            Array.from(uploadedImages).forEach(element => {

                  var iBase64 = "";

                  let reader = new FileReader();

                  reader.readAsDataURL(element);

                  reader.onload = function () {
                        iBase64 = reader.result;
                        imageList.push({
                              "dvDimageId": 0,
                              "dvDnumber": 0,
                              "image64": iBase64
                        });
                  }

                  reader.onerror = function (error) {
                        console.log("Error converting image: ", error);
                  }
            });

            console.log(imageList);

            dvdData.dvDimages = imageList;

            console.log(dvdData);
      }


      const textBoxChangeHandler = (target, index) => {
            const { id, name, value } = target;
            if (['dvdProducer', 'dvdStudio', 'actors', 'dvdCategory', 'dvDimages'].includes(id)) {

                  switch (id) {
                        case 'actors':
                              dvdData[id][index][name] = value
                              break;
                        default:
                              dvdData[id][name] = (name === 'ageRestricted')
                                    ? !dvdData[id][name]
                                    : value;
                              break;
                  }

            }
            else {

                  dvdData[name] = value;
            }

            setDvdData({ ...dvdData });
      }


      const submitButtonHandler = (e) => {
            e.preventDefault();

            post_Dvd_Title();
            console.log(dvdData);
      }

      const resetButtonHandler = () => {
            setNumberOfActors(1);
            setNumberOfDvdImage(1);
            setDvdData({
                  "dvdName": "",
                  "dateReleased": new Date().toLocaleDateString(),
                  "standardCharge": 0,
                  "penaltyCharge": 0,
                  "dvdCategory": {
                        "categoryNumber": 0,
                        "categoryDescription": "",
                        "ageRestricted": false
                  },
                  "dvdProducer": {
                        "producerNumber": 0,
                        "producerName": ""
                  },
                  "dvdStudio": {
                        "studioNumber": 0,
                        "studioName": ""
                  },
                  "dvDimages": [
                        {
                              "dvDimageId": 0,
                              "dvDnumber": 0,
                              "image64": ""
                        }
                  ],
                  "actors": [
                        {
                              "actorNumber": 0,
                              "actorName": "",
                              "actorLastName": "",
                              "profileUrl": ""
                        }
                  ]
            }
            );
            setInputNewStatus({ producer: false, studio: false, actor: { 0: false }, image: { 0: false }, cateogary: false });
      }

      const post_Dvd_Title = () => {
            Post_Dvd_Title(dvdData)
                  .then(function (response) {
                        // handle success
                        Swal.fire(
                              'Added Sucessfully!',
                              response,
                              'success'
                        )

                        resetButtonHandler();
                  })
                  .catch(function (error) {
                        // handle error
                        console.log("Errpr");
                        console.log(error.response.data.title);
                        Swal.fire(
                              'Invalid data!! ',
                              error.response.data.title,
                              'error'
                        )
                  });
      }

      const get_producers_name = () => {
            Get_Producets_Name()
                  .then((response) => {

                        nameList.producers = response.data;
                        setNameList({ ...nameList });
                  })
                  .catch(({ response }) => {
                        alert("error in get producet name")
                  })
      }

      const get_actors_name = () => {
            Get_Actors_Name()
                  .then((response) => {

                        nameList.actors = response.data;
                        setNameList({ ...nameList });
                  })
                  .catch(({ response }) => {
                        alert("error in get actors name")
                  })

      }

      const get_studios_name = () => {
            Get_Studios_Name()
                  .then((response) => {

                        nameList.studios = response.data;
                        setNameList({ ...nameList });
                  })
                  .catch(({ response }) => {
                        alert("error in get studios name")
                  })
      }

      const get_dvd_cateogaries_name = () => {
            Get_DVD_Cateogaries_Name()
                  .then((response) => {

                        nameList.cateogary = response.data;
                        setNameList({ ...nameList });
                  })
                  .catch(({ response }) => {
                        alert("error in get cateogary name")
                  })
      }


      useEffect(() => {
            get_producers_name();
            get_actors_name();
            get_studios_name();
            get_dvd_cateogaries_name();

      }, [])

      return (
            <div id='add-dvd'>
                  <section id='add-dvd-wrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>DVDs in store</p>
                        </nav>

                        <hr />
                  </section>

                  <section>

                        <form id="add-dvd-form" className="row g-3" onSubmit={submitButtonHandler} onReset={resetButtonHandler}>
                              {/* DVD name */}
                              <div className="col-md-6">
                                    <label htmlFor="inputDvdName" className="form-label">DvD Name</label>
                                    <input type="text" className="form-control input--design" id="inputDvdName" name='dvdName' value={dvdData.dvdName} onChange={inputChangeHandler} required />
                              </div>
                              {/* release date */}
                              <div className="col-md-6">
                                    <label htmlFor="inputReleaseDate" className="form-label">Release Date</label>
                                    <input type="date" className="form-control input--design" id="inputReleaseDate" name='dateReleased' value={dvdData.dateReleased} onChange={inputChangeHandler} required />
                              </div>
                              {/* price */}
                              <div className="col-md-6">
                                    <label htmlFor="inputPrice" className="form-label">Price</label>
                                    <input type="number" className="form-control input--design" id="inputPrice" name='standardCharge' placeholder='Add price...'  onChange={inputChangeHandler} min={1} pattern="[1-9]+" required />
                              </div>
                              {/* penalty */}
                              <div className="col-md-6">
                                    <label htmlFor="inputPenalty" className="form-label">Penalty</label>
                                    <input type="number" className="form-control input--design" id="inputPenalty" name='penaltyCharge' placeholder='Add penalty amount...' onChange={inputChangeHandler} min={0} max={dvdData.standardCharge - 1} pattern="[0-9]+" required />
                              </div>

                              {/* producer */}
                              <section className="col-md-6" >
                                    <label htmlFor="inputProducer" className="form-label">Producer</label>
                                    <div className='d-flex gap-3'>
                                          {(!inputNewStatus.producer)
                                                ? (
                                                      <>
                                                            {/* existing producer */}
                                                            <select className="form-select input--design" name='producerNumber' id="dvdProducer" value={dvdData.dvdProducer.producerNumber} onChange={inputChangeHandler} required>
                                                                  <option value={''}>---</option>
                                                                  {nameList.producers.map(({ producerNumber, producerName }, index) => {
                                                                        return (
                                                                              <option value={producerNumber}>{producerName}</option>
                                                                        )
                                                                  })}
                                                            </select>
                                                            <img className='circle-img--button ' src={AddUserImg} alt="" onClick={() => handlerAddingNew('producer')} />
                                                      </>
                                                )
                                                : (<>
                                                      {/* new producer */}
                                                      <input className="form-control input--design" name='producerName' id="dvdProducer" placeholder='insert producer name....' value={dvdData.dvdProducer.producerName} onChange={inputChangeHandler} required />
                                                      <img className='circle-img--button' src={CrossImg} alt="" onClick={() => handlerAddingNew('producer')} />
                                                </>
                                                )
                                          }
                                    </div>
                              </section>

                              {/* studio */}
                              <section className="col-md-6" >
                                    <label htmlFor="inputProducer" className="form-label">Studio</label>
                                    <div className='d-flex gap-3'>
                                          {(!inputNewStatus.studio)
                                                ? (
                                                      <>
                                                            {/* existing studio */}
                                                            <select className="form-select input--design" name='studioNumber' id="dvdStudio" value={dvdData.dvdStudio.studioNumber} onChange={inputChangeHandler} required>
                                                                  <option value={''}>---</option>
                                                                  {nameList.studios.map(({ studioNumber, studioName }, index) => {
                                                                        return (
                                                                              <option value={studioNumber}>{studioName}</option>
                                                                        )
                                                                  })}
                                                            </select>

                                                            <img className='circle-img--button' src={AddUserImg} alt="" onClick={() => handlerAddingNew('studio')} />
                                                      </>

                                                )
                                                : (
                                                      <>
                                                            {/* new studio */}
                                                            <input className="form-control input--design" name='studioName' id="dvdStudio" placeholder='insert studio name...' value={dvdData.dvdStudio.studioName} onChange={inputChangeHandler} required />
                                                            <img className='circle-img--button' src={CrossImg} alt="" onClick={() => handlerAddingNew('studio')} />
                                                      </>
                                                )
                                          }
                                    </div>
                              </section>

                              {/* actor */}
                              <section className="col-md-6" >
                                    <label htmlFor="inputActor" className="form-label">
                                          Actor
                                          <a style={{ color: 'blue', paddingBottom: '0rem', paddingLeft: '0.2rem', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => addActorHandler('more')}> add more</a>
                                          <a style={{ color: 'blue', paddingBottom: '0rem', paddingLeft: '0.2rem', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => addActorHandler('less')}> add Less</a>
                                    </label>

                                    {/* loop to add multiple actor */}
                                    {[...Array(numberOFActors)].map((a, index) => {
                                          return (
                                                <div className={`d-flex gap-3 ${(index > 0) && 'mt-2'}`} key={`actorInput${index}`}>
                                                      {(!inputNewStatus.actor[index])
                                                            ? (
                                                                  <>
                                                                        {/* existing actor */}
                                                                        <select className="form-select input--design" name='actorNumber' id="actors" value={dvdData.actors[index].actorNumber} onChange={(e) => inputChangeHandler(e, index)} required>
                                                                              <option value={''}>---</option>
                                                                              {nameList.actors.map(({ actorId, actorName }, index) => {
                                                                                    return (
                                                                                          <option value={actorId}>{actorName}</option>
                                                                                    )
                                                                              })}
                                                                        </select>
                                                                        <img className='circle-img--button' src={AddUserImg} alt="" onClick={() => handlerAddingNew('actor', index)} />
                                                                  </>
                                                            )
                                                            : (
                                                                  <>
                                                                        {/* new actor */}
                                                                        <input className="form-control input--design" name='actorName' id="actors" placeholder='insert Name....' value={dvdData.actors[index].actorName} onChange={(e) => inputChangeHandler(e, index)} required />
                                                                        <input className="form-control input--design" name='actorLastName' id="actors" placeholder='insert last Name....' value={dvdData.actors[index].actorLastName} onChange={(e) => inputChangeHandler(e, index)} required />
                                                                        <input className="form-control input--design" name='profileUrl' id="actors" placeholder='insert url....' value={dvdData.actors[index].profileUrl} onChange={(e) => inputChangeHandler(e, index)} />

                                                                        <img className='circle-img--button' src={CrossImg} alt="" onClick={() => handlerAddingNew('actor', index)} />
                                                                  </>
                                                            )
                                                      }
                                                </div>
                                          )
                                    })}

                              </section>


                              {/* category */}
                              <section className="col-md-6" >
                                    <label htmlFor="inputCateogary" className="form-label">Cateogary</label>
                                    <div className='d-flex gap-3'>
                                          {(!inputNewStatus.cateogary)
                                                ? (
                                                      <>
                                                            {/* existing cateogary */}
                                                            <select className="form-select input--design" name='categoryNumber' id="dvdCategory" value={dvdData.dvdCategory.categoryNumber} onChange={inputChangeHandler} required>
                                                                  <option value={''}>---</option>
                                                                  {nameList.cateogary.map(({ categoryNumber, categoryDescription }, index) => {
                                                                        return (
                                                                              <option value={categoryNumber}>{categoryDescription}</option>
                                                                        )
                                                                  })}
                                                            </select>
                                                            <img className='circle-img--button' src={AddUserImg} alt="" onClick={() => handlerAddingNew('cateogary')} />
                                                      </>
                                                )
                                                : (
                                                      <>
                                                            {/* new cateogary */}
                                                            <input className="form-contro input--design" name='categoryDescription' id="dvdCategory" placeholder='insert category name..' style={{ width: '69.6%' }} value={dvdData.dvdCategory.categoryDescription} onChange={inputChangeHandler} required />

                                                            <input className='mt-2 input--design' type="checkbox" name='ageRestricted' id="dvdCategory" checked={dvdData.dvdCategory.ageRestricted} onChange={inputChangeHandler} />
                                                            <label htmlFor="checkBox">Is age restricted</label>
                                                            <img className='circle-img--button input--design' src={CrossImg} alt="" onClick={() => handlerAddingNew('cateogary')} />
                                                      </>
                                                )
                                          }
                                    </div>
                              </section>

                              {/* image */}
                              <section className="col-md-6" >
                                    <label htmlFor="inputImage" className="form-label">
                                          Image
                                    </label>

                                    <div className={`d-flex gap-3 'mt-2'}`} key={`imageInput`}>
                                          <input type="file" accept="image/*" className="form-control input--design" name='image64' id="dvDimages" placeholder='Add images...' multiple onChange={(e) => addImage(e)} />
                                    </div>
                              </section>

                              {/* buttons */}
                              <div className="col-md-6 mt-5  d-flex gap-5" style={{ height: '2.6rem' }}>
                                    <button type="submit" className="save-dvd-btn btn btn-primary">Submit</button>
                                    <button type="reset" className=" save-dvd-btn btn btn-danger">Reset</button>
                              </div>


                        </form>
                  </section>
            </div>
      )
}

export default AddDVD