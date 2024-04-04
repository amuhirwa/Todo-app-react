import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Login } from "@mui/icons-material/Login";

function Projects({projectsList, setProjectsList, setSelectedProject, selectedProject}) {
    const [filteredProjects, setFilteredProjects] = useState(projectsList || []);

    useEffect(() => {
        setFilteredProjects(projectsList || []);
    }, [projectsList]);

    function searchProjects(event) {
        const value = event.target.value;
        const filtered = projectsList.filter(project => project.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredProjects(filtered);
    }

    console.log(projectsList)

    function handleProjectClick(project, event) {
        setSelectedProject(project.id)
    }

    function updateProject(currentProject, event) {
        let target = event.currentTarget.parentNode
        target.childNodes[1].innerHTML = "<input type='text' class='w-full rounded-md p-1' placeholder='" + currentProject.name + "'/>"
        target.childNodes[1].addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                projectsList.forEach(element => {
                    if (element.id === currentProject.id) {
                        element.name = event.target.value
                    }
                });
                setProjectsList([...projectsList])
                target.childNodes[2].style.display = 'block';
                target.childNodes[3].style.display = 'block';
        }})
        target.childNodes[2].style.display = 'none';
        target.childNodes[3].style.display = 'none';
        event.stopPropagation();
    }
    function deleteProject(currentProject, e) {
        setProjectsList(projectsList => projectsList.filter(project => project.id !== currentProject.id))
        e.stopPropagation();
    }


    return (
        <div className="flex flex-col w-1/3 ml-4 border-r border-black">
            <div>
                <TextField sx={{mb: 0.2, width: '100%'}} id="outlined-basic" label="Search for a project" variant="outlined" size="small" onChange={searchProjects} />
                <hr/>
                <div className="project-list">
                    {filteredProjects.map((project, index) => (
                        <div id={"project-" + project.id} onClick={handleProjectClick.bind(this, project)} className={"item flex border-black border-b text-lg" + (project.id === selectedProject ? " selected" : "") + (project.completed ? " projectComplete" : "")} key={index}><RadioButtonUncheckedIcon/>
                            <div className="p-2">{project.name}</div>
                            <button onClick={updateProject.bind(this, project)}><EditNoteIcon sx={{fontSize: '2rem'}} /></button>
                            <button onClick={deleteProject.bind(this, project)}><DeleteOutlineIcon sx={{fontSize: '2rem'}} /></button>
                        </div>
                    ))}
                </div>
                <button className="p-2 bg-blue-500 text-white rounded-md mt-2 w-full" onClick={() => setProjectsList(projectsList => projectsList.filter(project => !project.completed))}>Clear Completed</button>
            </div>
            
        </div>
    )
}



export default Projects;