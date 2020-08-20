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
import { Filter as IFilter } from '../../../../../types/admin/restaurant';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { createFormSearch, OptionObjectString } from '../../../../../helpers/utils';
import queryString from "query-string";

type OwnProps = RouteComponentProps

type Props = OwnProps

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [filtered, setFiltered] = React.useState(false);
    const [formField, setFormField] = React.useState<IFilter>({
        districtName: '',
        name: '',
        provinceName: ''
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        setFormField({
            districtName: decodeURIComponent((querySearch.districtName as string) || ""),
            name: decodeURIComponent((querySearch.name as string) || ""),
            provinceName: decodeURIComponent((querySearch.provinceName as string) || ""),
        });
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filter = formField;

        createFormSearch(props.location.pathname, {
            ...filter
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
                                id="input-name"
                                placeholder="Nama"
                                type="text"
                                name="name"
                                maxLength={255}
                                value={formField.name}
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
                            htmlFor="input-name"
                            >
                                Nama
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Nama"
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
                            htmlFor="input-provinceName"
                            >
                                Nama Provinsi
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-provinceName"
                            placeholder="Nama Provinsi"
                            type="text"
                            name="provinceName"
                            maxLength={255}
                            value={formField.provinceName}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-districtName"
                            >
                                Nama Kota/Kabupaten
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-districtName"
                            placeholder="Nama"
                            type="text"
                            name="districtName"
                            maxLength={255}
                            value={formField.districtName}
                            onChange={handleOnChange}
                            />
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
