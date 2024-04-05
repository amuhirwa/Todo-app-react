import { useState } from "react";

function AddProject({setProjectsList, projectsList}) {
    const [inputData, setInputData] = useState('');
    function addProject(event) {
        if((event.key === "Enter" || event.type === "click") && inputData.trim() !== '') {
            const value = inputData.trim();
            if(projectsList.length == 0){
                projectsList = [{id: 1, name: value, tasks: [], completed: false}];
            }
            else {
                projectsList = [...projectsList, {id: projectsList.at(-1).id + 1,name: value, tasks: [], completed: false}];
            }
            setProjectsList(projectsList);
        }
    }
    
    return ( 
        <div className="add_menu flex">
            <input type="text" placeholder="Add a Project" onKeyDown={addProject} onChange={(event) => setInputData(event.target.value)}/>
            <button onClick={addProject}>+</button>
        </div>
    )
}
export default AddProject;