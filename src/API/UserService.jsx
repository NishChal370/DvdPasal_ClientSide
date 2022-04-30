import { AXIOS, URL_GET_ACTORS_NAMES, URL_GET_DVD_CATEGORY_NAMES, URL_GET_PRODUCETS_NAMES, URL_GET_STUDIO_NAMES, URL_POST_DVD } from "./Constant";


export const Post_Dvd_Title = async (dvdData)=>{
      return await AXIOS.post(URL_POST_DVD, dvdData);
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
