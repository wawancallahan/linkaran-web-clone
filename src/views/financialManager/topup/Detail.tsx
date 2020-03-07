import React, { Component } from 'react'
import withTitle from '../../../hoc/WithTitle';
import { 
    Container, 
    Alert,
    Row,
    Col
 } from 'reactstrap'
import HeaderView from '../../../components/Headers/HeaderView'

import {
    Link,
    RouteComponentProps,
    withRouter
} from 'react-router-dom';

import {
    connect
} from 'react-redux';

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import { ApiResponse } from '../../../types/api';
import { TopUpShow } from '../../../types/financialManager/topup';
import { findTopUpAction } from '../../../actions/financialManager/topup';
import DetailTransfer from './Detail/DetailTransfer'
import DetailProfile from './Detail/DetailProfile'
import DetailBank from './Detail/DetailBank'
import DetailApprove from './Detail/DetailApprove'

type DetailProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: TopUpShow | null,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string,
    alert_color: string
}

class Detail extends Component<Props, State> {

    state = {
        data: null,
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: '',
        alert_color: ''
    }

    componentDidMount() {
        this.loadTopUp()
    }

    loadTopUp = () => {
        const id = +this.props.match.params.id;
        
        this.props.findTopUpAction(id)
                .then((response: ApiResponse<TopUpShow>) => {    
                    if (response.response) {
                        const data: TopUpShow = response.response.result;

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
                .catch((response: ApiResponse<TopUpShow>) => {

                    let message = "Gagal Mendapatkan Response";

                    if (response.error) {
                        message = response.error.metaData.message;
                    }

                    this.setState({
                        loadedMessage: message
                    })
                })
    }

    reLoadTopUp = () => {
        this.setState({
            data: null,
            isLoaded: false,
            loadedMessage: '',
            alert_visible: false,
            alert_message: '',
            alert_color: ''
        }, () => {
            this.loadTopUp()
        })
    }

    setAlertMessage = (message: string, color: string) => {
        this.setState({
            alert_message: message,
            alert_color: color
        });
    }

    setAlertOpen = (open: boolean) => {
        this.setState({
            alert_visible: open
        })
    }

    render() {
        const showAlertError = (
            <Alert color="danger" isOpen={this.state.alert_visible} toggle={() => this.setAlertOpen(false)} fade={false}>
                <ul>
                    <li>{this.state.alert_message}</li>
                </ul>
            </Alert>
        )

        const data: TopUpShow | null = this.state.data

        let needApprove = true
        
        if (data) {
            const dataTopUp = data as TopUpShow
            
            if (dataTopUp.approvedBy) needApprove = false;
        }

        return (
            <>
                <HeaderView />

                <Container className="mt--7" fluid>
                {showAlertError}
                    {this.state.isLoaded && data ? 
                    (
                        <>
                            <Row>
                                <Col>
                                    <DetailTransfer data={data} />
                                    <DetailProfile data={data} />
                                </Col>
                                <Col>
                                    {needApprove ? <DetailApprove data={data} 
                                                                  reLoadTopUp={this.reLoadTopUp} 
                                                                  setAlertMessage={this.setAlertMessage}
                                                                  setAlertOpen={this.setAlertOpen} /> : ''}
                                    <DetailBank data={data} />
                                </Col>
                            </Row>
                        </>
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
    findTopUpAction: (id: number) => Promise<ApiResponse<TopUpShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findTopUpAction: (id: number) => dispatch(findTopUpAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Top Up")
                    )
                );