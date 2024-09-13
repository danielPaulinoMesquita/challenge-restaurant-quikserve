import React, {useState} from 'react'
import './styles.css'
import close from "../../assets/img/close.svg";
import {Food, IOrderItem} from "../../shared/interfaces/Food";
import minusIcon from "../../assets/img/minus.svg";
import plusIcon from "../../assets/img/plus.svg";
import {useDispatch, useSelector} from "react-redux";
import imageDefault from "../../assets/img/default_image.svg"
import {addOrderBasket} from "../../store/venueSlice";

interface ModifyItem {
    name: string;
    price: number;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Food | undefined;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
    console.log("ITEM: ", item)

    const dispatch = useDispatch();
    const { settings, currency } = useSelector((state: any) => state.getVenue)
    const [qtdItem, setQtdItem] = useState(1);
    const [modify, setModify] = useState<ModifyItem| null>(null);
    const valueOrder = item?.price ? item.price * qtdItem : modify?.price ? modify?.price * qtdItem : item?.price;

    if (!isOpen) return null;

    const incrementQtd = () => {
        setQtdItem(prevState => prevState + 1)
    }

    const decrementQtd = () => {
        setQtdItem(prevState => Math.max(prevState - 1, 1));
    }

    const onAddOrder = () => {
        if (valueOrder && valueOrder > 0) {
            const orderItem: IOrderItem = {
                id: item?.id || null,
                name: item?.name||'Não informado',
                valueTotal: valueOrder,
                valueUnique: item?.price || 0,
                qtd: qtdItem,
                observation: modify?.name
            }

            dispatch(addOrderBasket(orderItem))
        }
    }

    return (
        <div className="modal_overlay">
            <div className="modal_content">
                <div className="background_cover"
                     style={{backgroundImage: `url(${item?.images ? item?.images[0].image: imageDefault})`}}>
                    <div className="container_button">
                        <button className="close_button" onClick={onClose}>
                            <img src={close} alt="Icon" className="icon-image"/>
                        </button>
                    </div>
                </div>
                <div className="children_content">
                    <h1>{item?.name}</h1>
                    <p>{item?.description}</p>
                </div>
                {item?.modifiers &&
                    <div className="container_modify">
                        <div className="title_options">
                            <h3>{item?.modifiers[0].name}</h3>
                            <p>Select {item?.modifiers[0].maxChoices} option</p>
                        </div>
                        {item?.modifiers[0].items.map((item, index) => {
                            return (
                                <div key={index} className="item">
                                    <div>
                                        <h3 className="desc">{item.name}</h3>
                                        <p className="qtd">{item.price}</p>
                                    </div>
                                    <div>
                                        <input type='radio'
                                               id="modify"
                                               checked={modify?.name === item.name}
                                               onChange={e => setModify(item)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                <div className="container_modal_qtd">
                    <button style={{backgroundColor: `${settings?.primaryColour}`, cursor: 'pointer'}} onClick={() => decrementQtd()}>
                        <img src={minusIcon} alt="Icon" className="icon-image"/>
                    </button>

                    <div className="value_qtd">
                        {qtdItem}
                    </div>
                    <button style={{backgroundColor: `${settings?.primaryColour}`, cursor: 'pointer'}} onClick={() => incrementQtd()}>
                        <img src={plusIcon} alt="Icon" className="icon-image"/>
                    </button>
                </div>

                <div className="container_add_button">
                    <button
                        className="add_button"
                        style={{backgroundColor: `${settings?.primaryColour}`}}
                        onClick={() => onAddOrder()}>
                        {`Add to odder - ${currency}${valueOrder}`}
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Modal