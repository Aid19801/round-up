import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actions from './constants';
import styles from './styles.css';

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


    return (
      <div className="home-page-container">

        <div className="home-page-title">
          <h1>Round Up</h1>
        </div>

        <div className="body-section">
        
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
//   email: state.signinPage.email,
})

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.HOME_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.HOME_PAGE_LOADED }),
});



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
