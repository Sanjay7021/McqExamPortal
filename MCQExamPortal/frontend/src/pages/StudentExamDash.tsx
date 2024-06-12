import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import createMCQervices from '../service/createMCQServices';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import '../pages/StudentExamDash.css'
import ResultServices from '../service/resultServices';
import { useAuthContext } from '../context/auth';

let total = 0;

function Items({ currentItems }: { currentItems: any }) {
    const { examId ,duration1} = useParams();
    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(Number(duration1));
 
    if(currentItems.length != 0){
        setTimeout(() => {
            setSeconds(seconds - 1)        
        }, 1000)
        
    }
    let minutes = ~~(seconds / 60);
    let remainingSeconds = seconds % 60;

    const [item1, setitem]: any = useState([]);

    const onSubmit = () => {
        // e.preventDefault();
        let values = {
            ExamID: examId
        }
        ResultServices.storeResult(values).then((res) => {
            console.log(res.data);
            toast.success('Exam Submited', { theme: 'light' })
        }).catch((err) => {
            toast.error(err.response.data, { theme: "colored" });
            toast.error(err.response.data.result.errorResponse.message, { theme: "colored" });
            console.log(err);
        })

        navigate('/results');
    }

    if(seconds == 0){
        onSubmit();
    }

    const setOptValueHandler = async (e: any, questionID: any) => {
        const { value, checked,id } = e.target;
        // console.log('fired',name);
        setitem([...item1, id]);
        let values = {
            QuestionID: questionID,
            ExamID: examId,
            ans: value
        }

        if (checked == true) {

            ResultServices.createResult(values).then((res) => {
                console.log(res.data);
                // toast.success('Exam Submited', { theme: 'light' })
            }).catch((err) => {
                toast.error(err.response.data, { theme: "colored" });
                toast.error(err.response.data.result.errorResponse.message, { theme: "colored" });
                console.log(err);
            })

        }
    }
    console.log("undefined he",!currentItems);
    

    return (<div>
        <div style={{ marginLeft: "805px", fontSize: "20px", fontWeight: 'bold' }}>
            {minutes}:{remainingSeconds} <button className="btn btn-warning" onClick={onSubmit} disabled={currentItems.length == 0}>Submit</button> </div>
        {/* {currentItems} */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '90%' }}>
            {currentItems.length != 0? " ":"Soryy...!!! This exam still not schedule wait for faculty response or contact them.."}
            {/* {minutes ==0 && remainingSeconds == 0 ? onSubmit():"not"}             */}
            {currentItems &&
                currentItems.map((item: any, index: any) => (
                    <div key={index}>
                        <br />
                        <p>{item.question}</p>

                        {item.option.map((opt: any, key: any) => (
                            <div key={key}>
                                <input type="radio" name={item._id} id={item._id + key} value={opt} checked={(item1.includes(String(item._id + key)))} key={key} onChange={(e) => { setOptValueHandler(e, item._id) }} />&nbsp;&nbsp;<label>{opt}</label><br />
                                {/* <input type="radio" name="ans" id="" value={opt} onChange={(e)=>{setOptValueHandler(e,item._id)}}/><label>{opt}</label><br /> */}

                            </div>
                        ))}
                    </div>
                ))}
        </div>
    </div>
    );
}


export default function StudentExamDash() {

    const { examId ,duration1} = useParams();
    const itemsPerPage = 1;
    const [mcqData, setMCQData]: any = useState();

    const authContext = useAuthContext();
    const getMCQData = () => {
        createMCQervices.getMCQ().then((res) => {
            console.log(typeof res.data.ExamID);
            
            const matched = res.data.filter((item: any) => item.ExamID == String(examId));
            setMCQData(matched)
            // console.log(matched);
        }).catch((err) => {
            toast.error(err.response.data, { theme: "colored" });
            toast.error(err.response.data.result.errorResponse.message, { theme: "colored" });
            console.log(err);
        })
    }

    useEffect(() => {
        getMCQData();

    }, [])

    // itemsPerPage
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const len = mcqData == null ? 1 : mcqData.length
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = mcqData == null ? 0 : mcqData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(len / itemsPerPage);
    console.log("inseconds",total);
    


    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {

        const newOffset = (event.selected * itemsPerPage) % len;
        // if(newOffset > itemOffset){
        //     random = Math.floor(Math.random() * 1000);
        // }
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        console.log("previois", itemOffset, "new", newOffset);


        setItemOffset(newOffset);
    }

    const nevigate = useNavigate();
    const location = useLocation();
    console.log(location);
    // let history = useHistory();
    // console.log("history",history);
    
    useEffect(()=>{
        const data = `/StudentDashboard/exam-started/${examId}/duration/${duration1}`
        localStorage.setItem('location',data);
    },[])

    useEffect(()=>{
        const hadleBeforeUnload = (event:any) => {
            event.preventDefault();
            event.returnValue = '';
        }
        window.addEventListener('beforeunload',hadleBeforeUnload);
        return () =>{
            window.removeEventListener('beforeunload',hadleBeforeUnload)
        }
    },[]);
    
    useEffect(()=>{
        const handleTabSwitching = () => {
            if(document.hidden){
                console.log('You are doing something');
                // authContext.setFlag(0)
                
            }else{
                console.log('Tab is visible again');
                // authContext.setFlag(1) 
            }
            if(document.onchange){
                alert('tab changed')
            }
            
        }

        document.addEventListener('visibilitychange',handleTabSwitching)
        return () =>{
            window.removeEventListener('visibilitychange',handleTabSwitching)
        }
    },[]);
    

    return (
        <div id="container" style={{
            marginTop:"7px",
            width: '60%',
            height: '100%',
            marginLeft: '400px',
            border: "1px solid black", borderRadius: "5px solid black"
        }}>
            <ToastContainer />
            <Items currentItems={currentItems}/>
            
            <ReactPaginate
                breakLabel="..."
                activeClassName={'item active '}
                breakClassName={'item break-me '}
                containerClassName={'pagination'}
                disabledClassName={'disabled-page'}
                marginPagesDisplayed={2}
                nextClassName={"item next "}

                pageClassName={'item pagination-page '}
                previousClassName={"item previous"}
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

            />
            <br />
        </div>
    )

}