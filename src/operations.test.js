/* eslint-disable no-undef */
import { changeNode, updateTreeNode } from './operations';

describe('operations', () => {
    describe('changeNode', () => {
        it(`should throw error if updateNode doesn't pass`, () => {
            expect(changeNode).toThrow(`UpdateNode doesn't pass`);
        });

        it(`should throw error if node doesn't pass`, () => {
            expect(() => {
                changeNode({});
            }).toThrow(`Node doesn't pass`);
        });

        it(`should change node if ids match`, () => {
            const updatedNode = {
                id: '1',
                name: 'node',
                expanded: false,
            };

            const node = {
                id: '1',
                name: 'node',
                expanded: true,
            };

            const expected = {
                id: '1',
                name: 'node',
                expanded: false,
            };

            const isUpdated = changeNode(node, updatedNode);

            expect(node).toEqual(expected);
            expect(isUpdated).toBeTruthy();
        });

        it(`should't change node if ids doesn't match`, () => {
            const updatedNode = {
                id: '1',
                name: 'node',
                expanded: false,
            };

            const node = {
                id: '2',
                name: 'node',
                expanded: true,
            };

            const expected = {
                id: '2',
                name: 'node',
                expanded: true,
            };

            const isUpdated = changeNode(node, updatedNode);

            expect(node).toEqual(expected);
            expect(isUpdated).toBeFalsy();
        });
    });

    describe('updateTreeNode', () => {
        it(`should throw error if updateNode doesn't pass`, () => {
            expect(updateTreeNode).toThrow(`Tree doesn't pass`);
        });

        it(`should throw error if node doesn't pass`, () => {
            expect(() => {
                updateTreeNode({});
            }).toThrow(`UpdatedNode doesn't pass`);
        });

        it(`should update tree if has changes`, () => {
            const tree = [
                {
                    id: '1',
                    name: 'node',
                    expanded: false,
                },
                {
                    id: '2',
                    name: 'node',
                    expanded: false,
                    children: [
                        {
                            id: '3',
                            name: 'node',
                            children: [
                                {
                                    id: '4',
                                    name: 'node',
                                    expanded: true,
                                },
                            ],
                        },
                    ],
                },
            ];

            const updatedNode = {
                id: '2',
                name: 'node',
                expanded: true,
                children: [
                    {
                        id: '3',
                        name: 'node',
                        children: [
                            {
                                id: '4',
                                name: 'node',
                                expanded: true,
                            },
                        ],
                    },
                ],
            };

            const expected = [
                {
                    id: '1',
                    name: 'node',
                    expanded: false,
                },
                {
                    id: '2',
                    name: 'node',
                    expanded: true,
                    children: [
                        {
                            id: '3',
                            name: 'node',
                            children: [
                                {
                                    id: '4',
                                    name: 'node',
                                    expanded: true,
                                },
                            ],
                        },
                    ],
                },
            ];

            updateTreeNode(tree, updatedNode);
            expect(tree).toEqual(expected);
        });

        it(`should not update tree if has no changes`, () => {
            const tree = [
                {
                    id: '1',
                    name: 'node',
                    expanded: false,
                },
                {
                    id: '2',
                    name: 'node',
                    expanded: false,
                    children: [
                        {
                            id: '3',
                            name: 'node',
                            children: [
                                {
                                    id: '4',
                                    name: 'node',
                                    expanded: true,
                                },
                            ],
                        },
                    ],
                },
            ];

            const updatedNode = {
                id: '2',
                name: 'node',
                expanded: false,
                children: [
                    {
                        id: '3',
                        name: 'node',
                        children: [
                            {
                                id: '4',
                                name: 'node',
                                expanded: true,
                            },
                        ],
                    },
                ],
            };

            const expected = [
                {
                    id: '1',
                    name: 'node',
                    expanded: false,
                },
                {
                    id: '2',
                    name: 'node',
                    expanded: false,
                    children: [
                        {
                            id: '3',
                            name: 'node',
                            children: [
                                {
                                    id: '4',
                                    name: 'node',
                                    expanded: true,
                                },
                            ],
                        },
                    ],
                },
            ];

            updateTreeNode(tree, updatedNode);
            expect(tree).toEqual(expected);
        });

        it(`should not update tree if incorrect node(id)`, () => {
            const tree = [
                {
                    id: '1',
                    name: 'node',
                    expanded: false,
                },
                {
                    id: '2',
                    name: 'node',
                    expanded: false,
                    children: [
                        {
                            id: '3',
                            name: 'node',
                            children: [
                                {
                                    id: '4',
                                    name: 'node',
                                    expanded: true,
                                },
                            ],
                        },
                    ],
                },
            ];

            const updatedNode = {
                id: '10',
                name: 'node',
                expanded: false,
                children: [
                    {
                        id: '3',
                        name: 'node',
                        children: [
                            {
                                id: '4',
                                name: 'node',
                                expanded: true,
                            },
                        ],
                    },
                ],
            };

            const expected = [
                {
                    id: '1',
                    name: 'node',
                    expanded: false,
                },
                {
                    id: '2',
                    name: 'node',
                    expanded: false,
                    children: [
                        {
                            id: '3',
                            name: 'node',
                            children: [
                                {
                                    id: '4',
                                    name: 'node',
                                    expanded: true,
                                },
                            ],
                        },
                    ],
                },
            ];

            updateTreeNode(tree, updatedNode);
            expect(tree).toEqual(expected);
        });
    });
});
