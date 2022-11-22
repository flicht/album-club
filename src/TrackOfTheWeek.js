import { useEffect, useState } from "react";
import "./App.css";

function TrackOfTheWeek() {
  return (
    <div className="App">
      <div className="trackoftheweek">
        <p style={{"backgroundColor": "cyan"}}>TRAC of the week</p>
        <p>
          <iframe style={{"border-radius":"12px"}} src="https://open.spotify.com/embed/playlist/1bvaqWbE4ONh7CvEQ3boY4?utm_source=generator&theme=0" width="80%"  height="380" frameBorder="0" allowFullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </p>
      </div>
    </div>
  );
}

export default TrackOfTheWeek;
