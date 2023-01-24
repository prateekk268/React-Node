import React from "react";
import Card from "./Card";
import useCounter from "../hooks/use-counter";

const ForwardCounter = () => {
    const counter = useCounter()

    return <Card>{counter}</Card>
}

export default ForwardCounter;

// const [counter, setCounter] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCounter((prevCounter) => prevCounter + 1);
//         },1000);

//         return () => clearTimeout(interval)
//     },[]);