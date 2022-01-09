import React from "react";
import { useState, useEffect } from "react";
import apiService from "../../../services/apiService"
import axios from "axios";
import { Input, InputGroup, InputGroupText , Button} from "reactstrap";

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }, 
  }
}

export default function createTransactions({ params }) {

    const { accountID } = params
    const [transactions, setTransactions] = useState({
      toAccount: undefined,
      description: "",
      amount: undefined,
    });
    
    async function addTransactions () {
        axios.post(`/transactions/${accountID}`, {
          fromAccount: accountID,
          toAccount: transactions.toAccount,
          description: transactions.description,
          amount: transactions.amount
        })

        .then(function (response) {
          if (response.data.error) return alert(response.data.error);
          alert('transaction complete');
        })
        .catch(function (error) {
          alert('please check your internet connection');
        });

      }



  return <div style={{paddingLeft:60 , paddingTop:10}}>
  <br />
  <h1> Add Transaction</h1>
  <InputGroup className="w-50">
    <Input onChange={(e) => setTransactions({ ...transactions, description: e.target.value })} name="transactionName" placeholder="Give description of transaction"  />
    <InputGroupText>
      Transaction Name 
    </InputGroupText>
  </InputGroup>
  <br />
  <InputGroup className="w-50">
    <Input onChange={(e) => setTransactions({ ...transactions, toAccount: e.target.value })} name="to" placeholder="Enter the receiver account number"  />
    <InputGroupText>
      Receiver Account Number
    </InputGroupText>
  </InputGroup>
  <br />
  <InputGroup className="w-50">
    <InputGroupText>
      $
    </InputGroupText>
    <Input onChange={(e) => setTransactions({ ...transactions, amount: e.target.value })} name="amount" placeholder="Amount being transferred" />
  </InputGroup>
  <br  />
  <Button color="primary" onClick={addTransactions}> Add Transaction </Button>
  </div>;
}