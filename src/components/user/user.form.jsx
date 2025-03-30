import Input from "antd/es/input/Input";
import "./user.form.css";
import { Button } from 'antd';
import {useState} from "react";
import axios from "axios";
const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleClickBtn = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const data = {
            fullName : fullName,
            email : email,
            password : password,
            phone : phone
        }
        axios.post(URL_BACKEND, data);
        console.log("Check State:", {fullName, email, password, phone});
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