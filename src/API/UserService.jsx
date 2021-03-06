import{ AXIOS, ULR_GET_DVD_NAME_LIST, URL_DELETE_NEW_DVD_COPY, URL_GET_ACTORS_NAMES,
       URL_GET_ALL_DVD_COPIES, URL_GET_AVAILABLE_DVD_BY_LASTNAME, URL_GET_DVD, URL_GET_DVD_BY_LASTNAME, 
       URL_GET_DVD_CATEGORY_NAMES, URL_GET_DVD_COPY_FOR_LOAN, URL_GET_DVD_DETAIL, URL_GET_LOAN_TYPE_LIST, 
       URL_GET_MEMBERSHIP_TYPE, URL_GET_MEMBERS_DETAIL_LIST, URL_GET_PRODUCETS_NAMES, URL_GET_STUDIO_NAMES, 
       URL_POST_DVD, URL_POST_NEWMEMBER, URL_POST_NEW_DVD_COPY, URL_MEMBER_WITH_LOANS, URL_POST_LOAN,
      URL_GET_LAST_LOAN_BY_ID, URL_GET_LOANS, URL_POST_LOAN_RETURN_BY_ID, GET_INACTIVE_MEMBER_DETAIL, URL_GET_ALL_OLD_DVDS,
      URL_DELET_ALL_OLD_DVDS, URL_CURRENT_LOANS, URL_GET_DVD_UNPOPULAR, URL_GET_LAST_31_DAYS_LOAN_BY_LASTNAME, URL_GET_LAST_31_DAYS_LOAN_By_ID,
       URL_POST_NEW_REGISTER_USER, URL_GET_ALL_USERS_DETAIL, URL_POST_LOGIN, URL_CHANGE_PASSWORD_BY_ADMIN, URL_POST_CHANGE_OWN_PASSWORD, URL_POST_CHANGE_INFO_BY_ADMIN, URL_GET_CURRENT_USER_PROFILE_DETAIL, URL_POST_CURRENT_USER_PROFILE_DETAIL, URL_GET_MOST_LOAN, URL_POST_LOAN_TYPE
      } from "./Constant";


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


export const Get_All_Dvd_Copies = async ()=>{
      return await AXIOS.get(URL_GET_ALL_DVD_COPIES);
}

export const Post_New_Dvd_Copy = async (newDvdData)=>{
      return await AXIOS.post(URL_POST_NEW_DVD_COPY, newDvdData);
}
export const Delete_Dvd_Copy_By_Id = async (dvdId)=>{
      return await AXIOS.delete(URL_DELETE_NEW_DVD_COPY+dvdId);
}


export const Get_Dvd_Copy_For_Loan = async ()=>{
      return await AXIOS.get(URL_GET_DVD_COPY_FOR_LOAN);
}

export const Get_Loan_Type_List = async ()=>{
      return await AXIOS.get(URL_GET_LOAN_TYPE_LIST);
}

export const Post_Loan = async (loanData)=>{
      return await AXIOS.post(URL_POST_LOAN, loanData);
}

export const Get_Loans = async ()=>{
      return await AXIOS.get(URL_GET_LOANS);
}

export const Post_Loan_Return_By_Id= async (loanId)=>{
      return await AXIOS.post(URL_POST_LOAN_RETURN_BY_ID+loanId);
}

export const Get_Dvd_Name_List = async ()=>{
      return await AXIOS.get(ULR_GET_DVD_NAME_LIST);
}

export const Post_Dvd_Title = async (dvdData)=>{
      return await AXIOS.post(URL_POST_DVD, dvdData);
}

export const Get_All_Old_Dvds = async ()=>{
      return await AXIOS.get(URL_GET_ALL_OLD_DVDS);
}


export const Delete_All_Old_Dvds = async ()=>{
      return await AXIOS.delete(URL_DELET_ALL_OLD_DVDS);
}

export const Get_Dvd_Unpopular = async ()=>{
      return await AXIOS.get(URL_GET_DVD_UNPOPULAR);
}


export const Get_Membership_Type_List = async ()=>{
      return await AXIOS.get(URL_GET_MEMBERSHIP_TYPE);
}

export const Get_Members_Detail_List = async ()=>{
      return await AXIOS.get(URL_GET_MEMBERS_DETAIL_LIST);
}


export const Get_Inactive_Members_Detail_List = async ()=>{
      return await AXIOS.get(GET_INACTIVE_MEMBER_DETAIL);
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

export const Get_member_with_loans = async () => {
      return await AXIOS.get(URL_MEMBER_WITH_LOANS);
}


export const Get_Last_Loan_By_Id = async (copyId) => {
      return await AXIOS.get(URL_GET_LAST_LOAN_BY_ID+copyId);
}

export const Get_current_loans = async () => {
      return await AXIOS.get(URL_CURRENT_LOANS)
}

export const Get_last_31_Days_Loan_By_LastName = async ({memberDetail}) =>{
      return await AXIOS.get(URL_GET_LAST_31_DAYS_LOAN_BY_LASTNAME+memberDetail)
}

export const Get_last_31_Days_Loan_By_ID = async ({memberDetail}) =>{
      return await AXIOS.get(URL_GET_LAST_31_DAYS_LOAN_By_ID+memberDetail)
}

export const Post_Register_New_User = async ({newUserDetail}) =>{
      return await AXIOS.post(URL_POST_NEW_REGISTER_USER,newUserDetail)
}
export const Get_All_Users_Detail = async () =>{
      return await AXIOS.get(URL_GET_ALL_USERS_DETAIL)
}

export const Post_Change_User_Password = async (newPassword) =>{
      return await AXIOS.post(URL_CHANGE_PASSWORD_BY_ADMIN, newPassword)
}

export const Post_Change_Own_Password = async (newPassword)=>{
      return await AXIOS.post(URL_POST_CHANGE_OWN_PASSWORD, newPassword)
}

export const Post_Login = async (loginDetail) =>{
      return await AXIOS.post(URL_POST_LOGIN, loginDetail)
}

export const Post_Change_User_Info_By_Admin = async (userDetail) =>{
      return await AXIOS.post(URL_POST_CHANGE_INFO_BY_ADMIN, userDetail)
}

export const Get_Current_User_Profile = async () =>{
      return await AXIOS.get(URL_GET_CURRENT_USER_PROFILE_DETAIL)
}

export const Post_Current_User_Profile = async (userDetail) =>{
      return await AXIOS.post(URL_POST_CURRENT_USER_PROFILE_DETAIL, userDetail)
}


export const Get_Most_Loan = async () =>{
      return await AXIOS.get(URL_GET_MOST_LOAN)
}

export const Post_Loan_Type =  async (typedata) =>{
      return await AXIOS.post(URL_POST_LOAN_TYPE, typedata)
}