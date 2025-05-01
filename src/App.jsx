import { useContext, useEffect } from "react";
import Header from "./components/layout/header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/auth/auth.context";
import { getAccountAPI } from "./services/api.service";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading  } = useContext(AuthContext);
 
  useEffect(() => {
    fetchUserInfo();
  }, [])

       const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        
        if (res.data) {
            //success
          setUser(res.data.user)
          console.log(">>> check user data: ", res.data)
          }
          setIsAppLoading(false);

     }

  return (
    <>
    {isAppLoading === true ?
      <div style={{
           position: "fixed",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
         }}>
           <Spin />
        </div>

      
         :
      <>
        <Header/>
        <Outlet/>
      </>
    }
    </>
  )
}

export default App
