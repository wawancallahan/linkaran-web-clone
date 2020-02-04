import React, { Component } from 'react'

import {
    Card,
    CardBody,
    Progress
} from 'reactstrap'

type DetailJumlahPenggunaanTicketProps = {
}

type Props = DetailJumlahPenggunaanTicketProps

class DetailJumlahPenggunaanTicket extends Component<Props> {
    render() {
        return (
            <Card className="shadow">
                <CardBody>
                    <h3 className="mb-0">Jumlah Penggunaan Tiket</h3>
                    <div className="progress-wrapper">
                        <div className="progress-info justify-content-center">
                            <div className="progress-percentage">
                                <span style={{
                                    fontSize: '50px',
                                }}>1/2</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Progress max="100" value="60" color="success" className="w-100" />
                        </div>
                    </div>
                </CardBody>
            </Card>  
        )
    }
}

export default DetailJumlahPenggunaanTicket