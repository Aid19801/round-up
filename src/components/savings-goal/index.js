import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actions from './constants';
import './styles.css';

class SavingsGoal extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount = () => {
    this.props.componentLoading();
  }

  componentDidMount = () => {
    this.props.componentLoaded();
  }

  
  render() {


    return (
      <div className="col-sm-6 savings-container">
        i am a column 6
      </div>
    )
  }
}

const mapStateToProps = state => ({
  savings: state.savings.accountBalance,
})

const mapDispatchToProps = dispatch => ({
  componentLoading: () => dispatch({ type: actions.SAVINGS_GOAL_LOADING }),
  componentLoaded: () => dispatch({ type: actions.SAVINGS_GOAL_LOADED }),
  componentFailed: () => dispatch({ type: actions.SAVINGS_GOAL_FAILED }),
});

SavingsGoal.propTypes = {
    componentLoading: PropTypes.func.isRequired,
    componentLoaded: PropTypes.func.isRequired,
    // componentFailed: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SavingsGoal);
