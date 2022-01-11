import React from "react";
import {
  Button,
  InputGroup,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";
import { useState } from "react";

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params
    }, 
  }
}

export default function transactions({params}) {
    const { accountID } = params
    const [transactions, setTransactions] = useState({
      URL: "",
      toAccount: undefined,
      description: "",
      amount: undefined,
    });

    async function addExternalTransactions () {
        axios.post(`/external/SendingExternalTransaction/${accountID}`, {
          fromAccount: accountID,
          URL:"https://myfsd.loca.lt",
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
          Transaction Description  
        </InputGroupText>
      </InputGroup>
      <br />
      <InputGroup className="w-50">
        <Input onChange={(e) => setTransactions({ ...transactions, toAccount: e.target.value })} name="to" placeholder="Enter the receiver account number"  />
        <InputGroupText>
          Receiver Account Number
        </InputGroupText>
      </InputGroup>
      <br  />
      <InputGroup className="w-50">
      <InputGroupText>
          Select Bank
      </InputGroupText>
          <Input type="select" name="bankSelect" id="bankSelect" onChange={(e) => setTransactions({...transactions, URL: e.target.value})}>
            <option onClick={ () => {setTransactions({URL:"default"})}}> Please Pick A bank </option>
            <option onClick={ () => {setTransactions({URL: "https://safemonii.loca.lt"})}}> Safemonii </option>
            <option onClick={ () => {setTransactions({URL: "https://ironbank.loca.lt"})}}> Ironbank </option>
            <option onClick={ () => {setTransactions({URL: "https://solace.loca.It"})}}> Solace </option>
            <option onClick={ () => {setTransactions({URL: "https://amryinternationalbank.loca.lt"})}}> Amry International Bank</option>
            <option onClick={ () => {setTransactions({URL: "https://luckbank.loca.lt"})}}>Luck Bank</option>
          </Input>
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