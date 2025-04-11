import {useEffect, useState} from "react";
import {Input, notification , Modal} from 'antd';
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
        const [fullName, setFullName] = useState("");
        const [id, setID] = useState("");
        const [phone, setPhone] = useState("");
        const {isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser} = props;

        useEffect(() => {
            if(dataUpdate) {
                setFullName(dataUpdate.fullName);
                setID(dataUpdate._id);
                setPhone(dataUpdate.phone);
                setDataUpdate(null);
            }
        },[dataUpdate])
        
        const handleSubmitBtn = async () => {
            const res = await updateUserAPI(id, fullName, phone);
            if(res.data){
             notification.success({
                 message: "Update user",
                 description: "Update user success"
             })
             resetAndCloseEditModal();
             await loadUser();
            }else {
             notification.error({
                 message: "Error Create user",
                 description: JSON.stringify(res.message)
             })
            }
            console.log(">>check res:", res.data)
         }
     
         const resetAndCloseEditModal = () => {
            setIsModalUpdateOpen(false);
             setFullName("");
             setPhone("");
             
         }
    return (
        <Modal 
            title="Update User" 
            open={isModalUpdateOpen} 
            onOk={() => handleSubmitBtn()} 
            onCancel={() => resetAndCloseEditModal()}
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