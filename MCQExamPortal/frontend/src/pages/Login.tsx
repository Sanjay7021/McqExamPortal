
// import '../pages/Login.css'
import { toast, ToastContainer } from "react-toastify";
import authService from "../service/authService";
// import { loginSchema } from "../schemas";
import "react-toastify/dist/ReactToastify.css";
import {useAuthContext } from "../context/auth";
import { useState } from "react";



function Login() {
    type userType = {
        name: string,
        email: string,
        role: string,
        password: string,
        phone: number,
        address: string,
        subName: string
      }
      // console.log(userForm);  
      const [formData, setData] = useState<userType>({
        name: "",
        email: "",
        role: "",
        password: "",
        phone: 0,
        address: "",
        subName: ""
      });

      const getData = (e: any) => {
        const { name, value } = e.target;
        setData({ ...formData, [name]: value })
      }
      const authContext = useAuthContext();
    

    // const nav =useNavigate();

    const onSubmit= (e:any) => {
        e.preventDefault();
        authService
        .login(formData).then((res)=>{
            console.log(res);
            authContext.setUser(res.data.foundData[0])
            sessionStorage.setItem('token', res.data.token);
            setTimeout(()=>{
                toast.success("Successfully logged in",{theme:"colored"});
            },2000);
        })
        .catch((err)=>{
            toast.error(err.response.data,{theme:"colored"});
            console.log(err);
        })
    }
    
    return(
        <>
        <ToastContainer />
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'40px'}}>
        <form onSubmit={onSubmit}>
          <h3 style={{ alignItems: "center" }}>Login User</h3>

          <div className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='email' value={formData.email} onChange={getData}
              placeholder="Enter Email" />
          </div>
          <div className="form-group center">
            <label >Password:</label>
            <input type="password" className="form-control create_name" id="formGroupExampleInput" name='password' value={formData.password} onChange={getData}
              placeholder="Enter Passsword" />
          </div><br />
          <button type="submit" className="btn btn-success" id="create">Login</button>
        </form> 
        </div>
        </>
    )
}
export default Login;