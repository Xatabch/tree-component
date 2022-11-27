import './App.css';
import { TreeComponent } from 'virtualized-tree-component';
import { constructTree } from './tools';

const MIN_NUMBER_OF_PARENTS = 500;
const MAX_NUMBER_OF_CHILDREN = 10;
const MAX_DEEPNESS = 4;

const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);

function App() {
  return (
	<div className='App'>
		<TreeComponent nodes={Nodes} />
	</div>
	);
}

export default App;
