import React from 'react';

import './styles.scss';

const Tooltip = ({text, children, ...otherProps}) => {
    const { side } = otherProps;
    return (
        <span
            data-text={text}
            className={`tooltip ${side || 'top'}`}
        >
            {children}
        </span>
    )
}

export default Tooltip;