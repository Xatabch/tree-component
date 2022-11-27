import { Node, NodeId, FlattenedTree, Tree } from './interfaces';

export const isNodeExpanded = (node: Node) => {
    if (!node) {
        throw new Error(`Node doesn't pass`);
    }

    return node.expanded || false;
};

export const nodeHasChildren = (node: Node) => {
    if (!node) {
        throw new Error(`Node doesn't pass`);
    }

    return (node.children && node.children.length > 0) || false;
};

export const getFlattenedTreePaths = (
    tree: Tree,
    parents: NodeId[] = []
): FlattenedTree => {
    const paths: FlattenedTree = [];

    if (!tree) {
        throw new Error(`Tree doesn't pass`);
    }

    for (const node of tree) {
        const { id } = node;

        if (!id) {
            throw new Error(`Node doesn't have id`);
        }

        if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
            paths.push([...parents, id]);
        } else {
            paths.push([...parents, id]);
            paths.push(
                ...getFlattenedTreePaths(node.children || [], [...parents, id])
            );
        }
    }

    return paths;
};

export const getNodeFromPath = (flattenedTreeIds: NodeId[], tree: Tree) => {
    let node: Node | undefined;
    let nextLevel = tree;

    if (!flattenedTreeIds) {
        throw new Error(`FlattenedTreeIds doesn't pass`);
    }

    if (!tree) {
        throw new Error(`Tree doesn't pass`);
    }

    for (let i = 0; i < flattenedTreeIds.length; i++) {
        const id = flattenedTreeIds[i];

        const nextNode = nextLevel.find((node: Node) => node.id === id);

        if (!nextNode) {
            throw new Error("Can't get node with current id");
        }

        if (i === flattenedTreeIds.length - 1 && nextNode.id === id) {
            node = nextNode;
        } else {
            nextLevel = nextNode.children || [];
        }
    }

    if (!node) {
        throw new Error("Can't get node with current id");
    }

    return node;
};

export const getNodeDeepness = (flattenedTree: FlattenedTree, index = -1) => {
    if (!flattenedTree) {
        throw new Error(`FlattenedTreeIds doesn't pass`);
    }

    const rowPath = flattenedTree[index] || [];

    return rowPath.length - 1;
};

export const getNodeAt = (
    tree: Tree,
    flattenedTree: FlattenedTree,
    index = 0
) => {
    if (!tree) {
        throw new Error(`Tree doesn't pass`);
    }

    if (!flattenedTree) {
        throw new Error(`Flattened tree doesn't pass`);
    }

    const rowPath = flattenedTree[index] || [];

    return getNodeFromPath(rowPath, tree);
};
