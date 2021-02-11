
CS97-App
HBCXGYMO

Public API Key for MongoDB > The public key acts as the username when making API requests.
f1bb802e-cf8f-4383-b002-269ba03e7da8

private key > The private key acts as the password when making API requests.

Run with windows powershell:
SET=DEBUG=\<directory\>:\*
npm run dev

Notes:
using nodemon (run dev) as apparently it helps restart the server if changes are made
run with npm run dev -V (verbose mode) if you want to check if it's working
routing: from what i can tell, to route (make a new page) you need:
in app.js:
var \<name\>Router = require('./routes/\<name\>');
app.use('/users', \<name\>Router);

and in ./routes (sub-directory)
create the \<name\> file
(use the ones already there for reference)
