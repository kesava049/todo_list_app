const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const zod = require('zod');
const {createTodo, updateTodo} = require('..types.js')


app.post('/todo',(req,res)=>{
    const response = createTodo(req.body);
    if(!response.success){
        res.json({
            msg: "Invalid inputs!"
        })
    }
})

app.get('/todos',(req,res)=>{
    const response = updateTodo(req.body);
    if(!response.success){
        res.json({
            msg: "Invalid inputs!"
        })
    }updateTodo
})

app.put('/completed',(req,res)=>{
    
})


const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server runnin on port ${PORT}`)
});