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

const URL_GET_ALL_OLD_DVDS = 'DvdCopy/old';
const URL_DELET_ALL_OLD_DVDS = 'DvdCopy/deleteAllOld';

const URL_GET_DVD_COPY_FOR_LOAN =  '/DvdCopy/forLoan';
const URL_GET_LOAN_TYPE_LIST = 'LoanType/forLoan';

const URL_POST_LOAN = 'Loan';
const URL_GET_LOANS = 'Loan';
const URL_GET_LAST_LOAN_BY_ID = 'DvdCopy/lastLoan/';
const URL_POST_LOAN_RETURN_BY_ID = 'Loan/return/';

const URL_GET_MEMBERSHIP_TYPE ='MemberType';
const URL_POST_NEWMEMBER = 'Member';
const GET_INACTIVE_MEMBER_DETAIL = 'Member/nonActive';

const URL_GET_MEMBERS_DETAIL_LIST = 'Member';

const URL_GET_PRODUCETS_NAMES = 'Producer';
const URL_GET_STUDIO_NAMES = 'Studio';
const URL_GET_ACTORS_NAMES = 'Actor';
const URL_GET_DVD_CATEGORY_NAMES = 'DvdCategory';


const URL_MEMBER_WITH_LOANS = 'Member/memberWithLoans';
const ULR_GET_DVD_NAME_LIST = 'DvdTitle/forCopy';

const URL_CURRENT_LOANS = 'Loan/notReturned';


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

    URL_GET_ALL_OLD_DVDS,
    URL_DELET_ALL_OLD_DVDS,
    
    URL_GET_DVD_COPY_FOR_LOAN,
    URL_GET_LOAN_TYPE_LIST,
    URL_POST_LOAN,
    URL_GET_LOANS,

    URL_GET_MEMBERSHIP_TYPE,
    URL_POST_NEWMEMBER,
    GET_INACTIVE_MEMBER_DETAIL,
    URL_GET_MEMBERS_DETAIL_LIST,

    URL_GET_PRODUCETS_NAMES,
    URL_GET_STUDIO_NAMES,
    URL_GET_ACTORS_NAMES,
    URL_GET_DVD_CATEGORY_NAMES,

    ULR_GET_DVD_NAME_LIST,
    URL_MEMBER_WITH_LOANS,

    URL_GET_LAST_LOAN_BY_ID,
    URL_POST_LOAN_RETURN_BY_ID,

    URL_CURRENT_LOANS,

}