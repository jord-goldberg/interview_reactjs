## Prerequisites

Visit [Pixabay](https://pixabay.com) and sign up for a free account. Once you're done, [find your API key](https://pixabay.com/api/docs/#api_key) and save it for later.

## Run the app locally
1. Clone this repository to your local machine.
```bash
git clone https://github.com/jord-goldberg/interview_reactjs.git
```
2. Create a .env file in the root directory.
```bash
cd interview_reactjs
touch .env
```
3. Open the file you just created, add `REACT_APP_PIXABAY_KEY={/*Your API Key*/}` and save (Replace `{/*Your API Key*/}` with the API key from the prerequisite step).
```bash
open .env
```
4. Make sure you have typescript on your machine.
```bash
npm install -g typescript
```
5. Install dependencies
```bash
npm install
```
6. You're all set!
```bash
npm start
```
