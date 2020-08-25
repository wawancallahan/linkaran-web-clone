import * as React from 'react'
import { Alert as IAlert } from '../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertUserHideAction } from '../../../../../actions/admin/user';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducers/index';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertUserHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

const mapStateToProps = (state: AppState) => ({
    alert: state.user.alert
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertUserHideAction: () => dispatch(setAlertUserHideAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

