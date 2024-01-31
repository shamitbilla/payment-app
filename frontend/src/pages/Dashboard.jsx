import { Balance } from "../components/Balance";
import { TopBar } from "../components/TopBar";
import { UserList } from "../components/UserList";
import { balanceAtom, filterAtom, firsNameAtom, myFirstNameAtom, myLastNameAtom } from "../../store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";


export function Dashboard()
{
    const [balance,setBalance] = useRecoilState(balanceAtom);
    const [myFirstName,setMyFirstName]  = useRecoilState(myFirstNameAtom);
    const setMyLastName  = useSetRecoilState(myLastNameAtom);
    const userToken = localStorage.getItem('token');
    const setFilter = useSetRecoilState(filterAtom);

    function showBalance()
    {
        

        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then(response => {
            setBalance(response.data.balance);
        }).catch(error => {
            console.error(error);
        });
    }

    function showName()
    {
        axios.get('http://localhost:3000/api/v1/user/whoami', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then(response => {
            setMyFirstName(response.data.firstName);
            setMyLastName(response.data.lastName);
        }).catch(error => {
            console.error(error);
        });
    }

    let timer;
    function showUsersDebounce(text)
    {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            setFilter((prevFilter) => text);
        },500);
    }

    useEffect(()=>{

        const intervalId = setInterval(showBalance,500);
        showName();

        return () => {
            clearInterval(intervalId);
        };

    },[]);

    return (
        <div>
            <TopBar username={myFirstName} />
            <Balance balance={balance}></Balance>
            <div className="px-5">
                <div className="text-2xl py-3 font-bold">
                    Users
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 text"
                        onChange={(e)=>showUsersDebounce(e.target.value)}
                    />
                </div>
            </div>
            <UserList></UserList>

        </div>
    )

}