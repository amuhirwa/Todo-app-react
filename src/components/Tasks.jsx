import { TextField } from "@mui/material";
import { useState , useEffect } from "react";
import { DateField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Select from "@mui/material/Select";

function Tasks({taskList, setTaskList, selectedProject, setProjectsList}) {
    const displayTasks = taskList[selectedProject] || []; 
    const [formData, setFormData] = useState({startDate: '',endDate: '',});
    const [showStatusDropdown, setShowStatusDropdown] = useState({'bool': false, 'id': 0});
    const [filteredTasks, setFilteredTasks] = useState(taskList || []);

    useEffect(() => {
        setFilteredTasks(taskList || []);
    }, [taskList]);

    function handleInputChange(fieldName, e, status) {
        if(fieldName == 'startDate') {
            setFormData({ ...formData, startDate: e.$d.toLocaleDateString() });
        }
        else if(fieldName == 'endDate') {
            setFormData({ ...formData, endDate: e.$d.toLocaleDateString() });
        }
        else if(fieldName == 'status') {
            setFormData({ ...formData, status: status.props.children });
        }
        else{
            e = fieldName
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    let newTask = true;
    console.log(taskList)

    function areAllPresent(object, keys) {
        for (let key of keys) {
            if (!(key in object)) {
                return false;
            }
        }
        return true;
    }

    const status = [
        {
          value: 'Not Yet Started',
          label: 'Not Yet Started',
        },
        {
          value: 'In Progress',
          label: 'In Progress',
        },
        {
          value: 'Completed',
          label: 'Completed',
        },
      ];

    function addTask(event) {
        let day = new Date(formData["endDate"]);
        console.log(day)
        console.log()
        if(new Date(formData["endDate"]) < new Date(formData["startDate"])) {
            alert("End date cannot be before start date");
        }
        else if(areAllPresent(formData, ["task", "startDate", "endDate", "status"])) {
            setTaskList({ ...taskList, [selectedProject]: [...taskList[selectedProject] || [], {...formData, id: (taskList[selectedProject]?.length || 0) + 1 }] });
        }
        else {
            alert('Fill in all fields')
        }
    }
    function handleStatusChange(event) {
        const newStatus = event.target.value;
        console.log(newStatus)
        console.log(taskList[selectedProject])
        setTaskList({ ...taskList, [selectedProject]: [...taskList[selectedProject]].map(task => task.id === showStatusDropdown['id'] ? { ...task, status: newStatus } : task) });
        toggleStatusDropdown();
    }

    function toggleStatusDropdown(id) {
        setShowStatusDropdown(prev => ({ 'bool': !prev.bool, 'id': id }))
    }

    function deleteTask(id) {
        setTaskList({ ...taskList, [selectedProject]: [...taskList[selectedProject]].filter(task => task.id !== id) });
    }
    
    function updateTask(currentProject, e) {
        e.target.innerHTML = '<input type="text" class="w-full rounded-md p-1" placeholder="' + e.target.innerText + '"/>';
        e.stopPropagation();
        e.target.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if(e.target.dataset.name === 'endDate' || e.target.dataset.name === 'startDate') {
                    if (isNaN(new Date(event.target.value).getTime())) {
                        alert('Invalid Date')
                        console.log('time', taskList)
                        setTaskList({...taskList});
                        return;
                    }
                    if (new Date(event.target.value) < new Date()){
                        console.log('list of them',taskList)
                        alert('Date can not be in the past.');
                        setTaskList({...taskList});
                        return;
                    }
                    if (e.target.dataset.name === 'endDate') {
                        if (new Date(event.target.value) < new Date(currentProject["startDate"])) {
                            alert('End date cannot be before start date');
                            setTaskList({...taskList});
                            return;
                        }
                    }
                    else {
                        if (new Date(currentProject["endDate"]) < new Date(event.target.value)) {
                            setTaskList({...taskList});
                            alert('Start date cannot be after end date');
                            return;
                        }
                    }
                }
                if (event.target.value.trim() !== '') {
                    taskList[selectedProject].forEach(element => {
                        if (element.id === currentProject.id) {
                            element[e.target.dataset.name] = event.target.value;
                        }
                    });
                    setTaskList({...taskList});
                }
            }
        });
    }

    

    function searchTasks(event) {
        const value = event.target.value;
        const filtered = taskList[selectedProject].filter(task => task.task.toLowerCase().includes(value.toLowerCase()));
        setFilteredTasks({...taskList, [selectedProject]: filtered});
    }
    console.log(filteredTasks)
    return (
        <div className="w-2/3">{selectedProject > 0 ? 
            <>
                <div className="flex gap-20 items-center">
                    <TextField sx={{mb: 0.2, width: '60%'}} id="outlined-basic" label="Search for a task" variant="standard" size="small" onChange={searchTasks}  autoComplete={false} />
                    <span className="text-xl text-blue-600">Completed Tasks: {filteredTasks[selectedProject] && filteredTasks[selectedProject].filter(task => task.status === 'Completed').length}{filteredTasks[selectedProject] && '/'+filteredTasks[selectedProject].length}</span>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th style={{width: '30px'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                    <>
                            {filteredTasks[selectedProject] && filteredTasks[selectedProject].map(task => <tr className="align-top">
                                <td className="text-lg" onClick={updateTask.bind(this, task)} data-name="task">{task.task}</td>
                                <td className="text-lg" onClick={updateTask.bind(this, task)} data-name="startDate">{task.startDate}</td>
                                <td className="text-lg" onClick={updateTask.bind(this, task)} data-name="endDate">{task.endDate}</td>
                                {showStatusDropdown && task.id == showStatusDropdown['id'] ? (
                                        <td>
                                            <Select
                                                value={task.status}
                                                className={task.status}                                                onChange={handleStatusChange}
                                                onClose={toggleStatusDropdown}
                                                sx={{ width: '100%', borderTop: '1px solid black', borderRadius: 0}}
                                            >
                                                {status.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select></td>
                                        ) : <td className={task.status} onClick={toggleStatusDropdown.bind(this, task.id)}>{task.status}<ArrowDropDownIcon/></td>
                                    }
                                <button onClick={deleteTask.bind(this, task.id)} className="text-xl text-red-500 p-1 mt-1 hidden">X</button>
                            </tr>)} 
                    </>
                    <tr className="align-top">
                        <td><TextField id="filled-basic" name="task" label="Filled" variant="filled" size="small" onChange={handleInputChange}/>
                        </td>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <td><DateField name="startDate" label="Start Date" format="MM-DD-YYYY" size="small" variant="filled" onChange={handleInputChange.bind(this, "startDate")} clearable={true} /></td>
                            <td><DateField name="endDate" label="End Date" format="MM-DD-YYYY" size="small" variant="filled" onChange={handleInputChange.bind(this, "endDate")} clearable={true} /></td>
                        </LocalizationProvider>
                        <td><TextField
                                id="filled-select-currency"
                                select
                                label="Select"
                                helperText="Please select your status on the task"
                                variant="filled"
                                size="small"
                                onChange={handleInputChange.bind(this, 'status')}
                            >
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField> 
                        </td>
                        <td>
                            <button></button><button></button></td>
                    </tr> </tbody>

                </table>
                <button className="add_button bg-gray-400 p-1 rounded-lg w-32 mt-2" onClick={addTask}>Add Task</button>
            </> : null}
        </div>
    )
}
export default Tasks;