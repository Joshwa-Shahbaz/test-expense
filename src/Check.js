import { useState } from "react";

const Check = () => {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title || !amount || !date) {
      alert("Please fill in all fields");
      return;
    }

    addTransaction();
  };

  const addTransaction = () => {
    if (isNaN(parseFloat(amount))) {
      setIsAmountValid(false);
      alert("Please enter a valid amount");
      return;
    }

    setIsAmountValid(true);

    if (!title) {
      setIsTitleValid(false);
    }
    if (!date) {
      setIsDateValid(false);
    }

    if (!title || !date) {
      alert("Please fill in all fields");
      return;
    }

    const newTransaction = {
      id: Math.random(),
      title: title,
      amount: parseFloat(amount),
      date: date,
    };

    setTransactions([...transactions, newTransaction]);

    setTitle("");
    setAmount("");
    setDate("");
  };

  const deleteHandler = (id) => {
    const updatedTransactions = transactions.filter(
      (filterTransaction) => filterTransaction.id !== id
    );

    setTransactions(updatedTransactions);
  };

  const calculateIncome = () => {
    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    return income;
  };

  const calculateExpense = () => {
    const expense = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    return Math.abs(expense);
  };

  const calculateTotal = () => {
    const total = transactions.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    );

    return Math.abs(total);
  };

  return (
    <>
      <label htmlFor="total" className="heading check">
        Total Amount
      </label>
      <h1 id="total">{calculateTotal()}</h1>

      <div className="flex">
        <div className="flex1">
          <label htmlFor="income" className="heading">
            Income
          </label>
          <h1 id="income">{calculateIncome()}</h1>
        </div>
        <div className="flex2">
          <label htmlFor="expense" className="heading">
            Expense
          </label>
          <h1 id="expense">{calculateExpense()}</h1>
        </div>
      </div>

      <h1>Add New Transactions</h1>
      <form className="input-form" onSubmit={submitHandler}>
        <div className="title">
          <label className="title-label" htmlFor="title">
            Title
          </label>
          <br />
          <input
            type="text"
            id="title"
            className={`title-input ${isTitleValid ? "" : "invalid"}`}
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
              setIsTitleValid(true);
            }}
          />
        </div>

        <div className="title">
          <label className="title-amount" htmlFor="title">
            Amount
          </label>
          <br />
          <span>(negative-expense , positive-income)</span>
          <br />
          <input
            type="number"
            id="amount"
            required
            className={`title-input ${isAmountValid ? "" : "invalid"}`}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setIsAmountValid(true);
            }}
          />
        </div>

        <div className="title">
          <label className="title-label" htmlFor="title">
            Date
          </label>
          <br />
          <input
            type="date"
            id="date"
            className={`title-input ${isDateValid ? "" : "invalid"}`}
            value={date}
            required
            onChange={(e) => {
              setDate(e.target.value);
              setIsDateValid(true);
            }}
          />
          <br />
          <button className="add" onClick={addTransaction}>
            Add
          </button>
        </div>
      </form>
      <ul>
        <h1>Result</h1>
        {transactions.map((item) => (
          <div className="data" key={item.id}>
            <li className="title-break">{item.title}</li>
            <li>{item.date}</li>
            <li>Rs:{item.amount}</li>
            <button onClick={() => deleteHandler(item.id)}>delete</button>
          </div>
        ))}
      </ul>
    </>
  );
};
export default Check;
