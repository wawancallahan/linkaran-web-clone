import * as React from 'react'
import { Alert as IAlert } from '../../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertApplicationHideAction } from '../../../../../../actions/admin/transaction/application';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../reducers/index';

type OwnProps = {}

type Props = OwnProps & LinkStateToProps & LinkDispatchToProps

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertApplicationHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

type LinkStateToProps = {
    alert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        alert: state.transactionApplication.alert
    }
}

type LinkDispatchToProps = {
    setAlertApplicationHideAction: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertApplicationHideAction: () => dispatch(setAlertApplicationHideAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

