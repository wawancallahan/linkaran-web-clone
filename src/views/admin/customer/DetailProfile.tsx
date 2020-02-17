import React, { Component } from 'react'

import {
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap'

import { profileImage } from '../../../helpers/Assets'

import { CustomerShow } from '../../../types/admin/customer';

type Props = {
    customer: CustomerShow | null
}

class DetailProfile extends Component<Props> {
    render() {

        const { customer } = this.props

        if (customer) {

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
                                {customer.name}
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <label htmlFor="">No. Telepon</label>
                            </Col>
                            <Col>
                                {customer.phoneNumber}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Email</label>
                            </Col>
                            <Col>
                                {customer.email}
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <label htmlFor="">Status</label>
                            </Col>
                            <Col>
                                {customer.isActive ? "Aktif" : "Tidak Aktif"}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }

        return null;
    }
}

export default DetailProfile