import React, { useEffect, useState } from 'react'
import { Get_Most_Loan } from '../../API/UserService';
import { first, second,third, fourth } from '../../assets/images'
import './slidingCard.css'




function SlidingCard() {

      const position_list = [first, second, third, fourth];

      const [mostLoanDetail, setMostLoanDetail] = useState();

      const get_most_loan = ()=>{
            Get_Most_Loan()
                  .then(({data})=>{
                        data = (data.length <4) 
                              ? [...data, ...data]
                              : data
                        

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
                                                      <img class="position-img" src={position_list[index]} alt="rangers" />
                                                   
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