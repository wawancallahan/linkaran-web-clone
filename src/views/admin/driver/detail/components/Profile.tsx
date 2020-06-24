import * as React from 'react'
import {
    Card,
    CardBody,
    Row,
    Col,
    Button
} from 'reactstrap'

import { profileImage } from '../../../../../helpers/Assets'

import { DriverShow } from '../../../../../types/admin/driver';

import '../../../../../react-modal-image.d.ts'
import { Lightbox } from 'react-modal-image'

type OwnProps = {
    data: DriverShow | null
}

type Props = OwnProps

const Profile: React.FC<Props> = (props) => {

    const [ktpPhotoVisible, setKtpPhotoVisible] = React.useState(false)

    const { data } = props

    if (data) {
        let photo = profileImage

        if (data.photo) {
            photo = data.photo
        }

        let image: string | undefined = undefined;

        if (data.ktpPhoto) {
            image = data.ktpPhoto;
        }

        return (
            <Card className="card-profile mb-2">
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                            <a href="#">
                                <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={photo}
                                />
                            </a>
                        </div>
                    </Col>
                </Row>
                <CardBody className="border-0 mt-8">
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">ID</label>
                        </Col>
                        <Col md="6">
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Nama</label>
                        </Col>
                        <Col md="6">
                            {data.name}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Email</label>
                        </Col>
                        <Col md="6">
                            {data.email}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">TTL</label>
                        </Col>
                        <Col md="6">
                            {data.placeOfBirth}, {data.dateOfBirth}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Jenis Kelamin</label>
                        </Col>
                        <Col md="6">
                            {data.gender == "L" ? "Laki Laki" : "Perempuan"}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">No. Identitas</label>
                        </Col>
                        <Col md="6">
                            <div className="mb-1">
                                {data.identityNumber}
                            </div>
                            <div>
                                {
                                    image ? (
                                        <Button color="info" size="sm" onClick={() => setKtpPhotoVisible( ! ktpPhotoVisible)}>
                                            <i className="fa fa-eye"></i> KTP
                                        </Button>
                                    ) : null
                                }
                                
                                {
                                    image ? (
                                        ktpPhotoVisible ? (
                                        <Lightbox large={new URL(image)}
                                                onClose={() => setKtpPhotoVisible(false)}/>
                                        ) : null
                                    ) : null
                                }
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Alamat</label>
                        </Col>
                        <Col md="6">
                            {data.address}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Alamat Domisili</label>
                        </Col>
                        <Col md="6">
                            {data.residenceAddress}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Status Pernikahan</label>
                        </Col>
                        <Col md="6">
                            {data.isMeried ? "Sudah Menikah" : "Belum Menikah"}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }

    return null;
}

export default Profile