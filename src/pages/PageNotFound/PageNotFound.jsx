import React from 'react'
import { PageNotFoundGif } from '../../assets/images'

function PageNotFound() {
  return (
    <div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center'}}>
          <img src={PageNotFoundGif} alt="not-found img" style={{objectFit:'cover'}} />
    </div>
  )
}

export default PageNotFound