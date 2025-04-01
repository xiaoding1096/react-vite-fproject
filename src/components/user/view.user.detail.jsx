
import { Drawer } from 'antd';

const ViewUpdateUsers = (props) => {
    const {dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen} = props 
    
    return (
      <>
        <Drawer 
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