import Input from "antd/es/input/Input";
import "./user.form.css";
import { Button , notification } from 'antd';
import {useState} from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleClickBtn = async () => {
       const res = await createUserAPI(fullName, email, password, phone);
       if(res.data){
        notification.success({
            message: "Create user",
            description: "Create user success"
        })
       }else {
        notification.error({
            message: "Error Create user",
            description: JSON.stringify(res.message)
        })
       }
       

       console.log(">>check res:", res.data)
    }

    return (
        <div className="user-form">
            <div>
                <div className="user-form-item">
                    <span>Fullname</span>
                    <Input 
                    value={fullName} 
                    onChange={(event) => setFullName(event.target.value)}/>
                </div>
                <div className="user-form-item">
                    <span>Email</span>
                    <Input 
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    />
                </div>
                <div className="user-form-item">
                    <span>Password</span>
                    <Input.Password 
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    />
                </div>
                <div className="user-form-item">
                    <span>Phone</span>
                    <Input
                    value={phone}
                    onChange={(event) => {setPhone(event.target.value)}}
                    />
                </div>
                <div className="user-form-button">
                    <Button 
                    type="primary"
                    onClick={handleClickBtn}
                    >Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;