import React from 'react';
import cn from 'classnames';
import { Node } from '../interfaces';
import * as styles from './style.module.css';

export interface NodeProps {
    node: Node;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const DefaultNodeItem: React.FC<NodeProps> = ({
    node,
    className,
    onClick,
}) => {
    const hasChildren =
        Array.isArray(node.children) && node.children.length > 0;

    return (
        <div className={cn([styles.item, className])} onClick={onClick}>
            {hasChildren && (
                <svg
                    className={cn({
                        [styles.itemIcon]: true,
                        [styles.itemIconExpand]: node.expanded,
                    })}
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1L7.5 7.5L14 1"
                        stroke="black"
                        strokeWidth="2"
                    />
                </svg>
            )}

            <span className={cn({ [styles.itemLabelNoIcon]: !hasChildren })}>
                {node.name}
            </span>
        </div>
    );
};
