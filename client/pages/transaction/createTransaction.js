import React from "react";
import { useState, useEffect } from "react";
import apiService from "../../services/apiService"
import axios from "axios";
import { Input, InputGroup, InputGroupText , Button} from "reactstrap";

// export async function getServerSideProps(context) {
//     return {
//       props: {
//         params: context.params
//       }, 
//     }
//   }

export default function createTransactions({params}) {

    const { accountID } = 632
    const [transactions, setTransactions] = useState("");
    
    async function addTransactions () {
        // const response = await apiService.post(`/transactions/${accountID}`)

        axios.post(`/transactions/${accountID}`, {
          transactionName: Input.transactionName ,
          accountID: 632,
          creditAmount: Input.creditAmount,
          debitAmount: 0,
          dateOfToday: new Date(),
          to: Input.to
        })

        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        // setTransactions(response.data)
      }

    //   useEffect(() => {
    //     setTransactions(newState)
    //   }
    //   const handleSubmit = (event) => {

    //   } ;

  return <div style={{paddingLeft:60 , paddingTop:10}}>
  <br />
  <h1> Add Transaction</h1>
  <InputGroup className="w-50">
    <Input name="transactionName" placeholder="Give description of transaction"  />
    <InputGroupText>
      Transaction Name 
    </InputGroupText>
  </InputGroup>
  <br />
  <InputGroup className="w-50">
    <Input name="to" placeholder="Enter the receiver account number"  />
    <InputGroupText>
      Receiver Account Number
    </InputGroupText>
  </InputGroup>
  <br />
  <InputGroup className="w-50">
    <InputGroupText>
      $
    </InputGroupText>
    <Input name="creditAmount" placeholder="Amount being transferred" />
  </InputGroup>
  <br  />
  <Button color="primary" onClick={addTransactions}> Add Transaction </Button>
  </div>;
}