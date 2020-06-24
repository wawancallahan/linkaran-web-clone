import * as React from 'react'
import {
    FormGroup,
    Row,
    Col
} from 'reactstrap'
import DatePicker from 'react-datepicker';
import { FormikProps } from 'formik'
import { FormField } from '../../../../../../../../types/admin/restaurant'
import { midnightDate } from '../../../../../../../../helpers/utils';
import "react-datepicker/dist/react-datepicker.css"

type OwnProps = {
    form: FormikProps<FormField>,
    formValuesDateStart: Date | null,
    formValuesDateEnd: Date | null,
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
        form.setFieldValue(field, ! prevValues)

        // if ( ! prevValues) {
        //     form.setFieldValue(fieldDateStart, '00:00')
        //     form.setFieldValue(fieldDateEnd, '00:00')
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
                        <DatePicker
                            selected={props.formValuesDateStart}
                            onChange={date => form.setFieldValue(props.formSetValuesDateStart, date)}
                            onBlur={() => form.setFieldTouched(props.formSetValuesDateStart, true)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={5}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            timeFormat="HH:mm"
                            className="form-control form-control-alternative"
                            placeholderText="Waktu Buka"
                            disabled={props.formValuesIsClosed}
                            required
                        />
                    </div>

                    <div className="d-inline-block ml-3">
                        <DatePicker
                            selected={props.formValuesDateEnd}
                            onChange={date => form.setFieldValue(props.formSetValuesDateEnd, date)}
                            onBlur={() => form.setFieldTouched(props.formSetValuesDateEnd, true)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={5}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            timeFormat="HH:mm"
                            className="form-control form-control-alternative"
                            placeholderText="Waktu Tutup"
                            disabled={props.formValuesIsClosed}
                            required
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