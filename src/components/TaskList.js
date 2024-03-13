import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TaskCard from './TaskCard'
import {useState, useEffect} from 'react'

export default function TaskList({ tasks, updateStatus, deleteTask }) {
    const [filter, setFilter] = useState("All")
    const [filteredTasks, setFilteredTasks] = useState([])

    useEffect( () => {
        if (filter === "All") {
            setFilteredTasks( tasks )
        } else if (filter === "Completed") {
            const completedTasks = tasks.filter( task => task.status)
            setFilteredTasks( completedTasks )
        } else if (filter === "Pending" ) {
            const pendingTasks = tasks.filter( task => !task.status)
            setFilteredTasks( pendingTasks )
        }
    }, [filter, tasks])

    return (
        <>
            <h3>Tasks:</h3>

            <div>
                <h5>Filters:
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </h5>
            </div>

            <Row className="my-3">
                {
                    filteredTasks.length > 0
                    ?
                    filteredTasks.map( task => {
                        return <Col sm={4} key={task.id}><TaskCard id={task.id} name={task.name} status={task.status} updateStatus={updateStatus} deleteTask={deleteTask}/></Col>
                    })
                    :
                    <p>No tasks!</p>
                }
            </Row>
        </>
    )
}