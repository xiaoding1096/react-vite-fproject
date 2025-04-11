import { Link} from "react-router-dom";
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined } from '@ant-design/icons';
import {Menu} from "antd";
import {useState} from "react";

const Header = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
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