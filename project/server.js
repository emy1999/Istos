const express = require('express')

const app = express()


books = [] //store books that you receive for the fave list
const PORT = 8080;


app.use('/static',
express.static( __dirname +'/public'))

var edit

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

app.use(express.json())
app.get('/',function(req,res){
    
    res.send('hello world')
});


app.post('/addbook', function(req, res) { //Get book in list
    
    var data = req.body
    var flag = false
    
    if (books.length == 0){
        books.push(data)
    }else{
        for (var i = 0; i<books.length;i++){
            if(data.workid == books[i].workid){
                console.log('Book already exists.')
                flag = true
            }
        }
        if (flag == false){ books.push(data)}
    }
    
    
    console.log("Received a book!")
    
    
});

app.post('/remove',function(req,res){ //Remove book
    
    var remove = req.body
    
    for (var i = 0; i<books.length;i++){
        if(books[i].workid == remove.workid){
            books.splice(i,1)
        }
    }
});

app.get('/list',function(req,res){ //Load list
    
    temp = JSON.stringify(books)
    res.send(JSON.stringify(books))
})

app.post('/edit',function(req,res){
    edit = req.body
    
})

app.get('/edit',function(req,res){
    res.send(JSON.stringify(edit))
})


app.listen(PORT,()=>console.log('server started on port 8080'));