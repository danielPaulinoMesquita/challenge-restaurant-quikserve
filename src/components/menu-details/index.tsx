import React, {useState} from 'react'
import './styles.css'
import Modal from "../modal";
import {Food} from "../../shared/interfaces/Food";
import {useSelector} from "react-redux";
import {IItem} from "../../shared/interfaces/MenuBody";
import imageDefault from "../../assets/img/default_image.svg"

const MenuDetails = () => {
    const { sectionSelected, sectionName, settings, currency } = useSelector((state: any) => state.getVenue);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [food, setFood] = useState<Food>({
        id: null,
        modifiers: [],
        name: '',
        description: '',
        images: [{image: '', id: ''}],
        price: 0});

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onSelect = (food: any) => {
        setFood(food);
        openModal();
    }

    const personalHover = {
        border: `2px solid ${settings?.primaryColourHover}`,
        borderRadius: '20px',
        padding: '8px'
    }

    const defaultHover = {
        border: 'none',
        padding: '0px'
    }

    return (
        <div className="container_menu_details">
            <h1>{sectionName}</h1>
            <div>
                { sectionSelected?.map((item: IItem, index: number) => {
                    return (
                        <div className="container_menu_item"
                             onMouseEnter={(e) =>
                                 Object.assign(e.currentTarget.style, personalHover)} // Apply hover style
                             onMouseLeave={(e) =>
                                 Object.assign(e.currentTarget.style, defaultHover)} // Remove hover style
                             onClick={() => onSelect(item)}
                             key={index}>
                            <div>
                                <h2>{item.name}</h2>
                                <p className="color_menu">{
                                    item.description && item.description.length > 52 ?
                                    item.description.substring(0, 50).concat("..."):
                                    item.description}</p>
                                <h2 className="color_menu">{`${currency} ${item.price}`}</h2>
                            </div>
                            <div>
                                {item.images ?
                                    <img className="img_product"
                                         src={item.images[0].image}
                                         alt={`item-${item.images[0].id}`}/> :
                                    <img className="img_product"
                                         src={imageDefault}
                                         alt={`item-${item.id}`}/>
                                }

                            </div>
                        </div>
                    )
                })}
            </div>
            <Modal isOpen={isModalOpen}
                   onClose={closeModal}
                   item={food} />
        </div>
    )
}

export default MenuDetails;