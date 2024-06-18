@echo off
cls

echo generating .env file ...
echo REACT_APP_API_URL=https://pokeapi.co/api/v2/ > .env
echo .env file generated successfully.

echo.
echo instaling npm packages ...
npm install
if %errorlevel% neq 0 (
    echo Failed to install npm packages.
    pause
    exit /b %errorlevel%
)
echo npm packages installed successfully.

echo.
echo You can now run the app locally by using `npm start` command.
pause
