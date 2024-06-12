import { ReactNode } from "react";
import { useState } from 'react'
import { Property, SearchConfig } from "@/app/propety";
import "../app/globals.css"
import buildings from '../../public/GetProperties.json';
import { MapProvider } from "@/app/components/map-provider";
import { MapComponent } from "@/app/components/map";
import Image from 'next/image'

export const initialSearchConfig: SearchConfig = new SearchConfig(true, true, true);

// export const BuildingNameSearachPredicate = (post: Property) => {post.BuildingName.toLocaleLowerCase().includes()};

export default function Properties(props: Props) {
    const posts = props.buildings;
    const markers: Array<google.maps.LatLngLiteral> = props.buildings.map(building => ({ lat: building.Latitude, lng: building.Longitude }));

    const [searchItem, setSearchItem] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [filteredMarkers, setMarkers] = useState(markers);
    const [searchConfig, setSearchConfig] = useState(initialSearchConfig);

    const handleInputChange = (e: any) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = searchTerm === "" ? posts : SearchByConfig(posts, searchConfig, searchTerm);

        setFilteredPosts(filteredItems);
        setMarkers(filteredItems.map(building => ({ lat: building.Latitude, lng: building.Longitude })));
    }

    const handleCheckboxChange = (e: any) => {
        const target = e.target;
        let nextConfigState: SearchConfig = initialSearchConfig;

        if (target.id == "name-checkbox") {
            setSearchConfig({ ...searchConfig, byName: target.checked });
            nextConfigState = { ...searchConfig, byName: target.checked };
        } else if (target.id == "address-checkbox") {
            setSearchConfig({ ...searchConfig, byAddress: target.checked });
            nextConfigState = { ...searchConfig, byAddress: target.checked };
        } else if (target.id == "state-checkbox") {
            setSearchConfig({ ...searchConfig, byState: target.checked });
            nextConfigState = { ...searchConfig, byState: target.checked };
        }

        const filteredItems = searchItem === "" ? posts : SearchByConfig(posts, nextConfigState, searchItem);

        setFilteredPosts(filteredItems);
        setMarkers(filteredItems.map(building => ({ lat: building.Latitude, lng: building.Longitude })));
    }

    return (
        <main style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "16px", height: "100%" }}>
                <div style={{ flexBasis: "80%" }}>
                    <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
                        <input type="text" placeholder="Search" value={searchItem} onChange={handleInputChange} />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span>Search by:</span>
                        </div>
                        <div style={{ borderLeft: "3px solid #959595;" }}></div>
                        <div className="checkbox-wrapper-8">
                            <input className="tgl tgl-skewed" id="name-checkbox" type="checkbox" checked={searchConfig.byName} onChange={handleCheckboxChange} />
                            <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="name-checkbox"></label>
                            <span>Name</span>
                        </div>
                        <div className="checkbox-wrapper-8">
                            <input className="tgl tgl-skewed" id="address-checkbox" type="checkbox" checked={searchConfig.byAddress} onChange={handleCheckboxChange} />
                            <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="address-checkbox"></label>
                            <span>Address</span>
                        </div>
                        <div className="checkbox-wrapper-8">
                            <input className="tgl tgl-skewed" id="state-checkbox" type="checkbox" checked={searchConfig.byState} onChange={handleCheckboxChange} />
                            <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="state-checkbox"></label>
                            <span>State</span>
                        </div>
                    </div>
                    <MapProvider>
                        <MapComponent markers={filteredMarkers} ></MapComponent>
                    </MapProvider>
                </div>
                <div style={{ flexBasis: "20%", height: "660px", overflowY: "scroll" }}>
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

function SearchByConfig(props: Property[], config: SearchConfig, searchTerm: string): Property[] {
    const BuildingNameSearchPredicate = (post: Property) => { return (post.BuildingName.toLocaleLowerCase().includes(searchTerm.toLowerCase())) };
    const AddressSearchPredicate = (post: Property) => { return (post.Address.toLocaleLowerCase().includes(searchTerm.toLowerCase())) };
    const StateSearchPredicate = (post: Property) => { return (post.State.toLocaleLowerCase().includes(searchTerm.toLowerCase())) };

    let res: Property[] = []
    if (config.byAddress && config.byName && config.byState) {
        res = props.filter((post) => post.BuildingName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
            post.Address.toLocaleLowerCase().includes(searchTerm.toLowerCase()) || post.State.toLocaleLowerCase().includes(searchTerm.toLowerCase()));
    } else if (config.byAddress && config.byName && !config.byState) {
        res = props.filter((post) => post.BuildingName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
            post.Address.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
    } else if (config.byAddress && config.byState && !config.byName) {
        res = props.filter((post) => post.Address.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
            post.State.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
    } else if (config.byName && config.byState && !config.byAddress) {
        res = props.filter((post) => post.BuildingName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
            post.State.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
    } else if (config.byAddress && !config.byName && !config.byState) {
        res = props.filter(AddressSearchPredicate);
    } else if (config.byName && !config.byAddress && !config.byState) {
        res = props.filter(BuildingNameSearchPredicate);
    } else if (config.byState && !config.byAddress && !config.byName) {
        res = props.filter(StateSearchPredicate);
    }

    return res;
}

function GetList(listProps: ListProps) {
    const copyPosts = [...listProps.properties];
    copyPosts.length = 15;
    const markup: ReactNode = copyPosts.map(prop => {
        return <li className="card" key={prop.PropertyId + prop.BuildingName}>
            <Image fill={true} src={prop.MainImage ? prop.MainImage.ImagePath : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} alt="" className="card__img" />
            <span className="card__footer">
                <span>{prop.BuildingName}</span>
            </span>
        </li>
    })
    return <ul className="properties-list">{markup}</ul>;
}


interface Props {
    buildings: Array<Property>;
}