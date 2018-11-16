const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const download = require('download');

const app = express();

app.use(express.static('public') );

app.engine('handlebars', hbs() );
app.set('viewengine', 'handlebars');

app.use(express.static('public'));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

////////////////////////////////////

/**
 * Formulario para enviar las variables (sin fetch)
 */
app.get('/sinFetch', function(request, response){
    // Se utiliza el comando send para enviar el HTML
    response.send(`
        <form method="GET" action="/api/download">
            <input name="img" placeholder="image url">
            <input name="name" placeholder="file name">
            <button type="submit">Download</button>
        </form>
    `);
});

/**
 * Formulario para enviar las variables (con fetch)
 */
app.get('/fetch', function(request, response){
    // Se utiliza el comando send para enviar el HTML y JS
    response.send(`
        <form>
            <input name="img" placeholder="image url">
            <input name="name" placeholder="file name">
            <button type="submit">Download</button>
        </form>
        <script>
            document.querySelector('form').addEventListener('submit', function(event){
                event.preventDefault();
                fetch('/api/download?img='+this.img.value+'&name='+this.name.value)
                    .then(b => b.text())
                    .then(alert)
                    .catch(console.error);
            });
        </script>
    `);
});

/**
 * Ruta para descargar la imagen
 * Recibe dos variables con query (GET)
 * img: ruta de la imagen
 * name: nombre del archivo
 */
app.get('/api/download', function(request, response){
    // Con el módulo download descarga la imagen con la ruta en la variable img
    download(request.query.img).then(data => {
        // Con el módulo fs se guarda la imagen en la carpeta images con el nombre de la variable name
        // Es importante que la carpeta images exista previamente
        fs.writeFileSync('images/'+request.query.name+'.jpg', data);
        // Se envía un mensaje al usuario después de la descarga
        response.send('saved: ' + request.query.name);
    });   
});

// iniciar el servidor


////////////////////////////////////

app.get('/', function(request, response){
    response.render('home');
});

app.get('/paginaA', function(request, response){
    response.render('paginaA');
});

app.get('/paginaB', function(request, response){
    response.render('paginaB');
});

app.get('/paginaC', function(request, response){
    response.render('paginaC');
});

app.listen(3000);