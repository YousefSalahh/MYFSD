import React from "react";
import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import apiService from "../../../services/apiService"
import router from 'next/router'
import { Navbar, NavbarText, Button, Nav, NavItem, NavLink } from "reactstrap";

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }, 
  }
}

<<<<<<< HEAD:client/pages/transaction/[accountID].js
export default function transactions({params}) {
=======
export default function transactions({ params }) {
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233:client/pages/transaction/[accountID]/index.js

  const { accountID } = params

  
  const [transactions, setTransactions] = useState([]);
  
  
  function signout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('GIUemail')
    localStorage.removeItem('SID')
    router.replace('/')
  }


  // TODO: remove getTransactions and useEffect and use useFetchTransaction   
  async function getTransactions () {
    const response = await apiService.get(`/transactions/${accountID}`)
    setTransactions(response.data)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return <div>
      <Navbar color="dark" dark>
        <h1 className="p-2 text-white">Transactions</h1>
        <Nav
          className="me-auto"
          navbar
        >
          <NavItem>
            <NavLink href="/" className="mx-3">
              Dashboard
            </NavLink>
<<<<<<< HEAD:client/pages/transaction/[accountID].js
            
            <NavLink href="/transaction/createTransaction" className="mx-3">
=======
            <NavLink href={`/transaction/${accountID}/createTransaction`} className="mx-3">
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233:client/pages/transaction/[accountID]/index.js
              Create Transaction
            </NavLink>
          </NavItem>  
        </Nav>
        <NavbarText>
          <Button color="danger" onClick={signout}>
              Signout
          </Button>
        </NavbarText>
    </Navbar>
    <div className="p-5">
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
            </tr>
          )) }

        </tbody>
      </Table>
      </div>
  </div>;
}