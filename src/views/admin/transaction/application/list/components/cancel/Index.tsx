import * as React from 'react'
import { Button } from 'reactstrap'
import ModalCancel from './ModalCancel'

type OwnProps = {
    numberTransaction: string,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
}

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <React.Fragment>
            <Button
                color="danger"
                size="sm"
                onClick={() => setModalVisible( ! modalVisible)}
            >
                 <i className="fa fa-times"></i> Batalkan
            </Button>

            <ModalCancel 
                numberTransaction={props.numberTransaction} 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
                fetch={props.fetch}
                setLoader={props.setLoader} />
        </React.Fragment>
    )
}

export default Index