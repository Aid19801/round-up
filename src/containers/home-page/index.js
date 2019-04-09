import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actions from './constants';
import { Title, Transactions, SavingsGoal } from '../../components';

import './styles.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount = () => {
    this.props.pageLoading();
  }

  componentDidMount = () => {
    this.props.pageLoaded();
  }

  
  render() {
    const { isLoading } = this.props;
    if (isLoading) {

    }


    return (
      <div className="home-page-container">
        <Title text="Round Up" />

        <div className="container">
          <div className="row">
            { isLoading && <h4>Loading...</h4> }
            { !isLoading && (
              <>
              <Transactions /> <SavingsGoal /> 
              </>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.savings.isLoading,
})

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.HOME_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.HOME_PAGE_LOADED }),
});


Home.propTypes = {
  pageLoading: PropTypes.func.isRequired,
  pageLoaded: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
