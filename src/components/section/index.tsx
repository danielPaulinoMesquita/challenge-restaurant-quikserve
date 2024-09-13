import React, {useState} from 'react'
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {ISection} from "../../shared/interfaces/MenuBody";
import Spinner from "../spinner";
import {changeSection} from "../../store/venueSlice";

const Section = () => {
    const dispatch = useDispatch();
    const { loading, sections, settings } = useSelector((state: any) => state.getVenue)
    const [section, setSection] = useState<Number>()

    const onSelect = (id: number) => {
        setSection(id)
        dispatch(changeSection(id))
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className="container_section">
            { sections?.map((value: ISection, index: number) => {
                return (
                    <div key={value.id}
                         className="item_section"
                         onClick={() => onSelect(value.id)}>

                        <div className="carrousel_card"
                             style={{ borderBottom: section === value.id ?
                                     `3px solid ${settings?.primaryColour}`:
                                     'none'}}>
                            <img className="img_product"
                                 style={{
                                     border: section === value.id ?
                                         `3px solid ${settings?.primaryColour}` :
                                         'none'}}
                                 src={value.images[0].image}
                                 alt={`item-${value.images[0].id}`}/>
                            <p className="desc">{value.name}</p>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Section;