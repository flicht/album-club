// Helpers for the club's five-category scoring system.
//
// Everyone at the session marks each category out of 5. A category's score is
// the average of those marks, and the album's rating is the five category
// scores added together (so out of 25), which is the scale the earlier picks
// on the site were rated on. The notebooks tend to write down the average of
// the five instead, so we show that alongside it.

export const CATEGORY_COUNT = 5;

const mean = (numbers) =>
  numbers.reduce((total, n) => total + n, 0) / numbers.length;

export const categoryAverage = (category) => mean(category.scores);

export const albumTotal = (scores) =>
  scores.categories.reduce((total, c) => total + categoryAverage(c), 0);

export const albumAverage = (scores) => albumTotal(scores) / CATEGORY_COUNT;

// The name a category was given on the night — the wild card gets renamed
// every time ("Livability", "Entropy / Surpriseability", ...).
export const categoryLabel = (category, scores) =>
  category.name === "Wild Card" && scores.wildCard
    ? `Wild Card: ${scores.wildCard}`
    : category.name;

export const raterLabels = (scores) => {
  if (scores.raters) {
    return scores.raters;
  }
  // Some sheets are just columns of marks with no names against them.
  const count = scores.categories[0].scores.length;
  return Array.from({ length: count }, (_, i) => `#${i + 1}`);
};

export const round = (n, places = 2) => {
  const fixed = n.toFixed(places);
  // Trim trailing zeros so 3.50 reads as 3.5 and 4.00 as 4.
  return fixed.replace(/\.?0+$/, "");
};

export const albumPath = (album) => `#/album/${album.id}`;
