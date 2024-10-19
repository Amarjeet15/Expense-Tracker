import { useDispatch, useStore } from "react-redux";
import { resetBalance } from "../features/transactionTrackerSlice";
const Reset_Button = () => {
  const store = useStore(); //  this is create a instance of store
  const dispatch = useDispatch();

  const localeStorageTransactionKey = "transactionsData";
  const localeStorageBalanceKey = "transactionsBalance";

  const ResetHandler = () => {
    dispatch(resetBalance());

    localStorage.removeItem(localeStorageTransactionKey);
    localStorage.removeItem(localeStorageBalanceKey);

    // this dispatch the delete the data from localeStorage
    store.dispatch({ type: "DELETE_ITEM" });
  };

  return (
    <div className=" w-11/12 flex justify-end">
      <button
        className="btn btn-sm h-8 sm:h-10 btn-outline btn-error px-5 sm:px-7 transition-all duration-300 ease-in-out "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Reset
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col items-center  shadow-md  shadow-neutral-950">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4 text-sm sm:text-lg font-light transition-all duration-300 ease-in-out ">
            Are you certain you want to delete All Data?
          </p>
          <button
            className="btn btn-sm h-6 sm:h-10 btn-outline btn-error w-1/2 transition-all ease-in-out "
            onClick={ResetHandler}
          >
            Yes!
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Reset_Button;
