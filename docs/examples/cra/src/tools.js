import { nanoid } from 'nanoid';

export const constructTree = (maxDeepness, maxNumberOfChildren, minNumOfNodes, deepness = 1) => {
  return new Array(minNumOfNodes).fill(deepness).map(() => {
    const id = nanoid();
    const numberOfChildren = deepness === maxDeepness ? 0 : Math.round(Math.random() * maxNumberOfChildren);

    return {
      id,
      name: `Leaf ${id}`,
      children: numberOfChildren ? constructTree(maxDeepness, maxNumberOfChildren, numberOfChildren, deepness + 1) : [],
      expanded: true,
    };
  });
};