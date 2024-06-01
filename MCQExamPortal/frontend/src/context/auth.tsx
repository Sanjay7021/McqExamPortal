

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

const initialState = {
    setUser: (x:any)=>{},
    user: initailUserValue,
    signOut: ()=>{},
}

const authContext = createContext(initialState);

export const AuthWrapper = ({children}:{children:any})=> {
    const[user, _setUser] = useState(initailUserValue);
    const navigate = useNavigate();
    const {pathname} = useLocation();


useEffect(()=>{
    const user:any = localStorage.getItem("user")
    const str = JSON.parse(user) || initailUserValue;
    if(str.id){
        _setUser(str);
    }
    if(!str.id){
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
    const access = shared.hasAccess(pathname,user);
    if(!access){
        toast.warning("Sorry, you are not authorized to access this page");
        if(user.role == "student"){
            navigate("/StudentDashboard")
        }else{
            navigate("/FacultyDashboard")
        }
        return;
    }
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

const value:any = {
    user,
    setUser,
    signOut,
}

return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuthContext = ()=>{
    return useContext(authContext);
}