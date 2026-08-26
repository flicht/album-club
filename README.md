In the project directory, you can run:

### `python scripts/get_album_data.py`

Generates `src/data.json` from `albumData.json` to populate the site.

Put your spotify credentials in `.env`

This happens every ime you make a commit with github actions

### Score sheets

Photos of the scoring sheets go in `public/scores/`, and the album's `scores`
block in `albumData.json` points at one by file name:

```
"scores": { "sheet": "2026-08-13-soulwax.jpg", ... }
```

The breakdown page shows it under the table. Albums with no photo just don't
get one.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Pushing site to github will trigger a build
