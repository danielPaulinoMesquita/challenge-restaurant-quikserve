import React, {useEffect, useState} from 'react'
import './styles.css'
import minusIcon from '../../assets/img/minus.svg'
import plusIcon from '../../assets/img/plus.svg'
import {useSelector} from "react-redux";
import {IOrderItem} from "../../shared/interfaces/Food";


const Basket = () => {
    const { settings, currency, orderItems } = useSelector((state: any) => state.getVenue)
    const [items, setItems] = useState<IOrderItem[]>([]);

    let pounds = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    const totalValue =  items.reduce((sum,item) => {
        return sum + item.valueTotal
    }, 0)

    const subTotal =  pounds.format(totalValue/7.40)

    const incrementQtd = (id: number | null) => {
        setItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === id) {
                    const updatedQtd = (item.qtd || 0) + 1;
                    const valueUpdated = updatedQtd * item.valueUnique;
                    return { ...item, qtd: updatedQtd, valueTotal: valueUpdated };
                }
                return item;
            });
        });
    }

    const decrementQtd = (id: number | null) => {
        setItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === id) {
                    const updatedQtd = (item.qtd || 0) > 0 ? (item.qtd || 0) - 1 : 0;
                    const valueUpdated = updatedQtd * item.valueUnique;
                    return { ...item, qtd: updatedQtd, valueTotal: valueUpdated }; // Return updated item
                }
                return item; // Return unchanged item
            });
        });
    }

    useEffect(() => {
        setItems(orderItems)
    }, [orderItems]);

    return (
        <div className="container_basket">
            <div className="title">
                <h1>Carrinho</h1>
            </div>

            <div className="container_item">
                {items && items.length === 0 ?
                    <div>
                        Seu carrinho está vazio
                    </div> :
                    items?.map((item: IOrderItem, index: number) => {
                        return (
                            <div key={index} className="container_row">
                                <div className="container_col">
                                    <p>{item.name}</p>
                                    <p className="obs">{item.observation}</p>
                                    <div className="container_qtd">
                                        <button style={{backgroundColor: settings?.primaryColour}}
                                        onClick={()=> decrementQtd(item.id)}>
                                            <img src={minusIcon} alt="Icon" className="icon-image"/>
                                        </button>
                                        <div className="value_qtd">
                                            {item.qtd}
                                        </div>
                                        <button style={{backgroundColor: settings?.primaryColour}}
                                        onClick={() => incrementQtd(item.id)}>
                                            <img src={plusIcon} alt="Icon" className="icon-image"/>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="price">{`${currency}${item.valueTotal}`}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="footer_sub_total">
                <div>Sub total</div>
                <div className="qtd">{`${subTotal}`}</div>
            </div>

            <div className="footer_total">
                <div>Total: </div>
                <div className="qtd">{`${currency} ${totalValue}`}</div>
            </div>
        </div>
    )
}

export default Basket;