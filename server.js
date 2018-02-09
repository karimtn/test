const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/TodoDb', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('TodoDb');
        closure(db);
    });
};

const One = (closure, query) => {
    return db.collection('user').findOne(query, (err, result) => {
        if(err) res.send(err);
        let one = result.todos;
        closure(one);
    });
};

app.get('/todos',(req,res)=>{
    connection(db=>{
        db.collection('users').find().toArray((err, result) => {
            res.send(result);
        })
    })
})
 
app.get('/:id/todos',(req,res)=>{
    let query = {_id:ObjectID(req.params.id)};
    connection(db=>{
        db.collection('users').findOne(query,(err,result)=>{
            if(err) res.send(err);
            res.send(result.todos);
        })
    })
})

app.put('/:id/todos/:todoId',(req, res) => {
    let query = {_id:ObjectID(req.params.id)};
    connection(db => {

        var todo = result[req.params.todoId];
        db.collection('user').update(query, 
            {
            $push: {
              todos: {
                todo
              }
            }


        })

        /*
        db.collection('user').findOne(query, (err, result) => {
            if(err) res.send(err);

            db.collection('user').insert(result[req.params.todoId], (err, resultat) => {
                if(err) throw err;
                res.send(resultat);
            })
            
        })*/
    })
})

app.post('/',(req,res)=>{
    connection(db=>{
        db.collection('users').insert(req.body,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
})



app.listen(port,(err)=>{
    if(err)throw err;
    console.log('hani nasma3 fik 3al '+port);
})