import React, { Component } from 'react'
import withTitle from '../../../hoc/WithTitle';
import HeaderView from "../../../components/Headers/HeaderView";
import { 
    Container,
    Row, 
    Col, 
    Card,
    CardBody,
    Alert
} from 'reactstrap'
import DetailProfile from './DetailProfile'
import DetailTransaction from './DetailTransaction'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { CustomerShow } from '../../../types/admin/customer';
import { AppState } from '../../../store/configureStore';
import { AppActions } from '../../../types';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../types/api';
import { findCustomerAction } from '../../../actions/admin/customer';
import { connect } from 'react-redux'

type DetailProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: CustomerShow | null,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
}

class Detail extends Component<Props, State> {

    state = {
        data: null,
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;
        
        this.props.findCustomerAction(id)
                .then((response: ApiResponse<CustomerShow>) => {    
                    if (response.response) {
                        const data: CustomerShow = response.response.result;

                        this.setState({
                            data: data,
                            isLoaded: true
                        });
                    } else {
                        this.setState({
                            isLoaded: false
                        });
                    }
                })
                .catch((response: ApiResponse<CustomerShow>) => {

                    let message = "Gagal Mendapatkan Response";

                    if (response.error) {
                        message = response.error.metaData.message;
                    }

                    this.setState({
                        loadedMessage: message
                    })
                })
    }

    setAlertMessage = (message: string) => {
        this.setState({
            alert_message: message
        });
    }

    setAlertOpen = (open: boolean) => {
        this.setState({
            alert_visible: open
        })
    }

    render () {

        const showAlertError = (
            <Alert color="danger" isOpen={this.state.alert_visible} toggle={() => this.setAlertOpen(false)} fade={false}>
                <ul>
                    <li>{this.state.alert_message}</li>
                </ul>
            </Alert>
        )

        return (
            <>
                <HeaderView />
                <Container className="mt--7" fluid> 
                    {showAlertError}
                    {this.state.isLoaded && this.state.data ? 
                        (
                            <Row>
                                <Col md={5}>
                                    <DetailProfile customer={this.state.data} />
                                </Col>
                                <Col md={7}>
                                    <DetailTransaction customer={this.state.data} />
                                </Col>
                            </Row>
                        ) : this.state.loadedMessage
                    } 
                </Container>
            </>
        )
    }
}

interface LinkStateToProps {
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
    }
}

interface LinkDispatchToProps {
    findCustomerAction: (id: number) => Promise<ApiResponse<CustomerShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findCustomerAction: (id: number) => dispatch(findCustomerAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Customer")
                    )
                );