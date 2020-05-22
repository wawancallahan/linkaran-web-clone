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
import DetailKendaraan from './DetailKendaraan'
import DetailRating from './DetailRating'
import DetailKeterangan from './DetailKeterangan'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { DriverShow } from '../../../types/admin/driver';
import { AppState } from '../../../store/configureStore';
import { AppActions } from '../../../types';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../types/api';
import { findDriverAction } from '../../../actions/admin/driver';
import { connect } from 'react-redux'

type DetailProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: DriverShow | null,
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
        
        this.props.findDriverAction(id)
                .then((response: ApiResponse<DriverShow>) => {    
                    if (response.response) {
                        const data: DriverShow = response.response.result;

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
                .catch((response: ApiResponse<DriverShow>) => {

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
                                    <DetailProfile driver={this.state.data} />
                                    <DetailKendaraan driver={this.state.data} />
                                </Col>
                                <Col md={7}>
                                    <DetailTransaction driver={this.state.data} />
                                    <DetailRating driver={this.state.data} />
                                    <DetailKeterangan driver={this.state.data} />
                                </Col>
                            </Row>
                        ) : this.state.loadedMessage
                    } 
                </Container>
            </>
        )
    }
}

type LinkStateToProps = {
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
    }
}

type LinkDispatchToProps = {
    findDriverAction: (id: number) => Promise<ApiResponse<DriverShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findDriverAction: (id: number) => dispatch(findDriverAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Driver")
                    )
                );