import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';

import HeaderView from "../../../../components/Headers/HeaderView";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    Button,
    Table,
    Alert,
    Badge, 
    CardBody
} from 'reactstrap';
import {
    Link,
    RouteComponentProps,
    withRouter
} from 'react-router-dom';

import {
    connect
} from 'react-redux';
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import { Application, ApplicationShow } from '../../../../types/admin/transaction/application';
import queryString from 'query-string';

import { ApiResponse } from '../../../../types/api';
import { findApplicationAction } from '../../../../actions/admin/transaction/application';
import DetailComplete from './DetailComplete';

type DetailProps = RouteComponentProps<{
    type: string,
    numberTransaction: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: ApplicationShow | undefined,
    type: string,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
}

class Detail extends Component<Props, State> {

    state = {
        data: undefined,
        type: '',
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const type = this.props.match.params.type;
        const numberTransaction = this.props.match.params.numberTransaction;
        
        this.props.findApplicationAction(type, numberTransaction)
                .then((response: ApiResponse<ApplicationShow>) => {    
                    if (response.response) {
                        const data: ApplicationShow = response.response.result;

                        this.setState({
                            data: data,
                            type: data.type,
                            isLoaded: true
                        });
                    } else {
                        this.setState({
                            isLoaded: false
                        });
                    }
                })
                .catch((response: ApiResponse<ApplicationShow>) => {

                    let message = "Gagal Mendapatkan Response";

                    if (response.error) {
                        message = response.error.metaData.message;
                    }

                    this.setState({
                        loadedMessage: message
                    })
                })
    }

    render() {

        let detailTransaction: any;

        const { data, type } = this.state;

        if (data) {
            switch (type) {
                case "complete":
                    detailTransaction = <DetailComplete application={data} />
                break;
                case "inprogress":
                break;
            }
        }

        return (
            <>
                <HeaderView />

                <Container className="mt--7" fluid>
                    {detailTransaction}
                </Container>
            </>
        );
    }
}

interface LinkStateToProps {
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
       
    }
}

interface LinkDispatchToProps {
    findApplicationAction: (type: string, numberTransaction: string) => Promise<ApiResponse<ApplicationShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findApplicationAction: (type: string, numberTransaction: string) => dispatch(findApplicationAction(type, numberTransaction))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Transaksi Aplikasi")
                    )
                );