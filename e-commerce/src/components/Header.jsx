import React, { useState } from 'react'
import '../css/Header.css'
import { BsBasket } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from '../redux/slices/basketSlice';
import { setFilteredProducts } from '../redux/slices/productSlice';


function Header() {

    const [theme, setTheme] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { products } = useSelector((store) => store.basket);
    const dispatch = useDispatch();

    const changeTheme = () => {
        const root = document.getElementById("root");
        setTheme(prevTheme => !prevTheme);
        if (!theme) {
            root.style.background = "#2e2e2e";
            root.style.color = "#fff";
        } else {
            root.style.background = "#fff";
            root.style.color = "#2e2e2e";
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(setFilteredProducts(value));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row' onClick={() => navigate("/")}>
                <img className='logo' src="./src/images/logo.jpeg" alt="logo" />
                <p className='logo-text'>
                    MEL MEL
                </p>
            </div>

            <div className='flex-row'>
                <input className='search-input' type='text' placeholder='Ara..' value={searchTerm} onChange={handleSearch} />

                <div className='flex-row'>
                    {theme ? <GoSun className='icon' onClick={changeTheme} /> : <BsFillMoonStarsFill className='icon' onClick={changeTheme} />}

                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="error">
                        <BsBasket className='icon' />
                    </Badge>
                </div>

            </div>
        </div>
    )
}

export default Header