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
        <h4>Savings Goal: £</h4>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">£/GBP</th>
                <th scope="col">Balance</th>
                <th scope="col">Source</th>
                <th scope="col">IN / OUT</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
           
            </tbody>
          </table>
        
        </div>

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
