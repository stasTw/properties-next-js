import Image from "next/image";
import properties from '../../public/GetProperties.json'
import { ReactNode } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="grid grid-cols-12">
        <div className="col-span-8 map">
          <div>content</div>
        </div>
        <div className="col-span-4 list">
        </div>
      </div>
    </main>
  );
}