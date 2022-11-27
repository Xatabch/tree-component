import { Node, Tree } from './interfaces';

export const changeNode = (node: Node, updateNode: Node) => {
    if (!updateNode) {
        throw new Error(`UpdateNode doesn't pass`);
    }

    if (!node) {
        throw new Error(`Node doesn't pass`);
    }

    if (node.id === updateNode.id) {
        node.expanded = updateNode.expanded;

        return true;
    }
};

export const updateTreeNode = (tree: Tree, updatedNode: Node) => {
    if (!tree) {
        throw new Error(`Tree doesn't pass`);
    }

    if (!updatedNode) {
        throw new Error(`UpdatedNode doesn't pass`);
    }

    let curRef;
    const memory = [...tree];

    while ((curRef = memory.pop())) {
        while (true) {
            const isNodeUpdated = changeNode(curRef, updatedNode);

            if (isNodeUpdated) {
                return;
            }

            if (!curRef?.children?.length) break;

            for (let i = 0; i < curRef.children.length - 1; i++) {
                memory.push(curRef.children[i]);
            }

            curRef = curRef.children[curRef.children.length - 1];
        }
    }
};
