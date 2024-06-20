#!/bin/bash

echo "Generating .env file ..."
echo "REACT_APP_API_URL=https://pokeapi.co/api/v2" > .env
echo ".env file generated successfully."

echo
echo "Installing npm packages ..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install npm packages."
    read -p "Press Enter to exit..."
    exit 1
fi

echo "npm packages installed successfully."

echo
echo "You can now run the app locally by using \`npm start\` command."
read -p "Press Enter to continue..."
