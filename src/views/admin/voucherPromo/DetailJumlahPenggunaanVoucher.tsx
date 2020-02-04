import React, { Component } from 'react'

import {
    Card,
    CardBody,
    Progress
} from 'reactstrap'
import { VoucherPromo } from '../../../types/admin/voucherPromo'

type DetailJumlahPenggunaanVoucherProps = {
    voucher: VoucherPromo | null
}

type Props = DetailJumlahPenggunaanVoucherProps

class DetailJumlahPenggunaanVoucher extends Component<Props> {
    render() {

        const { voucher } = this.props

        if (voucher) {
            return (
                <Card className="shadow">
                    <CardBody>
                        <h3 className="mb-0">Jumlah Penggunaan Voucher</h3>
                        <div className="progress-wrapper">
                            <div className="progress-info justify-content-center">
                                <div className="progress-percentage">
                                    <span style={{
                                        fontSize: '50px',
                                    }}>{voucher.quantity}/{voucher.quota}</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <Progress max={voucher.quota} value={voucher.quantity} color="success" className="w-100" />
                            </div>
                        </div>
                    </CardBody>
                </Card>   
            )
        }

        return null;
    }
}

export default DetailJumlahPenggunaanVoucher