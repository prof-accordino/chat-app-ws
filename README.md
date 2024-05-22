# STEP TO USE LOCALLY THE SERVER

## install node.js (if you don't have)

1. go to https://nodejs.org/en and install the last version

## start the server

1. Clone the repository locally and open in VS Code
2. Install "Live Server" extension
3. Change in app.js the source (URL) of the socket.IO server
4. In the bottom right click on "Go Live" and open the correct page in your localhost. It should be one of these two:
   1. "http://127.0.0.1:5500/server/public/"
   2. "http://localhost:5500/server/public/"
5. Open the terminal of the directory in VS Code and use the following commands:
   1. npm install nodemon
   2. cd server
   3. npm run dev
6. If you have done all correctly you should see "Welcome to Chat App"

### if you have issues in windows

1. open powershell with admin privilege
2. Digit the following command:
   Set-ExucutionPolicy unrestricted
