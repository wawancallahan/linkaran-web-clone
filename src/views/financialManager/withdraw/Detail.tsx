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
import { WithDrawShow } from '../../../types/financialManager/withdraw';
import { findWithDrawAction } from '../../../actions/financialManager/withdraw';
import DetailWithDraw from './Detail/DetailWithDraw'
import DetailProfile from './Detail/DetailProfile'
import DetailBank from './Detail/DetailBank'
import DetailApprove from './Detail/DetailApprove'

type DetailProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: WithDrawShow | null,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string,
    alert_color: string
}

export type loadStateInterface = {
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
        this.loadWithDraw()
    }

    loadWithDraw = (state?: loadStateInterface) => {
        const id = +this.props.match.params.id;
        
        this.props.findWithDrawAction(id)
                .then((response: ApiResponse<WithDrawShow>) => {    
                    if (response.response) {
                        const data: WithDrawShow = response.response.result;

                        const newState = state ? state : {}

                        this.setState({
                            data: data,
                            isLoaded: true,
                            ...newState
                        });
                    } else {
                        this.setState({
                            isLoaded: false
                        });
                    }
                })
                .catch((response: ApiResponse<WithDrawShow>) => {

                    let message = "Gagal Mendapatkan Response";

                    if (response.error) {
                        message = response.error.metaData.message;
                    }

                    this.setState({
                        loadedMessage: message
                    })
                })
    }

    reLoadWithDraw = (state?: loadStateInterface) => {
        this.setState({
            data: null,
            isLoaded: false,
            loadedMessage: '',
            alert_visible: false,
            alert_message: '',
            alert_color: ''
        }, () => {
            this.loadWithDraw(state)
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
            <Alert color={this.state.alert_color} isOpen={this.state.alert_visible} toggle={() => this.setAlertOpen(false)} fade={false}>
                <ul>
                    <li>{this.state.alert_message}</li>
                </ul>
            </Alert>
        )

        const data: WithDrawShow | null = this.state.data

        let needApprove = true
        
        if (data) {
            const dataWithDraw = data as WithDrawShow
            
            if (dataWithDraw.approvedBy) needApprove = false;
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
                                    <DetailWithDraw data={data} />
                                    <DetailProfile data={data} />
                                </Col>
                                <Col>
                                    {needApprove ? <DetailApprove data={data} 
                                                                  reLoadWithDraw={this.reLoadWithDraw} 
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
    findWithDrawAction: (id: number) => Promise<ApiResponse<WithDrawShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findWithDrawAction: (id: number) => dispatch(findWithDrawAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Penarikan")
                    )
                );