import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  myBalance: 0,
  transactions: [],
  showAlert: false,
  alertMessage: "",
};

export const transactionTrackerSlice = createSlice({
  name: "transactionTracker",
  initialState,
  reducers: {
    addMoney: (state, action) => {
      const { amount, description } = action.payload;
      const addedAmount = Number(amount);
      const transactionHandler = {
        id: nanoid(),
        description,
        addMoney: addedAmount,
        balance: state.myBalance,
        totalAmount: state.myBalance + addedAmount,
      };

      state.myBalance += addedAmount;
      state.totalAddedAmount += addedAmount;
      state.transactions.push(transactionHandler);

      localStorage.setItem(
        "transactionsData",
        JSON.stringify(state.transactions)
      );
      localStorage.setItem(
        "transactionsBalance",
        JSON.stringify(state.myBalance)
      );
      console.log("Money added:", action.payload);
    },

    addExpense: (state, action) => {
      const { amount, description } = action.payload;
      const expenseAmount = Number(amount);

      if (expenseAmount > state.myBalance) {
        state.showAlert = true;
        alert(
          "Insufficient amount. Please add more money before making this expense."
        );

        return;
      }

      const transaction = {
        id: nanoid(),
        description,
        expense: expenseAmount,
        balance: state.myBalance,
        totalAmount: state.myBalance - expenseAmount,
      };

      state.myBalance -= expenseAmount;
      state.totalExpense += expenseAmount;
      state.transactions.push(transaction);

      localStorage.setItem(
        "transactionsData",
        JSON.stringify(state.transactions)
      );
      localStorage.setItem(
        "transactionsBalance",
        JSON.stringify(state.myBalance)
      );
      console.log("Expense added:", action.payload);
    },

    //store in localeStorage
    storeTransactionsData: (state, action) => {
      state.transactions = action.payload;
    },

    //store in localeStorage
    storeTransactionsBalance: (state, action) => {
      state.myBalance = action.payload;
    },

    hideAlert: (state) => {
      state.showAlert = false;
    },

    resetBalance: (state) => {
      state.myBalance = 0;
      state.transactions = [];
      console.log("Balance reset");
    },
  },
});

export const {
  addMoney,
  addExpense,
  addDescription,
  resetBalance,
  storeTransactionsData,
  storeTransactionsBalance,
  hideAlert,
} = transactionTrackerSlice.actions;

export default transactionTrackerSlice.reducer;
