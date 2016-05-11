# SportScraper
Setup:
  - Nakon checkouta potrebno je instalirati node, gulp, bower i postgres bazu.
  - Pokrenuti npm install u cmd-u
  - Pokrenuti bower install u cmd-u
  - Pokrenuti gulp u cmd-u
  - U folderu "models" nalazi se index.js u kojem je potrebno podesiti postgress connection string (promjeniti samo ako se razlikuje).
  - Pokrenuti node server (npm run watch)
  - Pokrenuti scrap metodu na API-ju koja ce preuzeti vijesti sa SportSport.ba (http://localhost:3000/api/scrape)

Struktura aplikacije:<br/>
  Web API:<br/>
    - Express.js web framework <br/>
    - Kontroleri sa implementacijama API endpointa (scrap i artickes) se nalaze u "apis" folderu <br/>
  Web <br/>
    - Express.js web framework, swig template engine, react.js i alt.js (Flux arhitektura) <br/>
    - U folderu views se nalazi index.html template <br/>
    - U folderu public se nalaze resursi (js,css, img, fonts) <br/>
    - U folderu app se nalazi react aplikacija sa flux strukturom <br/>
  Data access <br/>
    - Sequelize.js ORM za rad sa postgress bazom <br/>
    - Prilikom starta aplikacije pokrece se migracija koja kreira articles tabelu u bazi <br/>
    - U folderu models se nalazi index.js fajl za inicijalizaciju ORM-a kao i article.js koji predstavlja article model <br/>
