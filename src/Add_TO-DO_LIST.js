import React, { useState } from 'react';

function Add_List() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [serialNumber, setSerialNumber] = useState(1);

  const addTask = () => {
    if (newTask.trim() === '') return;
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].task = newTask; 
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { id: serialNumber, task: newTask }]);
      setSerialNumber(serialNumber + 1);
    }
    setNewTask('');
  };

  const editTask = (index) => {
    setNewTask(tasks[index].task); 
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  return (
    <div className="todo-list">
      <h1 className='title'>TO-DO List</h1>
      <div className="input-group">
        <input
          type="text"
          id="input"
          className="input-group__input"
          placeholder="Enter Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="addbtn" onClick={addTask}>
          {editIndex !== null ? 'Save' : 'Add'}
        </button>
      </div>
      <hr />
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className='no'>{task.id}</span>
            {index === editIndex ? (
              <input
                className='editInput'
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                />
            ) : (
              task.task
            )}
            <div className='btns'>
              {index === editIndex ? (
                <button className="btn" onClick={() => addTask()}>
                  Save
                </button>
              ) : (
                <button className="btn" onClick={() => editTask(index)}>
                  Edit
                </button>
              )}
              <button className="deletebtn" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Add_List;
