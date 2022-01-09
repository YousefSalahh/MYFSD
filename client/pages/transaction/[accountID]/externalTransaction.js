import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function transactions() {
    const { accountID } = params
    const [transactions, setTransactions] = useState({
      toAccount: undefined,
      description: "",
      amount: undefined,
    });


    async function addExternalTransactions () {
        axios.post(`/external/SendingExternalTransaction/${accountID}`, {
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
        <Input onChange={(e) => setTransactions({ ...transactions, description: e.target.value })} name="transactionDescription" placeholder="Give description of transaction"  />
        <InputGroupText>
        transaction Description  
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
      <Button color="primary" onClick={addExternalTransactions}> Add Transaction </Button>
      </div>;
        }