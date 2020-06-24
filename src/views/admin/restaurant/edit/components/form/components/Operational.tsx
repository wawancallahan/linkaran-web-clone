import * as React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup,
    Button
} from 'reactstrap'

import { FormikProps } from 'formik'
import { FormField } from '../../../../../../../types/admin/restaurant'
import TimeManual from './timeManual/Index'

type OwnProps = {
    form: FormikProps<FormField>,
};

type Props = OwnProps

const Operational: React.FC<Props> = (props) => {
    const { form } = props

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
                <TimeManual form={form} 
                        formValuesDateStart={form.values.monday_start}
                        formValuesDateEnd={form.values.monday_end}
                        formSetValuesDateStart={'monday_start'}
                        formSetValuesDateEnd={'monday_end'}
                        formValuesIsClosed={form.values.monday_isClosed}
                        formSetValuesIsClosed={'monday_isClosed'}
                        name={'Senin'}
                        id={1} />

                <TimeManual form={form} 
                        formValuesDateStart={form.values.tuesday_start}
                        formValuesDateEnd={form.values.tuesday_end}
                        formSetValuesDateStart={'tuesday_start'}
                        formSetValuesDateEnd={'tuesday_end'}
                        formValuesIsClosed={form.values.tuesday_isClosed}
                        formSetValuesIsClosed={'tuesday_isClosed'}
                        name={'Selasa'}
                        id={2} />

                <TimeManual form={form} 
                        formValuesDateStart={form.values.wednesday_start}
                        formValuesDateEnd={form.values.wednesday_end}
                        formSetValuesDateStart={'wednesday_start'}
                        formSetValuesDateEnd={'wednesday_end'}
                        formValuesIsClosed={form.values.wednesday_isClosed}
                        formSetValuesIsClosed={'wednesday_isClosed'}
                        name={'Rabu'}
                        id={3} />

                <TimeManual form={form} 
                        formValuesDateStart={form.values.thursday_start}
                        formValuesDateEnd={form.values.thursday_end}
                        formSetValuesDateStart={'thursday_start'}
                        formSetValuesDateEnd={'thursday_end'}
                        formValuesIsClosed={form.values.thursday_isClosed}
                        formSetValuesIsClosed={'thursday_isClosed'}
                        name={'Kamis'}
                        id={4} />
                        
                <TimeManual form={form} 
                        formValuesDateStart={form.values.friday_start}
                        formValuesDateEnd={form.values.friday_end}
                        formSetValuesDateStart={'friday_start'}
                        formSetValuesDateEnd={'friday_end'}
                        formValuesIsClosed={form.values.friday_isClosed}
                        formSetValuesIsClosed={'friday_isClosed'}
                        name={'Jumat'}
                        id={5} />

                <TimeManual form={form} 
                        formValuesDateStart={form.values.saturday_start}
                        formValuesDateEnd={form.values.saturday_end}
                        formSetValuesDateStart={'saturday_start'}
                        formSetValuesDateEnd={'saturday_end'}
                        formValuesIsClosed={form.values.saturday_isClosed}
                        formSetValuesIsClosed={'saturday_isClosed'}
                        name={'Sabtu'}
                        id={6} />

                <TimeManual form={form} 
                        formValuesDateStart={form.values.sunday_start}
                        formValuesDateEnd={form.values.sunday_end}
                        formSetValuesDateStart={'sunday_start'}
                        formSetValuesDateEnd={'sunday_end'}
                        formValuesIsClosed={form.values.sunday_isClosed}
                        formSetValuesIsClosed={'sunday_isClosed'}
                        name={'Minggu'}
                        id={7} />
                
                <FormGroup>
                    <Button type="submit" disabled={form.isSubmitting} color="success">Simpan</Button>
                </FormGroup>

            </CardBody>
        </Card>
    )
}

export default Operational