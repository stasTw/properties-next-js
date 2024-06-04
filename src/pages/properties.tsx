import { ReactNode } from "react";
import { useState } from 'react'
import { Property } from "@/app/propety";
import "../app/globals.css"
import buildings from '../../public/GetProperties.json';
import { MapProvider } from "@/app/components/map-provider";
import { MapComponent } from "@/app/components/map";

export default function Properties(props: Props) {
    const posts = props.buildings;
    const markers: Array<google.maps.LatLngLiteral>  = props.buildings.map(building => ({lat: building.Latitude, lng: building.Longitude}));

    const [searchItem, setSearchItem] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [filteredMarkers, setMarkers] = useState(markers);

    const handleInputChange = (e: any) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        console.log(posts.length);
        const filteredItems = posts.filter((post) =>
            post.BuildingName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredPosts(filteredItems);
        setMarkers(filteredItems.map(building => ({lat: building.Latitude, lng: building.Longitude})));
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="grid grid-cols-12">
                <div className="col-span-8 map">
                    <input type="text" placeholder="Search" value={searchItem} onChange={handleInputChange} />
                    <MapProvider>
                        <MapComponent markers={filteredMarkers} ></MapComponent>
                    </MapProvider>
                </div>
                <div className="col-span-4 list">
                    <GetList properties={filteredPosts} />
                </div>
            </div>
        </main>
    )
}

// This function gets called at build time
export async function getStaticProps() {
    return {
        props: {
            buildings,
        },
    }
}

type ListProps = {
    properties: Property[]
}

function GetList(listProps: ListProps) {
    const copyPosts = [...listProps.properties];
    copyPosts.length = 20;
    const markup: ReactNode = copyPosts.map(prop => {
        return <li key={prop.BuildingName} className="properties-list__item">
            <div className="properties-list__image">
                <img src={prop.MainImage ? prop.MainImage.ImagePath : "https://i.ebayimg.com/images/g/ksYAAOSwD7ljaYRn/s-l1600.jpg"} alt="" />
            </div>
            <div className="content">
                <div>{prop.BuildingName}</div>
                <div>{prop.BuildingName}</div>
            </div>
        </li>
    })
    return <ul className="properties-list">{markup}</ul>;
}


interface Props {
    buildings: Array<Property>;
}