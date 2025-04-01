import {useState} from "react";
import {Input, notification , Modal} from 'antd';
import { createUserAPI } from "../../services/api.service";

const UpdateUserModal = () => {
        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [phone, setPhone] = useState("");
        const [isModalOpen, setIsModalOpen] = useState(true);

        const handleSubmitBtn = async () => {
            const res = await createUserAPI(fullName, email, password, phone);
            if(res.data){
             notification.success({
                 message: "Create user",
                 description: "Create user success"
             })
             resetAndCloseModal();
            //  await loadUser();
            }else {
             notification.error({
                 message: "Error Create user",
                 description: JSON.stringify(res.message)
             })
            }
            console.log(">>check res:", res.data)
         }
     
         const resetAndCloseModal = () => {
             setIsModalOpen(false);
             setFullName("");
             setEmail("");
             setPassword("");
             setPhone("");
         }
    return (
        <Modal 
            title="Update User" 
            open={isModalOpen} 
            onOk={() => handleSubmitBtn()} 
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Save"
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
    )   
}

export default UpdateUserModal;