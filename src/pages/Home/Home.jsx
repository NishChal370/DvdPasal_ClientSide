import React, { useEffect } from 'react';
import './home.css';
import { homeSlider } from './slider';
import { SliderImg1, logo, GostBalloonImg, ExclusivesImg, PlaylistsImg, BeatsImg, TrialImg } from '../../assets/images';


function Home() {

  useEffect(()=>{
    homeSlider()
  },[])
  return (
    <div id='home'>
    <header id='home-header' style={{backgroundImage:`url(${SliderImg1})`, backgroundSize: 'cover', height:'100vh'}}>
      <nav id='home-nav' className='navbar navbar-expand-lg '>
        <h3>DVD Store</h3>
        <aside>
          <p>Overview</p>
          <p>Memebership</p>
          <p>Free Trial</p>
        </aside>
      </nav>

      <div className='center'>
        <img src={logo} alt="logo" />
        <p>Never stop playing.</p>
        <p>Try it free for three months*</p>
      </div>
    </header>

    <main id='home-main' >
      {
        [
          {bgImg:GostBalloonImg, heading:'Experience', subHeading: 'A new design that just flows.', desc:'With a fresh look and enhanced features, Apple Music makes it easier than ever to find music you love, listen to live radio broadcasting worldwide, and get recommendations from experts.'},
          {bgImg:ExclusivesImg, heading:'Premiering on Apple Music', subHeading: 'Hear it here. First.', desc:'Be the first to hear songs and albums from top artists, emerging acts, and more. You’ll also enjoy music videos, concert films, and live shows created just for Apple Music.'},
          {bgImg:PlaylistsImg, heading:'Songs and Playlists', subHeading: 'The music you love now. The music you’ll love next.', desc:'All your music, no matter where it came from, lives in your Apple Music library. And we’ve made it easier than ever to search, explore, and listen to all of it. But we’ve also made it easy to find new music. Our team of experts — people who live and breathe music — scour the globe to find the artists, songs, and albums you’ll love tomorrow.'},
          {bgImg:BeatsImg, heading:'Radio', subHeading: 'The best DJs on the planet. Broadcasting worldwide.', desc:'Beats 1 celebrates the best new music every day. Listen to original shows hosted by some of the biggest artists and DJs from around the world — all for free. Miss a show? If you’re a member, you can listen to any past program on demand. Into a specific genre? Members can choose from a wide range of music-only stations, each expertly curated and free of ads.'},
          {bgImg:TrialImg, heading:'Take Apple Music for a spin.', subHeading: '', desc:'Experience Apple Music for three months, free. An individual membership lets you enjoy all of Apple Music on all your devices. A family plan lets you include up to six people. There’s even a membership just for college students.'},
        ].map((data, index)=>{ return(
          <section key={`heading${index}`} style={{backgroundImage:`url(${data.bgImg})`, backgroundSize: 'cover', height:'100vh'}}>
            <div>
              <p>{data.heading}</p>
              <p>{data.subHeading}</p>
              <p>{data.desc}</p>
            </div>
          </section>
        )
        })
      }
    </main>

    <footer id='home-footer'>
      <section>
        <div>
          <p>* Assistant and Manager. Sign-up required.</p>
          <hr />
          <p>More ways to shop: Visit an <span style={{color:'blue'}}>DVD Store</span>, call 1-800-MY-DVD, or <span style={{color:'blue'}}>find a reseller.</span></p>
          <hr />
          <p>Copyright © 2016 DVD Inc. All rights reserved.</p>
          
        </div>
      </section>
    </footer>
    </div>
  )
}

export default Home