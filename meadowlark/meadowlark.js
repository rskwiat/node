var express = require('express');
var http = require('http');
var fortune = require('./lib/fortune.js');
var weather = require('./lib/weather.js');

var app = express();
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers:{
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    },
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});

app.use(require('body-parser')());

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/enter', function(req, res){
    res.render('enter');
});

app.post('/process', function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        res.send({success: true });
    } else {
        res.redirect('303', 'thank-you');
    }
});

app.get('/test', function(req, res) {
    res.render('testpage');
});

app.get('/about', function(req, res){
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req,res){
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req,res){
    res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

app.get('/api/tours', function(req,res){
    res.json(tours);
});



app.get('/api/tours', function(req, res){
    var toursXml = '<?xml version="1.0"?><tours>' +
        products.map(function(p){
            return '<tour price="' + p.price + '" id="' + p.id + '">' + p.name + '</tour>';
        }).join('') + '</tours>';
        var toursText = tours.map(function(p){
            return p.id +': ' + p.name + ' (' + p.price +
                ')';
        }).join('\n');
        res.format({
            'application/json': function(){
                res.json(tours);
            },
            'application/xml': function(){
                res.type('application/xml');
                res.send(toursXml);
            },
            'text/xml': function(){
                res.type('text/xml');
                res.send(toursXml);
            },
            'text/plain': function(){
                res.type('text/plain');
                res.send(toursXml);
            }
        });
});

//API that updates a tour
app.put('/api.tour/:id', function(req, res){
    var p = tours.some(function(p){
        return p.id == req.params.id
    });
    if ( p ) {
        if (req.query.name) p.name = req.query.name;
        if (req.query.price) p.price = req.query.price;
        res.json({success: true });
    } else{
        res.json({error: 'No such tour exists.'});
    }
});

//API that deletes a product
app.del('/api/tour/:id', function(req,res){
    var i;
    for ( var i = tours.length - 1; i >= 0; i-- )
        if (tours[i].id == req.params.id) break;
    if ( i >= 0 ){
        tours.splice(i, 1);
        res.json({success: true});
    } else {
        res.json({error: 'No such tour exists'});
    }
});

app.post('/process-contact', function(req, res){
    console.log('Recieve contcct from' + req.body.name + ' <' + req.body.email + '>');
    //save to database....

    try{
        return res.xhr ? res.render({ success: true }): res.redirect('303', 'thank-you');
    } catch (ex) {
        return res.xhr ? res.json({error: 'Database error.'}) : res.redirect('303', '/database-error');
    }
});


app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to kill.' );
});
