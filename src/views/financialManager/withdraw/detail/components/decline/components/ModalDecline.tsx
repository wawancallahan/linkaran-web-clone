import * as React from 'react'
import { Form, Modal, FormGroup, Button, Input } from 'reactstrap'
import { Formik } from 'formik'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { ThunkDispatch } from 'redux-thunk'
import { WithDrawShow, DeclineFormField as FormField, WithDrawDeclineField, WithDrawDeclineResult } from '../../../../../../../types/financialManager/withdraw'
import { AppActions } from '../../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse, ApiResponseSuccess } from '../../../../../../../types/api'
import { declineWithDrawAction } from '../../../../../../../actions/financialManager/withdraw'

type OwnProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    data: WithDrawShow | null,
    setNeedReload: React.Dispatch<React.SetStateAction<boolean>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & LinkDispatchToProps

const ModalGenerate: React.FC<Props> = (props) => {

    const [formField, setFormField] = React.useState<FormField>({
        information: ''
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
                <h5 className="modal-title" id="modal-decline">
                    Batalkan
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
                                const withDraw: WithDrawDeclineField = {
                                    information: values.information
                                }

                                props.declineWithDrawAction(withDraw, data.id)
                                    .then( (response: ApiResponse<WithDrawDeclineResult>) => {
                                        const dataWithDraw: ApiResponseSuccess<WithDrawDeclineResult> = response.response!;
                                        toastNotify("Berhasil melakukan pembatalan", "success")
                                        props.setLoaded(false)
                                        props.setNeedReload(true)
                                        props.setModalVisible( ! props.modalVisible);
                                    })
                                    .catch( (error: ApiResponse<WithDrawDeclineResult>) => {
                                        let message = "Gagal Mendapatkan Response";

                                        if (error.error) {
                                            message = error.error.metaData.message;
                                        }

                                        toastNotify(message, "error");

                                        props.setModalVisible( ! props.modalVisible)
                                        action.setSubmitting(false)
                                    });
                            } else {
                                toastNotify("Data gagal dibatalkan", "error");
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
                                    htmlFor="input-information"
                                    >
                                        Informasi
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-information"
                                        placeholder="Informasi"
                                        type="textarea"
                                        name="information"
                                        maxLength={255}
                                        value={FormikProps.values.information}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.information && FormikProps.errors.information) }
                                    />
                                    <div>
                                        {FormikProps.errors.information && FormikProps.touched.information ? FormikProps.errors.information : ''}
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
                                    <Button color="danger" type="button" onClick={() => {
                                        FormikProps.setSubmitting(true)
                                        FormikProps.submitForm();
                                    }} disabled={FormikProps.isSubmitting}>
                                        Batalkan
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
    declineWithDrawAction: (withDraw: WithDrawDeclineField, id: number) => Promise<ApiResponse<WithDrawDeclineResult>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        declineWithDrawAction: (withDraw: WithDrawDeclineField, id: number) => dispatch(declineWithDrawAction(withDraw, id))
    }
}

export default connect(null, mapDispatchToProps)(ModalGenerate)