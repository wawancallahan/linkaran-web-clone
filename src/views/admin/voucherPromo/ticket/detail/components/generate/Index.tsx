import * as React from 'react'
import { Button } from 'reactstrap'

type OwnProps = {

}

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    
    return (
        <Button
            color="info"
            size="sm"
            onClick={() => setModalVisible( ! modalVisible)}
        >
            Generate Tiket
        </Button>
    )
}

export default Index