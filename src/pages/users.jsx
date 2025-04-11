import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUsersAPI } from '../services/api.service';
import { useEffect, useState } from 'react';

const UsersPage = () => {
     const [dataUsers, setDataUsers] = useState([]);
      useEffect(() => {
        loadUser();
      }, []);
    
  
      const loadUser = async () => {
        const res = await fetchAllUsersAPI()
        setDataUsers(res.data);
      }

    return (
        <>
            <div>
                <UserForm loadUser = {loadUser}/>
                <UserTable 
                  dataUsers= {dataUsers}
                  loadUser = {loadUser}
                />
            </div>
        </>
    )
}

export default UsersPage;