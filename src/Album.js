import './App.css';

function Album(props) {
  return (
    <div className="App">
        <p>{props.artistName}</p>
        <p>{props.albumName}</p>
        <img src={props.albumArtwork} />
        <p>Rating: {props.rating}</p>
        <hr />
    </div>
  );
}

export default Album;
