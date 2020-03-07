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

        return (
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Detail Profile</h3>
                </CardHeader>
                <CardBody>
                    <div>
                        <div className="form-group">
                            <label htmlFor="">Nama</label>
                            <div>
                                { data && data.request.driverProfile && data.request.driverProfile.user ? data.request.driverProfile.user.name : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">No. Telepon</label>
                            <div>
                                { data && data.request.driverProfile && data.request.driverProfile.user ? data.request.driverProfile.user.phoneNumber : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <div>
                                { data && data.request.driverProfile && data.request.driverProfile.user ? data.request.driverProfile.user.email : '' }
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default DetailTransfer