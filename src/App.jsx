import DataTable from "./components/DataTable";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="flex flex-col items-center gap-5 pb-5">
      <h1 className="text:xl sm:text-2xl md:text-5xl font-medium mt-5 text-center underline  px-5 sm:px-7 md:px-10 py-2  w-max transition-all duration-300 ease-in-out">
        Expense Tracker
      </h1>
      <Form />
      <DataTable />
    </div>
  );
};

export default App;
