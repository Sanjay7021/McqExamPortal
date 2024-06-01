import { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import subjectServices from "../service/SubjectSurvices";
import titleServices from "../service/subjectTitleServices";
import createExamServices from "../service/createExamService";


export default function CreateExam() {

     type subjectType = {
        subName:string
    }
     type titleType = {
        subjectID:string,
        titleName:string
     }

     type examType = {
        subID:string,
        subTitleID:string,
        totalQue:number,
        duration:string,
        marksPerQue:number,
     }

    const [subject,setSubject] = useState<subjectType>({
        subName:''
    });

    const [title, setTitle] = useState<titleType>({
        subjectID:'',
        titleName:''
    });

    const [examForm, setExamForm] = useState<examType>({
        subID:'',
        subTitleID:'',
        totalQue:0,
        duration:'',
        marksPerQue:0
    })

    const [subjectList, setSubjectList]:any = useState();
    const [titleList, setTitleList]:any = useState();
    const [MatchedTitleList, setMatchedTitleList]:any = useState();

    const setSubValue = (e:any) => {
        const {name,value} = e.target;
        setSubject({...subject,[name]:value});
    }

    const setTitleValue = (e:any) => {
        const {name,value} = e.target;
        setTitle({...title,[name]:value});
    }

    const setExamData = (e:any) => {
        const {name,value} = e.target;
        setExamForm({...examForm,[name]:value});
    }

    const matched = (value:any) => {
        const matchedTitle = titleList.filter((item:any) => item.subjectID == value);
        console.log('matched Title',matchedTitle);
        setMatchedTitleList(matchedTitle);
    }

    const setSubjectHandler = (e:any) => {
        const {name,value} = e.target;
        setExamForm({...examForm,[name]:value});
        matched(value);        
    }

    const setTitleHandler = (e:any) => {
        const {name,value} = e.target;
        setExamForm({...examForm,[name]:value});
    }

    const getSubjects = () => {
        subjectServices.getSubjects().then((res) => {
            setSubjectList(res.data);
        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }
    const getTitles = () => {
        titleServices.getTitle().then((res) => {
            console.log('titles',res.data);
            
            setTitleList(res.data);

        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }

    useEffect(()=> {
        getSubjects();
        // getTitles();
    }, []);
   
    useEffect(()=> {
        getTitles();
    }, []);
   
    console.log("subjects",subjectList);
    


    const addSubject = (e:any) => {
        e.preventDefault();
        setSubject(subject);
        console.log('subject',subject);
        subjectServices
        .createSub(subject).then((res)=>{
            getSubjects();
         
            console.log(res);
            setTimeout(()=>{
                toast.success("Successfully added",{theme:"colored"});
            },2000);
        })
        .catch((err)=>{
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }

    const addTitle = (e:any) => {
        e.preventDefault();
        console.log('title',title);
        titleServices
        .createTitle(title).then((res)=>{
            // getSubjects();
            getTitles();
            console.log(res);
            setTimeout(()=>{
                toast.success("Successfully created",{theme:"colored"});
            },2000);
        })
        .catch((err)=>{
            toast.error(err.response.data,{theme:"colored"});
            // toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }
    const CreateExam = (e:any) => {
        e.preventDefault();
        createExamServices
        .createExam(examForm).then((res)=> {
            console.log(res)
            toast.success("Exam Successfully created",{theme:"colored"});
        }).catch((err)=> {
            toast.error(err.response.data,{theme:"colored"});
            // toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
        })
        console.log("log",examForm)
    }
    

  return (
      <div>
      <ToastContainer />    
        {/* <h2>Create Exam</h2> */}
        <div>
            <h5>Add Subject <strong style={{color:'red'}}>optional~</strong></h5>
            <form onSubmit={addSubject}>
                <input type="text" id="subject" name="subName" placeholder="Add Subject here.." onBlur={setSubValue}/>
                <input type="submit" value="Add Subject" />
            </form>
        </div><br />
        <div>
            <h5>Add exam topic of the subject <strong style={{color:'red'}}>optional~</strong></h5>
            <form onSubmit={addTitle}>
            <select id="sub" name="subjectID" onClick={setTitleValue}>
                <option value="Choose Subject" disabled>Choose Subject</option>
                {
                   subjectList != null? subjectList.map((item:any,index:number)=>{
                        return <option value={item._id}>{item.subName}</option>
                    }):'null'
                }
            </select><br /> 
                <input type="text" id="subject" name="titleName" placeholder="Add Subject here.." onChange={setTitleValue}/>
                <input type ="submit" value="Add Title" />
            </form>
        </div>    
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'40px'}}>
        <form onSubmit={CreateExam}>
          <h3 style={{ alignItems: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp; CREATE EXAM</h3>
          &nbsp;
          <div className="form-group">
          <label>Select Subject:</label>  
            <select name="subID" id="id1" onChange={setSubjectHandler} className="form-control create_email">
            <option value="Subject" >Choose Subject</option>
                {
                   subjectList != null? subjectList.map((item:any,index:number)=>{
                        return <option value={item._id}>{item.subName}</option>
                    }):'null'
                }
            </select>
          </div>
          &nbsp;
          <div className="form-group">
          <label>Select Exam Topic of Subject: (not found create it)</label>  
            <select name="subTitleID" id="id" onChange={setTitleHandler} className="form-control create_email">
            <option value="title" >Choose Subject Topic</option>
                {
                   MatchedTitleList != null? MatchedTitleList.map((item:any,index:number)=>{
                        return <option value={item._id}>{item.titleName}</option>
                    }):'null'
                }
            </select>
          </div>&nbsp;
          <div className="form-group">
            <label>Marks Per Question</label>
            <input type="number" className="form-control create_email" id="formGroupExampleInput2" name='marksPerQue'  onChange={setExamData}
              placeholder="Enter marksPerQue" />
          </div>&nbsp;
          <div className="form-group">
            <label>Total Question:</label>
            <input type="number" className="form-control create_email" id="formGroupExampleInput2" name='totalQue' onChange={setExamData}
              placeholder="Enter totalQue" />
          </div>&nbsp;
          <div className="form-group">
            <label>Duration</label>
            <input type="time" className="form-control create_email" id="formGroupExampleInput2" name='duration' onChange={setExamData}
              placeholder="00:00:00 hh:mm:ss" />
          </div><br />
          <button type="submit" className="btn btn-success" id="create">CREATE</button>
        </form>
        </div>
    </div>
  )
}
