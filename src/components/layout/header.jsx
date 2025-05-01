import { Link, useNavigate} from "react-router-dom";
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined , AliwangwangOutlined } from '@ant-design/icons';
import {Menu, message} from "antd";
import { useState, useContext} from "react";
import { AuthContext } from "../auth/auth.context";
import { logoutAPI } from "../../services/api.service";


const Header = () => {
    const [current, setCurrent] = useState('mail');

    const {user, setUser} = useContext(AuthContext);

    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    }
    const navigate = useNavigate();
    const handleLogout = async () => {
      const res = await logoutAPI();
      if (res.data) {
          //clear data
          localStorage.removeItem("access_token"); // dùng để xóa access_token của người dùng đi
          setUser({					// set thông tin người dùng về rỗng
              email: "",
              phone: "",
              fullName: "",
              role: "",
              avatar: "",
              id: ""
          })
          message.success("Logout thành công.");

          //redirect to home
          navigate("/");
      }
  }


    const items = [
        {
          label: <Link to="/" > Home </Link>,
          key: 'home',
          icon: <HomeOutlined />,
        },
        {
          label: <Link to="/Users" > Users </Link>,
          key: 'users',
          icon: <UsergroupAddOutlined />,
        },
        {
          label: <Link to="/books" > Books </Link>,
          key: 'books',
          icon: <AuditOutlined />,
        },

        ...(!user.id ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
        },
        ] : []),
        
        ...(user.id ? [
          {
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                
                {
                    label: <span onClick={()=>handleLogout()}>LogOut</span>,
                    key: 'logout',
                },
            ],
           },
        ] : []),
        
      ];


    

    return (
        <Menu 
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={items} 
        />
    )
}

export default Header;