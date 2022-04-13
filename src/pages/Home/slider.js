
import { SliderImg1, SliderImg2, SliderImg3 } from "../../assets/images";

const image= [
      SliderImg1,
      SliderImg2,
      SliderImg3
]
export function homeSlider(){
      let index = 1;
      setInterval(()=>{
            document.getElementById('home-header').style.backgroundImage = `url(${image[(index>=image.length) ?index=0 :index++]})`
      },5000)

}