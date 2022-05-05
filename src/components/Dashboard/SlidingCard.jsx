import React, { useEffect, useState } from 'react'
import { Get_Most_Loan } from '../../API/UserService';
import { Actor1, Actor2, ExclusivesImg, GostBalloonImg, RangersImg } from '../../assets/images'
import './slidingCard.css'


const data =[{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror marathon'},
{mainImg: ExclusivesImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror first'},
{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror second'},
{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror third'},
{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror fourth'},]

function SlidingCard() {
      const [cardData, setCardData]= useState(data);

      const [mostLoanDetail, setMostLoanDetail] = useState();

      const get_most_loan = ()=>{
            Get_Most_Loan()
                  .then(({data})=>{
                        data = (data.length <4) 
                              ? [...data, ...data]
                              : data.slice(0,4)
                        

                        setMostLoanDetail(data);
                        
                  })
                  .catch(({response})=>{
                        console.log("ERROR IN get_most_loan")
                  })
      }

      useEffect(()=>{
            get_most_loan();
      },[])

      return (
            <section id='slidingCard-wrapper'>
            <span>
                  {mostLoanDetail !== undefined && mostLoanDetail.map(({dvDImage, dvDName, totalLoans,}, index)=>{
                        return(
                              <div className='card' key={`slidingCard${index}`}>
                                    <div className='top-image'>
                                          <img src={dvDImage} alt="rangers" />
                                          <aside>
                                                <span>
                                                      <img src={Actor1} alt="rangers" />
                                                      <img src={Actor2} alt="rangers" />
                                                      <img src={Actor1} alt="rangers" />
                                                </span>
                                          </aside>
                                    </div>
                                    
                                    <article>
                                          <h3>{dvDName}</h3>
                                          <p>Total Loans: {totalLoans}</p>
                                    </article>
                              </div>
                        )
                  })}
            </span>
            </section>
      )
}

export default SlidingCard