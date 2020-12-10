const express = require('express')
const exprshbs = require('express-handlebars')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exprshbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})




async function start() {
    try {
        /*await mongoose.connect('mongodb+srv://Dmitry:UpmdHh93Ih24GYPg@cluster0.ewszv.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })*/
        app.listen(PORT, () => {
            console.log('Server has been started')
        })
    } catch(e)
    {
        console.log(e)
    }
}

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true}))
app.use(routes)
app.use(express.static(path.join(__dirname, 'public')))

start()
