import React from 'react';
interface ParagraphProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    color?: 'content' | 'secondary' | 'faint';
    noMargin?: boolean;
}
export declare function Paragraph(props: ParagraphProps): JSX.Element;
export {};
