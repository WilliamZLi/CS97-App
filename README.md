Main directory for project

Frontend: React
Backend: Express + MongoDB

Running the app on your local machine:

1. Clone the repository onto your local computer
    - copy the web url from GitHub (the green code dropdown button)
    - run the command `git clone <copied url>`
    - run the command `cd CS97-App`

2. Run the frontend of the app
    - run the command `cd frontend`
    - run the command `npm install` to get node_modules
    - run the command `npm start`
    - There should be a message that says "Compiled successfully!"
    - This means the frontend is running successfully and you can connect to it in your browser.
    - Follow the link "http://localhost:3000" in terminal or input this link in your browser.

3. Run the backend of the app
    - open another terminal and cd into the backend directory
    - go to the CS97-App directory and run `cd backend`
    - run the command `npm install` to get node_modules
    - run the command `npm start`
    - There should be a message thats says 
        "Connected to port 5000 
         Listening on port 5000..."
    - This means the backend/database is running successfully and is listening to the frontend.

Now, the app is ready to go!
Any objects inputted in the frontend will be heard and recorded by the backend/database.
