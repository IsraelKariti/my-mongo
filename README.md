# Backend for url shortener

install node.js
install npm

In the repo run:
npm install
npm install express --save  
npm install mongoose  
npm install --save nanoid@3
npm install --save body-parser

create a .env file in the root directory and assign an environment variables inside it(contact repo owner for user-name and password):
MONGO_URI=mongodb+srv://<user-name>:<password>@cluster0.vutp909.mongodb.net/shortener
CORS=
  
NOTE: CORS is an environment variable with value of empty string on purpose
  
npm run devStart
