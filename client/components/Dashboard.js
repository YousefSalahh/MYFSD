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

export default function Dashboard() {
 
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();
  const { SID } = router.query

  async function getAccounts () {
    const response = await axios.get('https://localhost:5000/account' + {SID})
    setAccounts(response)
  }

  function signout() {
    localStorage.removeItem('jwt')
    Router.push('/')
  }

// TODO: uncomment after setting the proper URL  
    useEffect(() => {
      getAccounts()
    })

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
                        <Link href={'/transactions/'+accountID}>
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