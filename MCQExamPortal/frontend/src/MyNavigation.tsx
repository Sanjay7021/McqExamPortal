import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDash from "./pages/StudentDash";
import FacultyDash from "./pages/FacultyDash";
import CreateExam from "./pages/CreateExam";
import AddQue from "./pages/AddQue";
import StudentExamDash from "./pages/StudentExamDash";
import StudentResult from "./pages/StudentResult";


function MyNavigation(){
    const authContext = useAuthContext();
    const Redirect = <Navigate to={"/login"}/>;
    return(
        <Routes>
        <Route path="/StudentDashboard" element={(authContext.user.id && authContext.user.role == 'student')?<StudentDash/>: Redirect}/>
        <Route path="/FacultyDashboard" element={(authContext.user.id && authContext.user.role == 'faculty')?<FacultyDash/>: Redirect}/>
        <Route path="/login" element={<Login/>}/>
        <Route path = "/register" element={!authContext.user.id?<Register/>:Redirect}  />
        <Route path = "/createExam" element={authContext.user.id?<CreateExam/>:Redirect}  />
        <Route path = "/Add-Questions" element={authContext.user.id?<AddQue/>:Redirect}  />
        <Route path = "StudentDashboard/exam-started/:examId/duration/:duration1" element={authContext.user.id?<StudentExamDash />:Redirect}  />
        <Route path="/results" element={(authContext.user.id)?<StudentResult/>: Redirect}/>
        
      </Routes>
    )
}

export default MyNavigation;