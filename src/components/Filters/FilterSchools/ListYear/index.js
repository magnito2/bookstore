import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProductsStart } from '../../../../redux/Products/products.actions';

const mapState = ({ productsData}) => ({
    products : productsData.products
})

const ListYear = ({ grade, year, schoolID, ...otherProps }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

  let displayGrade = undefined;
  if (grade === "primary") displayGrade = "Class";
  else if (grade === "secondary") displayGrade = "Form";

  const handleClicked = (e) => {
      e.stopPropagation();
      const filters = {
          grade,
          year,
          schoolID
      }
      dispatch(
          filterProductsStart( 
                  filters
          )
      )
  }

  return (
    <li key={`${grade}-${year}`} onClick={(e) => handleClicked(e)} {...otherProps}>
      {`${displayGrade} ${year}`}
    </li>
  );
};

export default ListYear;