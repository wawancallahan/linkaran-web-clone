import React, { Component } from 'react'

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

class Spinner extends Component<LoaderProps> {

    public static defaultProps = {
        type: "Puff",
        color: "#00BFFF",
        timeout: 0,
        height: 150,
        width: 150,
        visible: true,
    };

    render() {
        return (
            <div className={this.props.visible ? 'd-block' : 'd-none'}>
                <div className="mt-3 mb-3 d-flex justify-content-center">
                    <Loader type={this.props.type}
                            color={this.props.color}
                            height={this.props.height}
                            width={this.props.width}
                            visible={this.props.visible}
                            timeout={this.props.timeout}
                        />
                </div>
            </div>
        );
    }
}

export default Spinner