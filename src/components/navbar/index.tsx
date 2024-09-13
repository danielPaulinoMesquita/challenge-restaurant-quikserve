import React, {FC, useState} from 'react'
import './styles.css'

interface MenuItem {
    name: string,
    isSelected: boolean
}

interface NavbarProps {
    personalStyle: {
        navBackgroundColour: string
    }
}

const MENU_ITEMS: MenuItem[] = [
    {name: 'MENU', isSelected: true},
    {name: 'ENTRAR', isSelected: false},
    {name: 'CONTATO', isSelected: false}
]

const Navbar: FC<NavbarProps> = ({personalStyle}) => {
    const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS)

    const onSelect = (id: number) => {
       const itemsUpdated = items.map((value, index) => {
           return index === id ?
               {...value, isSelected: true} :
               {...value, isSelected: false}
       })

       setItems(itemsUpdated)
    }

    return (
        <nav className="container_nav"
             style={{backgroundColor: personalStyle?.navBackgroundColour}}>
            { items.map((value, index) => {
                return <div key={index}
                            className="item_route"
                            style={{borderBottom: value.isSelected ? '2px solid #ffff': "none"}}
                            onClick={() => onSelect(index)}>
                    {value.name}
                </div>
            })}
        </nav>
    )
}

export default Navbar;