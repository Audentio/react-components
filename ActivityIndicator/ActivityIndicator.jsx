import React from 'react';
import { CircularProgress } from '../CircularProgress';
export function ActivityIndicator(props) {
    const { size = 15, ...rest } = props;
    return <CircularProgress value={30} indeterminate size={size} {...rest}/>;
}
//# sourceMappingURL=ActivityIndicator.jsx.map