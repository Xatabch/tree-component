export type NodeId = string;
export type FlattenedTree = NodeId[][];

export interface Node {
    id: NodeId;
    name: string;
    children?: Node[];
    expanded?: boolean;
}

export type Tree = Node[];
