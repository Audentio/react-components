import React from 'react';
import { CircularProgress, CircularProgressProps } from '../CircularProgress';

export function ActivityIndicator(props: CircularProgressProps) {
    const { size = 15, ...rest } = props;

    return <CircularProgress value={30} indeterminate size={size} {...rest} />;
}
