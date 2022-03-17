import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import { addSchoolProductStart, deleteSchoolProductStart, fetchSchoolProductsStart} from "../../../redux/Schools/schools.actions";

import './styles.scss';

const mapState = ({ productsData, schoolsData }) => ({
    products: productsData.products.data,
    schoolProducts: schoolsData.school.products
})
const BooksModal = ({school}) => {
    
    const {documentID, grade} = school;
    const dispatch = useDispatch();
    const { products, schoolProducts } = useSelector(mapState);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [isSelected, setIsSelected] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const addBook = (book, persist=true) => {
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
        if (persist) dispatch(
            addSchoolProductStart(school.documentID, book.documentID)
        )
    }
    const highlightBook = book => {
        setIsSelected(book.documentID);
        const t = setTimeout(() => {
            setIsSelected('');
            clearInterval(t);
        }, 500);
    }
    const removeBook = book => {
        dispatch(
            deleteSchoolProductStart(school.documentID, book.documentID)
        )
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
        dispatch(
            fetchSchoolProductsStart(school.documentID)
        )
    }, []);

    useEffect(() => {
        setAllBooks(products);
    }, [products]);

    useEffect(() => {
        schoolProducts.map(book => addBook(book, false))
    }, [schoolProducts]);

    return (
        <div className="booksModal">
            <h1>Selected Books</h1>
            <ul className="selectedBooks">
                {selectedBooks.map((book, idx) => <li className={book.documentID === isSelected ? 'highlight' : ''} key={idx} onClick={() => removeBook(book)} >{book.productName}</li>)}
            </ul>
            <h1>{grade} SCHOOL Books</h1>
            <ul className="allBooks">
                {allBooks.map((book, idx) => <li key={idx} onClick={() => addBook(book)}>{book.productName}</li>)}
            </ul>
        </div>
    );
}

export default BooksModal;