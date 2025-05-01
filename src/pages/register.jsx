import { Button, Form, Input, notification, Row, Col, Divider} from "antd"
import { registerCreateUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerCreateUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone)
        if(res.data){
            notification.success({
                message:"Register User Success",
                description:"dang ky thanh cong"
            })
            navigate("/login");
        }else{
            notification.error({
                message:"Error Register User ",
                description:"dang ky that bai"
            })
        }
    }

    return (
        
        <>
        <Row justify={"center"}>
            <Col xs={24} md={16} lg={8}>
            <fieldset style={{
                padding:"15px",
                margin:"5px",
                border:"1px solid #ccc",
                borderRadius:"5px"
            }}
        
        >
            <legend>Register</legend>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                
            >
                
                   
                            <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ 
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"

                            }]}
                            >
                            <Input />
                            </Form.Item>
                    
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { 
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                },
                                {
                                    type:"email",
                                    message:"Wrong format"
                                }
                            ]}
                                >
                                <Input />
                            </Form.Item>
                        
                    

                   
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ 
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }]}
                                >
                                <Input.Password />
                            </Form.Item>
                        

                            <Form.Item
                                label="Phone"
                                name="phone"
                                // rules={[{ 
                                //     required: true,
                                //     pattern: new RegExp(/\d+/g),
                                //     message: "Wrong format!"
                                // }]}
                                >
                                <Input />
                            </Form.Item>
                      
                    
                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                <Form.Item label>
                                    <Link to="/">Home Page</Link>
                                </Form.Item>
                                <Form.Item>
                                    <Button 
                                            style={{marginTop:"20px"}}
                                            type="primary" 
                                            onClick={()=>form.submit()}
                                            >
                                                Register
                                    </Button>
                                </Form.Item>
                            </div>
                               
                                
                            
                       
                    <Divider />
                    
                            <Form.Item label={null} style={{textAlign:"center"}}>
                                <p>Đã có tài khoản <Link to="/login">Đăng nhập ngay</Link></p>
                                <p style={{marginTop:"20px"}}><Link to="/">Về Trang Chủ</Link></p>
                            </Form.Item>
                       
            </Form>

        </fieldset>

            </Col>
        </Row>
       
           
        </>
    )
}

export default RegisterPage;