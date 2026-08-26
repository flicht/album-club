import "./App.css";

function Album(props) {
  const makeArtistStr = (artists) => {
    if (artists.length > 1) {
      return artists[0].name + " & " + artists[1].name;
    } else {
      return artists[0].name;
    }
  };

  const artistStr = makeArtistStr(props.artistName);
  let currentPick = null;
  let firstPick = false;
  let firstStyles = {};

  if (props.index === 0) {
    currentPick = (
      <h2>
        <span className="picksHeading">Current Pick</span>
      </h2>
    );
    firstStyles = {
      "background-color": "white",
      margin: "auto",
      padding: "10px",
      border: "2px solid black",
      "max-width": "700px",
    };
    firstPick = true;
  }

  if (props.index === 1) {
    currentPick = (
      <h2>
        <span className="picksHeading">Previous Picks</span>
      </h2>
    );
  }

  const rating = (
    <span style={{ "background-color": "DarkKhaki" }}>{props.rating}</span>
  );

  return (
    <div className="App">
      <div className="album" style={firstStyles}>
        {currentPick}
        <p>{artistStr}</p>
        <p>{props.albumName}</p>
        <a href={props.url}>
          <img src={props.albumArtwork} alt={props.albumName} />
        </a>
        <p>Suggested by: {props.suggestedBy}</p>
        <p>
          Rating:
          {props.breakdownUrl ? (
            <a
              className="ratingLink"
              href={props.breakdownUrl}
              title={`See how ${props.albumName} was scored`}
            >
              {rating}
            </a>
          ) : (
            rating
          )}
        </p>
        {props.breakdownUrl && (
          <p className="breakdownHint">
            <a href={props.breakdownUrl}>See the full breakdown</a>
          </p>
        )}
        {!firstPick && <hr />}
      </div>
    </div>
  );
}

export default Album;
