import './App.css';
import Album from './Album'
import Header from './Header'
import "./fonts/Director-bold.ttf"
import data from './data.json'

const albums = data.sort((x,y) => y.order - x.order)

const readAlbums = (album, index) => (<Album
      index={index}
      artistName={album.artists}
      albumName={album.name}
      url={album.external_urls.spotify}
      albumArtwork={album.images[1].url}
      rating={album.rating}
      suggestedBy={album.suggestedBy}
      />)

function App() {
  return (
    <div className="App">
      <Header />
      {albums.map((album, index) => readAlbums(album, index))}
    </div>
  );
}

export default App;
