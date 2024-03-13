import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useState} from 'react'

export default function TaskForm({addTask}) {
    const [taskNameInput, setTaskNameInput] = useState("")

    function handleSubmit(e) {
        e.preventDefault();

        addTask(taskNameInput);
        setTaskNameInput("")
    }
    return (
        <Row className="my-3">
            <Col>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Task name:</label><br />
                    <input type="text" value={taskNameInput} onChange={(e) => setTaskNameInput(e.target.value)}/><br />

                    {
                        taskNameInput !== ""
                        ?
                        <button type="submit" className="btn btn-success btn-sm">Add Task</button>
                        :
                        <button type="submit" className="btn btn-success btn-sm" disabled>Add Task</button>
                    }
                </form>
            </Col>
        </Row>
    )
}