import React, { useState } from 'react';
import {
    AutoSizer,
    List,
    CellMeasurerCache,
    CellMeasurer,
    ListRowRenderer,
} from 'react-virtualized';
import { Node, Tree } from './interfaces';
import { getFlattenedTreePaths, getNodeAt, getNodeDeepness } from './selectors';
import { DefaultNodeItem } from './DefaultNodeItem/DefaultNodeItem';
import { updateTreeNode } from './operations';
import _ from 'lodash';

export interface TreeProps {
    nodes: Tree;
    NodeRenderer?: (node: Node) => React.ReactNode;
}

export const TreeComponent: React.FC<TreeProps> = ({ nodes, NodeRenderer }) => {
    if (!(nodes && nodes.length)) {
        return null;
    }

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    const [tree, setTree] = useState(nodes);

    const flattenedTree = getFlattenedTreePaths(tree);

    const handleChange = (updatedNode: Node) => {
        updateTreeNode(tree, updatedNode);
        setTree(_.cloneDeep(tree));
    };

    const getRowCount = () => {
        return flattenedTree.length;
    };

    const getNode = (index: number) => {
        return {
            node: getNodeAt(tree, flattenedTree, index),
            deepness: getNodeDeepness(flattenedTree, index),
        };
    };

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
