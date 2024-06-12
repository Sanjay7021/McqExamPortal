import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { AuthWrapper } from "./context/auth";
import "react-toastify/dist/ReactToastify.css";
import MyNavigation from "./MyNavigation";


function App() {
  
  return (
    <><ToastContainer />
      <BrowserRouter>
      <AuthWrapper>
            <Header />
            {/* <Search/> */}
            <MyNavigation />
            <ToastContainer />
            <Footer />
      </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;

