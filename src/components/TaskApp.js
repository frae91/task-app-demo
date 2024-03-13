import Container from 'react-bootstrap/Container';
import TaskForm from './TaskForm';
import TaskNotif from './TaskNotif';
import TaskList from './TaskList';
import {useState, useEffect} from 'react'

export default function TaskApp() {
    const [tasks, setTasks] = useState([])
    const [notifMsg, setNotifMsg] = useState("")
    const [notifColor, setNotifColor] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        fetch('http://localhost:4000/tasks')
        .then(response => response.json())
        .then( json => {
            setTasks(json)
            setIsLoading(false)
        })
    }, [])

    function addTask(taskName) {
        fetch('http://localhost:4000/tasks', { // http://localhost:4000/tasks
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: taskName,
                status: false
            })
        })
        .then( response => response.json() )
        .then( json => {
            setTasks( (prev) => [json,...prev])
            setNotifMsg("A new task is successfully added!")
            setNotifColor("success")
        })

    }

    function updateStatus(task) {
        const mappedTasks = tasks.map( t => {
            if (task.id === t.id) {
                return task
            } else {
                return t
            }
        })

        setTasks( mappedTasks )
    }

    function deleteTask(id) {
        const filteredTasks = tasks.filter( (task) => task.id !== id)

        setTasks(filteredTasks)
        setNotifMsg("The task has been deleted.")
        setNotifColor("danger")
    }

    
    return (
        <Container>
            <h1>Task App</h1>

            <TaskForm addTask={addTask}/>

            {
                notifMsg !== ""
                ?
                <TaskNotif msg={notifMsg} color={notifColor} setNotifMsg={setNotifMsg}/>
                :
                null
            }
            

            {
                !isLoading
                ?
                <TaskList tasks={tasks} updateStatus={updateStatus} deleteTask={deleteTask}/>
                :
                null
            }
        </Container>
    )
}