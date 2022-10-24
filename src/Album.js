import './App.css';

function Album(props) {

  const makeArtistStr = (artists) => {
    if (artists.length > 1){
      return artists[0].name + " & " + artists[1].name
    } else {
      return artists[0].name
    }
  }

  const artistStr = makeArtistStr(props.artistName)


  return (
    <div className="App">
        <p>{artistStr}</p>
        <p>{props.albumName}</p>
        <img src={props.albumArtwork} alt={props.albumName}/>
        <p>Suggested by: {props.suggestedBy}</p>
        <p >Rating: <span style={{"background-color": "DarkKhaki"}}>
          {props.rating}</span></p>
        <hr />
    </div>
  );
}

export default Album;
