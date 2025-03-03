import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';
import '../css/Product.css';

function ProductList() {
    const dispatch = useDispatch();
    const { products, filteredProducts, loading } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;

    return (
        <div className='productContainer'>
            {loading ? (
                <p>Yükleniyor...</p>
            ) : displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <p>Ürün bulunamadı</p>
            )}
        </div>
    );
}

export default ProductList;
