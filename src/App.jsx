import React, { useState } from 'react';
import './App.css';

function Modal({ todoId, moveToTrash, closeModal }) {
  const handleMoveToTrash = () => {
    moveToTrash(todoId);
    closeModal();
  };

  return (
    <div className='modal'>
      <button onClick={handleMoveToTrash}>Move to Trash</button>
    </div>
  );
}

function App() {
  const [todoNew, setTodoNew] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('todo');
  const [todo, setTodo] = useState([
    {
      id: Date.now(),
      title: 'My first todo',
      status: 'done',
    },
  ]);
  const [pageTitle, setPageTitle] = useState('Todo');
  const [modalTodoId, setModalTodoId] = useState(null);

  function addTodo() {
    const newTodoItem = {
      id: Date.now(),
      title: todoNew,
      status: 'active',
    };

    setTodo([...todo, newTodoItem]);
    setTodoNew('');
  }

  function deleteForever(idx) {
    const newTodos = todo.filter((task) => task.id !== idx);
    setTodo(newTodos);
  }
  

  function moveToTrash(idx) {
    const newTodos = todo.map((todo_item) =>
      todo_item.id === idx ? { ...todo_item, status: 'trash' } : todo_item
    );
    setTodo(newTodos);
  }

  function openModal(todoId) {
    setModalTodoId(todoId);
  }

  function closeModal() {
    setModalTodoId(null);
  }

  function makeTodoDone(idx) {
    const newTodos = todo.map((todo_item) =>
      todo_item.id === idx ? { ...todo_item, status: 'done' } : todo_item
    );
    setTodo(newTodos);
  }

  function makeTodoActive(idx) {
    const newTodos = todo.map((todo_item) =>
      todo_item.id === idx ? { ...todo_item, status: 'active' } : todo_item
    );
    setTodo(newTodos);
  }

  function moveToTodo(idx) {
    const newTodos = todo.map((todo_item) =>
      todo_item.id === idx ? { ...todo_item, status: 'active' } : todo_item
    );
    setTodo(newTodos);
  }

  function changeStatus(newStatus) {
    setFilteredStatus(newStatus);
    if (newStatus === 'todo') {
      setPageTitle('Todo');
    } else if (newStatus === 'done') {
      setPageTitle('Done');
    } else if (newStatus === 'trash') {
      setPageTitle('Trash');
    }
  }

  const filteredTodos = todo.filter((task) => {
    if (filteredStatus === 'todo' && task.status !== 'trash' && task.status !== 'done') return task;
    if (filteredStatus === 'done' && task.status === 'done') return task;
    if (filteredStatus === 'trash' && task.status === 'trash') return task;
  });

  const handleOptionsClick = (todoId, status) => {
    if (status === 'trash') {
      moveToTodo(todoId);
    } else if (status === 'done') {
      deleteForever(todoId); 
    }
  };
  
  return (
    <div className='container'>
      <header>
        <p className='todo_welcome'>Simple To Do List</p>
        <p className='todo_welcome_second'>
          Today is awesome day. The weather is awesome, you are awesome too!
        </p>
      </header>
      <main>
        <div className='filter_buttons'>
          <div className='options'>
            <button
              className={filteredStatus === 'todo' ? 'button-todo' : ''}
              onClick={() => changeStatus('todo')}
            >
              Todo
            </button>
            <button
              className={filteredStatus === 'done' ? 'button-done' : ''}
              onClick={() => changeStatus('done')}
            >
              Done
            </button>
            <button
              className={filteredStatus === 'trash' ? 'button-trash' : ''}
              onClick={() => changeStatus('trash')}
            >
              Trash
            </button>
          </div>

          {filteredStatus === 'todo' && (
            <div className='actions_container'>
              <input
                value={todoNew}
                onChange={(event) => {
                  setTodoNew(event.target.value);
                }}
                className='todo_input'
                placeholder='todo name'
              />
              <button onClick={addTodo}>Add one more todo</button>
            </div>
          )}
        </div>
        <div className='todo_container'>
          <h2>{pageTitle}</h2>
          {filteredTodos.map((todo_item, idx) => (
            <div className='todo_item_container' key={idx}>
              <input
                type="checkbox"
                checked={todo_item.status === 'done'}
                onChange={() => {
                  if (todo_item.status === 'done') {
                    makeTodoActive(todo_item.id);
                  } else {
                    makeTodoDone(todo_item.id);
                  }
                }}
              />
              <div className={`todo_item ${todo_item.status === 'done' ? 'done' : ''}`}>
                {todo_item.title}
              </div>
              {filteredStatus !== 'trash' && (
                <button onClick={() => openModal(todo_item.id)}>...</button>
              )}
              {filteredStatus === 'trash' && (
                <>
                  <button onClick={() => deleteForever(todo_item.id)}>Delete Forever</button>
                  <button onClick={() => moveToTodo(todo_item.id)}>Move to Todo</button>
                </>
              )}
            </div>
          ))}
        </div>
        {modalTodoId && (
          <Modal
            todoId={modalTodoId}
            moveToTrash={moveToTrash}
            closeModal={closeModal}
          />
        )}
      </main>

      <footer>
        <p className='footer_title'>Made by N! in 2024</p>
      </footer>
    </div>
  );
}

export default App;
