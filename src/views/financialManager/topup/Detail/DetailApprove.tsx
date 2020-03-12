import React, { Component } from 'react'

import { 
    Card, 
    CardHeader, 
    CardBody ,
    Button
} from 'reactstrap'

import { TopUpShow, TopUpApprove } from '../../../../types/financialManager/topup'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../types'
import { approveTopUpAction } from '../../../../actions/financialManager/topup'
import { ApiResponse } from '../../../../types/api'
import { loadStateInterface } from '../Detail'
import swal from 'sweetalert'

type DetailApproveProps = RouteComponentProps & {
    data: TopUpShow | null,
    reLoadTopUp: (state?: loadStateInterface) => void,
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

    submitApproveTopUpAction = () => {
        this.setState({
            submitApprove: true
        }, () => {
            if (this.props.data) {

                const data = this.props.data as TopUpShow

                swal("Apakah anda yakin?", "Persetujuan topup akan dilakukan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        this.props.approveTopUpAction(data.id)
                            .then((response: ApiResponse<TopUpApprove>) => {
                                this.props.reLoadTopUp({
                                    alert_visible: true,
                                    alert_message: 'Berhasil menyetujui topup',
                                    alert_color: 'success'
                                })
                            })
                            .catch((error: ApiResponse<TopUpApprove>) => {
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
                    <Button size="md" color="success" block onClick={() => this.submitApproveTopUpAction()} disabled={this.state.submitApprove}>
                        Setujui
                    </Button>
                </CardBody>
            </Card>
        )
    }
}

interface LinkDispatchToProps {
    approveTopUpAction: (id: number) => Promise<ApiResponse<TopUpApprove>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailApproveProps): LinkDispatchToProps => {
    return {
        approveTopUpAction: (id: number) => dispatch(approveTopUpAction(id))
    }
}

export default  withRouter(
    connect(null, mapDispatchToProps)(
        DetailApprove
    )
);