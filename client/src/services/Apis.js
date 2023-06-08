import {commonrequest} from "./ApiCall";
import { BASE_URL } from "./helper";

// create api for send a data from frontent to
// backend and get a data and header value from register page

export const registerfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header)
}

export const usergetfunc=async()=>{
    return await commonrequest("GET",`${BASE_URL}/user/details`,"");
}

export const singleUsergetfunc=async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/user/${id}`,"");
}

