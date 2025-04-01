import Input from "antd/es/input/Input";
import "./user.form.css";
import { Button , notification , Modal} from 'antd';
import {useState} from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const {loadUser} = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleSubmitBtn = async () => {
       const res = await createUserAPI(fullName, email, password, phone);
       if(res.data){
        notification.success({
            message: "Create user",
            description: "Create user success"
        })
        resetAndCloseModal();
        await loadUser();
       }else {
        notification.error({
            message: "Error Create user",
            description: JSON.stringify(res.message)
        })
       }
       console.log(">>check res:", res.data)
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }
    return (
        <div className="user-form">
            <div>
                <div className="user-form-button">
                    <h3>Table Users</h3>
                    <Button 
                    type="primary"
                    onClick={() => {setIsModalUpdateOpen(true)}}
                    >Create User</Button>
                </div>
            </div>
            <Modal 
            title="Create New User" 
            open={isModalUpdateOpen} 
            onOk={() => handleSubmitBtn()} 
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Create"
            >
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
            </Modal>    
        </div>
    )
}

export default UserForm;