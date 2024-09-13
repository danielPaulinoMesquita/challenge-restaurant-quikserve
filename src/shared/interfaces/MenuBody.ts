export interface VenueResponse {
    data: any;
}

export interface MenuResponse {
    data: any;
}

export interface IImage {
    id: number,
    image: string
}

export interface IItem {
    id: number,
    name: string,
    description: string,
    alcoholic: number,
    price: number,
    position: number,
    visible: number,
    availabilityType: string,
    sku: string,
    images: IImage[],
    available: boolean
}

export interface ISection {
    id: number,
    name: string,
    description: string,
    images: IImage[],
    items: IItem[]
}

export interface IWebSettings {
    id: number,
    venueId: number,
    bannerImage: string,
    backgroundColour: string,
    primaryColour: string,
    primaryColourHover: string,
    navBackgroundColour: string
}