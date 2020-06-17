import * as React from 'react'
import { connect } from 'react-redux'
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
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { fetchPartnerAction, setFilterAction, clearFilterAction } from '../../../../../actions/admin/partner';
import { Filter as IFilter, FilterKeys, FilterOmit } from '../../../../../types/admin/partner';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { getKeyValue } from '../../../../../helpers/utils';
import { AppState } from '../../../../../store/configureStore';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter = props.filter as IFilter;

        const startWorkingTogether = filter.startWorkingTogether && moment(filter.startWorkingTogether).isValid() ? (
            moment(filter.startWorkingTogether).format("YYYY-MM-DD")
        ) : ''

        const endWorkingTogether = filter.endWorkingTogether && moment(filter.endWorkingTogether).isValid() ? (
            moment(filter.endWorkingTogether).format("YYYY-MM-DD")
        ) : ''

        let newFilter = {
            ...filter,
            startWorkingTogether: startWorkingTogether,
            endWorkingTogether: endWorkingTogether
        }

        let filterOmit = newFilter as FilterOmit;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filterOmit).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, FilterOmit>(obj as FilterKeys)(filterOmit));
        });

        props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        props.fetchPartnerAction(1);

        modalOnChange(false);
    }

    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        props.setFilterAction({
            ...props.filter,
            [id]: value
        } as IFilter);
    }

    const handleOnDateChange = (date: Date | null, id: string) => {
        props.setFilterAction({
            ...props.filter,
            [id]: date
        } as IFilter);
    }

    const clearFilter = () => {
        props.history.push(`${window.location.pathname}`);
        props.fetchPartnerAction(1);
        props.clearFilterPartnerAction();
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
                                value={props.filter.companyName}
                                onChange={handleOnChange}
                                bsSize="sm"
                            />
                            <InputGroupAddon addonType="append">
                                <Button type="submit" color="primary" size="sm">
                                    <i className="fa fa-search" /> Cari
                                </Button>
                                { props.filtered ? (
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
                            value={props.filter.companyName}
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
                            value={props.filter.email}
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
                            value={props.filter.name}
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
                            value={props.filter.phoneNumber}
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
                                    selected={props.filter.startWorkingTogether}
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
                                    selected={props.filter.endWorkingTogether}
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

type LinkStateToProps = {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.partner.filter,
        filtered: state.partner.filtered
    }
}

type LinkDispatchToProps = {
    fetchPartnerAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterPartnerAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchPartnerAction: (page: number) => dispatch(fetchPartnerAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterPartnerAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
