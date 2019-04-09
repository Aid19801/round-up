# Round Up App


# Setup

`git clone`

`cd round-up`

`yarn`

`yarn start`


# App Flow (top down):

Index.js (Redux )
App.js contains the Header and Homepage.
Homepage is where the app-proper begins.

The App is split into Containers and Components

containers/home-page

contains two panes:

  - Transactions
  - Savings Goal

App State is managed by Redux

API/Data is managed by Redux Saga and distributed around the application by Redux

The async / API nature of an app that wants *current* transactions activity *and* your savings/balance/goal
And that those two will need to be reconciled with one another (Eg. "How much is my balance, how much will it be when i add 
£4.49 that I've saved this week to it?") - meant moving towards bringing the api logic up to Container level.

This means in the `home-page/saga.js` file we are making two calls and placing the results into the store.

This creates a small issue in the sense of: "What if one API fails but the other succeeds?"

I've made the call that given *both* are necessary to use this application, I'll use the integrity of the 2nd API (savings is called *after* transactions)
And if that is no longer `isLoading: true` then we render the app and start using the data from the store.




# Styling
I've used Bootstrap for a responsive grid layout.

# Integrity / Typing
- I've used PropTypes for each container / component to ensure types or type related bugs are kept to minimum
- Unit Tests are...xxxxxxxxx
