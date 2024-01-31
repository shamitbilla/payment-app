import { BottomLink } from "../components/BottomLink";
import { Button } from "../components/Button";
import {Card} from "../components/Card";
import { EntryField } from "../components/EntryField";
import { Header } from "../components/Header";
import { SubHeading } from "../components/SubHeading";
import { passwordAtom,usernameAtom } from "../../store";
import { useRecoilState } from "recoil";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signin()
{

  const navigate = useNavigate();
  const [username,setUsername] = useRecoilState(usernameAtom);
  const [password,setPassword] = useRecoilState(passwordAtom);
  const [label,setLabel] = useState("Enter your credentials to access your account");

  async function signin()
  {
    const payload = {
      username,
      password
    }
    
    await axios.post("http://localhost:3000/api/v1/user/signin",payload).then((response)=>{
      localStorage.setItem("token",response.data.token);
      navigate("/dashboard");
    }).catch((e)=>{
        if(e.response.status == 411)
        {
          setLabel("Invalid credentials");
        }
    });
  }

  return <div className="h-screen w-screen bg-myGray">
    <div className="flex items-center justify-center h-screen">
      <Card h="500px" w="600px">
        <div>
            <Header contents={"Sign In"}></Header>
            <SubHeading contents={label}></SubHeading>
        </div>
       
        <EntryField text={"Email"} prompt={"johndoe@example.com"} onChange={(e)=>{setUsername(e.target.value);}}></EntryField>
        <EntryField text={"Password"} onChange={(e)=>{setPassword(e.target.value);}}></EntryField>
        <Button title={"Sign In"} onClick={()=>{signin();}}></Button>
        <BottomLink contents="Don't have an account?  " option={"Sign up"} link="/signup"></BottomLink>

      </Card>
    </div>
      
  </div>
}