import React, { Component } from 'react'

import { 
    Card, 
    CardHeader, 
    CardBody ,
    Button
} from 'reactstrap'

import { WithDrawShow, WithDrawApprove } from '../../../../types/financialManager/withdraw'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../types'
import { approveWithDrawAction } from '../../../../actions/financialManager/withdraw'
import { ApiResponse } from '../../../../types/api'
import { loadStateInterface } from '../Detail'
import swal from 'sweetalert'

type DetailApproveProps = RouteComponentProps & {
    data: WithDrawShow | null,
    reLoadWithDraw: (state?: loadStateInterface) => void,
    setAlertMessage: (message: string, color: string) => void,
    setAlertOpen: (open: boolean) => void
}

type Props = DetailApproveProps & LinkDispatchToProps

type State = {
    submitApprove: boolean
}

class DetailApprove extends Component<Props, State> {

    state = {
        submitApprove: false
    }

    submitApproveWithDrawAction = () => {
        this.setState({
            submitApprove: true
        }, () => {
            if (this.props.data) {

                const data = this.props.data as WithDrawShow

                swal("Apakah anda yakin?", "Persetujuan withdraw akan dilakukan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        this.props.approveWithDrawAction(data.id)
                            .then((response: ApiResponse<WithDrawApprove>) => {
                                this.props.reLoadWithDraw({
                                    alert_visible: true,
                                    alert_message: 'Berhasil menyetujui withdraw',
                                    alert_color: 'success'
                                })
                            })
                            .catch((error: ApiResponse<WithDrawApprove>) => {
                                this.setState({
                                    submitApprove: false
                                })

                                let message = "Gagal Mendapatkan Response";
            
                                if (error.error) {
                                    message = error.error.metaData.message;
                                }

                                this.props.setAlertMessage(message, "danger")
                                this.props.setAlertOpen(true)
                            })
                    } else {
                        this.setState({
                            submitApprove: false
                        })
                    }
                });
            } else {
                this.setState({
                    submitApprove: false
                })
            }
        })
    }

    render () {
        return (
            <Card className="mb-2">
                <CardHeader>
                    <h3 className="mb-0">Persetujuan</h3>
                </CardHeader>
                <CardBody>
                    <Button size="md" color="success" block onClick={() => this.submitApproveWithDrawAction()} disabled={this.state.submitApprove}>
                        Setujui
                    </Button>
                </CardBody>
            </Card>
        )
    }
}

interface LinkDispatchToProps {
    approveWithDrawAction: (id: number) => Promise<ApiResponse<WithDrawApprove>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailApproveProps): LinkDispatchToProps => {
    return {
        approveWithDrawAction: (id: number) => dispatch(approveWithDrawAction(id))
    }
}

export default  withRouter(
    connect(null, mapDispatchToProps)(
        DetailApprove
    )
);