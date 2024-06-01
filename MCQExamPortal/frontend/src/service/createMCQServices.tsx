
import request from "./request";
const ENDPOINT = "MCQ";

const createMCQ = async(values:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    console.log('inside');
    
    const url = `${ENDPOINT}/createMCQ`;
    return request.post(url, values,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res:any)=>{
        console.log("hekki",res);
        return res;
    })
}

const getMCQ = async()=>{
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/getMCQ`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const createMCQervices = {
    createMCQ,
    getMCQ
}

export default createMCQervices;
