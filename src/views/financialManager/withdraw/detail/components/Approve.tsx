import * as React from 'react'
import { 
    Card, 
    CardHeader, 
    CardBody ,
    Button
} from 'reactstrap'
import { WithDrawShow, WithDrawApprove } from '../../../../../types/financialManager/withdraw'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { approveWithDrawAction } from '../../../../../actions/financialManager/withdraw'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import { toast, TypeOptions } from 'react-toastify'

type OwnProps = RouteComponentProps & {
    data: WithDrawShow | null,
    setNeedReload: React.Dispatch<React.SetStateAction<boolean>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & LinkDispatchToProps

const Approve: React.FC<Props> = (props) => {

    const toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }
    
    const [submitApprove, setSubmitApprove] = React.useState(false)

    const submitApproveWithDrawAction = () => {
        setSubmitApprove(true)

        if (props.data) {
            const data = props.data as WithDrawShow

            swal("Apakah anda yakin?", "Persetujuan topup akan dilakukan!", {
                icon: "warning",
                buttons: ["Tutup!", true],
            }).then((willCreated) => {
                if (willCreated) {
                    props.approveWithDrawAction(data.id)
                        .then((response: ApiResponse<WithDrawApprove>) => {
                            toastNotify("Berhasil melakukan persetujuan", "success")
                            setSubmitApprove(false)
                            props.setLoaded(false)
                            props.setNeedReload(true)
                        })
                        .catch((error: ApiResponse<WithDrawApprove>) => {
                            let message = "Gagal Mendapatkan Response";

                            if (error.error) {
                                message = error.error.metaData.message;
                            }

                            toastNotify(message, "error");
                            setSubmitApprove(false)
                        })
                } else {
                    setSubmitApprove(false)
                }
            });
        } else {
            toastNotify("Data Tidak Ditemukan", "error")
            setSubmitApprove(false)
        }
    }

    return (
        <Card className="mb-2">
            <CardHeader>
                <h3 className="mb-0">Persetujuan</h3>
            </CardHeader>
            <CardBody>
                <Button size="md" color="success" block onClick={() => submitApproveWithDrawAction()} disabled={submitApprove}>
                    Setujui
                </Button>
            </CardBody>
        </Card>
    )
}

type LinkDispatchToProps = {
    approveWithDrawAction: (id: number) => Promise<ApiResponse<WithDrawApprove>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        approveWithDrawAction: (id: number) => dispatch(approveWithDrawAction(id))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Approve));