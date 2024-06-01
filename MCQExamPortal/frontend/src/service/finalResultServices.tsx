
import request from "./request";
const ENDPOINT = "finalresult";


const getFinalResult = async()=>{
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/viewResult`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const showResultsToFaculty = async() =>{
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/showResultsToFaculty`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const createFinalResultServices = {
    getFinalResult,
    showResultsToFaculty
}

export default createFinalResultServices;
