import React from "react";
import { Table } from "reactstrap";

import { useState, useEffect } from "react";
import apiService from "../../services/apiService"
import { useRouter } from 'next/router'


export default function transactions() {

  // const accID = 1 ;
  // const transID = "T001" ;
  // const date = "11/10/2021" ;
  // const debit = 100 ;
  // const credit = 0;
  // const balance = 100;

  const router = useRouter()
  const { accountID } = router.query

  
  const [transactions, setTransactions] = useState([]);


  async function getTransactions () {
    const response = await apiService.get('https://localhost:3000/')
    setTransactions(response)
  }

  // TODO: uncomment after setting the proper URL  
  // useEffect(() => {
  //   getTransactions()
  // })

  return <div>
    <h1> AccountID: {accountID} </h1>
    <Table bordered>
    <thead>
      <tr>
        <th>
          #Transaction ID
        </th>
        <th>
          Date
        </th>
        <th>
          Debit Amount
        </th>
        <th>
          Credit Amount
        </th>
        <th>
          Balance
        </th>
      </tr>
    </thead>
    <tbody>
      { transactions.map((transaction, i) => (
          <tr>
            <th scope="row">{transaction.transID}</th>
            <td>{transaction.date}</td>
            <td>{transaction.debit}</td>
            <td>{transaction.credit}</td>
            <td>{transaction.balance}</td>
        </tr>
      )) }

    </tbody>
  </Table>
  </div>;
}
