import * as React from 'react'
import { Alert as IAlert } from '../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertVoucherTypeHideAction } from '../../../../../actions/admin/voucherType';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../store/configureStore';

type OwnProps = {}

type Props = OwnProps & LinkStateToProps & LinkDispatchToProps

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertVoucherTypeHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

type LinkStateToProps = {
    alert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        alert: state.voucherType.alert
    }
}

type LinkDispatchToProps = {
    setAlertVoucherTypeHideAction: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertVoucherTypeHideAction: () => dispatch(setAlertVoucherTypeHideAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

