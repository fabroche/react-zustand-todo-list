import React, {useState} from 'react';
import {useTodoStore} from "../store/useTodoStore.ts";

const emojiMap: { [key: string]: string } = {
    hamburguesa: '🍔',
    pizza: '🍕',
    sushi: '🍣',
    sandia: '🍉',
    manzana: '🍎',
    limon: '🍋',
    tomate: '🍅',
    pepino: '🥒',
}

function reemplazarTildes(texto: string) {
    const vocalsMap: { [key: string]: string } = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U'
    };

    return texto.split('').map((letra: string) => vocalsMap[letra] || letra).join('');
}

export const TodoList: React.FC = () => {
    const todos = useTodoStore(state => state.todos)
    const addTodo = useTodoStore(state => state.addTodo)
    const removeTodo = useTodoStore(state => state.removeTodo)

    const [todoText, setTodoText] = useState("")

    function onAddTodo() {
        const mappedToEmojiText = emojiMap[reemplazarTildes(todoText.toLowerCase().trim())] || todoText
        if (mappedToEmojiText.trim()) {
            addTodo(mappedToEmojiText);
            setTodoText("")
        }
    }

    function onRemoveTodo(id: number) {
        removeTodo(id)
    }

    function onEnterKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            onAddTodo();
        }
    }

    return (
        <div>
            <em>Made with Zustand</em>
            <h1>Emojis Todo List</h1>
            <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                onKeyDown={onEnterKeyDown}
                placeholder="Add a new todo"
            />
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        onClick={() => onRemoveTodo(todo.id)}
                    >{todo.text}</li>
                ))}
            </ul>
        </div>
    );
}
