import { useState } from 'react';
import { Node, Tree } from '../interfaces';
import _ from 'lodash';

export function useTree(nodes: Tree) {
    const [tree, setTree] = useState(nodes);

    const changeNode = (updateNode: Node, node: Node) => {
        if (node.id === updateNode.id) {
            node.expanded = updateNode.expanded;
        }
    };

    function updateTreeNode(tree: Tree, updatedNode: Node) {
        let curRef;
        const memory = [...tree];

        while ((curRef = memory.pop())) {
            while (true) {
                changeNode(updatedNode, curRef);

                if (!(curRef.children && curRef.children.length)) break;

                for (let i = 0; i < curRef.children.length - 1; i++) {
                    memory.push(curRef.children[i]);
                }

                curRef = curRef.children[curRef.children.length - 1];
            }
        }
    }

    const updateTree = (tree: Tree, updatedNode: Node) => {
        updateTreeNode(tree, updatedNode);
        setTree(_.cloneDeep(tree));
    };

    return [tree, updateTree] as const;
}
