import axios from "axios";


const AXIOS = axios.create({
    baseURL: "https://localhost:7091/api/",
    headers:{
        Authorization: localStorage.getItem('access_token')
            ?'Bearer '+ localStorage.getItem('access_token')
            :null,
        'Content-Type': 'application/json',
        accept:'application/json',
    },
});


const URL_POST_DVD = 'DVDTitle';

const URL_GET_PRODUCETS_NAMES = 'Producer';
const URL_GET_STUDIO_NAMES = 'Studio';
const URL_GET_ACTORS_NAMES = 'Actor';
const URL_GET_DVD_CATEGORY_NAMES = 'DvdCategory';


export{
      AXIOS,
      URL_POST_DVD,
      URL_GET_PRODUCETS_NAMES,
      URL_GET_STUDIO_NAMES,
      URL_GET_ACTORS_NAMES,
      URL_GET_DVD_CATEGORY_NAMES,

}