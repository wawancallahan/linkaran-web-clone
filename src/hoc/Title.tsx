import * as React from 'react';
import Helmet from 'react-helmet';

type TitleProps = {
    title?: String
}

const Title: React.FC<TitleProps> = (props) => {
    const defaultTitle = 'App';

    return (
        <Helmet>
            <title>{props.title ? props.title : defaultTitle}</title>
        </Helmet>
    );
}

export default Title;