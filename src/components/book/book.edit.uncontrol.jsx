import { Descriptions, Form, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const BookEditUncontrol = (props) => {
    const {isOpenEditBookModal, setIsOpenEditBookModal,bookEditData, loadBook} = props
    const [form] = useForm()
    const [preview, setPreview] = useState();
    const [selectedFile, setSelectedFile] = useState()
    useEffect(() => {
        if(bookEditData && bookEditData._id) {
            console.log(bookEditData)
            form.setFieldsValue({
                _id : bookEditData._id,
                mainText: bookEditData.mainText,
                author: bookEditData.author,
                price :bookEditData.price,
                quantity : bookEditData.quantity,
                category :bookEditData.category,
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookEditData.thumbnail}`)
        }
        
    },[bookEditData])

    const handleUploadBtn = (event) => {
        if(!event.target.files || event.target.files.length === 0){
            setPreview(null)
            setSelectedFile(null)
            return;
        }
        const book = event.target.files[0];
        if(book){
            setSelectedFile(book)
            setPreview(URL.createObjectURL(book))
        }
    }

    
    const handleSubmitBtn = async (values) => {
        
        // console.log("Check value:", values.mainText, values.author,  values.price, values.author, values.quantity, values.category)
        if(!selectedFile && !preview){
            return;
        }
        let newThumbnail = ""
        if(!selectedFile && preview){
            newThumbnail = bookEditData.thumbnail
        }else{
            const resUpload = await handleUploadFile(selectedFile, "book")
            if(resUpload.data){
               newThumbnail = resUpload.data.fileUploaded
            }
        }

        await updateBook(newThumbnail, values)
        
    }
    const updateBook =  async(newThumbnail, values) => {
        const {_id, mainText, author, price, quantity, category} = values
        const resUpdate = await updateBookApi(_id, newThumbnail, mainText, author, price, quantity, category)
        if(resUpdate.data){
            notification.success({
                message:"Update Success",
                descriptions: "Update Success"
            })
            await loadBook()
            resetAndCloseModal()
        }else{
            notification.error({
                message:"Update Error",
                description:JSON.stringify(resUpdate.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        form.resetFields()
        setSelectedFile(null)
        setPreview(null)
        setIsOpenEditBookModal(false)
    }
         // _id , thumbnail , mainText, author, price, quantity, category
    return (
        <>
             <Modal 
             title="Edit Book" open={isOpenEditBookModal} 
             onOk={() => form.submit()} 
             onCancel={() => setIsOpenEditBookModal(false)}
             okText="Save"
             >
             <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                    label="ID"
                    name="_id"
                    >
                    <Input 
                     disabled
                     />
                    </Form.Item>

                    <Form.Item
                    label="MainText"
                    name="mainText"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input/>
                    </Form.Item>
                    <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input/>
                    </Form.Item>

                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <InputNumber style={{width:"100%"}}/>
                    </Form.Item>

                    <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <InputNumber style={{width:"100%"}}/>
                    </Form.Item>

                    <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Select
                    style={{ width: "100%" }}
                    options={[
                        { value: 'Arts', label: 'Arts' },
                        { value: 'Business', label: 'Business' },
                        { value: 'Comics', label: 'Comics' },

                        { value: 'Cooking', label: 'Cooking' },
                        { value: 'Entertainment', label: 'Entertainment' },
                        { value: 'History', label: 'History' },

                        { value: 'Music', label: 'Music' },
                        { value: 'Sports', label: 'Sports' },
                        { value: 'Teen', label: 'Teen' },
                        { value: 'Travel', label: 'Travel' },
                    ]}
                    />
                    </Form.Item>
                    <label 
                    htmlFor="uploadFileBtn"
                    style={{
                        background:"orange",
                        borderRadius:"5px",
                        padding:"10px",
                        color:"#fff",
                        fontSize:"18px",
                        cursor:"pointer"

                    }}
                    >
                        <input 
                        type="file"
                        id="uploadFileBtn"
                        hidden
                        style={{display:"none"}}
                        onChange={(event) => {handleUploadBtn(event)}}
                        />
                        Upload Image
                    </label>

                    {preview && 

                        <div style={{
                            marginTop:"15px",
                            height:"200px",
                            width:"150px",
                            border: "1px solid #ccc"
                        }}>
                            <img 
                            
                            src={preview} 
                            style={{
                                height:"100%",
                                width:"100%",
                                objectFit:"contain"
                            }}
                            />
                        </div>
                    }
                    
                    

                    
                   
                </Form>
            </Modal>
        </>
    )
}

export default BookEditUncontrol;