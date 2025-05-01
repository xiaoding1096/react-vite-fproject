
import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';

const ViewUpdateUsers = (props) => {
    const {dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser} = props 
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()
    const handleOnChangeFile = (event) => {
      if(!event.target.files || event.target.files.length === 0) {
        setSelectedFile(null)
        setPreview(null)
        return;
      }
      const file = event.target.files[0];
      if(file) {
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
      }

    }
    const handleUpdateUserAvatar = async () => {
       //step 1 : upload file
      const resUpload = await handleUploadFile(selectedFile, "avatar" )
      if(resUpload.data){
        //success
        const newAvatar = resUpload.data.fileUploaded;
        //step 2 : upload user
        const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
        if(resUpdateAvatar.data){
          setIsDetailOpen(false);
          setSelectedFile(null);
          setPreview(null);
          await loadUser();
          notification.success({
            message:"Upload Avatar Success",
            description: "Cap nhat thanh cong avatar"
          })
        }else{
          notification.error({
            message:"Error Upload Avatar",
            description: JSON.stringify(resUpdateAvatar.message)
          })
        }
      }else{
        notification.error({
          message:"Error Upload File",
          description: JSON.stringify(resUpload.message)
        })
      }
     
      
      
    }
    return (
      <>
        <Drawer 
        width={"40vw"}
        title="User Information" 
        onClose={() => {
            setIsDetailOpen(false);
            setDataDetail(null);
            }
        } 
        open={isDetailOpen}>
          <div>
                {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <p>Full Name: {dataDetail.fullName}</p>
                <p>Email: {dataDetail.email}</p>
                <p>Phone: {dataDetail.phone}</p>
                <p>Avatar:</p>
                <div style={{
                  marginTop:"10px",
                  height:"100px", width:"150px",
                  border:"1px solid #ccc",
                }}>

                    <img style={{height:"100%", width:"100%", objectFit:"contain"}}
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                </div>
                <div >
                  <label htmlFor="btnUpload" style={{
                    display:"block",
                    width:"fit-content",
                    marginTop:"15px",
                    padding:"5px 10px",
                    background:"orange",
                    borderRadius:"5px",
                    cursor:"pointer",
                  }}>Upload Image</label>
                  <input 
                  type="file"
                  hidden id="btnUpload"
                  onChange={handleOnChangeFile}
                   />
                </div>
              {preview &&
                <>
                  <div style={{
                    marginTop:"15px",
                    height:"100px", width:"150px",
                    border:"1px solid #ccc",
                    marginBottom:"15px",
                  }}>

                      <img style={{height:"100%", width:"100%", objectFit:"contain"}}
                      src={`${preview}`} />

                  </div>
                  <Button 
                  type='primary'
                  onClick={handleUpdateUserAvatar}
                  >Save</Button>
                </>
                }
                </> 
                : 
                <>
                <p> No Information </p>
                </>}
          </div>
        </Drawer>
      </>
    );
}

  export default ViewUpdateUsers;