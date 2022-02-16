import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";

const mapState = ({ productsData }) => ({
    products: productsData.products.data
})
const BooksModal = ({school}) => {
    console.log(`School is ${JSON.stringify(school)}`)
    const {documentID, grade} = school;
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const addBook = book => {
        //check if book in array
        setSelectedBooks([...selectedBooks, book]);
    }
    const removeBook = book => {
        const filteredBooks = selectedBooks.filter(b => b.documentID !== book.documentID);
        setSelectedBooks(filteredBooks)
    }
    const filters = { grade }
    useEffect(() => {
        dispatch(
            fetchProductsStart({filters})
        )
    }, []);

    return (
        <div>
            <h1>Selected Books</h1>
            <ul>
                {selectedBooks.map((book, idx) => <li key={idx}>{book.productName}</li>)}
            </ul>
            <h1>All Books</h1>
            <ul>
                {products.map((book, idx) => <li key={idx} onClick={() => addBook(book)}>{book.productName}</li>)}
            </ul>
        </div>
    );
}

export default BooksModal;