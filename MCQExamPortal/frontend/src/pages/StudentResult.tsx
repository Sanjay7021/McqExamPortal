import { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import createFinalResultServices from "../service/finalResultServices";
import createExamServices from "../service/createExamService";

export default function StudentResult() {
    const [resultData, setResultData]:any = useState();
    const [examData, setExamData]:any = useState();


    const getResultData = () => {
        createFinalResultServices.getFinalResult().then((res)=>{
            console.log("from result",res.data);
            
            setResultData(res.data)
        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }
    const getExamData = () => {
        createExamServices.getExams().then((res)=>{
            console.log(res.data);
            setExamData(res.data)
        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }

    useEffect(()=>{
        getExamData();
    },[]);

    useEffect(()=>{
        getResultData();
    },[])

    const findSubName = (id:any) => {
        const name = examData? examData.filter((item:any)=> item._id == id)[0].subID.subName:'';
        console.log("name",name);
        return name
        
    }
    const findTopicName = (id:any) => {
        return examData?examData.filter((item:any)=> item._id == id)[0].subTitleID
        .titleName:'';
    }

    console.log("from result page",resultData);
    console.log("from result page",examData);
    
  return (
    <div>
    <ToastContainer />
    <div><br /><br /><br />
                <h2 style={{ color: "blue", marginLeft: "750px" }}>Your Result</h2>
                <table className="table table-striped w-75 " align="center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Exam Topic</th>
                            {/* <th scope="col">No Of Que</th> */}
                            {/* <th scope="col">Duration</th> */}
                            <th scope="col">Marks / Que.</th>
                            <th scope="col">MCQ Marks</th>
                            {/* <th scope="col">Action</th> */}
                            {/* <th scope="col"></th> */}
                        </tr>
                    </thead>
                    <tbody className="body" id="tableResult">

                        {resultData == null ? <tr><h3>Data Not Found<img src="/Preloader_2.gif" width="34" height="40" className="d-inline-block align-top"
                            alt="" /></h3></tr> : resultData.map((value: any, key: any) => (
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td>{findSubName(value.ExamID._id)}</td>
                                    <td>{findTopicName(value.ExamID._id)}</td>
                                    {/* <td>{value.ExamID.totalQue}</td> */}
                                    {/* <td>{value.duration}</td> */}
                                    <td>{value.ExamID.marksPerQue}</td>
                                    <td>{value.total}</td>
                                    {/* <td style={{ color: value.status === 'active' ? 'green' : 'red' }}>{value.status}</td> */}
                                    {/* <td><button className="btn btn-primary edit1" id={key} onClick={()=> navigate(`exam-started/${value._id}`)}>Start</button></td> */}
                                </tr>))}
                    </tbody>
                </table>
            </div>


  </div>


  )
}
