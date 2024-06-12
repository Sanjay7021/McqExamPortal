import axios from "axios";
// import { toast } from "react-toastify";

const request = axios.create({
    baseURL: "http://localhost:3004/",
    timeout: 12400000,
    // responseType: "json"
})


// function showLoader() {
//     document.body.classList.add("loader-open");
// }

// function hideLoader() {
//     document.body.classList.remove("loader-open");
// }


export default request;