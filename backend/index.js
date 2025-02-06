const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { addTodo } = require('./schema/db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/addTodo', async (req,res)=>{

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

app.get('/getTodos', async (req, res) => {
    try {
        const alltodos = await addTodo.find({});
        res.status(200).json({ alltodos });  // Return the fetched todos
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
});

app.put('/completed', async (req,res)=>{
    const createPayload = req.body
    const parsedPayload = updateTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Invalid inputs!"
        })
        return;
    }
    try {
        const updatedTodo = await addTodo.updateOne(
            { _id: req.body.id }, 
            { completed: true }
        );
        return res.status(200).json({ msg: "Todo marked as Done!" });

    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ msg: "Failed to mark todo as completed." });
    }

})


const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server runnin on port ${PORT}`)
});