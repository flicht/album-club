import { useEffect, useState } from 'react';
import './App.css';
import Album from './Album'
import Breakdown from './Breakdown'
import Header from './Header'
import TrackOfTheWeek from './TrackOfTheWeek'
import "./fonts/Director-bold.ttf"
import data from './data.json'

const albums = data.sort((x,y) => y.order - x.order)

// Albums with a score breakdown get their own page at #/album/<id>. Using the
// hash keeps it a single static file, which is all github pages serves.
const albumIdFromHash = () => {
  const match = window.location.hash.match(/^#\/album\/([^/?]+)/);
  return match ? match[1] : null;
}

const readAlbums = (album, index) => (<Album
      key={index}
      index={index}
      artistName={album.artists}
      albumName={album.name}
      url={album.external_urls.spotify}
      albumArtwork={album.images[1].url}
      rating={album.rating}
      suggestedBy={album.suggestedBy}
      breakdownUrl={album.scores ? `#/album/${album.id}` : null}
      />)

function App() {
  const [albumId, setAlbumId] = useState(albumIdFromHash)

  useEffect(() => {
    const onHashChange = () => {
      setAlbumId(albumIdFromHash())
      // Going into or back out of a breakdown should start at the top,
      // not wherever you happened to be scrolled to in the list.
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selected = albums.find((album) => album.id === albumId && album.scores)

  return (
    <div className="App">
      <Header />
      {selected
        ? <Breakdown album={selected} />
        : <>
            {albums.map((album, index) => readAlbums(album, index))}
            <TrackOfTheWeek />
          </>}
    </div>
  );
}

export default App;
