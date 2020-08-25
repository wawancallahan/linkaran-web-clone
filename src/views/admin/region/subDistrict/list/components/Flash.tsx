import * as React from 'react'
import { Alert as IAlert } from '../../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertSubDistrictHideAction } from '../../../../../../actions/admin/region/subDistrict';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../reducers';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertSubDistrictHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

const mapStateToProps = (state: AppState) => ({
    alert: state.subDistrict.alert
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertSubDistrictHideAction: () => dispatch(setAlertSubDistrictHideAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

