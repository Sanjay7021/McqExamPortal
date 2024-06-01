
import request from "./request";
const ENDPOINT = "subject";

const createSub = async(values:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/createsubject`;
    return request.post(url, values,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res:any)=>{
        console.log(res);
        return res;
    })
}

const getSubjects = async()=>{
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/getSubjects`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const subjectServices = {
    createSub,
    getSubjects
}

export default subjectServices;
