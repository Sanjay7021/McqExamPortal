import { useMemo } from "react";
import "../pages/Header.css";
// import img2 from "../images/logo1.png";

import { Button } from "@mui/material";
import { useAuthContext } from "../context/auth";
// import {signOut} from '../context/auth'
import { useNavigate } from "react-router-dom";
import shared from "../utils/shared";


function Header() {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const logOut = () => {
    authContext.signOut();
  };

  const items = useMemo(() => {
    return shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);
  
  console.log("from ",authContext._flag);
  console.log("from ",authContext._flag);
  
  return (
    <div className="header" style={{backgroundColor:'black'}}>
      <div className="upperredline" style={{backgroundColor:'black'}}></div>
      <div className="container" style={{backgroundColor:'black'}}>
        <img  alt="" className="img1" />
        <div className="header-right">
          {!authContext.user.id && (
            <>
              <Button
                variant="text"
                color="error"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <span style={{ color: "red" }}>|</span>
              <Button
                variant="text"
                color="error"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>

              <span style={{ color: "red" }}> | </span>
            </>
          )}

          {items.map((item, index) => (
            <Button
              key={index}
              variant="text"
              color="primary"
              sx={{ color: "#f14d84", textTransform: "capitalize" }}
              onClick={() => {
                navigate(item.route);
              }}
              disabled={authContext._flag == 1 ? true:false}
            >
              {item.name}
            </Button>
          ))}
            
          {/* <Button
            variant="outlined"
            color="error"
            className="button"
            sx={{ textTransform: "capitalize", height: 40 }}
            // startIcon={<HiShoppingCart />}
            onClick={() => {
              navigate("/cart-page");
            }}
          > */}
            {/* {cartContext.cartData.length} */}
            {/* <span
              style={{
                color: "black",
                marginLeft: "4px",
                fontWeight: "normal",
              }}
            ></span>
            Cart
          </Button> */}
          <span style={{ color: "red" }}> | </span>
          {authContext.user.id ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f14d54",
                "&:hover": {
                  backgroundColor: "#f14d54",
                },
                textTransform: "capitalize",
              }}
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;


