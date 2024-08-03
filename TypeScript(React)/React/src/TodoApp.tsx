import React, { useState, useEffect } from 'react';
import './assets/css/style.css';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (event: React.FormEvent) => {
        event.preventDefault();
        if (input.trim()) {
            setTodos([...todos, { text: input, completed: false }]);
            setInput('');
        }
    };

    const handleToggleComplete = (index: number) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1 className="title">TODOリスト</h1>
            <form onSubmit={handleAddTodo} className="form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="form-input"
                    placeholder="TODOを入力"
                />
                <button type="submit" className="form-button">追加</button>
            </form>
            <ul className="list">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className={`list-item ${todo.completed ? 'completed' : ''}`}
                        onClick={() => handleToggleComplete(index)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleDeleteTodo(index);
                        }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
