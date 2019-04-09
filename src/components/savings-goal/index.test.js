import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import SavingsGoal from './index';
import Title from '../../components/title';
import store from '../../store';

configure({ adapter: new Adapter() })

describe('Savings Goal', () => {
  
  it('should render the Savings container without exploding...', () => {
      const wrapper = shallow(<SavingsGoal />);
      expect(wrapper).toBeTruthy();
      expect(wrapper.contains(<Title />))
  });
  
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
            <SavingsGoal />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it.skip('should render the expected children', () => {
    const el = <h4 className="loading">loading...</h4>;
    const wrapper = shallow(<SavingsGoal isLoading />);
    expect(wrapper.find(el)).toHaveLength(1);
  });

  it.skip('should render the expected children', () => {
    const el = <h4>an error has occurred...</h4>;
    const wrapper = shallow(<SavingsGoal error />);
    expect(wrapper.find(el)).toHaveLength(1);
  });

});