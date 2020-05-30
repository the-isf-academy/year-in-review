# Year in Review

Tool for aggregating student data generated throughout the year
to be used as part of a reflection on learning excercise.

# Setup on firebase branch
1. Install node.js and npm [here](https://nodejs.org/en/download/).
2. Clone this repo.
3. Run `npm install` in the repo directory.
4. Go to firebase > Year in Review > Project Settings > Service Accounts and generate a private key. Create a file `serviceAccountKeys.json` and paste the contents of the private key into that file.
5. Run the app using `npm run site` (which launches both webpack and node server)  

# Setup


1. Install node.js and npm [here](https://nodejs.org/en/download/).
2. Clone this repo.
3. Run `npm install` in the repo directory.
4. Create a `.env` file from the `.env_template` file. Paste in the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` from the [GitHub app page](https://github.com/organizations/the-isf-academy/settings/applications/1290713).
5. Build the app using the build script: `npm run build`
6. Start the server using the start script: `npm start`
