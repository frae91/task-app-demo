import Card from 'react-bootstrap/Card'

export default function TaskCard( { id, name, status, updateStatus, deleteTask } ) {

    function toggle() {
        // let taskStatus = status;
        // if (taskStatus === "Pending") {
        //     taskStatus = "Completed"
        // } else {
        //     taskStatus = "Pending"
        // }
        fetch('http://localhost:4000/tasks/'+id, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    status: !status
                }
            )
        })
        .then( response => response.json() )
        .then( json => {
            updateStatus(json);
        })
    }

    function handleDelete() {
        fetch('http://localhost:4000/tasks/'+id, {
            method: "DELETE"
        })
        .then( response => {
            if (response.ok) {
                deleteTask(id)
            }
        })
    }

    
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle>
                    <div className="form-check form-switch">
                        <input type="checkbox" className="form-check-input" role="switch" id={"switch-"+id} checked={status} onChange={toggle}/>

                        <label className="form-check-label" htmlFor={"switch-"+id}>
                            {
                                status
                                ?
                                "Completed"
                                :
                                "Pending"
                            }
                        </label>
                    </div>
                </Card.Subtitle>

                <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
            </Card.Body>
            
        </Card>
    )
}