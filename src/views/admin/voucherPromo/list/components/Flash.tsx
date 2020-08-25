import * as React from 'react'
import { Alert } from 'reactstrap';
import { setAlertVoucherPromoHideAction } from '../../../../../actions/admin/voucherPromo';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducers';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertVoucherPromoHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

const mapStateToProps = (state: AppState) => ({
    alert: state.voucherPromo.alert
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertVoucherPromoHideAction: () => dispatch(setAlertVoucherPromoHideAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

