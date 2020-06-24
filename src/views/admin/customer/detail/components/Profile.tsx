import * as React from 'react'
import {
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap'
import { CustomerShow } from '../../../../../types/admin/customer';


type OwnProps = {
    data: CustomerShow | null
}

type Props = OwnProps

const Profile: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {

        return (
            <Card className="mb-2">
                <CardBody className="border-0">
                    <Row>
                        <Col>
                            <label htmlFor="">ID</label>
                        </Col>
                        <Col>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="">Nama</label>
                        </Col>
                        <Col>
                            {data.name}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="">No. Telepon</label>
                        </Col>
                        <Col>
                            {data.phoneNumber}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="">Email</label>
                        </Col>
                        <Col>
                            {data.email}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="">Status</label>
                        </Col>
                        <Col>
                            {data.isActive ? "Aktif" : "Tidak Aktif"}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }

    return null;
}

export default Profile