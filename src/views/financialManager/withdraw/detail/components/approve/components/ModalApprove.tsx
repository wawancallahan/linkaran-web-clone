import * as React from 'react'
import { Form, Modal, FormGroup, Button } from 'reactstrap'
import { Formik, FormikProps } from 'formik'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { ThunkDispatch } from 'redux-thunk'
import { WithDrawShow, ApproveFormField as FormField, WithDrawApproveField, WithDrawApproveResult } from '../../../../../../../types/financialManager/withdraw'
import { AppActions } from '../../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse, ApiResponseSuccess } from '../../../../../../../types/api'
import { approveWithDrawAction } from '../../../../../../../actions/financialManager/withdraw'
import Dropzone from '../../../../../../../components/Dropzone/Dropzone'

type OwnProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    data: WithDrawShow | null,
    setNeedReload: React.Dispatch<React.SetStateAction<boolean>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const ModalGenerate: React.FC<Props> = (props) => {

    const [formField, setFormField] = React.useState<FormField>({
        image: null,
        image_preview: ''
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

    const onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
        const file: {
            lastModified: number,
            name: string,
            preview: string,
            size: number,
            type: string
        } = files.length > 0 ? files[0] : null;
    
        if (file) {
            FormikProps.setFieldValue(setPreview, file.preview, true);
            FormikProps.setFieldValue(setValue, file);
        }
    }
    
    const { data } = props

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={props.modalVisible}
            toggle={() => props.setModalVisible( ! props.modalVisible)}
            >
            <div className="modal-header">
                <h5 className="modal-title" id="modal-approve">
                    Setujui
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
                                const withDraw: WithDrawApproveField = {
                                    image_preview: values.image_preview,
                                    image: values.image,
                                }

                                props.approveWithDrawAction(withDraw, data.id)
                                    .then( (response: ApiResponse<WithDrawApproveResult>) => {
                                        const dataWithDraw: ApiResponseSuccess<WithDrawApproveResult> = response.response!;
                                        toastNotify("Berhasil melakukan persetujuan", "success")
                                        props.setLoaded(false)
                                        props.setNeedReload(true)
                                        props.setModalVisible( ! props.modalVisible);
                                    })
                                    .catch( (error: ApiResponse<WithDrawApproveResult>) => {
                                        let message = "Gagal Mendapatkan Response";

                                        if (error.error) {
                                            message = error.error.metaData.message;
                                        }

                                        toastNotify(message, "error");

                                        props.setModalVisible( ! props.modalVisible)
                                        action.setSubmitting(false)
                                    });
                            } else {
                                toastNotify("Data gagal disetujui", "error");
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
                                    htmlFor="input-upload-photo"
                                    >
                                        Upload Bukti
                                    </label>

                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        onFilesAdded(files, FormikProps, 'image_preview', 'image');
                                    }} disabled={false} multiple={false} removeFile={true} onClickRemove={(file, index) => {
                                        FormikProps.setFieldValue('image_preview', '');
                                        FormikProps.setFieldValue('image', null)
                                    }}/>

                                    <div>
                                        {FormikProps.errors.image_preview && FormikProps.touched.image_preview ? FormikProps.errors.image_preview : ''}
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
                                    <Button color="success" type="button" onClick={() => {
                                        FormikProps.setSubmitting(true)
                                        FormikProps.submitForm();
                                    }} disabled={FormikProps.isSubmitting}>
                                        Setujui
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
    approveWithDrawAction: (withDraw: WithDrawApproveField, id: number) => dispatch(approveWithDrawAction(withDraw, id))
});

export default connect(null, mapDispatchToProps)(ModalGenerate)