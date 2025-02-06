import { useState } from "react";

export function CreateTodo(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return <div>
        <input type="text" placeholder="Title" onChange={(e)=>{
            const titleValue = e.target.value;
            setTitle(e.target.value);
        }}></input> <br/>
        <input type="text" placeholder="Description" onChange={(e)=>{
            const descriptionValue = e.target.value;
            setDescription(e.target.value);
        }}></input> <br/>

    <button
        onClick={() => {
            // axios
            if(!(title || description)){
                alert("give both title and description");
                return;
            }
            fetch("http://localhost:4000/addTodo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {             
                const json = await res.json();
                if(res.ok){
                    alert("Todo added");
                }else{
                    alert("Failed to add Todo")
                }
                
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("Failed to add Todo");
            });
        }}
    >
        Add a Todo
    </button>
    </div>
}