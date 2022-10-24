import { useEffect, useState } from 'react';
import './App.css';

function Header() {

  const[titleColour, setTitleColour] = useState('magenta')

  const colours = ['magenta', 'cyan', 'red', 'yellow', 'turquoise']
  // const colours = ['darkkhaki', 'darksalmon', 'crimson', 'darkslategrey', 'olive', 'pink', 'tomato']

  const cycleTitleColours = (titleColour) => {
    let newColours = colours.filter(x => x !== titleColour);
    let newColour = newColours[Math.floor(Math.random()*newColours.length)];
    setTitleColour(newColour)
  }

  useEffect( () => {
      let timer = setTimeout(() => cycleTitleColours(titleColour), 1000);
      return () => clearTimeout(timer);
  })

  return (
    <div className="App header" style={{"background-color": titleColour}}>
      <p>
        The Real Album Club
      </p>
    </div>
  );
}

export default Header;
