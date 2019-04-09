import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actions from './constants';
import './styles.css';

class Transactions extends React.Component {
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

    console.log('this props', this.props.transactions._embedded.transactions);
    return (
      <div className="col-sm-6 transactions-container">
        
        i am a column 6
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
})

const mapDispatchToProps = dispatch => ({
  componentLoading: () => dispatch({ type: actions.TRANSACTIONS_LOADING }),
  componentLoaded: () => dispatch({ type: actions.TRANSACTIONS_LOADED }),
});

Transactions.propTypes = {
    componentLoading: PropTypes.func.isRequired,
    componentLoaded: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Transactions);
