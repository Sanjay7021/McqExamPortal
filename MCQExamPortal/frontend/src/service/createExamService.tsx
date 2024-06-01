
import request from "./request";
const ENDPOINT = "createExam";

const createExam = async(values:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    console.log('inside');
    
    const url = `${ENDPOINT}/createExam`;
    return request.post(url, values,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res:any)=>{
        console.log("hekki",res);
        return res;
    })
}

const getExams = async()=>{
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/getExam`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const getDuration = async (ExamID:any) => {
    const AUTH_TOKEN = sessionStorage.getItem('token');
    const url = `${ENDPOINT}/getDuration/${ExamID}`;
    return request.get(url,{headers: { 'x-auth-token': AUTH_TOKEN }}).then((res)=>{
        return res;
    })
}

const createExamServices = {
    createExam,
    getExams,
    getDuration
}

export default createExamServices;
