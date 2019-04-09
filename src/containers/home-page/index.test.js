import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Homepage from './index';
import Title from '../../components/title';
import store from '../../store';

configure({ adapter: new Adapter() })

describe('Homepage', () => {
  
  it('should render the HomePage container without exploding...', () => {
      const wrapper = shallow(<Homepage />);
      expect(wrapper).toBeTruthy();
      expect(wrapper.contains(<Title />))
  });
  
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
            <Homepage />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
});