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


const URL_GET_DVD_DETAIL ='DVDTitle/details';

const URL_GET_DVD = 'DVDTitle';
const URL_POST_DVD = 'DVDTitle';

const URL_GET_DVD_BY_LASTNAME = 'DvdTitle/byLastName/';
const URL_GET_AVAILABLE_DVD_BY_LASTNAME = 'DvdTitle/inStock/';


const URL_GET_MEMBERSHIP_TYPE ='MemberType';
const URL_POST_NEWMEMBER = 'Member';

const URL_GET_MEMBERS_DETAIL_LIST = 'Member';

const URL_GET_PRODUCETS_NAMES = 'Producer';
const URL_GET_STUDIO_NAMES = 'Studio';
const URL_GET_ACTORS_NAMES = 'Actor';
const URL_GET_DVD_CATEGORY_NAMES = 'DvdCategory';



export{
      AXIOS,

      URL_GET_DVD_DETAIL,

      URL_GET_DVD,
      URL_POST_DVD,

      URL_GET_DVD_BY_LASTNAME,
      URL_GET_AVAILABLE_DVD_BY_LASTNAME,

      URL_GET_MEMBERSHIP_TYPE,
      URL_POST_NEWMEMBER,

      URL_GET_MEMBERS_DETAIL_LIST,

      URL_GET_PRODUCETS_NAMES,
      URL_GET_STUDIO_NAMES,
      URL_GET_ACTORS_NAMES,
      URL_GET_DVD_CATEGORY_NAMES,

}