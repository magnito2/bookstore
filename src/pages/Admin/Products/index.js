import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

import { addProductStart, fetchProductsStart, deleteProductStart } from '../../../redux/Products/products.actions';
import Modal from '../../../components/Modal';
import FormInput from '../../../components/forms/FormInput';
import FormSelect from '../../../components/forms/FormSelect';
import Button from '../../../components/forms/Button';
import LoadMore from '../../../components/LoadMore';
import { CKEditor } from 'ckeditor4-react';

import { fileToDataUri } from '../../../Utils';

import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const AdminProducts = props => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [grade, setGrade] = useState('primary');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setGrade('primary');
    setProductName('');
    setProductThumbnail(null);
    setProductPrice(0);
    setProductDesc('');
    setProductImg('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addProductStart({
        grade,
        productName,
        productPrice,
        productDesc,
        productImg
      })
    );
    resetForm();

  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };

  const handleProductThumbnail = e => {
    const file = e.target.files[0];

    if(!file) {
      setProductThumbnail('');
      setProductImg(null);
      return;
    }

    fileToDataUri(file)
      .then(dataUri => {
        setProductThumbnail(dataUri)
      });

    setProductImg(file);
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>
      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new product
            </h2>

            <div className='floats'>
              <div className='floatLeft'>
                <FormSelect
                  label="Grade"
                  options={[{
                    value: "primary",
                    name: "Primary School",
                    key: "l1"
                  }, {
                    value: "secondary",
                    name: "Secondary School",
                    key: "l2"
                  }]}
                  handleChange={e => setGrade(e.target.value)}
                />
              </div>

              {productThumbnail && <div className='floatRight'>
                <img width="150" alt="product" className='thumb' src={productThumbnail} />
                <div className='close' onClick={e => setProductThumbnail('')}>
                  <FontAwesomeIcon icon={faXmark} className='xMark' />
                </div>
              </div>}
            </div>

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image"
              type="file"
              handleChange={e => handleProductThumbnail(e)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <CKEditor
              onChange={evt => setProductDesc(evt.editor.getData())}
              config={{placeholder: "Add Product Description"}} 
            />

            <br />

            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal>

      <div className="manageProducts">

        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            KES {productPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              <span className='deleteIcon'><FontAwesomeIcon icon={faTrash} /></span>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default AdminProducts;