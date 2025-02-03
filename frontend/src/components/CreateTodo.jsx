
export function CreateTodo(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return <div>
        <input type="text" placeholder="Title" onChange={(e)=>{
            const value = e.target.value;
            setTitle(e.target.value);
        }}></input> <br/>
        <input type="text" placeholder="Description" onChange={(e)=>{
            const value = e.target.value;
            setDescription(e.target.value);
        }}></input> <br/>

        <button onClick={() =>{
            // axios

            fetch("http://localhost:4000/todo",{
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(async (res)=>{
                    const json = await res.json();
                    alert("Todo added");
                })
        }}>Add a Todo</button>
    </div>
}