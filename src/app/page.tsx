import Image from "next/image";
import properties from '../../public/GetProperties.json'
import { ReactNode } from "react";

export default function Home() {
  getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="grid grid-cols-12">
        <div className="col-span-8 map">
          <div>content</div>
        </div>
        <div className="col-span-4 list">
          <GetList />
        </div>
      </div>
    </main>
  );
}

async function getData() {
  console.log("Huyak");
  console.log(properties);
}

function GetList() {
  const markup: ReactNode = properties.map(prop => {
    return <li key={prop.BuildingName}>
      <div className="properties-list__image">
        <img src={prop.MainImage?.ImagePath!} alt="" />
      </div>
      <div className="content">
        <div>{prop.BuildingName}</div>
        <div>{prop.Address}</div>
      </div>
    </li>
  }
  )
  return <ul className="properties-list">{markup}</ul>;
}


