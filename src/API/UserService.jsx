import { AXIOS, URL_GET_ACTORS_NAMES, URL_GET_AVAILABLE_DVD_BY_LASTNAME, URL_GET_DVD, URL_GET_DVD_BY_LASTNAME, URL_GET_DVD_CATEGORY_NAMES, URL_GET_DVD_DETAIL, URL_GET_MEMBERSHIP_TYPE, URL_GET_MEMBERS_DETAIL_LIST, URL_GET_PRODUCETS_NAMES, URL_GET_STUDIO_NAMES, URL_POST_DVD, URL_POST_NEWMEMBER } from "./Constant";


export const Get_DVD_Details = async ()=>{
      return await AXIOS.get(URL_GET_DVD_DETAIL);
}

export const Get_Dvd_Title = async ()=>{
      return await AXIOS.get(URL_GET_DVD);
}

export const Get_Dvd_By_Lastname = async (lastname)=>{
      return await AXIOS.get(URL_GET_DVD_BY_LASTNAME+lastname);
}

export const Get_Available_Dvd_By_Lastname = async (lastname)=>{
      return await AXIOS.get(URL_GET_AVAILABLE_DVD_BY_LASTNAME+lastname);
}

export const Post_Dvd_Title = async (dvdData)=>{
      return await AXIOS.post(URL_POST_DVD, dvdData);
}


export const Get_Membership_Type_List = async ()=>{
      return await AXIOS.get(URL_GET_MEMBERSHIP_TYPE);
}

export const Get_Members_Detail_List = async ()=>{
      return await AXIOS.get(URL_GET_MEMBERS_DETAIL_LIST);
}


export const Post_New_Member = async (memeberData)=>{
      return await AXIOS.post(URL_POST_NEWMEMBER, memeberData);
}

export const Get_Producets_Name = async ()=>{
      return await AXIOS.get(URL_GET_PRODUCETS_NAMES);
}
export const Get_Actors_Name = async ()=>{
      return await AXIOS.get(URL_GET_ACTORS_NAMES);
}
export const Get_Studios_Name = async ()=>{
      return await AXIOS.get(URL_GET_STUDIO_NAMES);
}
export const Get_DVD_Cateogaries_Name = async ()=>{
      return await AXIOS.get(URL_GET_DVD_CATEGORY_NAMES);
}
