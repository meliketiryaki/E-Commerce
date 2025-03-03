import React from 'react';
import { BsBasket } from "react-icons/bs";
import '../css/Product.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/slices/basketSlice';

function Product({ product }) {
    const { id, price, image, title } = product;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToBasket = () => {
        const productToAdd = { ...product, count: 1 };
        dispatch(addToBasket(productToAdd));
    };

    return (
        <div>
            <div className='productCard' onClick={() => navigate("/product-details/" + id)}>
                <img className='image' src={image} alt={title} width={170} height={180} />
                <div className='productTitlePart'>
                    <p className='productTitle'>{title}</p>
                    <div>
                        <p className='productPrice'>{price.toFixed(2)} ₺</p>
                        <button className='buyButton' onClick={(e) => {
                            e.stopPropagation();
                            handleAddToBasket();
                        }}>
                            <BsBasket className='basketIcon' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
