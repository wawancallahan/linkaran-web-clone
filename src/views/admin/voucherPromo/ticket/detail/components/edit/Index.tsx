import * as React from 'react'
import { Button } from 'reactstrap'
import ModalEdit from './components/ModalEdit'
import { TicketList } from '../../../../../../../types/admin/ticket'
import { VoucherPromoShow } from '../../../../../../../types/admin/voucherPromo'

type OwnProps = {
    data: TicketList,
    voucher: VoucherPromoShow | null,
    fetch: (page: number, id: number) => void,
}

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    
    return (
        <React.Fragment>
            <Button
                color="warning"
                size="sm"
                onClick={() => setModalVisible( ! modalVisible)}
            >
                Edit
            </Button>

            <ModalEdit fetch={props.fetch} voucher={props.voucher} data={props.data} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </React.Fragment>
        
    )
}

export default Index