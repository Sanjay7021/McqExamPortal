import React, { useEffect, useState } from 'react'
import './AddQue.css';
import createExamServices from '../service/createExamService';
import { ToastContainer, toast } from 'react-toastify';
import createMCQervices from '../service/createMCQServices';

export default function AddQue() {
    type examType = {
        ExamID:string,
        question:string,
        option:[],
        ans:string
     }
     const [examForm, setExamForm] = useState<examType>({
        ExamID:'',
        question:'',
        option:[],
        ans:''
    })

    const [examData, setExamData]:any = useState();

    const getExamData = () => {
        createExamServices.getExams().then((res)=>{
            console.log(res.data);
            const data:any = JSON.parse(String(localStorage.getItem('user')));
            console.log(data._id);
            const matched = res.data.filter((item:any)=> item.createdBy == data._id);
            setExamData(matched)
        }).catch((err) => {
            toast.error(err.response.data,{theme:"colored"});
            // toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);
        })
    }

    useEffect(()=>{
        getExamData();
    },[])

    const getDataHandler = (e:any) => {
        const {value, name} = e.target;
        if(name == 'option'){
            let newObject :any= [...examForm.option]; 
            newObject.push(value);
            setExamForm({...examForm,[name]:newObject});
            // setCount();
        }else{
            setExamForm({...examForm,[name]:value});
            // setCount();
        }
    } 
  
    const onSubmit = (e:any) => {
      setExamForm({
        ExamID:'',
        question:'',
        option:[],
        ans:''
    })
        e.preventDefault();
        console.log(examForm);
        createMCQervices.createMCQ(examForm).then((res)=> {
            toast.success("Question Added Successfully",{theme:'colored'});
            console.log(res.data);
        }).catch((err)=>{
            toast.error(err.response.data,{theme:"colored"});
            toast.error(err.response.data.result.errorResponse.message,{theme:"colored"});
            console.log(err);  
        })
        onReset();
    }
  
    const onReset = () => {
      setExamForm({
        ExamID:'',
        question:'',
        option:[],
        ans:''
    })
    }
    console.log(examForm.option);
  
  return (
    <div>
        <ToastContainer />
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'40px'}}>
        <form onSubmit={onSubmit} id='form'>
          <h3 style={{ alignItems: "center" }}>Add Questions</h3>
          &nbsp;
          <div className="form-group">
          {/* <label>Select Exam </label>   */}
            <select name="ExamID"    id="id" className="form-control create_email" onChange={getDataHandler} required>
            <option value="title" >Choose Exam</option>
                {
                   examData != null? examData.map((item:any,index:number)=>{
                        return <option value={item._id}>{item.subID.subName}{"-->"}{item.subTitleID.titleName}</option>
                    }):'null'
                }
            </select>
          </div>&nbsp;
          <div className="form-group">
            {/* <label>Marks Per Question</label> */}
            <textarea name="question" className="form-control create_email" id="formGroupExampleInput2" cols="30" Rows="10" placeholder='Enter Question Description' onChange={getDataHandler} required></textarea>
          </div>&nbsp;
          
          <div className="form-group">
            {/* <label>Duration</label> */}
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='option' onBlur={getDataHandler}
              placeholder="Option A" required/>
          </div><br />
          <div className="form-group">
            {/* <label>Duration</label> */}
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='option' onBlur={getDataHandler}
              placeholder="Option B" required/>
          </div><br />
          <div className="form-group">
            {/* <label>Duration</label> */}
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='option' onBlur={getDataHandler}
              placeholder="Option C" />
          </div><br />
          <div className="form-group">
            {/* <label>Duration</label> */}
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='option' onBlur={getDataHandler}
              placeholder="Option D" />
          </div><br />
          <div className="form-group">
            {/* <label>Duration</label> */}
            <input type="text" className="form-control create_email" id="formGroupExampleInput2" name='ans' onChange={getDataHandler}
              placeholder="ANSWER" required/>
          </div><br />
          <button type="submit" className="btn btn-success" id="create">CREATE</button>
                <input type="reset" className="btn btn-warning" value="RESET FORM" onClick={onReset}/>
        </form>
        </div>

    </div>
  )
}
