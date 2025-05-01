import { Button, Checkbox, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/api.service";
import { useState, useContext } from "react";
import { AuthContext } from "../components/auth/auth.context";


const LoginPage = () => {
    const [formLogin] = Form.useForm();
    const [loading, setLoading] = useState();
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true)
        
        const res = await loginApi(values.email, values.password) 
        if(res.data) {
            message.success("Login success")
            console.log("Check values:",res.data)
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/")
        }else {
            notification.error({
                message:"Error Login",
                description:JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

   
    return (
        <>
        <Row justify={"center"} style={{marginTop:"30px"}}>
            <Col xs={24} md={16} lg={8}>
            <fieldset style={{
                padding:"15px",
                margin:"5px",
                border:"1px solid #ccc",
                borderRadius:"5px"
            }}
            
            >
                <legend style={{fontSize:"24px"}}>Login</legend>
                <Form
                    layout="vertical"
                    form={formLogin}
                    onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        
                    <Form.Item
                        label="Username"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input />
                    </Form.Item>
                          

                                
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password onKeyDown={(event) => {
                                 if (event.key === 'Enter') Form.submit()
                             }}/>
                    </Form.Item>
                            
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                            <Form.Item name="remember" valuePropName="checked" label={null} style={{}}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        

                                
                            <Form.Item label={null}>
                                <Button 
                                loading={loading}
                                type="primary" 
                                htmlType="submit"
                                
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </div>
                    
                           
                        <Divider style={{marginTop:"0px"}}/>
            
                    <Form.Item label={null} style={{textAlign:"center"}}>
                        <p>Chưa có tài khoản ?<Link to="/register"> đăng ký tại đây</Link></p>
                        <div style={{marginTop:"20px"}}>
                            <Link to="/" >Quay Lại Trang Chủ</Link>
                        </div>
                    </Form.Item>
                            
                </Form>
            </fieldset>
            </Col>
        </Row>
 
            
            
            
        </>
    )
}

export default LoginPage;