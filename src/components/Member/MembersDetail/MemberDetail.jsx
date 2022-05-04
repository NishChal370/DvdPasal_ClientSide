import React from 'react'
import { useLocation } from 'react-router-dom'

function MemberDetail() {
  const {state} = useLocation();


  return (
    <div id='memberDetail' style={{marginTop:'2rem'}}>
      
      <section id='member-detail-wrrapper'>
        {console.log(state)}
        <nav>
          <p className='fw-bolder fs-1 moving-text---effect'>Member Detail</p>
        </nav>
        <hr />

        <div>

        </div>
      </section>
    </div>

  )
}

export default MemberDetail