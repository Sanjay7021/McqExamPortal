
import request from "./request";
const ENDPOINT = "user";

const login = async(values:any) => {
    const url = `${ENDPOINT}/login`;
    return request.post(url, values).then((res:any)=>{
        console.log(res.data.foundData[0]);
        
        return res;
    })
}

const register = async(values:any)=>{
    const url = `${ENDPOINT}/createUser`;
    return request.post(url, values).then((res)=>{
        return res;
    })
}

const authService = {
    login,
    register,
}

export default authService;
