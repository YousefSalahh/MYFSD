import {
  Card,
  CardBody,
  CardTitle,
  CardGroup,
  CardText,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

import axios from "axios";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       params: context.params
//     }, 
//   }
// }
export default function Dashboard() {
 
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();
  const  SID  = localStorage.getItem("SID")

  async function getAccounts () {
    const response = await axios.get(`/account/${SID}`)
    setAccounts(response.data)
  }

  function signout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('GIUemail')
    localStorage.removeItem('SID')
    router.reload()
  }

// TODO: uncomment after setting the proper URL  
    useEffect(() => {
      getAccounts()
    }, [])

    return (
      <>
            <div className="d-flex justify-content-between">
                <h1 className="p-2">Dashboard</h1>
                <Button color="danger" onClick={signout}>
                  Signout
                </Button>
            </div>
            <CardGroup>
              { 
                accounts.length ?
                accounts.map(({ balance, accountID }, i) => (
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">
                        {accountID}
                      </CardTitle><CardText>
                          Current Balance: {balance}
                        </CardText>
                        <Link href={'/transaction/'+accountID}>
                          <Button>
                            View Ledger
                          </Button>
                        </Link>
                    </CardBody>
                  </Card>
                )) : 
                <p className="p-2">No active accounts</p>
              
              }
            </CardGroup>
       </>   
    )
  }