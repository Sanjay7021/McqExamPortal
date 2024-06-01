import { useState } from "react";
// import '../pages/Register.css'
import { useNavigate } from "react-router-dom";
// import { signUpSchema } from "../schemas";
import { toast, ToastContainer } from "react-toastify";
import authService from "../service/authService";
import "react-toastify/dist/ReactToastify.css";




function Register() {
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
        const { name, value} = e.target;
        setData({ ...formData, [name]: value })
      }
    

    const nav = useNavigate();
    const onSubmit = (e:any) => {
        e.preventDefault();
        authService.register(formData).then((res:any) => {
            setTimeout(()=>{
                toast.success("Successfully Registered",{theme:"colored"});
            },1000);
            console.log(res);
            
            nav("/login");
        })
            .catch((err) => {
                console.log(err);
            })
    }
   
    return (
        <>
            <ToastContainer />
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'40px'}}>
        <form onSubmit={onSubmit}>
          <h3 style={{ alignItems: "center" }}>SIGNUP STUDENT / FACULTY</h3>

          <div className="form-group center">
            <label >Name:</label>
            <input type="text" className="form-control create_name" id="formGroupExampleInput" name='name' value={formData.name} onChange={getData}
              placeholder="Enter Name" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='email' value={formData.email} onChange={getData}
              placeholder="Enter Email" />
          </div>
          {/* <div className="form-group">
            <label>role:</label>
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='role' value={formData.role} onChange={getData}
              placeholder="Enter role" />
          </div> */}
          <div className="form-group">
          <label>Role:</label>  
            <select name="role" id="id" onChange={getData} className="form-control create_email">
                <option value="select role" disabled>Select User Role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
            </select>
          </div>
          <div className="form-group">
            <label>password:</label>
            <input type="password" className="form-control create_email" id="formGroupExampleInput2" name='password' value={formData.password} onChange={getData}
              placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label>phone:</label>
            <input type="number" className="form-control create_email" id="formGroupExampleInput2" name='phone' onChange={getData}
              placeholder="Enter phone" />
          </div>
          <div className="form-group">
            <label>address:</label>
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='address' value={formData.address} onChange={getData}
              placeholder="Enter adddress" />
          </div><br />
          <button type="submit" className="btn btn-success" id="create">CREATE</button>
        </form>
      </div>
        </>
    );
}

export default Register;