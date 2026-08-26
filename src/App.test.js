import { render, screen } from '@testing-library/react';
import App from './App';
import Breakdown from './Breakdown';
import data from './data.json';

const scoredAlbum = data.find((album) => album.scores);

afterEach(() => {
  window.location.hash = '';
});

test('lists the albums on the front page', () => {
  render(<App />);
  expect(screen.getByText(/Current Pick/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Suggested by:/i).length).toBe(data.length);
});

test('links a scored album to its breakdown page', () => {
  render(<App />);
  const links = screen.getAllByText(/See the full breakdown/i);
  expect(links.length).toBe(data.filter((album) => album.scores).length);
  expect(links[0].getAttribute('href')).toMatch(/^#\/album\//);
});

test('shows the breakdown when the hash points at an album', () => {
  window.location.hash = `#/album/${scoredAlbum.id}`;
  render(<App />);
  expect(screen.getByText(/Score Breakdown/i)).toBeInTheDocument();
  expect(screen.getByText(/Back to all albums/i)).toBeInTheDocument();
  scoredAlbum.scores.categories.forEach((category) => {
    const label = category.name === 'Wild Card'
      ? new RegExp(`Wild Card: ${scoredAlbum.scores.wildCard}`, 'i')
      : new RegExp(`^${category.name}$`, 'i');
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

test('shows the scoring sheet photo when the data points at one', () => {
  const album = {
    ...scoredAlbum,
    scores: { ...scoredAlbum.scores, sheet: '2026-08-13-soulwax.jpg' },
  };
  render(<Breakdown album={album} />);
  const sheet = screen.getByAltText(/scoring sheet filled in for/i);
  expect(sheet.getAttribute('src')).toMatch(/\/scores\/2026-08-13-soulwax\.jpg$/);
});
