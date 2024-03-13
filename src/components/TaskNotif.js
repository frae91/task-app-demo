import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import {useEffect} from 'react';

export default function TaskNotif({ msg, color, setNotifMsg}) {

    useEffect( () => {
        const notifTimer = setTimeout( () => {
            setNotifMsg("")
        }, 5000)

        return () => clearTimeout(notifTimer)
    }, [])
    
    return (
        <Row className="my-3">
            <Col>

                <Alert variant={color}>
                    {msg}
                </Alert>

            </Col>
        </Row>
    )
}