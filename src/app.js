const request = require('request');
const path = require('path') //lets you specify path directorys
const express = require('express');
const hbs = require('hbs'); //for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//to use a different name than views for your templates engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//specifies what directory to use for "/" get path
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
  //renders the view with the name you put in
  //as well as on object of values for the view to access
  res.render('index', {
    title: 'Weather',
    name: 'Jordan Vidrine'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Jordan Vidrine'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'Do you need any help?',
    name: 'Jordan Vidrine'
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    })
  }
  //run geocode function, passing in the address from the browser
  geocode(req.query.address, (error,data = {}) => {
    if (error) {
      //return error message if no address was entered
      return res.send({error})
    }
    //if geocode worked correctly, then use the data from it to
    //invoke the forecast function
    forecast(data.latitude, data.longitude, (forecastError, forecastData = {}) => {
      if (forecastError) {
        return res.send({error})
      }
      res.send({
        city: data.location,
        forecast:forecastData,
        'Search Provided': req.query.address,
      })
    })
  });
})

app.get('/products', (req,res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }
    res.send({
      products: [],
    })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404 Error! Page',
    name: 'Jordan Vidrine',
    errorMessage: 'Oops! This help article doesnt exist!'
  })
})

//matches anything that hasnt been matched so far 404 Error
app.get('*', (req,res) => {
  res.render('404', {
    title: '404 Error! Page',
    name: 'Jordan Vidrine',
    errorMessage: 'Oops! This page doesnt exist!'
  })
})

//given to us as an environment variable from heroku
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
