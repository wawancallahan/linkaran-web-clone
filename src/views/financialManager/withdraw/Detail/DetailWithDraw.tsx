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

import '../../../../react-modal-image.d.ts'
import { Lightbox } from 'react-modal-image'

type DetailTransferProps = {
    data: WithDrawShow | null
}

type Props = DetailTransferProps

type State = {
    evidence_visible: boolean
}

class DetailTransfer extends Component<Props, State> {

    state = {
        evidence_visible: false
    }

    onToggleEvidenceVisible = (visible?: boolean) => {

        if (visible) {
            this.setState({
                evidence_visible: visible
            })
        } else {
            this.setState(prevState => {
                return {
                    evidence_visible: ! prevState.evidence_visible
                }
            });
        }
    }

    render () {

        const { data } = this.props

        let evidenceImage = ''

        if (data && data.evidance) {
            evidenceImage = data.evidance
        }

        return (
            <>
                 {
                    evidenceImage !== '' ? (
                        this.state.evidence_visible ? (
                        <Lightbox large={new URL(evidenceImage)}
                                onClose={() => this.onToggleEvidenceVisible(false)}/>
                        ) : null
                    ) : null
                }

                <Card className="mb-2">
                    <CardHeader>
                        <h3 className="mb-0">Detail Penarikan</h3>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <div className="form-group">
                                <label htmlFor="">Bukti Penarikan</label>
                                <div className="d-flex align-items-center">
                                    <div className="img-responsive">
                                        <img src={evidenceImage} alt="" onClick={() => this.onToggleEvidenceVisible()}/>    
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
            </>
        )
    }
}

export default DetailTransfer