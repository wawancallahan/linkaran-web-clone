import * as React from 'react'
import {
    FormGroup,
    Row,
    Col
} from 'reactstrap'
import { FormikProps } from 'formik'
import { FormField } from '../../../../../../../../types/admin/restaurant'
import TimePicker from 'react-time-picker'
import './TimeManual.css'

type OwnProps = {
    form: FormikProps<FormField>,
    formValuesDateStart: string | null,
    formValuesDateEnd: string | null,
    formValuesIsClosed: boolean,
    formSetValuesDateStart: string,
    formSetValuesDateEnd: string,
    formSetValuesIsClosed: string,
    name: string,
    id: number
};

type Props = OwnProps;

const Index: React.FC<Props> = (props) => {
    const toggleDateClose = (FormikProps: FormikProps<FormField>, field: string, prevValues: boolean, fieldDateStart: string, fieldDateEnd: string) => {
        FormikProps.setFieldValue(field, ! prevValues)

        // if ( ! prevValues) {
        //     FormikProps.setFieldValue(fieldDateStart, '00:00')
        //     FormikProps.setFieldValue(fieldDateEnd, '00:00')
        // }
    }

    const { form } = props

    return (
        <FormGroup>
            <Row>
                <Col md={3}>
                    <label
                    className="form-control-label"
                    htmlFor={`input-${props.name}`}
                    >
                        {props.name}
                    </label>
                </Col>
                <Col md={9}>

                    <div className="d-inline-block">
                        <TimePicker 
                            value={props.formValuesDateStart || ''} 
                            isOpen={false} 
                            clockIcon={null} 
                            clearIcon={null} 
                            disableClock={true} 
                            required={true} 
                            disabled={props.formValuesIsClosed}
                            onChange={(value) => {
                                form.setFieldValue(props.formSetValuesDateStart, value)
                                form.setFieldTouched(props.formSetValuesDateStart, true)
                            }}
                            className={"form-control form-time-manual"}
                        />
                    </div>

                    <div className="d-inline-block ml-3">
                        <TimePicker 
                            value={props.formValuesDateEnd || ''} 
                            isOpen={false} 
                            clockIcon={null} 
                            clearIcon={null} 
                            disableClock={true} 
                            required={true} 
                            disabled={props.formValuesIsClosed}
                            onChange={(value) => {
                                form.setFieldValue(props.formSetValuesDateEnd, value)
                                form.setFieldTouched(props.formSetValuesDateEnd, true)
                            }} 
                            className={"form-control form-time-manual"}
                        />
                    </div>

                    <div className="d-inline-block ml-3">
                        <div className="custom-control custom-checkbox mb-3">
                            <input
                                className="custom-control-input"
                                id={`day_close_${props.id}`}
                                name={`day_close_${props.id}`}
                                type="checkbox"
                                defaultChecked={props.formValuesIsClosed}
                                onChange={() => toggleDateClose(form, props.formSetValuesIsClosed, props.formValuesIsClosed, props.formSetValuesDateStart, props.formSetValuesDateEnd)}
                            />
                            <label className="custom-control-label" htmlFor={`day_close_${props.id}`}>
                                Tutup
                            </label>
                        </div>
                    </div>
                    
                </Col>
            </Row>
        </FormGroup>
    )
}

export default Index