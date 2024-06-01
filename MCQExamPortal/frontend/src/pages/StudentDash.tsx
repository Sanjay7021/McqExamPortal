import { useEffect, useState } from "react";
import createExamServices from "../service/createExamService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import createFinalResultServices from "../service/finalResultServices";
import ConfirmationDialog from "../components/ConfirmationDialog";
// import {createBrowserHistory} from 'react-router-dom';
export default function Home() {

  const [examData, setExamData]:any = useState();
  const [resultData, setResultData]:any = useState();
  const [open, setOpen]:any = useState(false);
    const getExamData = () => {
        createExamServices.getExams().then((res)=>{
            // console.log(res.data);
            // const data:any = JSON.parse(String(localStorage.getItem('user')));
            // console.log(data._id);
            // const matched = res.data.filter((item:any)=> item.createdBy == data._id);
            setExamData(res.data)
        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }
    const getResultData = () => {
        createFinalResultServices.getFinalResult().then((res)=>{
            // console.log(res.data);
            
            setResultData(res.data)
        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }

    useEffect(()=>{
        getResultData();
    },[])
    useEffect(()=>{
        getExamData();
    },[])


    const isExamAllreadyGiven = (id:any) => {
        const name = resultData ? resultData.findIndex((item:any)=> item.ExamID._id == id):'';
        console.log("name",name);
        if(name == -1){
            return false;
        }
        return true;
        
    }
    const navigate = useNavigate();
    // const [duration, setDuration] = useState();
    const seconds = (duration:any)=> {
        const time = duration.split(":");
            const hh = time[0];
            const mm = time[1];
    
            let total = (hh * 60 * 60) + (mm * 60);
            console.log("my time",total);
            return total
    }

    // const location = useLocation();
    // console.log(location);

    // useEffect(()=>{
    //     if(location.pathname == '/StudentDashboard')
    //     {
    //         // 
    //         return;

    //     }
    // })
    
    // let history = createBrowserHistory();
// history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
// });

  return (
    <div>
      <ToastContainer />
       <div><br /><br /><br />
                <h2 style={{ color: "blue", marginLeft: "750px" }}>Exam Schedules</h2>
                <table className="table table-striped w-75 " align="center">
                    <thead>
                        <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Exam Topic</th>
                            <th scope="col">No Of Que</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Marks / Que.</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Action</th>
                            {/* <th scope="col"></th> */}
                        </tr>
                    </thead>
                    <tbody className="body" id="tableResult">

                        {!examData  ? <tr><h3>Data Not Found<img src="/Preloader_2.gif" width="34" height="40" className="d-inline-block align-top"
                            alt="" /></h3></tr> : examData.map((value: any, key: any) => (
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td>{value.subID.subName}</td>
                                    <td>{value.subTitleID.titleName}</td>
                                    <td>{value.totalQue}</td>
                                    <td>{value.duration}</td>
                                    <td>{value.marksPerQue}</td>
                                    <td>{value.totalQue * value.marksPerQue}</td>
                                    {/* <td style={{ color: value.status === 'active' ? 'green' : 'red' }}>{value.status}</td> */}
                                    <td><button className="btn btn-primary edit1" id={key} onClick={()=> navigate(`exam-started/${value._id}/duration/${seconds(value.duration)}`)} disabled={isExamAllreadyGiven(value._id)} style={{backgroundColor:isExamAllreadyGiven(value._id)?"green":""}}>{isExamAllreadyGiven(value._id)?"Finished":"Start"}</button></td>
                                </tr>))}
                    </tbody>
                </table>
            </div>
            <button onClick={()=> setOpen(true)}>Open</button>
            <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Terms & Conditions"
        description="Are you sure you want to Start a Exam. Once it started you can not give it again."
      />
    </div>
  )
}
