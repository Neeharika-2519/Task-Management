import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { ToDoAddTask } from "./components/todo-addtask";
import { ToDoDashboard } from "./components/todo-dashboard";
import { ToDoEditTask } from "./components/todo-edit-task";
import { ToDoHome } from "./components/todo-home";
import { ToDoLogin } from "./components/todo-login";
import { ToDoRegister } from "./components/todo-register";
import { ToDoRemoveTask } from "./components/todo-remove-task";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
          <header>
              <h1 className='text-white text-center'>To-Do</h1>
              <p className='text-white fs-4 fs-bold text-center'>Your Appointments</p>
          </header>
          <section className="mt-4">
            <div>
              <Routes>
                <Route path='/' element={< ToDoHome/>} />
                <Route path='/register' element={< ToDoRegister/>} />
                <Route path='/login' element={< ToDoLogin/>} />
                <Route path='/dashboard' element={< ToDoDashboard/>} /> 
                <Route path='/add' element={< ToDoAddTask/>} />
                <Route path='/delete/:id' element={< ToDoRemoveTask/>} />
                <Route path='/edit/:id' element={< ToDoEditTask/>} /> 
              </Routes>
            </div>
          </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
