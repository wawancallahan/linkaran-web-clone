import * as React from 'react'
import { Alert as IAlert } from '../../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertLinkPayHideAction } from '../../../../../../actions/admin/transaction/linkPay';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../store/configureStore';

type OwnProps = {}

type Props = OwnProps & LinkStateToProps & LinkDispatchToProps

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertLinkPayHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

type LinkStateToProps = {
    alert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        alert: state.transactionLinkPay.alert
    }
}

type LinkDispatchToProps = {
    setAlertLinkPayHideAction: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertLinkPayHideAction: () => dispatch(setAlertLinkPayHideAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

