import { Node, NodeId, FlattenedTree, Tree } from './interfaces';

export const isNodeExpanded = (node: Node) => node.expanded;
export const nodeHasChildren = (node: Node) =>
    node.children && node.children.length > 0;

export const getFlattenedTreePaths = (
    tree: Tree,
    parents: NodeId[] = []
): FlattenedTree => {
    const paths: FlattenedTree = [];

    for (const node of tree) {
        const { id } = node;

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

    for (let i = 0; i < flattenedTreeIds.length; i++) {
        const id = flattenedTreeIds[i];

        const nextNode = nextLevel.find((node: Node) => node.id === id);

        if (!nextNode) {
            throw "Can't get node with current id";
        }

        if (i === flattenedTreeIds.length - 1 && nextNode.id === id) {
            node = nextNode;
        } else {
            nextLevel = nextNode.children || [];
        }
    }

    if (!node) {
        throw "Can't get node with current id";
    }

    return node;
};

export const getNodeDeepness = (
    flattenedTree: FlattenedTree,
    index: number
) => {
    const rowPath = flattenedTree[index];

    return rowPath.length - 1;
};

export const getNodeAt = (
    tree: Tree,
    flattenedTree: FlattenedTree,
    index: number
) => {
    const rowPath = flattenedTree[index];

    return getNodeFromPath(rowPath, tree);
};
