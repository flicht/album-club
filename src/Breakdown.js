import "./App.css";
import {
  albumAverage,
  albumTotal,
  categoryAverage,
  categoryLabel,
  raterLabels,
  round,
} from "./scoring";

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Breakdown(props) {
  const album = props.album;
  const scores = album.scores;
  const raters = raterLabels(scores);

  const bestCategory = scores.categories.reduce((best, c) =>
    categoryAverage(c) > categoryAverage(best) ? c : best,
  );
  const worstCategory = scores.categories.reduce((worst, c) =>
    categoryAverage(c) < categoryAverage(worst) ? c : worst,
  );

  return (
    <div className="App breakdown">
      <p>
        <a className="backLink" href="#/">
          &larr; Back to all albums
        </a>
      </p>

      <div className="breakdownCard">
        <h2>
          <span className="picksHeading">Score Breakdown</span>
        </h2>
        <p>{album.artists.map((artist) => artist.name).join(" & ")}</p>
        <p>{album.name}</p>
        <a href={album.external_urls.spotify}>
          <img src={album.images[1].url} alt={album.name} />
        </a>
        <p>Suggested by: {album.suggestedBy}</p>
        {scores.scoredOn && <p>Scored on {formatDate(scores.scoredOn)}</p>}

        <p className="headlineScore">
          <span style={{ backgroundColor: "DarkKhaki" }}>
            {round(albumTotal(scores), 1)}
          </span>
        </p>
        <p className="scoreCaption">
          out of 25 &mdash; that is {round(albumAverage(scores))} out of 5
          averaged across the {scores.categories.length} categories, marked by{" "}
          {raters.length} {raters.length === 1 ? "person" : "people"}
        </p>

        <p className="scoreCaption scrollHint">
          Scroll the table sideways to see everyone&rsquo;s marks.
        </p>

        <div className="scoreTableScroller">
          <table className="scoreTable">
            <thead>
              <tr>
                <th scope="col">Category</th>
                {raters.map((rater, index) => (
                  <th scope="col" key={index}>
                    {rater}
                  </th>
                ))}
                <th scope="col" className="averageCell">
                  Avg
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.categories.map((category) => (
                <tr key={category.name}>
                  <th scope="row">{categoryLabel(category, scores)}</th>
                  {category.scores.map((score, index) => (
                    <td key={index}>{score === null ? "–" : score}</td>
                  ))}
                  <td className="averageCell">
                    {round(categoryAverage(category))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td colSpan={raters.length}></td>
                <td className="averageCell">{round(albumTotal(scores), 1)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="scoreCaption">
          Strongest category: {categoryLabel(bestCategory, scores)} (
          {round(categoryAverage(bestCategory))}). Weakest:{" "}
          {categoryLabel(worstCategory, scores)} (
          {round(categoryAverage(worstCategory))}).
        </p>

        {scores.note && (
          <p className="scoreNote">&ldquo;{scores.note}&rdquo;</p>
        )}
      </div>
    </div>
  );
}

export default Breakdown;
