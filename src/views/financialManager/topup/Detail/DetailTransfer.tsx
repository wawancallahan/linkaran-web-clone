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
import { TopUpShow } from '../../../../types/financialManager/topup'

type DetailTransferProps = {
    data: TopUpShow | null
}

type Props = DetailTransferProps

class DetailTransfer extends Component<Props> {
    render () {

        const { data } = this.props

        let evidence = ''

        if (data && data.evidance) {
            evidence = data.evidance
        }

        return (
            <Card className="mb-2">
                <CardHeader>
                    <h3 className="mb-0">Detail Transfer</h3>
                </CardHeader>
                <CardBody>
                    <div>
                        <div className="form-group">
                            <label htmlFor="">Bukti Transfer</label>
                            <div className="d-flex align-items-center">
                                <div className="img-responsive">
                                    <img src={evidence} alt=""/>    
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Tanggal</label>
                            <div>
                                { data ? data.transactionDate : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Manual</label>
                            <div>
                                { data ? (data.isManual ? "Ya" : "Tidak") : ''}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Tanggal Disetujui</label>
                            <div>
                                {data ? data.approvedAt : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Disetujui Oleh</label>
                            <div>
                                { data && data.approvedBy ? data.approvedBy.name : '' }
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default DetailTransfer