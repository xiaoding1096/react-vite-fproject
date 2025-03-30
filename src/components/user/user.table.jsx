import {Table} from 'antd';
import { fetchAllUsersAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';


const UserTable = () => {
  const [dataUsers, setDataUsers] = useState([
    {
      _id: "nguyen", fullName: 25, email: "hn"
    },
    {
      _id: "ok", fullName: 25, email: "hen"
    }
  ])
  useEffect(() => {
    console.log(">>>run useEffect 111");
    loadUser();
  }, []);

    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
        },
        {
          title: 'Full Name',
          dataIndex: 'fullName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        }
      ];
  
      const loadUser = async () => {
        const res = await fetchAllUsersAPI()
        console.log(">>> run loadUser:",res);
        setDataUsers(res.data.data);
      }
      console.log(">>>run render 000");

      return (
        <Table 
        columns={columns} 
        dataSource={dataUsers} 
        rowKey={"_id"}
        />
      )
}

export default UserTable;