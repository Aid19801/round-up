import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'recompose';
import * as actions from './constants';
import { roundUp } from '../../lib/utils';
import './styles.css';

class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      figureToBeAddedToSavings: 0,
    }
  }

  componentWillMount = () => {
    this.props.componentLoading();
    this.transactionsToLocalState();
  }

  componentDidMount = () => {
    this.props.componentLoaded();
  }

  transactionsToLocalState = () => {
    const { transactions } = this.props;
    if (transactions && transactions._embedded) {
      return this.setState({
        transactions: transactions._embedded.transactions,
      })
    } else {
      return;
    }
  }

  componentWillReceiveProps = nextProps => {
    const { transactions } = nextProps;
    if (transactions && transactions._embedded &&
      transactions._embedded.transactions !== this.state.transactions) {
      return this.setState({ transactions: transactions._embedded.transactions, })
    }
  }

  addToSavings = row => {
    let changeToAdd = roundUp(row.amount);
    let newTotalUnformatted = this.state.figureToBeAddedToSavings + changeToAdd;
    let newTotalFormatted = parseFloat(newTotalUnformatted.toFixed(2));
    this.setState({ figureToBeAddedToSavings: newTotalFormatted });
    this.removeEntryFromTransactions(row.id); 
  }

  removeEntryFromTransactions = id => {
    const { transactions } = this.state;
    let arr = transactions.filter(each => each.id !== id);
    this.setState({ transactions: arr });
  }

  transferToSavings = () => {
    this.props.transferToSavings(this.state.figureToBeAddedToSavings);
  }
  
  render() {
    const { isLoading, error } = this.props;

    if (isLoading) {
      return <h4>🕐 loading...</h4>
    }
    
    if (error) {
      return <h4>🚨 an error has occurred...</h4>
    }

    return (
      <div className="col-sm-6 transactions-container">

      <h4>Add To Savings: £{this.state.figureToBeAddedToSavings}</h4>
      <button onClick={this.transferToSavings}>transfer => </button>

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
              { this.state.transactions.map((each, i) => {
                  return (
                    <React.Fragment key={i}>
                      <tr className={each.direction === 'OUTBOUND' ? 'bg-red' : 'bg-green'} key={i} onClick={() => this.addToSavings(each)}>
                        <th scope="row">{each.amount}</th>
                        <td>{each.balance}</td>
                        <td>{each.source}</td>
                        <td>{each.direction}</td>
                        <td>{moment(each.created).format('DD/MM/YYYY HH:MM')}</td>
                      </tr>
                    </React.Fragment>
                  )
                })
              }
            </tbody>
          </table>
        
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  isLoading: state.savings.isLoading,
  error: state.savings.error,
})

const mapDispatchToProps = dispatch => ({
  componentLoading: () => dispatch({ type: actions.TRANSACTIONS_LOADING }),
  componentLoaded: () => dispatch({ type: actions.TRANSACTIONS_LOADED }),
  transferToSavings: (num) => dispatch({ type: actions.TRANSFER_TO_SAVINGS, figure: num})
});

Transactions.propTypes = {
    componentLoading: PropTypes.func.isRequired,
    componentLoaded: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Transactions);
