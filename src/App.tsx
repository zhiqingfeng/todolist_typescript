import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './interfaces';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodolist] = useState<ITask[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === "task"){
      setTask(event.target.value);
    }else{
      setDeadline(Number(event.target.value)); //convert string to number
    }
  };

  const addTask= (): void => {
    const newTask = {taskName:task, deadline:deadline};
    setTodolist([...todoList, newTask]);
    setTask("");
    setDeadline(0);
    //console.log(todoList);
  }

  const completeTask = (taskNameToDelete:string): void =>{
    setTodolist(todoList.filter((task)=> {
      return task.taskName != taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input 
              type="text" 
              placeholder='Task...' 
              name='task' 
              value={task}
              onChange={handleChange} 
          />
          <input 
              type="number" 
              placeholder='DDL (in days)...' 
              name='deadline'
              value={deadline}
              onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todoList.map((task: ITask, key:number) => {
          return <TodoTask key={key} task={task}  completeTask={completeTask}></TodoTask>
        })}
      </div>
    </div>
  );
}

export default App;
