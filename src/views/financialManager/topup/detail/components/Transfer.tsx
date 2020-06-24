import * as React from 'react'

import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import { TopUpShow } from '../../../../../types/financialManager/topup'

import '../../../../../react-modal-image.d.ts'
import { Lightbox } from 'react-modal-image'

type OwnProps = {
    data: TopUpShow | null
}

type Props = OwnProps

const Transfer: React.FC<Props> = (props) => {
    
    const [evidenceVisible, setEvidenceVisible] = React.useState(false)

    const { data } = props

    let evidenceImage = ''

    if (data && data.evidance) {
        evidenceImage = data.evidance
    }

    return (
        <React.Fragment>
            {
                evidenceImage !== '' ? (
                    evidenceVisible ? (
                    <Lightbox large={new URL(evidenceImage)}
                            onClose={() => setEvidenceVisible(false)}/>
                    ) : null
                ) : null
            }

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
                                    <img src={evidenceImage} alt="" onClick={() => setEvidenceVisible( ! evidenceVisible)}/>    
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
        </React.Fragment>
    )
}

export default Transfer