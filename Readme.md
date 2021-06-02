Steps to make Ecommerce website

1. Create folder structure
  
  1. create root folder as amazona
  2. add frontend and backend folder
  3. create src folder in frontend
  4. create index.html with heading amazon in src
  5. run npm init in frontend
  6. npm install live-server
  7. add start command as live-server src --verbose
  8. run npm start

2. Design Website

  1. create style.css
  2. link style.css to index.html
  3. create div.grid-container
  4. create header,main,footer
  5. style html ,body
  6. style grid-container,header,main,footer

3. Check Static Home Screen 
  
  1. create ul.products
  2. create li
  3. create div.products
  4. add .product-image, .product-name, .product-brand, .product-price
  5. style ul.products and internal divs
  6. duplicate 2 times to show 3 products

4. Render Dynamic Home Screen

  1. create data.js
  2. export an array of 6 products
  3. create screen/homeScreen
  4. export homeScreen as an object with render method
  5. implement render
  6. import data.js
  7. return products mapped inside to list inside ul
  8. create app.js
  9. link it to index.html as module
  10. set main id to main_container
  11. create router() function
  12. set main_container innerHTML to  HomeScreen.render()
  13. set load event of window to router() function

5. Build URL Router
 
  1. create routes as route : screen object for home screen
  2. create utils.js
  3. export parseRequestURL()
  4. set url as hash address split by slash
  5. return resource,id and verb of url
  6. update router()
  7. set request as parseRequestURL()
  8. build parsedUrl and compare with routes
  9. if route exists render it , else render error 404
  10. create screens/Error404.js and render error message

6. Create node.js server

  1. run npm init to root amazona folder
  2. npm install express
  3. create server.js
  4. add start command as node bacend/server.js
  5. require express
  6. move data.js from frontend to backend
  7. create routefor /api/products
  8. return products in data.js
  9. run npm start

7. Load Products From Backend

  1. edit HomeScreen.js
  2. make render async
  3. fetch products from /api/products/ in render()
  4. make router() async and call await HomeScreen.render()
  5. use cors on backend

8. Add Webpack

  1. cd frontend
  2. npm install -D webpack webpack-cli webpack-dev-server
  3. npm uninstall live-server
  4. "start":"Webpack-dev-server --mode development --watch-content-base --open"
  5. move index.html ,sttle.css and images to frontend folder
  6. rename app.js to index.js
  7. update index.html
  8. add <script src="main.js"></script> before <body>
  9. npm start
  10. npm install axios
  11. change fetch to axios in HomeScreens

9. Install Babel for ES6 syntax

  1. npm install -D babel core,cli,node,preset-env
  2. Create .babelrc and set preset to @babel/preset-env
  3. npm install -D nodemon
  4. set start :nodemon --watch backend --exec babel-node /backend/server.js
  5. convert require to import server.js
  6. mpm start

10. Create Rating Component
  
  1. create components/Rating
  2. create div.rating
  3. link to fontawesome.css in index.html
  4. define Rating object with render()
  5. if !props.value return empty div
  6. else use fa ,fa-star ,fa-star-half-o and fa-star-o
  7. last span for props.text || ' '
  8. style div.rating,span and last span
  9. Edit HomeScreen
  10. Add div.product-rating and use Rating Component  