import React from "react";
import { Table } from "reactstrap";
// import { useFetchTransaction } from "../adapters/transaction"
import { useState, useEffect } from "react";
import apiService from "../../services/apiService"
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }, 
  }
}

export default function transactions({ params }) {

  // const accID = 1 ;
  // const transID = "T001" ;
  // const date = "11/10/2021" ;
  // const debit = 100 ;
  // const credit = 0;
  // const balance = 100;

  // const router = useRouter()
  // console.log(router)

  const { accountID } = params

  
  const [transactions, setTransactions] = useState([]);


  // TODO: remove getTransactions and useEffect and use useFetchTransaction   
  async function getTransactions () {
    const response = await apiService.get(`/transactions/${accountID}`)
    setTransactions(response.data)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return <div>
    <h1> AccountID: {accountID} </h1>
    <Table bordered>
    <thead>
      <tr>
        <th>
          Transaction Name 
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
        {/* <th>
          Balance
        </th> */}
      </tr>
    </thead>
    <tbody>
      { transactions.map((data, i) => (
          <tr key={`trasnaction-${i}`}>
            <th scope="row">{data.transactionName}</th>
            <td>{data.dateOfToday}</td>
            <td>{data.debitAmount}</td>
            <td>{data.creditAmount}</td>
            {/* <td>{data.balance}</td> */}
        </tr>
      )) }

    </tbody>
  </Table>
  </div>;
}