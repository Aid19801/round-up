import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actions from './constants';
import { formatNumber } from '../../lib/utils';
import PieChart from 'react-minimal-pie-chart';
import './styles.css';

class SavingsGoal extends React.Component {
  constructor() {
    super();
    this.state = {
      storingNewSavingsGoal: 0,
      submittedNewSavingsGoal: 0,
    }
  }

  componentWillMount = () => {
    this.props.componentLoading();
  }

  componentDidMount = () => {
    this.props.componentLoaded();
  }

  storeNewGoalInState = event => {
    this.setState({
      storingNewSavingsGoal: event.target.value,
    })
  }

  submitNewSavingsGoal = () => {   
    this.setState({
      submittedNewSavingsGoal: formatNumber(this.state.storingNewSavingsGoal)
    });
  }
  
  renderPieChart = () => {
    const { submittedNewSavingsGoal } = this.state;
    const { newSavings } = this.props;
    let leftToGo = submittedNewSavingsGoal - newSavings;
    let savedSoFar = newSavings;
    if (submittedNewSavingsGoal) {
      return (
        <PieChart
          data={[
            { title: 'Left To Go', value: leftToGo, color: 'rgba(189, 195, 199, 1)' },
            { title: 'Your Savings', value: savedSoFar, color: 'rgba(46, 49, 49, 1)' },
          ]}
        />
      );
    }
  }
  render() {

    const { isLoading, error, accountBalance, newSavings } = this.props;
    const { submittedNewSavingsGoal } = this.state;

    console.log('accountBalance is ', accountBalance);

    if (isLoading) {
      return <h4 className="loading">loading...</h4>
    }
    
    if (error) {
      return <h4>an error has occurred...</h4>
    }

    return (
      <div className="col-sm-6 savings-container">
        <h4>Savings Goal: £{submittedNewSavingsGoal}</h4>
        <h4>current savings: £{newSavings}</h4>

        { !submittedNewSavingsGoal && 
        <>
        <input
          placeholder="enter your savings goal here..."
          type="text"
          className="goal-input"
          name="savingsGoal"
          onChange={this.storeNewGoalInState}
          />

        <button onClick={this.submitNewSavingsGoal}>submit</button>
        </>
        }

        {this.renderPieChart()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountBalance: state.savings.accountBalance,
  isLoading: state.savings.isLoading,
  savingsGoal: state.savings.savingsGoal,
  newSavings: state.transactions.newSavings,
  error: state.savings.error,
})

const mapDispatchToProps = dispatch => ({
  componentLoading: () => dispatch({ type: actions.SAVINGS_GOAL_LOADING }),
  componentLoaded: () => dispatch({ type: actions.SAVINGS_GOAL_LOADED }),
  componentFailed: () => dispatch({ type: actions.SAVINGS_GOAL_FAILED }),
  createNewSavingsGoal: (num) => dispatch({ type: actions.CREATE_NEW_SAVINGS_GOAL, newSavingsGoal: num }),
});

SavingsGoal.propTypes = {
    componentLoading: PropTypes.func.isRequired,
    componentLoaded: PropTypes.func.isRequired,
    componentFailed: PropTypes.func.isRequired,
    createNewSavingsGoal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    savingsGoal: PropTypes.number,

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SavingsGoal);
