import * as React from 'react'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input,
    FormGroup,
    Modal
} from 'reactstrap'
import { Filter as IFilter } from '../../../../../types/admin/partner';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { createFormSearch, OptionObjectString } from '../../../../../helpers/utils';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import queryString from "query-string";

import "react-datepicker/dist/react-datepicker.css";

type OwnProps = RouteComponentProps

type Props = OwnProps

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [filtered, setFiltered] = React.useState(false);
    const [formField, setFormField] = React.useState<IFilter>({
        companyName: '',
        email: '',
        endWorkingTogether: null,
        name: '',
        phoneNumber: '',
        startWorkingTogether: null
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        const startWorkingTogetherQuery = decodeURIComponent((querySearch.startWorkingTogether as string) || '');
        const startWorkingTogether = moment(startWorkingTogetherQuery, "YYYY-MM-DD", true);

        const endWorkingTogetherQuery = decodeURIComponent((querySearch.endWorkingTogether as string) || '');
        const endWorkingTogether = moment(endWorkingTogetherQuery, "YYYY-MM-DD", true);

        setFormField({
            startWorkingTogether: startWorkingTogether.isValid() ? startWorkingTogether.toDate() : null,
            endWorkingTogether: endWorkingTogether.isValid() ? endWorkingTogether.toDate() : null,
            companyName: decodeURIComponent((querySearch.companyName as string) || ""),
            email: decodeURIComponent((querySearch.email as string) || ""),
            name: decodeURIComponent((querySearch.name as string) || ""),
            phoneNumber: decodeURIComponent((querySearch.phoneNumber as string) || "")
        });
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filter = formField;

        const startWorkingTogether = filter.startWorkingTogether && moment(filter.startWorkingTogether).isValid() ? (
            moment(filter.startWorkingTogether).format("YYYY-MM-DD")
        ) : ''

        const endWorkingTogether = filter.endWorkingTogether && moment(filter.endWorkingTogether).isValid() ? (
            moment(filter.endWorkingTogether).format("YYYY-MM-DD")
        ) : ''

        const newFilter = {
            ...filter,
            startWorkingTogether: startWorkingTogether,
            endWorkingTogether: endWorkingTogether
        }

        createFormSearch(props.location.pathname, {
            ...newFilter
        } as OptionObjectString);
    }

    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: value
            }
        });
    }

    const handleOnDateChange = (date: Date | null, id: string) => {
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: date
            }
        });
    }

    const clearFilter = () => {
        createFormSearch(props.location.pathname);
    }

    const modalOnChange = (visible: boolean) => {
        setModalVisible(visible)
    }

    return (
        <React.Fragment>
            <Form onSubmit={handleOnSubmit}>
                <Row>
                    <Col xs="auto">
                        <Button type="button" color="primary" size="sm" onClick={() => modalOnChange( ! modalVisible)}>
                            <i className="fa fa-filter" />
                        </Button>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Input 
                                className=""
                                id="input-companyName"
                                placeholder="Nama"
                                type="text"
                                name="companyName"
                                maxLength={255}
                                value={formField.companyName}
                                onChange={handleOnChange}
                                bsSize="sm"
                            />
                            <InputGroupAddon addonType="append">
                                <Button type="submit" color="primary" size="sm">
                                    <i className="fa fa-search" /> Cari
                                </Button>
                                { filtered ? (
                                    <Button
                                        type="button"
                                        color="danger"
                                        size="sm"
                                        onClick={clearFilter}
                                        >
                                        <i className="fa fa-times" /> Reset
                                    </Button> ) : null
                                }
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
            <Modal
                className="modal-dialog-centered"
                isOpen={modalVisible}
                toggle={() => modalOnChange( ! modalVisible)}
            >
                <Form onSubmit={handleOnSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        Filter
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => modalOnChange(false)}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-companyName"
                            >
                                Nama Perusahaan
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-companyName"
                            placeholder="Nama Perusahaan"
                            type="text"
                            name="companyName"
                            maxLength={255}
                            value={formField.companyName}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-email"
                            >
                                Email
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email"
                            type="text"
                            name="email"
                            maxLength={255}
                            value={formField.email}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-name"
                            >
                                Penanggung Jawab
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Penanggung Jawab"
                            type="text"
                            name="name"
                            maxLength={255}
                            value={formField.name}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-phoneNumber"
                            >
                                Nomor Telepon
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-phoneNumber"
                            placeholder="Nomor Telepon"
                            type="text"
                            name="phoneNumber"
                            maxLength={255}
                            value={formField.phoneNumber}
                            onChange={handleOnChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-startWorkingTogether"
                            >
                                Waktu Mulai
                            </label>
                            <div>
                                <DatePicker
                                    selected={formField.startWorkingTogether}
                                    onChange={(date) => handleOnDateChange(date, 'startWorkingTogether')}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control form-control-alternative"
                                    />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-endWorkingTogether"
                            >
                                Waktu Berakhir
                            </label>
                            <div>
                                <DatePicker
                                    selected={formField.endWorkingTogether}
                                    onChange={(date) => handleOnDateChange(date, 'endWorkingTogether')}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control form-control-alternative"
                                    />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => modalOnChange(false)}
                        >
                            Tutup
                        </Button>
                        <Button color="primary">
                            Filter
                        </Button>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default withRouter(Filter);
