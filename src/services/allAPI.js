import { BASE_URL } from "./baseUrl";
import { commonAPI } from "./commonAPI";

// register
export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/register`,user,"")
}
// login
export const loginAPI = async (user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,user,"")
}


export const profilePicAPI = `${BASE_URL}/user/profilePic`

export const allUsersAPI = `${BASE_URL}/user/allUsers`

export const sendMessageRoute = `${BASE_URL}/addmsg`
export const getAllMessagesRoute = `${BASE_URL}/getmsgs`

