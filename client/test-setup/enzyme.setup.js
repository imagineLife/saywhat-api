import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

console.log('Enzyme Setup')

Enzyme.configure({ adapter: new Adapter() });