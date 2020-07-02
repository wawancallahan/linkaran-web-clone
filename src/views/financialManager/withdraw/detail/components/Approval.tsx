import * as React from 'react'
import { 
    Card, 
    CardHeader, 
    CardBody
} from 'reactstrap'
import { WithDrawShow } from '../../../../../types/financialManager/withdraw'
import Decline from './decline/Index'
import Approve from './approve/Index'

type OwnProps = {
    data: WithDrawShow | null,
    setNeedReload: React.Dispatch<React.SetStateAction<boolean>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps

const Approval: React.FC<Props> = (props) => {

    const { data } = props

    if (data) {
        if ( ! (
            (data.decline && data.decline !== null) || 
            (data.approvedAt !== null && data.approvedBy && data.approvedBy !== null))
         ) {
            return (
                <Card className="mb-2">
                    <CardHeader>
                        <h3 className="mb-0">Persetujuan</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-2">
                            <Approve data={props.data} setLoaded={props.setLoaded} setNeedReload={props.setNeedReload} />   
                        </div>
                        <div>
                            <Decline data={props.data} setLoaded={props.setLoaded} setNeedReload={props.setNeedReload} />
                        </div>  
                    </CardBody>
                </Card>
            )
        }
    }

    return null;
}

export default Approval;