##Verdicci
AngularJs Website for www.verdicci.be

###How to install for developper :
- Pre-requis : Git + Node.js + npm
- git clone https://github.com/joatack/verdicci.js.git -> get full code
- npm install -> install project dependencies from package.json
- bower install -> install app dependencies from bower.json
- gulp build -> create a build folder with only needed files and watch modifications
- gulp watch -> watch modifications
- gulp serve -> run an http server based on the build folder

###How to deploy :
- Connect to the host (ftp)
- Copy the content of the build folder to the www root of the ftp

###Content management :
- All static text are included directly in the .html

- All news content are specified in data/news.json and data/news/[idNews]
- To add a news, add a new entry in the file data/news.json :
  - id -> folder name containing the resources/images of the news
  - name -> name of the news (pink title beginning the description)
  - image -> image name of the news placed in the corresponding news folder
  - description -> text content of the news

- All styles content are specified in data/styles.json and data/styles/[idStyles]
- To add a style, add a new entry in the file data/styles.json
  - id -> folder name containing the resources/images of the styles
  - name -> title of the style
  - label -> sub title of the style
  - description -> text content of the style
  - images -> list of images name (max 2) of the style placed in the corresponding style folder
  - brandIcon -> image name of the brand of the style placed under the description


