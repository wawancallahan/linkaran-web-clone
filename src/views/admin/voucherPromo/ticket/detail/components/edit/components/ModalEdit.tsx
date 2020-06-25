import * as React from 'react'
import { Form, Modal, FormGroup, Button, Input } from 'reactstrap'
import { Formik } from 'formik'
import { ApiResponse, ApiResponseSuccess } from '../../../../../../../../types/api'
import { TicketEditResult, TicketEditField, FormField, TicketList } from '../../../../../../../../types/admin/ticket'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../../../types'
import { connect } from 'react-redux'
import { editTicketAction } from '../../../../../../../../actions/admin/ticket'
import { VoucherPromoShow } from '../../../../../../../../types/admin/voucherPromo'

type OwnProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    data: TicketList,
    voucher: VoucherPromoShow | null,
    fetch: (page: number, id: number) => void
}

type Props = OwnProps & LinkDispatchToProps

const ModalEdit: React.FC<Props> = (props) => {

    const [formField, setFormField] = React.useState<FormField>({
        redeemCode: props.data.redeemCode
    })

    const toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }
    
    const { data, voucher } = props

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={props.modalVisible}
            toggle={() => props.setModalVisible( ! props.modalVisible)}
            >
            <div className="modal-header">
                <h5 className="modal-title" id="modal-ticket">
                    Edit Tiket
                </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => props.setModalVisible( ! props.modalVisible)}
                    >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <Formik initialValues={formField}
                        onSubmit={(values, action) => {
                            if (voucher) {
                                const ticketForm: TicketEditField = {
                                    redeemCode: values.redeemCode,
                                    voucher: {
                                        id: voucher.id
                                    }
                                }
    
                                props.editTicketAction(ticketForm, data.id)
                                    .then( (response: ApiResponse<TicketEditResult>) => {
                                        const dataTicket: ApiResponseSuccess<TicketEditResult> = response.response!;
                                        
                                        toastNotify("Tiket Berhasil Ditambah", "success");
                                        props.setModalVisible( ! props.modalVisible);
                                        
                                        props.fetch(1, voucher.id)
                                    })
                                    .catch( (error: ApiResponse<TicketEditResult>) => {
                                        let message = "Gagal Mendapatkan Response";
    
                                        if (error.error) {
                                            message = error.error.metaData.message;
                                        }
    
                                        toastNotify(message, "error");
    
                                        props.setModalVisible( ! props.modalVisible)
                                        action.setSubmitting(false)
                                    });
                            } else {
                                toastNotify("Tiket Gagal Diedit", "error");
                                props.setModalVisible( ! props.modalVisible);
                                action.setSubmitting(false)
                            }
                        }}
                        validationSchema={Schema}>
                    {(FormikProps => {
                        return (
                            <Form onSubmit={FormikProps.handleSubmit} formMethod="POST">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-code"
                                    >
                                        Kode
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-code"
                                        placeholder="Kode"
                                        type="text"
                                        name="redeemCode"
                                        maxLength={255}
                                        value={FormikProps.values.redeemCode}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.redeemCode && FormikProps.errors.redeemCode) }
                                    />
                                    <div>
                                        {FormikProps.errors.redeemCode && FormikProps.touched.redeemCode ? FormikProps.errors.redeemCode : ''}
                                    </div>
                                </FormGroup>
                                <div className="text-right">
                                    <Button
                                        color="secondary"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => props.setModalVisible( ! props.modalVisible)}
                                    >
                                        Tutup
                                    </Button>
                                    <Button color="primary" type="button" onClick={() => {
                                        FormikProps.setSubmitting(true)
                                        FormikProps.submitForm();
                                    }} disabled={FormikProps.isSubmitting}>
                                        Edit
                                    </Button>
                                </div>
                            </Form>
                        );
                    })}
                </Formik>
            </div>
        </Modal>
    )
}

type LinkDispatchToProps = {
    editTicketAction: (ticket: TicketEditField, id: number) => Promise<ApiResponse<TicketEditResult>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        editTicketAction: (ticket: TicketEditField, id: number) => dispatch(editTicketAction(ticket, id)),
    }
}

export default connect(null, mapDispatchToProps)(ModalEdit)