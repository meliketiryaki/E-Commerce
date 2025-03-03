import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/ProductDetail.css'
import { IoHeartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { addToBasket } from '../redux/slices/basketSlice';



function ProductDetails() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product);
    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToBasket(payload))
    }

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })

    }

    return (
        <div className='detailsContainer'>
            <div className='detailsCardWithDesc'>
                <div className='detailsCard'>
                    <img src={image} width={320} height={320} alt="" />
                    <div className='titlePart'>
                        <p className='title'>{title}</p>
                        <p className='price'>{price}₺</p>
                    </div>
                </div>
                <p className='description'>{description}</p>
            </div>
            <div className='detailsOperationCard'>
                <div className='likePart'>
                    <button className='addToCartButton' onClick={addBasket}>ADD TO CART</button>
                    <IoHeartOutline className='favIcon' />
                </div>
                <div className='counter'>
                    <FaPlus className='plusminusIcon' onClick={increment} />
                    <span>{count}</span>
                    <FaMinus className='plusminusIcon' onClick={decrement} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetails