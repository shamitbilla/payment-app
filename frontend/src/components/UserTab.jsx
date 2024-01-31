import { UserIcon } from "./UserIcon";
import { UserName } from "./UserName";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toAtom, toNameAtom } from "../../store";

export function UserTab({name, to})
{
    const navigate = useNavigate();
    const setToName = useSetRecoilState(toNameAtom);
    const setTo = useSetRecoilState(toAtom);

    function sendMoney()
    {
        setToName(name);
        setTo(to);
        console.log(to);
        navigate(`/send`)
    }

    return  <div className="flex justify-between items-center">
        <div className="flex items-center">
            <UserIcon char={name[0]}></UserIcon>
            <UserName name={name}></UserName>
        </div>
        <Button title={"Send Money"} onClick={()=>{sendMoney()}}></Button>
    </div>
}