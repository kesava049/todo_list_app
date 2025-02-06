import { useEffect, useState } from "react";

export function Todos(){

    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/getTodos")  
            .then(async (res) => {
                const json = await res.json();
                setTodos(json.alltodos);  
            })
            .catch((err) => console.error("Error fetching todos:", err));
    }, []);


    const markAsCompleted = async (todoId) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo._id === todoId ? { ...todo, completed: true } : todo
            )
        );
    
        try {
            const res = await fetch("http://localhost:4000/completed", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: todoId })
            });
    
            const json = await res.json();
            
            if (res.ok) {
                alert("Marked as done");
            } else {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === todoId ? { ...todo, completed: false } : todo
                    )
                );
                alert(json.msg || "Failed to mark as done");
            }
        } catch (err) {
            console.error("Error:", err);
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === todoId ? { ...todo, completed: false } : todo
                )
            );
            alert("Failed to mark as done");
        }
    };



    return (
        <div>
        {todos.length === 0 ? (
            <h2>No todos available</h2>
        ) : (
            todos.map((todo) => (  
                <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={()=>{ markAsCompleted(todo._id) }}>
                        {todo.completed ? "Completed" : "Mark as Complete"}
                    </button>
                </div>
            ))
        )}
    </div>
    );
}   