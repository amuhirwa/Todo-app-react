import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TextField } from '@mui/material'
import AddProject from './components/AddProject'
import Projects from './components/Projects'
import MainContent from './components/MainContent'
import TopMenu from './components/TopMenu'
function App() {
  const [user, getUser] = useState('Guest');

  const [projectsList, setProjectsList] = useState(
    JSON.parse(localStorage.getItem('projects_list')) || []
  );


  useEffect(() => {
    localStorage.setItem('projects_list', JSON.stringify(projectsList));
  }, [projectsList]);

  return (
    <>
      <TopMenu user={user} getUser={getUser}/>
      <AddProject setProjectsList={setProjectsList} projectsList={projectsList}/>
      <hr/>
      <MainContent projectsList={projectsList} setProjectsList={setProjectsList}/>
    </>
  )
}

export default App
