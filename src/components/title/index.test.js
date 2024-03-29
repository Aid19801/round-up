import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Title from '../../components/title';

configure({ adapter: new Adapter() })

describe('Title', () => {
  
  it('should render the Title without exploding...', () => {
      const wrapper = shallow(<Title text="mock-text" />);
      expect(wrapper).toBeTruthy();
      expect(wrapper.text()).toEqual("mock-text");
  });
  
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Title text="mock-text" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
});