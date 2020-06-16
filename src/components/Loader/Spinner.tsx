import * as React from 'react'

import Loader from 'react-loader-spinner'

type Types =
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified';

export type LoaderProps = {
    type?: Types;
    color?: string;
    timeout?: number; // in milliseconds
    height?: number;
    width?: number;
    visible?: boolean | string;
}

const Spinner: React.FC<LoaderProps> = (props, {
    visible = true,
    width = 150,
    height = 150,
    timeout = 0,
    color = "#00BFFF",
    type = "Puff"
}) => {
    return (
        <div className={visible ? 'd-block' : 'd-none'}>
            <div className="mt-3 mb-3 d-flex justify-content-center">
                <Loader type={type}
                        color={color}
                        height={height}
                        width={width}
                        visible={visible}
                        timeout={timeout}
                    />
            </div>
        </div>
    )
}

export default Spinner