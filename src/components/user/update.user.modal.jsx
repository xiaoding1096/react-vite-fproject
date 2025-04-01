import {useEffect, useState} from "react";
import {Input, notification , Modal} from 'antd';
import { createUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
        const [fullName, setFullName] = useState("");
        const [id, setID] = useState("");
        const [phone, setPhone] = useState("");
        const {isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate} = props;

        useEffect(() => {
            console.log("Check dataUpdate:", dataUpdate)
            if(dataUpdate) {
                setFullName(dataUpdate.fullName);
                setID(dataUpdate._id);
                setPhone(dataUpdate.phone);
                setDataUpdate(null);
            }
        },[dataUpdate])

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
             setIsModalUpdateOpen(false);
             setFullName("");
             setPhone("");
             setID("");
         }
    return (
        <Modal 
            title="Update User" 
            open={isModalUpdateOpen} 
            onOk={() => handleSubmitBtn()} 
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Save"
            >
                <div className="user-form-item">
                    <span>ID</span>
                    <Input 
                    value={id}
                    disabled
                    />
                </div>
                <div className="user-form-item">
                    <span>Fullname</span>
                    <Input 
                    value={fullName} 
                    onChange={(event) => setFullName(event.target.value)}/>
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