import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {notification, Popconfirm, Table} from "antd";
import BookViewInformation from "./book.view";
import { useState } from "react";
import BookEditUncontrol from "./book.edit.uncontrol";
import { deleteBookApi } from "../../services/api.service";


const BookTable = (props) => {
// _id , thumbnail , mainText, author, price, quantity, category

const {allBookData, current, setCurrent, pageSize ,setPageSize, total, loadBook} = props;
const [bookData, setBookData] = useState()
const [bookEditData, setBookEditData ] = useState()
const [isOpenEditBookModal,setIsOpenEditBookModal] = useState(false);
const [isOpenBookView,setIsOpenBookView] = useState(false)


    const columns = [
        {
            title: 'Order',
            align:'center',
            render: (_id, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
          },
        {
          title: 'ID',
          dataIndex: '_id',
          render: (_id, record) => {
            return (
                <>
                 <a
                    onClick={() => {
                        setIsOpenBookView(true)
                        setBookData(record)
                    }}
                    
                 >
                    {record._id}
                </a>
                </>
            )
          }
         
        },
        {
          title: 'MainText',
          dataIndex: 'mainText',
        },
        {
          title: 'Author',
          dataIndex: 'author',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          render:(text, record) => {
            if(text){
              return`${new Intl.NumberFormat("vi-VN").format(text)}vnd`
            }
            return "0 vnd"
          }
        },
          {
            title: 'Quantity',
            align:'center',
            dataIndex: 'quantity',
          },
        {
            title: 'Category',
            dataIndex: 'category',
          },

        {
          title: 'Action',
          align:'center',
          key: 'action',
          render: (_, record) => {
            return (
                <>
                <div style={{display:"flex",gap:"30px"}}>
                    <EditOutlined 
                    style={{fontSize:"22px", color:"green"}}
                    onClick = {() => {
                        setIsOpenEditBookModal(true)
                        setBookEditData(record)
                    }}
                    />
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => handleDeleteBook(record._id)}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined 
                      style={{fontSize:"22px", color:"red"}}
                      />
                    </Popconfirm>
                    
                </div>
                    
                </>
            )
          }
        },
      ];

      const handleDeleteBook = async (id) => {
        const resDelete = await deleteBookApi(id)
        if(resDelete.data){
          notification.success({
            message:"Delete Success",
            description:"Deleted"
          })
          await loadBook()
        }else{
          notification.error({
            message:"Error Delete",
            description:JSON.stringify(resDelete.message)
          })
        }
      }

      const onChange = (pagination) => {
        if(pagination.current && current){
            if(pagination.current !== current){
                setCurrent(pagination.current)
            }
        }
        if(pagination.pageSize && pageSize){
            if(pagination.pageSize !== pageSize){
                setCurrent(pagination.pageSize)
            }
        }
      }

    return (
        <>
            <div>
                <Table 
                columns={columns} 
                dataSource={allBookData}
                rowKey={"_id"}
                pagination={
                    {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: false,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
                />
                <BookViewInformation
                isOpenBookView = {isOpenBookView}
                setIsOpenBookView = {setIsOpenBookView}
                bookData = {bookData} 
                setBookData = {setBookData}
                />
                <BookEditUncontrol
                    isOpenEditBookModal = {isOpenEditBookModal}
                    setIsOpenEditBookModal = {setIsOpenEditBookModal}
                    bookData = {bookData}
                    bookEditData = {bookEditData}
                    loadBook = {loadBook}
                />
            </div>
        </>
    )
}

export default BookTable;