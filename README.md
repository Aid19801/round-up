# Round Up App


# Setup

`git clone`

`cd round-up`

`yarn`

`yarn start`

# User Flow...

Click on a (red) row to round-up the figure and add the loose-change to your savings goal.

You cannot roundup/add entries from in-bound entries on the transaction history.

Click the `Transfer =>` button when you have added all of the entries you wish to.

Transfered figure will appear in Savings Goal section on the right.

You can add your SavingsGoal at this point, eg 2 for £2 or 1872 for £1,872.

When you click submit, it will generate a pie-chart. Hovering over the sections will show the split / percentage and how much you have saved versus your target.


# App Flow (top down):

Index.js (Redux )
🔽
App.js contains the Header and Homepage.
🔽
Homepage is where the app-proper begins.
🔽

The App is split into Containers and Components

containers/home-page

contains two components / panes:

  - Transactions
  - Savings Goal

Now, the App State is managed by Redux.

And API/Data is managed by Redux Saga and distributed around the application.

The async / API nature of an app that wants *current* transactions activity *and* your savings/balance/goal - and the fact that those two will need to be reconciled with one another (Eg. "How much is my balance, how much will it be when i add 
£4.49 that I've saved this week to it?") - meant moving towards bringing the api logic up to Container level.

This means in the `home-page/saga.js` file we are making two calls and placing the results into the store, from there. [ Arguably API calls for each component/pane should be in their own respective folders, but in this instance it makes sense to keep both Homepage api calls in the homepage saga.]

This creates a small issue in the sense of: "What if one API fails but the other succeeds?"

I've made the call that given *both* are necessary to use this application, I'll use the integrity of the 2nd API (savings is called *after* transactions).

And if that is no longer `isLoading: true` then we render the app and start using the data from the store.

Transactions:

CWM fires off two functions:

The first just updates the state that the component has rendered.
The second takes the transactions *out* of the store and pops them in local state:

```
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
```

Given the saga is asynchronous, huge likelihood we would render the props before the `fetch()` has completed, so we manage this via `componentWillReceiveProps()`, which again just stores/updates the api results into local state.

```
  componentWillReceiveProps = nextProps => {
    const { transactions } = nextProps;
    if (transactions && transactions._embedded &&
      transactions._embedded.transactions !== this.state.transactions) {
      return this.setState({ transactions: transactions._embedded.transactions, })
    }
  }
```

Each of those object is `.map()`'d through and rendered in a clickable table row...

```
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
```

When we click on the row it fires `addToSavings(theSelectedRow)` which performs some javascript jiggery pokery and pops it in local state:

```
addToSavings = row => {
    console.log(row)
    if (row.direction === 'OUTBOUND') {
      let changeToAdd = roundUp(row.amount);
      let newTotalUnformatted = this.state.figureToBeAddedToSavings + changeToAdd;
      let newTotalFormatted = parseFloat(newTotalUnformatted.toFixed(2));
      this.setState({ figureToBeAddedToSavings: newTotalFormatted });
      return this.removeEntryFromTransactions(row.id); 
    } else {
      return alert('You cant round-up in-bound payments')
    }
  }
```

That state figure continues to get updated with every selection, until the user clicks the transfer button. At that point, an action is dispatched:
`transferToSavings: (num) => dispatch({ type: actions.TRANSFER_TO_SAVINGS, figure: num})`
And the `<SavingsGoal />` component picks it up through `props`.

Then the user enters their saving goal, which is locked into local state via `onChange={this.storeNewGoalInState}`.

Then pushing the `<button onClick={this.submitNewSavingsGoal}>submit</button>` stores a formatted version of the Saving Goal in local state, to be rendered.

Meanwhile, `this.renderPieChart()` only renders a pie-chart if a goal has been submitted.

So by this point, we've selected our rows to round-up, we've transfered them to the savings area, we've advised a savings goal and we have a UI representation of where our savings sit against the overall saving target.

# Styling
I've used Bootstrap for a responsive grid layout.

If I had more time i'd probably have worked on better responsiveness.

Material-UI wouldve been good for a nice layout too. Was more focused (as always) on API/data though.

# Problems, Issues, Dramas...

I lost an hour this afternoon to the API going down.

I've also had some serious problems with proxying. You'll see my Redux Sagas (homepage/sagas.js) pull in the transactions and balance APIs fine. But for some reason going for a 3rd failed consistently. I tried every way i know of to get around it (CORS Chrome extensions, CRA proxy, using proxy-anywhere heroku app...). But lost a lot of time trying to get the `workerNewSavingsGoal()` saga happening.


# Integrity / Typing
- I've used PropTypes for each container / component to ensure types or type related bugs are kept to minimum
- Jest and Enzyme for unit tests. Nothing too heavy, just wanted to check the components worked/rendered and again - with more time - would look at testing results of mocked-out API, i suppose.



