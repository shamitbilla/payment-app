import axios from "axios";
import { UserTab } from "./UserTab";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterAtom, myFirstNameAtom, myLastNameAtom, usersAtom } from "../../store";

export function UserList()
{

    const filter = useRecoilValue(filterAtom);
    const [users,setUsers] = useRecoilState(usersAtom);
    const myFirstName = useRecoilValue(myFirstNameAtom);
    const myLastName = useRecoilValue(myLastNameAtom);

    useEffect(() => {
        let timeoutId;
        let intervalId;
    
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
              params: { filter },
            });
            setUsers(response.data.user);
          } catch (error) {
            console.error(error);
          }
        };

        clearTimeout(timeoutId);
        timeoutId = setTimeout(fetchData, 500);
    
        // Initial data fetch
        fetchData();
    
        // Set up continuous polling
        intervalId = setInterval(fetchData, 500); // Adjust the interval as needed
    
        // Cleanup when the component is unmounted
        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
    }, [filter]);


    
    return <div className="px-6 py-8">
    {
        users.filter(user => user.firstName != myFirstName && user.lastName != myLastName).map(user=><UserTab key={user._id} name={`${user.firstName} ${user.lastName}`} to={user._id}></UserTab>)
    }

    </div>

}