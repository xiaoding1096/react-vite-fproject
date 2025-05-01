import { Drawer } from "antd";
import { useEffect } from "react";


const BookViewInformation = (props) => {
    const {isOpenBookView, setIsOpenBookView, bookData, setBookData} = props
    

    return(
        <>
            {bookData && bookData._id ? (
             <Drawer title="Basic Drawer" onClose={() => setIsOpenBookView(false)} open={isOpenBookView}>
                <div>
                    <p >ID : {bookData._id}</p>
                    <p style={{marginTop:"15px"}}>MainText :{bookData.mainText}</p>
                    <p style={{marginTop:"15px"}}>Author : {bookData.author}</p>
                    <p style={{marginTop:"15px"}}>Price : {bookData.price}</p>
                    <p style={{marginTop:"15px"}}>Quantity : {bookData.quantity}</p>
                    <p style={{marginTop:"15px"}}>Category : {bookData.category}</p>
                    <p style={{marginTop:"15px"}}> Thumbnail :</p>
                </div>
                    <div style={{
                        marginTop:"15px",
                        height:"200px",
                        width:"150px",
                        border: "1px solid #ccc"
                    }}>
                        <img 
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookData.thumbnail}`}
                        style={{
                            height:"100%",
                            width:"100%",
                            objectFit:"contain"
                        }}
                        />
                    </div>
            </Drawer>

            ) : (
                isOpenBookView && 
                <p> No Information </p>
            )}
        </>
    )
}

export default BookViewInformation;