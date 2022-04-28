import React, { useState } from 'react'
import { Actor1, Actor2, ExclusivesImg, GostBalloonImg, RangersImg } from '../../assets/images'
import './slidingCard.css'


const data =[{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror marathon'},
{mainImg: ExclusivesImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror first'},
{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror second'},
{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror third'},
{mainImg: RangersImg, avtar:[Actor1, Actor2, Actor1], title:'cadaver', subTitle:'Horror fourth'},]

function SlidingCard() {
      const [cardData, setCardData]= useState(data);

      return (
            <section id='slidingCard-wrapper'>
            <span>
                  {cardData.map(({mainImg, avtar, title, subTitle}, index)=>{
                        return(
                              <div className='card' key={`slidingCard${index}`}>
                                    <div className='top-image'>
                                          <img src={mainImg} alt="rangers" />
                                          <aside>
                                                <span>
                                                      <img src={avtar[0]} alt="rangers" />
                                                      <img src={avtar[1]} alt="rangers" />
                                                      <img src={avtar[2]} alt="rangers" />
                                                </span>
                                          </aside>
                                    </div>
                                    
                                    <article>
                                          <h3>{title}</h3>
                                          <p>{subTitle}</p>
                                    </article>
                              </div>
                        )
                  })}
            </span>
            </section>
      )
}

export default SlidingCard