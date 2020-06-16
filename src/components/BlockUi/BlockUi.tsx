import * as React from 'react'
import ReactBlockUi, { BlockUiProps } from 'react-block-ui';
import 'react-block-ui/style.css';

type Props = BlockUiProps

const BlockUi: React.FC<Props> = (props) => {

    let tag: any = "div"

    if (props.tag) {
        tag = props.tag
    }

    return (
        <ReactBlockUi {...props} 
                        tag={tag} >
            {props.children}
        </ReactBlockUi>
    )
}

export default BlockUi