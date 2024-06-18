# Pokedex

A web app to list your pokemons.

## Using the App

### Hosted
The app is hosted in vercel and can be opened at https://po-ke-dex.vercel.app/.

### Locally
To run the app locally, do the following steps:
- Clone this repository.
- Open:
  - `install.bat` for windows machine (tested).
  - `install.sh` for mac/linux machine (untested).
- Run `npm start` command to start the app.

Note that the `.env` file is generated automatically. This is to provide convenience for user that want to run this app locally. If `.env` did not generate successfully, please manually create `.env` file and fill it using the value below:
```
REACT_APP_API_URL=https://pokeapi.co/api/v2/ 
```
