import React, { useCallback } from 'react';
import {
    AutoSizer,
    List,
    CellMeasurerCache,
    CellMeasurer,
    ListRowRenderer,
} from 'react-virtualized';
import { useTree } from './hooks/useTree';
import { Node, Tree } from './interfaces';
import { getFlattenedTreePaths, getNodeAt, getNodeDeepness } from './selectors';
import { DefaultNodeItem } from './DefaultNodeItem/DefaultNodeItem';

export interface TreeProps {
    nodes: Tree;
    NodeRenderer?: (node: Node) => React.ReactNode;
}

export const TreeComponent: React.FC<TreeProps> = ({ nodes, NodeRenderer }) => {
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    const [tree, updateTree] = useTree(nodes);
    const flattenedTree = getFlattenedTreePaths(tree);

    const handleChange = useCallback(
        (node: Node) => {
            updateTree(tree, node);
        },
        [tree]
    );

    const getRowCount = useCallback(() => {
        return flattenedTree.length;
    }, [tree]);

    const getNode = useCallback(
        (index: number) => {
            return {
                node: getNodeAt(tree, flattenedTree, index),
                deepness: getNodeDeepness(flattenedTree, index),
            };
        },
        [tree]
    );

    const measureRowRenderer: ListRowRenderer = ({
        key,
        index,
        style,
        parent,
    }) => {
        const { node, deepness } = getNode(index);
        const updatedNode = { ...node, expanded: !node.expanded };

        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}
            >
                <div
                    style={{ ...style, marginLeft: `${deepness * 10}px` }}
                    onClick={() => handleChange(updatedNode)}
                >
                    {NodeRenderer ? (
                        NodeRenderer(node)
                    ) : (
                        <DefaultNodeItem node={node} />
                    )}
                </div>
            </CellMeasurer>
        );
    };

    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    deferredMeasurementCache={cache}
                    height={height}
                    rowCount={getRowCount()}
                    rowHeight={cache.rowHeight}
                    rowRenderer={measureRowRenderer}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};
