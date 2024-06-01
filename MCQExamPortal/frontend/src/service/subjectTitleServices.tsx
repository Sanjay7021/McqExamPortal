
import request from "./request";
const ENDPOINT = "title";


const createTitle = async(values:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/addTitle`;
    return request.post(url, values,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res:any)=>{
        console.log(res);
        return res;
    })
}

const getTitle = async()=>{
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/getTitle`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const titleServices = {
    createTitle,
    getTitle
}

export default titleServices;
