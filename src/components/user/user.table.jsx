import {Table, Popconfirm, notification } from 'antd';
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import UpdateUserModal from './update.user.modal';
import {useState} from "react";
import ViewUpdateUsers from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {
  const {dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize} = props;
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
          title: "STT",
          render: (_,render,index) => {
            return( 
              <>
                {(index + 1) + (current -1) * pageSize}
              </>  
          )
          }
        },
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

      const onChange = (pagination, filters, sorter, extra) => {
        console.log(">>>Check onChange:",{pagination, filters, sorter, extra})
        if(pagination && pagination.current) {
          if(+pagination.current !== +current) {
              setCurrent(+pagination.current)
          }
        }
        if(pagination && pagination.pageSize) {
          if(+pagination.pageSize !== +pageSize) {
              setPageSize(+pagination.pageSize)
          }
        }
      }


      return (
        <>
          <Table 
          columns={columns} 
          dataSource={dataUsers} 
          rowKey={"_id"}
          pagination={
            {
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
            }
           }
           onChange={onChange}
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
          loadUser = {loadUser}
          />
        </>

      )
}

export default UserTable;