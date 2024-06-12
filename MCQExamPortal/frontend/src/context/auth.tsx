

import  {useState,useEffect, useContext, createContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import shared from "../utils/shared";

const initailUserValue = {
    email: "",
    name: "",
    id:0,
    password: '',
    phone:'',
    address:'',
    role: '',
    roleId:0,
}
let _flag:any = 0;
const initialState = {
    setUser: (x:any)=>{},
    user: initailUserValue,
    signOut: ()=>{},
    setFlag:(x:number)=>{},
    _flag
}

const authContext = createContext(initialState);

export const AuthWrapper = ({children}:{children:any})=> {
    const[user, _setUser] = useState(initailUserValue);
    const [flag,_setFlag] = useState(_flag);
     const navigate = useNavigate();
    const {pathname} = useLocation();


useEffect(()=>{
    const user:any = localStorage.getItem("user")
    const str = JSON.parse(user) || initailUserValue;
    let flag = 0;
    if(str.role == 'student'){
        flag = 1;
    }else if(str.role == 'faculty'){
        flag = 2
    }else{
        flag = 3;
    }

    let u:any = {
    email: str.email,
    name: str.name,
    id:str._id,
    password: str.password,
    phone:str.phone,
    address:str.address,
    role: str.role,
    roleId:flag,
    }
    console.log("from auth",str);

    
    if(u.id){
        _setUser(u);
    }
        if(!u._id){ 
            navigate("/login");
        }
},[]);

useEffect(()=>{
    if(pathname === "/login" && user.role == 'student'){
        navigate("/StudentDashboard");
    }else if(pathname === "/login" && user.role == 'faculty'){
        navigate("/FacultyDashboard");
    }
    if(!user.id){
        return;
    }
    const location = localStorage.getItem('location')
    if(pathname == location){
        setFlag(1);
    }
    if(pathname != location){
        setFlag(0);
    }
    // if(pathname === '/')
   
},[user,pathname])

const setUser = (user:any)=>{
    let flag = 0;
    if(user.role == 'student'){
        flag = 1;
    }else if(user.role == 'faculty'){
        flag = 2
    }else{
        flag = 3;
    }

    let u:any = {
    email: user.email,
    name: user.name,
    id:user._id,
    password: user.password,
    phone:user.phone,
    address:user.address,
    role: user.role,
    roleId:flag,
    }
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(u);
}

const signOut = ()=>{
    _setUser(initailUserValue);
    localStorage.removeItem("user");
    navigate("/login")
}

const setFlag =  (n:number) =>{
    _setFlag(n);
    _flag = n;
}

const value:any = {
    user,
    setUser,
    signOut,
    setFlag,
    _flag
}

return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuthContext = ()=>{
    return useContext(authContext);
}   