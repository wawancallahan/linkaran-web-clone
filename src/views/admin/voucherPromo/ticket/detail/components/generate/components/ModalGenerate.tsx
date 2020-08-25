import * as React from 'react'
import { Form, Modal, FormGroup, Button, Input } from 'reactstrap'
import { Formik } from 'formik'
import { ApiResponse, ApiResponseSuccess } from '../../../../../../../../types/api'
import { TicketGenerateResult, TicketGenerateField, FormField } from '../../../../../../../../types/admin/ticket'
import { VoucherPromoShow } from '../../../../../../../../types/admin/voucherPromo'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../../../types'
import { connect } from 'react-redux'
import { generateTicketAction } from '../../../../../../../../actions/admin/ticket'

type OwnProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    data: VoucherPromoShow | null,
    fetch: (page: number, id: number) => void
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const ModalGenerate: React.FC<Props> = (props) => {

    const [formField, setFormField] = React.useState<FormField>({
        redeemCode: ''
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
    
    const { data } = props

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={props.modalVisible}
            toggle={() => props.setModalVisible( ! props.modalVisible)}
            >
            <div className="modal-header">
                <h5 className="modal-title" id="modal-ticket">
                    Generate Tiket
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
                            if (data) {
                                const ticketForm: TicketGenerateField = {
                                    redeemCode: values.redeemCode,
                                    voucher: {
                                        id: data.id
                                    }
                                }

                                props.generateTicketAction(ticketForm)
                                    .then( (response: ApiResponse<TicketGenerateResult>) => {
                                        const dataTicket: ApiResponseSuccess<TicketGenerateResult> = response.response!;
                                        
                                        toastNotify("Tiket Berhasil Digenerate", "success");
                                        props.setModalVisible( ! props.modalVisible);
                                        
                                        props.fetch(1, data.id)
                                    })
                                    .catch( (error: ApiResponse<TicketGenerateResult>) => {
                                        let message = "Gagal Mendapatkan Response";

                                        if (error.error) {
                                            message = error.error.metaData.message;
                                        }

                                        toastNotify(message, "error");

                                        props.setModalVisible( ! props.modalVisible)
                                        action.setSubmitting(false)
                                    });
                            } else {
                                toastNotify("Tiket Gagal Digenerate", "error");
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
                                        Generate
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    generateTicketAction: (ticket: TicketGenerateField) => dispatch(generateTicketAction(ticket))
});

export default connect(null, mapDispatchToProps)(ModalGenerate)