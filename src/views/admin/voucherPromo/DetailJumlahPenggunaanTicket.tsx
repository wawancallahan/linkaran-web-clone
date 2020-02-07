import React, { Component } from 'react'

import {
    Card,
    CardBody,
    Progress
} from 'reactstrap'

import { VoucherPromo } from '../../../types/admin/voucherPromo'

type DetailJumlahPenggunaanTicketProps = {
    voucher: VoucherPromo | null
}

type Props = DetailJumlahPenggunaanTicketProps

class DetailJumlahPenggunaanTicket extends Component<Props> {
    render() {

        const { voucher } = this.props

        if (voucher) {
            return (
                <Card className="shadow">
                    <CardBody>
                        <h3 className="mb-0">Jumlah Penggunaan Tiket</h3>
                        <div className="progress-wrapper">
                            <div className="progress-info justify-content-center">
                                <div className="progress-percentage">
                                    <span style={{
                                        fontSize: '50px',
                                    }}>{voucher.ticketUsed}/{voucher.quota * voucher.quantity}</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <Progress max={voucher.quota * voucher.quantity} value={voucher.ticketUsed} color="success" className="w-100" />
                            </div>
                        </div>
                    </CardBody>
                </Card>  
            )
        }

        return null;
    }
}

export default DetailJumlahPenggunaanTicket