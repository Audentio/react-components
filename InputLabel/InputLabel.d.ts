import React from 'react';
interface InputLabelProps extends React.HTMLProps<HTMLDivElement> {
    label?: string;
    help?: any;
    onClick?: () => void;
    disabled?: boolean;
}
export declare function InputLabel(props: InputLabelProps): JSX.Element;
export {};
