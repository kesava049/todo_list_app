const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(bodyParser.json())



app.post('/todo',(req,res)=>{

})

app.get('/todos',(req,res)=>{

})

app.put('/completed',(req,res)=>{
    
})


const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server runnin on port ${PORT}`)
});