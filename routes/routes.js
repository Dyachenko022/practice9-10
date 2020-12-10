const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.get('/', (req, res) => {
    res.render('index', {
        title: 'About me',
        isAboutMe: true
    })
})

router.get('/countwords', (req, res) => {
    
    //const countedWords = countWords(localStorage.getItem('words'))
    res.render('countwords', {
        title: 'Count words',
        isCountWords: true,
        //countedWords
    })
})

router.post('/create', async (req, res) => {
    /*const todo = new Todo({
        title: req.body.title
    })*/
    var todo = class Todo_local{
        constructor(title, completed) {
            this.title = title
            this.completed = completed
        }
    }
    var todos = localStorage.getItem('Todos') == null ? [] : JSON.parse(localStorage.getItem('Todos'))
    todos.push(new todo(req.body.title, false))
    localStorage.setItem('Todos', JSON.stringify(todos))
    //await todo.save()
    res.redirect('/todos')

    
}) 

router.get('/todos', async (req, res) => {
    
    var todos
    if(localStorage.getItem('Todos') != null)
    {
     todos = JSON.parse(localStorage.getItem('Todos'))   
    }
    //const todos = await Todo.find({})
    res.render('todos', {
        title: 'TODO list',
        isTodos: true,
        todos
    })
})

router.post('/countWords', async (req, res) => {
    //localStorage.setItem('words', req.body.words)
    //console.log(localStorage.getItem('words'))
    //res.redirect('countwords')
    countedWords = countWords(req.body.words)
    res.render('countwords', {
        title: 'Count words',
        isCountWords: true,
        countedWords
    })
})

router.post('/complete', async(req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/todos')
})

function countWords(words) {
    var wordsCounted = ''
    var formattedWords = words.toLowerCase().replace(/ /g, "")
    wordsArray = formattedWords.split(",")
    const checkedWords = new Array()
    for(i = 0; i < wordsArray.length; i++)
    {
        var wordCounter = 1
        for(j = i + 1; j < wordsArray.length; j++)
        {
            if(wordsArray[i] == wordsArray[j])
            {
                wordCounter++
            }  
        }
        if(!checkedWords.includes(wordsArray[i]))
        {
            wordsCounted += wordsArray[i] + ' appeared ' + wordCounter + ' times, '
            checkedWords.push(wordsArray[i])
        }
    }
    return wordsCounted.substring(0, wordsCounted.length - 2)
}

module.exports = router