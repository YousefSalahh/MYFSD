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
import { useMutateRegisterUser } from "../adapters/user"
import router from "next/router";

export default function Register() {
  const [GIUemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  
  const [name, setName]=useState("");
  const [nameState,setNameState]=useState("");

  const [userName, setUsername]=useState("");
  const [userNameState,setusernameState]=useState("");

  const [phone, setPhone]=useState("");
  const [phoneState,setPhoneState]=useState("");

  const [SID, setSID]=useState("");
  const [SIDState,setSIDState]=useState("");

  const registerMutation = useMutateRegisterUser();

  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailState;
    if (emailRegex.test(value)) {
      emailState = "has-success";
    } else {
      emailState = "has-danger";
    }
    setEmailState(emailState);
  };


  const validatePassword = (value) => {
    let PasswordState;
    if (value.length > 5) {
      PasswordState = "has-success";
    } else {
      PasswordState = "has-danger";
    }
    setPasswordState(PasswordState);
  };

  const validatePhone = (value) => {
    let phoneState;
    if (value.length === 11) {
      phoneState = "has-success";
    } else {
      phoneState = "has-danger";
    }
    setPhoneState(phoneState);
  };

  const validatename = (value) => {
    let nameState;
    if (value.length > 0) { 
      nameState = "has-success";
    } else {
      nameState = "has-danger";
    }
    setNameState(nameState);
  };

  
  const validateSID = (value) => {
    let SIDState;
    if (value.length > 0) { 
      SIDState = "has-success";
    } else {
      SIDState = "has-danger";
    }
    setSIDState(SIDState);
  };

  const validateuserName = (value) => {
    let userNameState;
    if (value.length > 0) { 
      userNameState = "has-success";
    } else {
      userNameState = "has-danger";
    }
    setusernameState(userNameState);
  };


  const validateConfirmPassword = (value) => {
    let confirmPasswordState;
    if (value === password && password.length > 0) {
      confirmPasswordState = "has-success";
    } else {
      confirmPasswordState = "has-danger";
    }
    setConfirmPasswordState(confirmPasswordState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      validateEmail(value);
      setEmail(value);
    } 
    else if (name === "confirm_password") {
      validateConfirmPassword(value);
      setConfirmPassword(value);
    } 
    else if(name==="password"){
      validatePassword(value);
      setPassword(value);
    } 
    else if(name==="phone") {
      validatePhone(value);
      setPhone(value);
    } 
    else if(name==="SID") {
      validateSID(value);
      setSID(value);
    } 
    else if(name==="name") {
      validatename(value);
      setName(value);
    } 
    else if(name==="userName") {
      validateuserName(value);
      setUsername(value);
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
    validatePhone(phone);
    validateSID(SID);
    validatename(name);
    validateuserName(userName);
    if (
      emailState === "has-success" &&
      SIDState === "has-success" &&
      passwordState === "has-success" &&
      confirmPasswordState === "has-success" &&
      phoneState === "has-success" &&
      nameState === "has-success" &&
      userNameState === "has-success" &&
      SIDState === "has-success" 
    ) {

          // Call User Register Mutation 
           registerMutation.mutate({ GIUemail, password , phone , SID , userName , name })
           router.replace("/")

        }
  };

  return (
    <div className={styles.App}>
      <h2>Register</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label className={styles.label} for="email">
            Email:
          </Label>

          <Input
            type="text"
            name="email"
            id="email"
            placeholder="example@example.com"
            onChange={handleChange}
            valid={emailState === "has-success"}
            invalid={emailState === "has-danger"}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            valid={passwordState === "has-success"}
            invalid={passwordState === "has-danger"}
          />
          <FormFeedback>
            Password must be at least 6 characters long.
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Confirm Password
          </Label>
          <Input
            type="password"
            name="confirm_password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>Passwords donnot match.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="name">
            Name:
          </Label>
          <Input
            type="name"
            name="name"
            placeholder="name"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>name must be entered</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="userName">
            User Name:
          </Label>
          <Input
            type="userName"
            name="userName"
            placeholder="userName2001"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>username must be entered.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="SID">
            SID:
          </Label>
          <Input
            type="SID"
            name="SID"
            placeholder="ex: 2329"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>SID must be entered</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="phone">
             Phone number:
          </Label>
          <Input
            type="phone"
            name="phone"
            placeholder="01*********"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>phone number must be of length 11 </FormFeedback>
        </FormGroup>
        
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}