import { useState, useEffect } from "react";
import Projects from "./Projects";
import Tasks from "./Tasks";

function MainContent({projectsList, setProjectsList}) {
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('task_list')) || {});
    const [selectedProject, setSelectedProject] = useState(0);
    console.log('tasks',taskList)

    useEffect(() => {
        localStorage.setItem('task_list', JSON.stringify(taskList));
        if(taskList[selectedProject] && taskList[selectedProject].filter(task => task.status === 'Completed').length === taskList[selectedProject].length) {
            setProjectsList(projectsList => projectsList.map(project => {
                if (project.id === selectedProject) {
                    return { ...project, completed: true };
                } else {
                    return project;
                }
            }))   
          }
        else {
            setProjectsList(projectsList => projectsList.map(project => {
                if (project.id === selectedProject) {
                    return { ...project, completed: false };
                } else {
                    return project;
                }
            }))
        }
    }, [taskList]);

    return (
        <div className="flex">
            <Projects projectsList={projectsList} setProjectsList={setProjectsList} setSelectedProject={setSelectedProject} selectedProject={selectedProject}/>
            <Tasks selectedProject={selectedProject} setProjectsList={setProjectsList} taskList={taskList} setTaskList={setTaskList} />
        </div>
    )
}
export default MainContent;