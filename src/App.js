import logo from './logo.svg';
import './App.css';
import Album from './Album'
import Header from './Header'

import "./fonts/Director-bold.ttf"

// import albumData from './data.json'
import data from './data.json'

console.log(data)




const albums = data 

albums.forEach((x, i) => console.log(x));



const readAlbums = (album) => (<Album 
      artistName={album.artists[0].name}
      albumName={album.name}
      albumArtwork={album.images[1].url}
      rating={album.rating}
      suggestedBy={album.suggestedBy}
      />)

function App() {
  return (
    <div className="App">
      <Header />
      {albums.map((album) => readAlbums(album))}
    </div>
  );
}

export default App;
