import { useEffect, useState } from "react";
import createFinalResultServices from "../service/finalResultServices";
import { toast } from "react-toastify";

export default function ShowResultsToFaculty() {
    const [resultData, setResultData]:any = useState();
    const [open, setOpen]:any = useState(false);
      const getResultData = () => {
          createFinalResultServices.showResultsToFaculty().then((res)=>{           
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
   
  return (
    <div>

            {
                resultData.map((item:any)=>{
                    return <div>
                        {item}
                    </div>
                })
            }

    </div>
  )
}
