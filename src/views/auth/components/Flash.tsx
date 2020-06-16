import * as React from 'react'
import { Alert } from 'reactstrap'

type OwnProps = {
    alertVisible: boolean,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    alertMessage: string
}

type Props = OwnProps

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color="danger" isOpen={props.alertVisible} toggle={() => props.setAlertVisible(false)} fade={false}>
            {props.alertMessage}
        </Alert>
    )
}

export default Flash