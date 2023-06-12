import React, { useState } from 'react';
import { format } from 'date-fns'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [label, setLabel] = useState('');

  const addTask = () => {
    if (newTask.trim() === '' || deadline.trim() === '' || priority.trim() === '' || label.trim() === '') {
      return;
    }

    const task = {
      id: Date.now(),
      taskName: newTask,
      deadline: format(new Date(deadline), 'MMM dd, yyyy'), 
      priority,
      label,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask('');
    setDeadline('');
    setPriority('');
    setLabel('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const prioritizeTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.priority === 'High' && b.priority !== 'High') {
        return -1;
      }
      if (a.priority !== 'High' && b.priority === 'High') {
        return 1;
      }
      return 0;
    });

    setTasks(sortedTasks);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="max-w-2xl h-5/6 mt-6  w-full p-6 bg-pink-300 rounded shadow-2xl shadow-white">
        <h1 className="text-4xl text-purple-950 font-bold font-[poppins] mb-4 text-center">TO-DO LIST</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border rounded p-2 mr-2 mb-2 w-full font-[poppins]"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2 mr-2 font-[poppins]"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select
            className="border rounded p-2 mr-2 font-[poppins]"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="text"
            className="border rounded p-2 mr-2 font-[poppins]"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <button
            className="bg-black hover:bg-red-500 text-white rounded p-2 font-[poppins]"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className="flex mb-4">
          <button
            className="bg-purple-700 hover:bg-red-500 text-white rounded p-2 mr-2 font-[poppins]"
            onClick={prioritizeTasks}
          >
            Prioritize
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center mb-2 ${
                task.completed ? 'line-through text-gray-600' : ''
              }`}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <span>{task.taskName}</span>
              <span className="ml-2 text-sm font-bold text-red-600">Deadline: {task.deadline}</span>
              <span className="ml-2 text-sm font-bold text-red-600">Priority: {task.priority}</span>
              <span className="ml-2 text-sm font-bold text-red-600">Label: {task.label}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded p-2 ml-auto font-[poppins]"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
