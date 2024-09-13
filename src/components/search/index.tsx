import React from 'react'
import './styles.css'
import Navbar from "../navbar";
import searchIcon from '../../assets/img/search.svg'

const Search = () => {

    return (
        <div className="container_search">
            <img src={searchIcon} id="img-search" alt="Search products"/>
            <input className="search" placeholder='Search menu items'/>
        </div>
    )
}

export default Search;