import {Table, Popconfirm, notification } from 'antd';
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import UpdateUserModal from './update.user.modal';
import {useState} from "react";
import ViewUpdateUsers from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {
  const {dataUsers, loadUser} = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const handleDeleteUser = async (id) => {
      const res = await deleteUserAPI(id);
      if(res.data){
        notification.success({
          message: "Delete user",
          description: "Delete user success"
        })
        await loadUser();
      }else {
        notification.error({
          message: "Error delete user",
          description: JSON.stringify(res.message)
        })
      }
  }
    const columns = [

        {
          title: 'Id',
          dataIndex: '_id',
          render: (_, record) => {
            return (
              <a 
              href='#'
              onClick = {() => {
                setDataDetail(record);
                setIsDetailOpen(true);
                console.log(record)
              }}
              >{record._id}</a>
            )
          }
        },
        {
          title: 'Full Name',
          dataIndex: 'fullName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <div style={{display: "flex", gap: "20px"}}>
              <EditOutlined 
              style={{cursor:"pointer", color:"green"}}
              onClick={() => {
                setDataUpdate(record)
                setIsModalUpdateOpen(true)
              }}
              />
              <Popconfirm 
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Yes"
              cancelText="No"
              placement='Left'
              >
                <DeleteOutlined 
                style={{cursor:"pointer", color:"red"}}
                />

              </Popconfirm>
              

            </div>
          ),
        },

      ];

      return (
        <>
          <Table 
          columns={columns} 
          dataSource={dataUsers} 
          rowKey={"_id"}
          />
          <UpdateUserModal
          isModalUpdateOpen = {isModalUpdateOpen}
          setIsModalUpdateOpen = {setIsModalUpdateOpen}
          dataUpdate = {dataUpdate}
          setDataUpdate = {setDataUpdate}
          loadUser = {loadUser}
          />
          <ViewUpdateUsers
          dataDetail = {dataDetail}
          setDataDetail = {setDataDetail}
          isDetailOpen = {isDetailOpen}
          setIsDetailOpen = {setIsDetailOpen}
          />
        </>

      )
}

export default UserTable;