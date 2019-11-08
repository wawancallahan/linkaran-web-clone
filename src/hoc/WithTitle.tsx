import React, { Component } from 'react';
import Title from './Title';

const withTitle = <Props extends {}>(WrappedComponent: React.ComponentType<Props>, title: String) => {
    return class extends Component {
        render() {
            return (
                <>
                    <Title title={title} />
                    <WrappedComponent {...this.props as Props} />
                </>
            );
        }
    }
}

export default withTitle;