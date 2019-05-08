require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');

const webpush = require('web-push');
global.webpush = webpush;
const publicVapidKey = 'BIaiiYjqmZKm9kFeZqDZ5cKGr-Y82N9w7g8WE6meC4U5Qz2Z_VmCeYViqurZqXSAbZWIQeTFx-vsbYPfVBKPRY8';
const privateVapidKey = '9iV4TeCvTgQXewoZqbkpcOkZZ8X-m2UxwY0oPye_vaU';
webpush.setVapidDetails('mailto:ronakjain2012@gmail.com', publicVapidKey, privateVapidKey);

// Modules
const {getHomePage,addTodo,updateTodo,deleteTodo,markIncomplete,markComplete} = require('./routes/index');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // parse form data client 
app.use(express.static(path.join(__dirname, '/public'))); // configure express to use public folder 

app.set('port', process.env.port || port); // set express to use this port 
app.set('views', __dirname + '/public/views'); // set express to look in this folder to render our view 
app.set('view engine', 'ejs'); // configure template engine 
app.use(fileUpload()); // configure fileupload

// Routes
app.get('/', getHomePage);
app.post('/add-todo', addTodo);
app.get('/update-todo/:id', updateTodo); 
app.get('/delete-todo/:id', deleteTodo); 
app.get('/incomplete/:id', markIncomplete); 
app.get('/complete/:id', markComplete); 


app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'Rose,Merry,Marlo Inc.',body: 'Welcome to Advance to-do.',icon:'https://blazepress.com/.image/t_share/MTU4MjA4NDkyNDM0MzY3Nzg1/minimal-logo-design-25-1.png'});
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
});
  

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
