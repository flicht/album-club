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
  let currentPick = null
  let firstPick = false
  let firstStyles = {}
  
  if (props.index === 0) {
    currentPick = <h1><span style={{"font-family": "Bold", "color": "black", "letter-spacing": "10px", "text-decoration": "underline"}}>Current pick</span></h1>
    firstStyles = {"background-color": 'white', 'width': "50%", "margin": "auto", "border": "2px solid black"}
    firstPick = true
  }


  return (
    <div className="App" >
      <div style={firstStyles}>
      {
        currentPick
      }
        <p>{artistStr}</p>
        <p>{props.albumName}</p>
        <a href={props.url}>
          <img src={props.albumArtwork} alt={props.albumName}/>
        </a>
        <p>Suggested by: {props.suggestedBy}</p>
        <p>Rating: <span style={{"background-color": "DarkKhaki"}}>
          {props.rating}</span></p>
        { !firstPick && <hr /> } 
      </div>
    </div>
  );
}

export default Album;
