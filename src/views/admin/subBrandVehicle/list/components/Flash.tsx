import * as React from 'react'
import { Alert as IAlert } from '../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertSubBrandVehicleHideAction } from '../../../../../actions/admin/subBrandVehicle';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducers/index';

type OwnProps = {}

type Props = OwnProps & LinkStateToProps & LinkDispatchToProps

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertSubBrandVehicleHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

type LinkStateToProps = {
    alert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        alert: state.subBrandVehicle.alert
    }
}

type LinkDispatchToProps = {
    setAlertSubBrandVehicleHideAction: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertSubBrandVehicleHideAction: () => dispatch(setAlertSubBrandVehicleHideAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

