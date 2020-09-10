import * as React from 'react'
import { ApplicationShowInprogress } from '../../../../../../types/admin/transaction/application'
import {
    Table, Badge, Card, CardHeader, Row, Col, CardBody
} from 'reactstrap'
import { DriverGetNotifTransaction } from '../../../../../../types/admin/driverGetNotifTransaction'
import { parseDateTimeFormat } from '../../../../../../helpers/utils'
import { Transaction } from '../../../../../../types/admin/transaction'

type OwnProps = {
    item: ApplicationShowInprogress
}

type Props = OwnProps

const NotificationDriver: React.FC<Props> = (props) => {
    
    const { item } = props

    const statusOrder = (status: number) => {
        if (status == 1) {
            return <Badge color="success">Ya</Badge>
        }

        return <Badge color="danger">Tidak</Badge>
    }

    return (
        <Card>
            <CardHeader>
                <Row className="align-items-center">
                    <Col>
                        <h3 className="mb-0">Daftar Driver Yang Mendapatkan Notif</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>No. Telepon</th>
                            <th>Tanggal & Waktu</th>
                            <th>Mendapatkan Order</th>
                            <th>Mengambil Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.transaction && item.transaction.driverGetNotif && item.transaction.driverGetNotif.map((driverGetNotif: Partial<DriverGetNotifTransaction & Transaction>, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{driverGetNotif.driverProfile && driverGetNotif.driverProfile.user.name}</td>
                                <td>{driverGetNotif.driverProfile && driverGetNotif.driverProfile.user.phoneNumber}</td>
                                <td>{driverGetNotif.datetime ? parseDateTimeFormat(driverGetNotif.datetime) : ''}</td>
                                <td>{statusOrder(driverGetNotif.getOrder || 0)}</td>
                                <td>{statusOrder(driverGetNotif.takeOrder || 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default NotificationDriver