import * as React from 'react'
import { Alert } from 'reactstrap';
import { setAlertHistoryDataHideAction } from '../../../../../actions/admin/historyData';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducers';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertHistoryDataHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

const mapStateToProps = (state: AppState) => ({
    alert: state.historyData.alert
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertHistoryDataHideAction: () => dispatch(setAlertHistoryDataHideAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

