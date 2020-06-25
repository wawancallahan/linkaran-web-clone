import * as React from 'react'
import {
    Card,
    CardBody,
    Progress
} from 'reactstrap'
import { VoucherPromoShow } from '../../../../../types/admin/voucherPromo'

type OwnProps = {
    data: VoucherPromoShow | null
}

type Props = OwnProps

const JumlahPenggunaanTicket: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {
        return (
            <Card className="shadow">
                <CardBody>
                    <h3 className="mb-0">Jumlah Penggunaan Tiket</h3>
                    <div className="progress-wrapper">
                        <div className="progress-info justify-content-center">
                            <div className="progress-percentage">
                                <span style={{
                                    fontSize: '50px',
                                }}>{data.ticketUsed}/{data.quota * data.quantity}</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Progress max={data.quota * data.quantity} value={data.ticketUsed} color="success" className="w-100" />
                        </div>
                    </div>
                </CardBody>
            </Card>  
        )
    }

    return null;
}

export default JumlahPenggunaanTicket