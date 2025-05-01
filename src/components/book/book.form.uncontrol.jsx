import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { use, useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";


const BookFormUncontrol = (props) => {
    const {loadBook} = props
const [isCreateBookModalOpen, setIsCreateBookModalOpen ] = useState(false);
const [preview, setPreview] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const [form] = useForm()
const handleOnChange = (event) => {
    if(!event.target.files || event.target.files.length === 0){
        setSelectedFile(null)
        setPreview(null)
        return;
    }
    const book = event.target.files[0];
    if(book) {
        setSelectedFile(book)
        setPreview(URL.createObjectURL(book))
    }
}
const onFinish = async (values) => {
    if(!selectedFile) {
        notification.error({
            message:"Create Book Error",
            description:"Please Add Image For The Book"
        })
    }
    let newThumbnail = ""
    // upload hinh anh
    const resUpload = await handleUploadFile(selectedFile, "book")
    if(resUpload.data){
        newThumbnail = resUpload.data.fileUploaded
        const resCreateBook = await createBookApi(newThumbnail, values.mainText, values.author ,values.price ,values.quantity , values.category)
        if(resCreateBook.data){
            notification.success({
                message:"Create Book",
                description:"Create Book Success"
            })
            resetAndCloseModal()
            await loadBook()
        }else{
            notification.error({
                message:"Error Create Book",
                description:JSON.stringify(resCreateBook.message)
            })
        }
    }
    // create book

}

const resetAndCloseModal = () => {
    form.resetFields();
    setIsCreateBookModalOpen(false)

}
// _id , thumbnail , mainText, author, price, quantity, category
    return(
        <>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <span>Table User</span>
                <Button 
                type="primary"
                onClick={() => setIsCreateBookModalOpen(true)}
                >
                    Create User
                </Button>
            </div>
            <Modal 
            title="Create New Book" 
            open={isCreateBookModalOpen} 
            onOk={() => form.submit()} 
            onCancel={()=>{setIsCreateBookModalOpen(false)}}
            okText="Create"
            maskClosable = {false}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form = {form}
                >

                    <Form.Item
                    label="mainText"
                    name="mainText"
                    rules={[{ required: true, message: 'Please input MainTextMainText' }]}
                    >
                    <Input/>
                    </Form.Item>

                    <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Please input AuthorAuthor!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input PricePrice' }]}
                    >
                    <InputNumber style={{width:"100%"}} addonAfter="VND"/>
                    </Form.Item>
                    
                    <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input quantity!' }]}
                    >
                    <InputNumber style={{width:"100%"}}/>
                    </Form.Item>

                    <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please input category!' }]}
                    >
                        <Select
                        style={{ width:"100%"}}
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
                    htmlFor="btnUploadId"
                    style={{
                        background:"orange",
                        padding:"10px",
                        borderRadius:"5px",
                        color:"#fff",
                        fontSize:"18px",
                        cursor:"pointer",
                    }}
                    >
                        <input 
                        type="file"
                        hidden
                        id="btnUploadId"
                        style={{display:"none"}}
                        onChange={(event) => {handleOnChange(event)}}
                        />
                        Upload Image
                    </label>
                    {preview &&
                        <div style={{
                            marginTop:"20px",
                            height:"200px",
                            width:"150px",
                            border:"1px solid #ccc"
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

export default BookFormUncontrol;