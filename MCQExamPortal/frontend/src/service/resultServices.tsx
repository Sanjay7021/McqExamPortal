
import request from "./request";
const ENDPOINT = "result";

const createResult = async(values:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/createResult`;
    return request.post(url, values,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res:any)=>{
        console.log(res);
        return res;
    })
}

const storeResult = async(values:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/storeResult`;
    return request.post(url, values,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res:any)=>{
        console.log(res);
        return res;
    })
}


const ResultServices = {
    createResult,
    // ?getSubjects
    storeResult
}

export default ResultServices;
