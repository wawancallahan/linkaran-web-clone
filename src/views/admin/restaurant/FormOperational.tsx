import React, { Component } from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Row,
    Col,
    FormGroup,
    Input,
    Button
} from 'reactstrap'

import { FormikProps } from 'formik'
import { FormField } from '../../../types/admin/restaurant'

import FormTimePicker from './FormTimePicker'
import FormTimeManual from './FormTimeManual'

type FormOperationalProps = {
    FormikProps: FormikProps<FormField>,
};

type Props = FormOperationalProps

class FormOperational extends Component<Props> {
    render() {

        const { FormikProps } = this.props

        return (
            <Card className="">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Waktu Operasional</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.monday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.monday_end}
                            FormikSetValuesDateStart={'monday_start'}
                            FormikSetValuesDateEnd={'monday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.monday_isClosed}
                            FormikSetValuesIsClosed={'monday_isClosed'}
                            name={'Senin'}
                            id={1} />

                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.tuesday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.tuesday_end}
                            FormikSetValuesDateStart={'tuesday_start'}
                            FormikSetValuesDateEnd={'tuesday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.tuesday_isClosed}
                            FormikSetValuesIsClosed={'tuesday_isClosed'}
                            name={'Selasa'}
                            id={2} />

                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.wednesday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.wednesday_end}
                            FormikSetValuesDateStart={'wednesday_start'}
                            FormikSetValuesDateEnd={'wednesday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.wednesday_isClosed}
                            FormikSetValuesIsClosed={'wednesday_isClosed'}
                            name={'Rabu'}
                            id={3} />

                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.thursday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.thursday_end}
                            FormikSetValuesDateStart={'thursday_start'}
                            FormikSetValuesDateEnd={'thursday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.thursday_isClosed}
                            FormikSetValuesIsClosed={'thursday_isClosed'}
                            name={'Kamis'}
                            id={4} />
                            
                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.friday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.friday_end}
                            FormikSetValuesDateStart={'friday_start'}
                            FormikSetValuesDateEnd={'friday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.friday_isClosed}
                            FormikSetValuesIsClosed={'friday_isClosed'}
                            name={'Jumat'}
                            id={5} />

                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.saturday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.saturday_end}
                            FormikSetValuesDateStart={'saturday_start'}
                            FormikSetValuesDateEnd={'saturday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.saturday_isClosed}
                            FormikSetValuesIsClosed={'saturday_isClosed'}
                            name={'Sabtu'}
                            id={6} />

                    <FormTimeManual FormikProps={FormikProps} 
                            FormikPropsValuesDateStart={FormikProps.values.sunday_start}
                            FormikPropsValuesDateEnd={FormikProps.values.sunday_end}
                            FormikSetValuesDateStart={'sunday_start'}
                            FormikSetValuesDateEnd={'sunday_end'}
                            FormikPropsValuesIsClosed={FormikProps.values.sunday_isClosed}
                            FormikSetValuesIsClosed={'sunday_isClosed'}
                            name={'Minggu'}
                            id={7} />
                    
                    <FormGroup>
                        <Button type="submit" disabled={FormikProps.isSubmitting} color="success">Simpan</Button>
                    </FormGroup>

                </CardBody>
            </Card>
        )
    }
}

export default FormOperational