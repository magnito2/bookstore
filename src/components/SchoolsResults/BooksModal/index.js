import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";

import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products.data
})
const BooksModal = ({school}) => {
    
    const {documentID, grade} = school;
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [isSelected, setIsSelected] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const addBook = book => {
        for(let idx in selectedBooks){
            const selBook = selectedBooks[idx];
            if (selBook.documentID === book.documentID) {
                highlightBook(book);
                return;
            }
        }
        setSelectedBooks([...selectedBooks, book]);
        const filteredBooks = allBooks.filter(b => b.documentID !== book.documentID);
        setAllBooks(filteredBooks);
    }
    const highlightBook = book => {
        setIsSelected(book.documentID);
        const t = setTimeout(() => {
            setIsSelected('');
            clearInterval(t);
        }, 500);
    }
    const removeBook = book => {
        const filteredBooks = selectedBooks.filter(b => b.documentID !== book.documentID);
        setSelectedBooks(filteredBooks);
        setAllBooks([...allBooks, book]);
    }
    const filters = { grade }
    
    useEffect(() => {
        dispatch(
            fetchProductsStart({filters})
        )
    }, []);

    useEffect(() => {
        setAllBooks(products);
    }, [products])

    return (
        <div className="booksModal">
            <h1>Selected Books</h1>
            <ul className="selectedBooks">
                {selectedBooks.map((book, idx) => <li className={book.documentID === isSelected ? 'highlight' : ''} key={idx} onClick={() => removeBook(book)} >{book.productName}</li>)}
            </ul>
            <h1>All Books</h1>
            <ul className="allBooks">
                {allBooks.map((book, idx) => <li key={idx} onClick={() => addBook(book)}>{book.productName}</li>)}
            </ul>
        </div>
    );
}

export default BooksModal;