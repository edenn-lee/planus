import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const token = localStorage.getItem('token');

  
  useEffect(() => {
    axios.get('http://13.209.48.48:8080/todo',{
      headers: {
          'Authorization': 'Bearer ' + token,
        }
    })
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  
  const createTodo = () => {
    axios.post('http://13.209.48.48:8080/todo', {
      title: newTodo,
      completed: false,
      dueDate: '2023-06-30'
    },{
      headers: {
          'Authorization': 'Bearer ' + token,
        }
    })
      .then(response => {
        setTodos(prevTodos => [...prevTodos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    axios.patch(`http://13.209.48.48:8080/todo/${id}`, {
      completed: !todos.find(todo => todo.id === id).completed
    },{
      headers: {
          'Authorization': 'Bearer ' + token,
        }
    })
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  const deleteTodo = (id) => {
    axios.delete(`http://13.209.48.48:8080/todo/${id}`,{
      headers: {
          'Authorization': 'Bearer ' + token,
        }
    })
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={createTodo}>추가</button>
      </div>
      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(todo.id)}
            />
            <span className="todo-title">{todo.title}</span>
            <span className="due-date">{todo.dueDate}</span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;