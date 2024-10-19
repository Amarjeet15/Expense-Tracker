import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeTransactionsData,
  hideAlert,
} from "../features/transactionTrackerSlice";

const DataTable = () => {
  const [localeData, setLocaleData] = useState([]);

  const { transactions, showAlert, alertMessage } = useSelector(
    (state) => state.transactionTracker
  );

  const dispatch = useDispatch();

  let totalAddedAmount = 0;
  let totalExpense = 0;

  localeData.forEach((item) => {
    // if  value is undefined or null
    // if it is then return '0' zero  second operand
    totalAddedAmount += item.addMoney || 0;
    totalExpense += item.expense || 0;
  });

  // console.log("lll", localeData);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("transactionsData")) || [];

    setLocaleData(storedData);
    dispatch(storeTransactionsData(storedData));
  }, [dispatch, localeData, totalAddedAmount, totalExpense]);

  return (
    <div className="w-11/12">
      {/* Alert popup */}

      <div className="overflow-x-auto ">
        <table className="table table-xs sm:table-sm md:table-md">
          {/* head */}
          <thead className="">
            <tr className="text-sm md:text-base *:font-normal text-neutral-400 border-2 border-neutral-400 transition-all duration-300 ease-in-out ">
              <th>No</th>
              <th>Description</th>
              <th>Add Amount</th>
              <th>Expense</th>
              <th>Balance</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody className="">
            {transactions.length > 0 &&
              transactions.map((transaction, idx) => (
                <tr
                  key={transaction.id}
                  className={`border-x-2  border-x-neutral-500 ${
                    idx % 2 !== 0 && "bg-neutral-900"
                  } `}
                >
                  <th>{idx + 1}</th>
                  <td>{transaction.description}</td>
                  <td>
                    {!transaction.addMoney ? null : (
                      <>{parseInt(transaction.addMoney).toLocaleString()}</>
                    )}
                  </td>
                  <td className="text-red-500">
                    {!transaction.expense ? null : (
                      <>{parseInt(transaction.expense).toLocaleString()}</>
                    )}
                  </td>
                  <td>{parseInt(transaction.balance).toLocaleString()}</td>
                  <td>{parseInt(transaction.totalAmount).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
          {transactions.length > 0 && (
            <tbody className="">
              <tr className="border-x-2 border-b-2 border-neutral-500">
                <td></td>
                <td></td>
                <td>
                  <p className="text-[.8rem] text-neutral-300">
                    Total Added amount:
                  </p>
                  <p className="text-success">
                    {parseInt(totalAddedAmount).toLocaleString()}
                  </p>{" "}
                </td>
                <td>
                  <p className="text-[.8rem] text-neutral-300 ">
                    Total expense:
                  </p>
                  <p className="text-error">
                    {parseInt(totalExpense).toLocaleString()}
                  </p>{" "}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DataTable;
