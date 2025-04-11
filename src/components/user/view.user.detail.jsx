
import { Drawer } from 'antd';

const ViewUpdateUsers = (props) => {
    const {dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen} = props 
    
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
                <div>

                    <img height={200} width={300}
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                </div>
                <div>
                  <label htmlFor="btnUpload" style={{
                    display:"block",
                    width:"fit-content",
                    marginTop:"15px",
                    padding:"5px 10px",
                    background:"orange",
                    borderRadius:"5px",
                    cursor:"pointer",
                  }}>Upload Image</label>
                  <input type="file" hidden id="btnUpload"/>
                </div>
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