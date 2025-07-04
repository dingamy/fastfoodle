import menu from './menu.json';
import { useState, useEffect } from 'react';

export default function Game() {
  const [currentItem, setCurrentItem] = useState<string>("Logo");
  const [currentImage, setCurrentImage] = useState<string>("https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png");
  console.log(currentImage);
  console.log(currentItem);
  console.log('hello');

  const API_KEY = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY;
  const CX = import.meta.env.VITE_GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID;
  
  async function searchImage(itemName: string): Promise<void> {
    let query: string = itemName + " McDonald's";
    const url: string = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&searchType=image&q=${query}`;
    console.log(url);
    try {
      const response = await fetch(url);
       if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const firstImage = json.items?.[0]?.link;
      if (firstImage) {
        console.log("Image found");
        setCurrentImage(firstImage);
      } else {
        console.warn("No image found");
        setCurrentImage(null);
      }
      console.log(json);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error", error);
      }
    }
  }

    useEffect(() => {
      if (menu.length > 0) {
        setCurrentItem(menu[Math.floor(Math.random() * menu.length)].Item)
      }
    }, []);

    useEffect(() => {
      if (menu.length > 0) {
        searchImage(currentItem);
      }
    }, [currentItem]);
  

  return (
    <div>
      <main>{currentItem}</main> 
      <img src={currentImage}/>
    </div>
  );
}
