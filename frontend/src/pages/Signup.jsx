import { useRecoilState } from "recoil";
import { BottomLink } from "../components/BottomLink";
import { Button } from "../components/Button";
import {Card} from "../components/Card";
import { EntryField } from "../components/EntryField";
import { Header } from "../components/Header";
import { SubHeading } from "../components/SubHeading";
import { firsNameAtom,passwordAtom,usernameAtom,lastNameAtom } from "../../store";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export function Signup()
{

  const navigate = useNavigate();
  const [firstName,setFirstName] = useRecoilState(firsNameAtom);
  const [lastName,setLastName] = useRecoilState(lastNameAtom);
  const [username,setUsername] = useRecoilState(usernameAtom);
  const [password,setPassword] = useRecoilState(passwordAtom);
  const [label,setLabel] = useState("Enter your information to create an account");

  async function signup()
  {
    const payload = {
      firstName,
      lastName,
      username,
      password
    }

    console.log(payload);

    await axios.post("http://localhost:3000/api/v1/user/signup",payload).then((response)=>{
      
      localStorage.setItem("token",response.data.token);

      navigate("/dashboard");
    }).catch((e)=>{
      if(e.response.status == 411)
      {
        setLabel("Incorrect format please try again...");
      }
    });

    
  }

  return <div className="h-screen w-screen bg-myGray">
    <div className="flex items-center justify-center h-screen">
      <Card h="680px" w="500px">
        <div>
            <Header contents={"Sign Up"}></Header>
            <SubHeading contents={label}></SubHeading>
        </div>
       
        <EntryField onChange={(e)=>{setFirstName(e.target.value)}} text={"First Name"} prompt={"John"}></EntryField>
        <EntryField onChange={(e)=>{setLastName(e.target.value)}} text={"Last Name"} prompt={"Doe"}></EntryField>
        <EntryField onChange={(e)=>{setUsername(e.target.value)}} text={"Email"} prompt={"johndoe@example.com"}></EntryField>
        <EntryField onChange={(e)=>{setPassword(e.target.value)}} text={"Password"} ></EntryField>
        <Button title={"Sign up"} onClick={()=>{signup()}}></Button>
        <BottomLink contents="Already have an account?  " option={"Login"} link="/signin"></BottomLink>

      </Card>
    </div>
      
  </div>
}