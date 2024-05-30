import { ReactNode } from "react";
import { useState } from 'react'
import "../app/globals.css"
export default function Posts(props:Props) {
    const posts = props.posts;

    const [searchItem, setSearchItem] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleInputChange = (e: any) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        console.log(posts.length);
        const filteredItems = posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredPosts(filteredItems)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <div className="grid grid-cols-12">
          <div className="col-span-8 map">
            <input type="text" placeholder="Search" value={searchItem} onChange={handleInputChange}/>
          </div>
          <div className="col-span-4 list">
            <GetList posts={filteredPosts} />
          </div>
        </div>
      </main>
            )
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    console.log(res);
    const posts: Post = await res.json()
   
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }

  type ListProps = {
    posts: Post[]
  }

  function GetList(listProps: ListProps) {
    const copyPosts = [...listProps.posts];
    copyPosts.length = 20;
    const markup: ReactNode = copyPosts.map(prop => {
      return <li key={prop.id}>
        <div className="properties-list__image">
          <img src={prop.url} alt="" />
        </div>
        <div className="content">
          <div>{prop.title}</div>
          <div>{prop.title}</div>
        </div>
      </li>
    })
    return <ul className="properties-list">{markup}</ul>;
  }


  export interface Props {
    posts: Array<Post>;
  }
  
  export class Post {
    public constructor(albumId:number, id:number, title: string, url:string,thumbnailUrl: string) {
      this.albumId = albumId;
      this.id = id;
      this.title = title;
      this.url = url;
      this.thumbnailUrl = thumbnailUrl;
    }
    public albumId: number;
    public id: number;
    public title: string;
    public url: string;
    public thumbnailUrl: string;
  }