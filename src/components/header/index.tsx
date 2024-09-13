import React from 'react'
import './styles.css'
import Navbar from "../navbar";
import {useSelector} from "react-redux";
import Spinner from "../spinner";

const Header = () => {
    const { settings, loading } = useSelector((state: any) => state.getVenue);

    return (
        <div className="container_header">
            <Navbar personalStyle={settings}/>
            { loading ?
                <Spinner/> :
                <img className="img_header"
                     src={settings?.bannerImage}
                     alt={`item-imgHeader`}/>
            }
        </div>
    )
}

export default Header;