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


const URL_GET_ALL_DVD_COPIES ='DvdCopy';
const URL_POST_NEW_DVD_COPY = 'DvdCopy';
const URL_DELETE_NEW_DVD_COPY = 'DvdCopy?copyId=';


const URL_GET_DVD_COPY_FOR_LOAN =  '/DvdCopy/forLoan';
const URL_GET_LOAN_TYPE_LIST = 'LoanType/forLoan';

const URL_GET_MEMBERSHIP_TYPE ='MemberType';
const URL_POST_NEWMEMBER = 'Member';

const URL_GET_MEMBERS_DETAIL_LIST = 'Member';

const URL_GET_PRODUCETS_NAMES = 'Producer';
const URL_GET_STUDIO_NAMES = 'Studio';
const URL_GET_ACTORS_NAMES = 'Actor';
const URL_GET_DVD_CATEGORY_NAMES = 'DvdCategory';


const ULR_GET_DVD_NAME_LIST = 'DvdTitle/forCopy';


export{
      AXIOS,

      URL_GET_DVD_DETAIL,

      URL_GET_DVD,
      URL_POST_DVD,

      URL_GET_DVD_BY_LASTNAME,
      URL_GET_AVAILABLE_DVD_BY_LASTNAME,

      URL_GET_ALL_DVD_COPIES,
      URL_POST_NEW_DVD_COPY,
      URL_DELETE_NEW_DVD_COPY,

      URL_GET_DVD_COPY_FOR_LOAN,
      URL_GET_LOAN_TYPE_LIST,

      URL_GET_MEMBERSHIP_TYPE,
      URL_POST_NEWMEMBER,

      URL_GET_MEMBERS_DETAIL_LIST,

      URL_GET_PRODUCETS_NAMES,
      URL_GET_STUDIO_NAMES,
      URL_GET_ACTORS_NAMES,
      URL_GET_DVD_CATEGORY_NAMES,

      ULR_GET_DVD_NAME_LIST,

}