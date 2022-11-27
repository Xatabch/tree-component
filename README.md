# Virtualized tree component

A tiny virtualized react tree component based on [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List).

```jsx
import {TreeComponent} from "virtualized-tree-component";

<div>
    <TreeComponent nodes={nodes} />
</div>
```

## Showcases

See our [examples](/docs/examples) and Showcase paragraph for url.
- [Big tree(~100k elements)](/docs/examples/cra)

## Install

```bash
npm install virtualized-tree-component
```

# Nodes and Tree interfaces
```tsx
export interface Node {
    id: NodeId;
    name: string;
    children?: Node[];
    expanded?: boolean;
}

export type Tree = Node[];
```

## Usage

Render with default renderer
```jsx
<div>
    <TreeComponent nodes={Nodes} />
</div>
```

Add custom nodes render
```jsx
<div>
    <TreeComponent nodes={Nodes} NodeRenderer={
        (node) => <CustomRenderNode node={node} />
    }/>
</div>
```
