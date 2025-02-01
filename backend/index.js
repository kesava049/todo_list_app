const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { addTodo } = require('./schema/db');
const app = express();

app.use(express.json());

app.post('/todo', async (req,res)=>{

    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Invalid inputs!"
        })
    }
    // putting it in mongoDB...

    await addTodo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.status(200).json({
        msg: "successfully added a Todo"
    })
})

app.get('/todos', async (req,res)=>{
    const alltodos = await addTodo.find({});
    res.send({
        alltodos
    })
})

app.put('/completed', async (req,res)=>{
    // const createPayload = req.body
    // const parsedPayload = createTodo.safeParse(createPayload);

    // if(!parsedPayload.success){
    //     res.status(411).json({
    //         msg: "Invalid inputs!"
    //     })
    //     return;
    // }
    await addTodo.updateOne({
        _id: req.body.id 
    },{
        completed: true
    })
    res.json({
        msg: "Todo marked as Done!"
    })

})


const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server runnin on port ${PORT}`)
});