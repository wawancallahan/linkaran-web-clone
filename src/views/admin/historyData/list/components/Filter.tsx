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
import { Filter as IFilter } from '../../../../../types/admin/historyData/historyData';
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
        dateCreate: null,
        userName: ''
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        const dateCreateQuery = decodeURIComponent((querySearch.dateCreate as string) || '');
        const dateCreate = moment(dateCreateQuery, "YYYY-MM-DD", true);

        setFormField({
            dateCreate: dateCreate.isValid() ? dateCreate.toDate() : null,
            userName: decodeURIComponent((querySearch.userName as string) || "")
        });
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filter = formField;

        const dateCreate = filter.dateCreate && moment(filter.dateCreate).isValid() ? (
            moment(filter.dateCreate).format("YYYY-MM-DD")
        ) : ''

        const newFilter = {
            ...filter,
            dateCreate: dateCreate
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
                                id="input-userName"
                                placeholder="Nama"
                                type="text"
                                name="userName"
                                maxLength={255}
                                value={formField.userName}
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
                            htmlFor="input-userName"
                            >
                                Nama
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-userName"
                            placeholder="Nama"
                            type="text"
                            name="userName"
                            maxLength={255}
                            value={formField.userName}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-dateCreate"
                            >
                                Tanggal
                            </label>
                            <div>
                                <DatePicker
                                    selected={formField.dateCreate}
                                    onChange={(date) => handleOnDateChange(date, 'dateCreate')}
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
