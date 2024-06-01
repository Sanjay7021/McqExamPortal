
import { useEffect, useState } from "react";
import createFinalResultServices from "../service/finalResultServices";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationDialog from "../components/ConfirmationDialog";
import createExamServices from "../service/createExamService";
import { useAuthContext } from "../context/auth";

export default function FacultyDash() {
  const [resultData, setResultData]: any = useState();
  const [open, setOpen]: any = useState(false);
  const [examData, setExamData]: any = useState();

  const authContext = useAuthContext();

  
  const getResultData = () => {
    createFinalResultServices.showResultsToFaculty().then((res) => {
      setResultData(res.data)
    }).catch((err) => {
      toast.error(err.response.data, { theme: "colored" });
      toast.error(err.response.data.result.errorResponse.message, { theme: "colored" });
      console.log(err);
    })
  }
  const getExamData = () => {
    createExamServices.getExams().then((res) => {
      console.log(res.data);
      setExamData(res.data)
    }).catch((err) => {
      toast.error(err.response.data, { theme: "colored" });
      toast.error(err.response.data.result.errorResponse.message, { theme: "colored" });
      console.log(err);
    })
  }

  useEffect(() => {
    getResultData();
  }, [])

  useEffect(() => {
    getExamData();
  }, []);


  const findSubName = (id: any) => {
    const name = examData ? examData.filter((item: any) => item._id == id)[0].subID.subName : '';
    console.log("name", name);
    return name

  }
  const findTopicName = (id: any) => {
    return examData ? examData.filter((item: any) => item._id == id)[0].subTitleID
      .titleName : '';
  }

  let BoostrapClass = ['primary','warning','success','danger','secondary','info','dark']

  const returnClass = (index:any) => {
    if(index > 6) return index = Math.floor((Math.random() * 7));
    // if(index > )
    return BoostrapClass[index];
  }

  // console.log( Math.floor((Math.random() * 7)));
  console.log("user id",authContext.user.id);
  

  console.log(resultData);

  return (
    <div>
      <ToastContainer />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '20px',flexWrap:'wrap',margin:'8px' }}>
        {
          examData && examData.map((item:any,index:any)=>{
            if(authContext.user.id == item.createdBy){
              return <div className={`card border-${returnClass(index)} mb-3`} style={{ maxWidth: "200rem",margin:"8px" }}>
            <div className="card-header">{findSubName(item._id)}</div>
            <div className={`card-body text-${returnClass(index)}`}>
              <h5 className="card-title">{findTopicName(item._id)}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              <table className="table table-striped w-85 " align="center">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Email</th>
              <th scope="col">Total Marks / Out Of</th>
              {/* <th scope="col"></th> */}
            </tr>
          </thead>
          <tbody className="body" id="tableResult">

            {!resultData ? <tr><h3>Data Not Found<img src="/Preloader_2.gif" width="34" height="40" className="d-inline-block align-top"
              alt="" /></h3></tr> : resultData.map((value: any, key: any) => {
                if(item._id == value.ExamID._id){
                  return <tr key={key}>
                  <td>{value.updatedAt}</td>
                  <td>{value.userID.name}</td>
                  <td>{value.userID.phone}</td>
                  <td>{value.userID.email}</td>
                  <td><strong>{value.total}</strong> / <strong>{value.ExamID.totalQue * value.ExamID.marksPerQue}</strong></td>
                </tr>
                }
                })}
          </tbody>
        </table>
            
            
            </div>
          </div>
            }
              // if(authContext.user.id != item._id && index == 1){
              //   return <div><strong><h1>You havent created any exam..</h1></strong></div>
              // }
            
          })
        }
         
        
        
       
      </div>

      {/* <button onClick={() => setOpen(true)}>Open</button> */}
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
