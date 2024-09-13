import React, {useEffect} from 'react'
import './styles.css'
import Section from "../../components/section";
import MenuDetails from "../../components/menu-details";
import Basket from "../../components/basket";
import Header from "../../components/header";
import Search from "../../components/search";
import {useDispatch, useSelector} from "react-redux";
import {fetchMenu, fetchVenue} from "../../store/venueSlice";
import {AppDispatch} from "../../store/store";

const Menu = () => {
    const dispatch: AppDispatch = useDispatch();
    // const { loading, error, settings, currency } = useSelector((state: any) => state.getVenue); todo tirar depois

    useEffect(() => {
        dispatch(fetchVenue());
        dispatch(fetchMenu());
    }, [dispatch])

    return (
        <div className="container">
            <div>
                <Header/>
                <div className="container_home">
                    <div className="container_content">
                        <Search/>
                        <div className="container_menu">
                            <div className="main_content">
                                <Section/>
                                <MenuDetails/>
                            </div>
                            <div className="basket_card">
                                <Basket/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;