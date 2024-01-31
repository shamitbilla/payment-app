import { useRecoilState, useRecoilValue } from "recoil";
import { Card } from "../components/Card";
import { EntryField } from "../components/EntryField";
import { Header } from "../components/Header";
import { UserName } from "../components/UserName";
import { amountAtom, toAtom, toNameAtom } from "../../store";
import axios from "axios";
import { useState } from "react";
import Lottie from 'lottie-react';
import animationDataSuccess from "../assets/Animation - 1706683026509.json";
import animationDataFailure from "../assets/Animation - 1706684174872.json";
import { useNavigate } from "react-router-dom";

export function SendMoney() {
  const toName = useRecoilValue(toNameAtom);
  const to = useRecoilValue(toAtom);
  const [amount, setAmount] = useRecoilState(amountAtom);
  const [animate, showAnimate] = useState(null);
  const navigate  = useNavigate();

  async function send() {
    await axios
      .post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          amount,
          to,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          showAnimate(true);
        } else {
          showAnimate(false);
        }
      })
      .catch((e) => {
        showAnimate(false);
      });
   }

   function goBack()
   {
        navigate("/dashboard");
   }

  return (
    <div className="h-screen w-screen">
      <div className="flex items-center justify-center h-screen">
        <Card h="400px" w="600px">
          {animate === null ? (
            <>
              <div>
                <Header contents={"Send Money"}></Header>
              </div>
              <div className="p-4"></div>
              <div className="flex items-center">
                <span className="bg-green-500 rounded-full h-10 w-10 flex items-center justify-center font-semibold text-white">
                  {toName[0].toUpperCase()}
                </span>
                <UserName name={toName}></UserName>
              </div>

              <EntryField
                text={"Amount (in Rs)"}
                prompt={"Enter amount"}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></EntryField>
              <div className="py-5">
                <button
                  type="button"
                  className="w-full bg-green-500 text-white py-2.5 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  onClick={() => {
                    send();
                  }}
                >
                Initiate transaction
                </button>
              </div>
            </>
          ) : (
            animate ? (
              <div className="relative">
                <button className="absolute top-0 right-0" onClick={()=>{goBack()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
        
                <div className="flex flex-col items-center">
                  <Lottie animationData={animationDataSuccess} loop={false} className="mb-1" style={{ width: '80%', height: '80%' }} />
                  <div className="font-bold text-black text-center">
                    Transaction Complete
                  </div>
                </div>
              </div>
            ) : (
                <div className="relative">
                <button className="absolute top-0 right-0" onClick={()=>{goBack()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
        
                <div className="flex flex-col items-center">
                  <Lottie animationData={animationDataFailure} loop={false} className="mb-1" style={{ width: '80%', height: '80%' }} />
                  <div className="font-bold text-red-500 text-center">
                    Transaction Failed
                  </div>
                </div>
              </div>
            )
            
            

          )}
        </Card>
      </div>
    </div>
  );
}
