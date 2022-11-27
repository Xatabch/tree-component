/* eslint-disable no-undef */
import {
    isNodeExpanded,
    nodeHasChildren,
    getFlattenedTreePaths,
    getNodeFromPath,
    getNodeDeepness,
    getNodeAt,
} from './selectors';

describe('selectors', () => {
    describe('isNodeExpanded', () => {
        it(`should throw error if node doesn't pass`, () => {
            expect(isNodeExpanded).toThrow(`Node doesn't pass`);
        });

        it('should return true if node expanded', () => {
            const node = {
                id: '1',
                name: 'node',
                expanded: true,
            };

            const result = isNodeExpanded(node);
            expect(result).toBeTruthy();
        });

        it('should return false if node is not expanded', () => {
            const node = {
                id: '1',
                name: 'node',
                expaneded: false,
            };

            const result = isNodeExpanded(node);
            expect(result).toBeFalsy();
        });

        it(`should return false if node doesn't has expanded property`, () => {
            const node = {
                id: '1',
                name: 'node',
            };

            const result = isNodeExpanded(node);
            expect(result).toBeFalsy();
        });
    });

    describe('nodeHasChildren', () => {
        it(`should return false if param children doesn't exists`, () => {
            const node = {
                id: '1',
                name: 'node',
            };

            const result = nodeHasChildren(node);
            expect(result).toBeFalsy();
        });

        it(`should return true if node has children`, () => {
            const node = {
                id: '1',
                name: 'node',
                children: [
                    {
                        id: '2',
                        name: 'node',
                    },
                ],
            };

            const result = nodeHasChildren(node);
            expect(result).toBeTruthy();
        });

        it(`should return false if node hasn't children`, () => {
            const node = {
                id: '1',
                name: 'node',
                children: [],
            };

            const result = nodeHasChildren(node);
            expect(result).toBeFalsy();
        });

        it(`should throw error if node doesn't pass`, () => {
            expect(nodeHasChildren).toThrow(`Node doesn't pass`);
        });
    });

    describe('getFlattenedTreePaths', () => {
        it(`should throw error if tree doesn't pass`, () => {
            expect(getFlattenedTreePaths).toThrow(`Tree doesn't pass`);
        });

        it(`should return all flattened paths if nodes expanded`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    expanded: true,
                    children: [
                        {
                            id: '3',
                            node: 'name',
                            expanded: true,
                            children: [
                                {
                                    id: '4',
                                    node: 'name',
                                },
                            ],
                        },
                    ],
                },
            ];
            const expected = [['1'], ['2'], ['2', '3'], ['2', '3', '4']];

            const result = getFlattenedTreePaths(tree);
            expect(result).toEqual(expected);
        });

        it(`should return flattened paths of expanded nodes`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    children: [
                        {
                            id: '3',
                            node: 'name',
                            children: [
                                {
                                    id: '4',
                                    node: 'name',
                                },
                            ],
                        },
                    ],
                },
            ];
            const expected = [['1'], ['2']];

            const result = getFlattenedTreePaths(tree);
            expect(result).toEqual(expected);
        });

        it(`should throw error if node doesn't has id`, () => {
            const tree = [
                {
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                },
            ];
            expect(() => {
                getFlattenedTreePaths(tree);
            }).toThrow(`Node doesn't have id`);
        });

        it(`should return empty array if tree hasn't nodes`, () => {
            const tree = [];
            const expected = [];

            const result = getFlattenedTreePaths(tree);
            expect(result).toEqual(expected);
        });
    });

    describe('getNodeFromPath', () => {
        it(`should throw error if flattenedTreeIds doesn't pass`, () => {
            expect(getNodeFromPath).toThrow(`FlattenedTreeIds doesn't pass`);
        });

        it(`should throw error if tree doesn't pass`, () => {
            expect(() => {
                getNodeFromPath([]);
            }).toThrow(`Tree doesn't pass`);
        });

        it(`should return node with current flattenedTreeIds`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    expanded: true,
                    children: [
                        {
                            id: '3',
                            node: 'name',
                            expanded: true,
                            children: [
                                {
                                    id: '4',
                                    node: 'name',
                                },
                            ],
                        },
                    ],
                },
            ];

            const expected = {
                id: '4',
                node: 'name',
            };

            const flattenedTreeIds = ['2', '3', '4'];
            const result = getNodeFromPath(flattenedTreeIds, tree);
            expect(result).toEqual(expected);
        });

        it(`should throw error if node with current id doesn't exists`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    expanded: true,
                    children: [
                        {
                            id: '3',
                            node: 'name',
                            expanded: true,
                        },
                    ],
                },
            ];

            const flattenedTreeIds = ['2', '3', '4'];

            expect(() => {
                getNodeFromPath(flattenedTreeIds, tree);
            }).toThrow(`Can't get node with current id`);
        });
    });

    describe('getNodeDeepness', () => {
        it(`should throw error if flattenedTree doesn't pass`, () => {
            expect(getNodeDeepness).toThrow(`FlattenedTreeIds doesn't pass`);
        });

        it(`should return -1 if index doesn't passed`, () => {
            const flattenedTree = [['1'], ['2'], ['2', '3'], ['2', '3', '4']];
            const result = getNodeDeepness(flattenedTree);
            const expected = -1;

            expect(result).toBe(expected);
        });

        it(`should return deepness`, () => {
            const flattenedTree = [['1'], ['2'], ['2', '3'], ['2', '3', '4']];
            const index = 3;
            const expected = 2;

            const result = getNodeDeepness(flattenedTree, index);
            expect(result).toBe(expected);
        });

        it(`should return -1 if flattnedTree is empty`, () => {
            const flattenedTree = [];
            const index = 3;
            const expected = -1;

            const result = getNodeDeepness(flattenedTree, index);
            expect(result).toBe(expected);
        });

        it(`should return -1 if element of flattnedTree is empty`, () => {
            const flattenedTree = [['1'], ['2'], ['2', '3'], []];
            const index = 3;
            const expected = -1;

            const result = getNodeDeepness(flattenedTree, index);
            expect(result).toBe(expected);
        });

        it(`should return -1 if element of flattnedTree doesn't exist`, () => {
            const flattenedTree = [['1'], ['2'], ['2', '3']];
            const index = 3;
            const expected = -1;

            const result = getNodeDeepness(flattenedTree, index);
            expect(result).toBe(expected);
        });
    });

    describe('getNodeAt', () => {
        it(`should throw error if tree doesn't pass`, () => {
            expect(getNodeAt).toThrow(`Tree doesn't pass`);
        });

        it(`should throw error if flattenedTree doesn't pass`, () => {
            expect(() => {
                getNodeAt({});
            }).toThrow(`Flattened tree doesn't pass`);
        });

        it(`should return node`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    expanded: true,
                    children: [
                        {
                            id: '3',
                            node: 'name',
                            expanded: true,
                        },
                    ],
                },
            ];
            const flattenedTree = [['1'], ['2'], ['2', '3']];
            const expected = {
                id: '3',
                node: 'name',
                expanded: true,
            };

            const result = getNodeAt(tree, flattenedTree, 2);

            expect(result).toEqual(expected);
        });

        it(`should throw error if node doesn't exists in flattenedTree`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    expanded: true,
                    children: [
                        {
                            id: '3',
                            node: 'name',
                            expanded: true,
                        },
                    ],
                },
            ];
            const flattenedTree = [['1'], ['2']];

            expect(() => {
                getNodeAt(tree, flattenedTree, 2);
            }).toThrow(`Can't get node with current id`);
        });

        it(`should throw error if node doesn't exists in tree`, () => {
            const tree = [
                {
                    id: '1',
                    node: 'name',
                },
                {
                    id: '2',
                    node: 'name',
                    expanded: true,
                },
            ];
            const flattenedTree = [['1'], ['2'], ['2', '3']];

            expect(() => {
                getNodeAt(tree, flattenedTree, 2);
            }).toThrow(`Can't get node with current id`);
        });
    });
});
