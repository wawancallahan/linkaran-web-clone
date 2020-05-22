import React, { Component } from 'react'

import {
    Card,
    CardTitle,
    CardBody,
    CardHeader,
    CardFooter,
    Row,
    Col
} from 'reactstrap'
import { WithDrawShow } from '../../../../types/financialManager/withdraw'

type DetailBankProps = {
    data: WithDrawShow | null
}

type Props = DetailBankProps

class DetailBank extends Component<Props> {
    render () {

        const { data } = this.props

        return (
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Detail Bank</h3>
                </CardHeader>
                <CardBody>
                    <h4>Bank Asal</h4>
                    
                    <div>
                        <div className="form-group">
                            <label htmlFor="">Nama</label>
                            <div>
                                { data && data.request ? data.request.bankName : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nomor Akun</label>
                            <div>
                                { data && data.request ? data.request.accountNumber : ''}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nama Akun</label>
                            <div>
                                {data && data.request ? data.request.accountName : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Jumlah</label>
                            <div>
                                { data && data.request ? data.request.amount : '' }
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <h4>Bank Tujuan</h4>

                    <div>
                        <div className="form-group">
                            <label htmlFor="">Nama</label>
                            <div>
                                { data && data.request && data.request.bank ? data.request.bank.nama : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nama Bank</label>
                            <div>
                                { data && data.request && data.request.bank ? data.request.bank.bankName : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nama Akun</label>
                            <div>
                                { data && data.request && data.request.bank ? data.request.bank.accountName : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nomor Akun</label>
                            <div>
                                { data && data.request && data.request.bank ? data.request.bank.accountNumber : '' }
                            </div>
                        </div>
                    </div>

                </CardBody>
            </Card>
        )
    }
}

export default DetailBank