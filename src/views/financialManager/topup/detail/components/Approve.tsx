import * as React from 'react'
import { 
    Card, 
    CardHeader, 
    CardBody ,
    Button
} from 'reactstrap'
import { TopUpShow, TopUpApprove } from '../../../../../types/financialManager/topup'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { approveTopUpAction } from '../../../../../actions/financialManager/topup'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import { toast, TypeOptions } from 'react-toastify'
import { AppState } from '../../../../../reducers'

type OwnProps = {
    data: TopUpShow | null,
    setNeedReload: React.Dispatch<React.SetStateAction<boolean>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

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

    const submitApproveTopUpAction = () => {
        setSubmitApprove(true)

        if (props.data) {
            const data = props.data as TopUpShow

            swal("Apakah anda yakin?", "Persetujuan topup akan dilakukan!", {
                icon: "warning",
                buttons: ["Tutup!", true],
            }).then((willCreated) => {
                if (willCreated) {
                    props.approveTopUpAction(data.id)
                        .then((response: ApiResponse<TopUpApprove>) => {
                            toastNotify("Berhasil melakukan persetujuan", "success")
                            setSubmitApprove(false)
                            props.setLoaded(false)
                            props.setNeedReload(true)
                        })
                        .catch((error: ApiResponse<TopUpApprove>) => {
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
                <Button size="md" color="success" block onClick={() => submitApproveTopUpAction()} disabled={submitApprove}>
                    Setujui
                </Button>
            </CardBody>
        </Card>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    approveTopUpAction: (id: number) => dispatch(approveTopUpAction(id))
});

export default  connect(null, mapDispatchToProps)(Approve);
