import React, {useContext} from 'react';
import { transactionsContext } from '../../TransactionsProvider';
import TransactionItem from './TransactionItem';
import formatDate from './helpers/formatdate';


export default function ExpenseTransactions(props) {

  const { state } = useContext(transactionsContext);


  const expenses = state.transactions.filter(obj => obj.category !== 'INCOME')

  //loop through the expenses and return an item for each one 
  const transactions = expenses.map((obj) => {

    const amount = '$' + obj.transaction_amount.toLocaleString()
    const date = formatDate(obj.transaction_date)

    return (
      <TransactionItem
        key={obj.id}
        name={obj.transaction_name}
        amount={amount}
        date={date}
        type={obj.type}
      />
    )
  });

  return (
    <ul>
      {transactions}
    </ul>
  )
}