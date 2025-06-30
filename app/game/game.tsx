import menu from './menu.json';
import { useState } from 'react';

export default function Game() {
  const [selectedItem, setSelectedItem] = useState(menu[0].Item);
  console.log(menu[0].Item);
  console.log('hello');

  return <main>{menu[0].Item}</main>;
}
