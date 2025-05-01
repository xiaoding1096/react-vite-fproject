import { useEffect, useState } from "react";
import BookFormUncontrol from "../components/book/book.form.uncontrol";
import { getBookApi } from "../services/api.service";
import BookTable from "../components/book/book.table.uncontrol";

const BookPage = () => {
    const [allBookData, setAllBookData] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(99)
    const loadBook = async () => {
        const resLoadBook = await getBookApi(current, pageSize)
        if(resLoadBook.data){
            setAllBookData(resLoadBook.data.result)
            setCurrent(resLoadBook.data.meta.current)
            setPageSize(resLoadBook.data.meta.pageSize)
            setTotal(resLoadBook.data.meta.total)
        }
    }
useEffect(() => {
    loadBook()
},[current ,pageSize])

    return (
        <div style={{margin:"20px"}}>
            <BookFormUncontrol
            loadBook = {loadBook}
            />
            <BookTable
                loadBook = {loadBook}
                allBookData = {allBookData}
                current = {current}
                setCurrent = {setCurrent}
                pageSize = {pageSize}
                setPageSize = {setPageSize}
                total = {total}
            />
        </div>
    )
}

export default BookPage;