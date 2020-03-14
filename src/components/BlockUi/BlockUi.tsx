import React, { Component } from 'react'
import ReactBlockUi, { BlockUiProps } from 'react-block-ui';
import 'react-block-ui/style.css';

type Props = BlockUiProps

class BlockUi extends Component<Props> {
    render() {
        let tag: any = "div"

        if (this.props.tag) {
            tag = this.props.tag
        }

        return (
            <ReactBlockUi {...this.props} 
                          tag={tag} >
                {this.props.children}
            </ReactBlockUi>
        )
    }
}

export default BlockUi