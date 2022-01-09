import React from "react";
import { Input, InputGroup, InputGroupText, Button} from "reactstrap";
import { useState, useEffect } from "react";

// export async function getServerSideProps(context) {
//     return {
//       props: {
//         params: context.params
//       }, 
//     }
//   }

export default function createTransactions() {

    // const { accountID } = params
    const [transactions, setTransactions] = useState("");
    
    async function addTransactions () {
        const response = await apiService.post('/transactions/createTransaction')
        setTransactions(response.data)
      }

    //   useEffect(() => {
    //     setTransactions(newState)
    //   },

      const handleSubmit = (event) => {

      };


  return <div>
  <br />
  <InputGroup className="w-50"  >
    <Input placeholder="Enter the receiver account number:"  />
    <InputGroupText>
      Receiver Account Number
    </InputGroupText>
  </InputGroup>
  <br />
  <InputGroup className="w-50">
    <InputGroupText>
      $
    </InputGroupText>
    <Input placeholder="Amount being transferred" />
  </InputGroup>
  <Button color="primary" onClick={handleSubmit}> Add Transaction </Button>
  </div>;
}