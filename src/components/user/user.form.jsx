import Input from "antd/es/input/Input";
import "./user.form.css";
import { Button } from 'antd';
import {useState} from "react";
const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleClickBtn = () => {
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