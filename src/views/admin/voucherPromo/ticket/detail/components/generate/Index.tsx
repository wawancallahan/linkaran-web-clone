import * as React from 'react'
import { Button } from 'reactstrap'
import ModalGenerate from './components/ModalGenerate'
import { VoucherPromoShow } from '../../../../../../../types/admin/voucherPromo'

type OwnProps = {
    fetch: (page: number, id: number) => void
    data: VoucherPromoShow | null
}

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    
    return (
        <React.Fragment>
            <Button
                color="info"
                size="sm"
                onClick={() => setModalVisible( ! modalVisible)}
            >
                Generate Tiket
            </Button>

            <ModalGenerate fetch={props.fetch} data={props.data} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </React.Fragment>
        
    )
}

export default Index