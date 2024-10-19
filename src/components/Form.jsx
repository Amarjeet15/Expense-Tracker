import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMoney,
  addExpense,
  storeTransactionsBalance,
} from "../features/transactionTrackerSlice";
import Input from "./Input";
import Reset_Button from "./Reset_Button";

const Form = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const { myBalance, transactions } = useSelector(
    (state) => state.transactionTracker
  );

  const dispatch = useDispatch();

  const InputFormateHandler = (e) => {
    const rawNum = e.target.value.replace(/[^\d.-]/g, ""); // Allow decimal and negative signs
    const parsedValue = parseFloat(rawNum) || 0; // Parse as float, handle non-numeric input
    setAmount(parsedValue);
  };

  const displayFormattedNum = amount ? amount.toLocaleString() : ""; // Display formatted value

  const addExpenseHandler = (e) => {
    e.preventDefault();
    setAmount("");
    setDescription("");
    setTransactionType("");

    if (amount < 1) return alert("Please add money above 0");

    if (transactionType === "expense") {
      dispatch(addExpense({ amount, description }));
      return;
    }

    if (transactionType === "add_money") {
      dispatch(addMoney({ amount, description }));
      return;
    }
  };

  useEffect(() => {
    const getBalance =
      JSON.parse(localStorage.getItem("transactionsBalance")) || 0;
    dispatch(storeTransactionsBalance(getBalance));
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center md:mt-10 gap-4">
      <div className="border p-2 md:p-3 w-[90%] md:w-1/2 rounded-lg md:rounded-2xl transition-all duration-300 ease-in-out">
        <p className="sm:text-xl md:text-3xl transition-all duration-300 ease-in-out">
          Balance : {parseInt(myBalance).toLocaleString()}
        </p>
      </div>

      <form
        onSubmit={addExpenseHandler}
        className="card w-[90%] md:w-1/2 border rounded-lg md:rounded-3xl p-3 md:p-4 flex flex-col gap-2 md:gap-4"
      >
        {/* Amount input */}
        <Input
          type="text"
          inputMode="numeric"
          value={displayFormattedNum}
          placeholder="Amount"
          onChange={InputFormateHandler}
          // onChange={(e) => setAmount(e.target.value)}
        />
        {/* Description input */}
        <Input
          type="text"
          value={description}
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row justify-center items-center mt-1 gap-2 sm:gap-5">
          {/* Expense Radio Input */}
          <div className="form-control row-end-1 w-40">
            <label
              htmlFor="expense"
              className="label h-8 sm:h-auto cursor-pointer border px-3 md:px-4 rounded-md border-error"
            >
              <span className="label-text">Expense</span>
              <input
                id="expense"
                type="radio"
                value="expense"
                name="radio-10"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="radio checked:bg-red-500"
              />
            </label>
          </div>

          {/* Add Money Radio Input */}

          <div className="form-control w-40">
            <label
              htmlFor="add_money"
              className="label h-8 sm:h-auto cursor-pointer border px-3 md:px-4 rounded-md border-success"
            >
              <span className="label-text">Add Money </span>
              <input
                id="add_money"
                type="radio"
                value="add_money"
                name="radio-10"
                checked={transactionType === "add_money"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="radio checked:bg-green-500"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-success btn-sm sm:h-10 mt-2 transition-all duration-300 ease-in-out "
        >
          Add Transaction
        </button>
      </form>

      {/* Model Reset button form Daisy UI component */}
      {transactions.length > 0 && <Reset_Button />}
    </div>
  );
};

export default Form;
