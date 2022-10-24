import './App.css';

function Album(props) {
  return (
    <div className="App">
        <p>{props.artistName}</p>
        <p>{props.albumName}</p>
        <img src={props.albumArtwork} alt={props.albumName}/>
        <p>Suggested by: {props.suggestedBy}</p>
        <p>Rating: {props.rating}</p>
        <hr />
    </div>
  );
}

export default Album;
