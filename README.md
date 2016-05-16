# SportScraper
Setup:
  - After checkout install node 6, gulp, bower, nodemon and postgress database.
  - Execute npm install in cmd.
  - Execute bower install in cmd.
  - Execute gulp in cmd.
  - Set postgress connection string in config.json file.
  - Start node server (npm run watch)
  - Execute scrap method on the API which will download news from SportSport.ba (http://localhost:3000/api/scrape)

Structure:<br/>
  Web API:<br/>
    - Restify.js framework <br/>
    - API controllers (scrap i articles) are placed into "apis" folder <br/>
  Web <br/>
    - Restify.js framework, react.js i alt.js (Flux architecture) <br/>
    - Resources and index.html are placed in public folder<br/>
    - The app folder contains react.js application <br/>
  Data access <br/>
    - Sequelize.js ORM is used for database access<br/>
    - Sequelize database migrations is responsible for creating article table in postgress database <br/>
    - The models folder contains files index.js for the ORM initialization and article.js which represents article model.<br/>
