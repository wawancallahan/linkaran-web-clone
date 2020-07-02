import * as React from 'react'
import { Button } from 'reactstrap'
import ModalDecline from './components/ModalDecline'
import { WithDrawShow } from '../../../../../../types/financialManager/withdraw'

type OwnProps = {
    data: WithDrawShow | null,
    setNeedReload: React.Dispatch<React.SetStateAction<boolean>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    
    return (
        <React.Fragment>
            <Button
                color="danger"
                size="md"
                onClick={() => setModalVisible( ! modalVisible)}
                block
            >
                Batalkan
            </Button>

            <ModalDecline setNeedReload={props.setNeedReload} setLoaded={props.setLoaded} data={props.data} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </React.Fragment>
        
    )
}

export default Index