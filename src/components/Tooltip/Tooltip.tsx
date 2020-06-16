import * as React from 'react'
import {
    Tooltip as TooltipReactstrap
} from 'reactstrap'

type Props = {
    baseUrl: string,
    index: number,
    code: string,
    message: string
}

const Tooltip: React.FC<Props> = (props) => {
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
  
    const toggle = () => setTooltipOpen( ! tooltipOpen);
  
    return (
      <div className="img-ico">
            <div className="img-ico-list" id={`ico-${props.index}`}>
                <img src={`${props.baseUrl}/api/icon/${props.code}.svg`} alt=""/>
            </div>
            <TooltipReactstrap placement="right" isOpen={tooltipOpen} target={`ico-${props.index}`} toggle={toggle}>
                {props.message}
            </TooltipReactstrap>
      </div>
    )
}

export default Tooltip