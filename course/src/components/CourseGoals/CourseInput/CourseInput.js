import React, {useState} from "react";
import Button from "../../UI/Button/Button";

import "./CourseInput.css";

const CourseInput = props => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isValid, setIsValid] = useState(true);

    const goalInputChangeHandler = event => {
        if(event.target.value.trim().length > 0 && !(event.target.value.match(/[A-Za-z 0-9]/) ) ){
            setIsValid(true);
        }
    //    if(event.target.value.split("").forEach(element => {
    //     if(/[A-Za-z 0-9]/.test(element)){
    //         setIsValid(true)
    //         return
    //     }
    //    }))
        setEnteredValue(event.target.value);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        if(enteredValue.trim().length === 0) {
            setIsValid(false);
            return;
        }
        props.onAddGoal(enteredValue);
        setEnteredValue("");
    }


return(
    <form onSubmit={formSubmitHandler}>
        <div className={`form-control ${!isValid ? "invalid" : ""}`}>
            <label>Course Goal</label>
            <input type="text" value={enteredValue} onChange={goalInputChangeHandler}></input>
        </div>
        <Button type = "submit">Add Goal</Button>
    </form>
)

    // return (
    //     <form onSubmit={formSubmitHandler}>
    //         <div className="form-control">
    //             <label style={{color : !isValid ? 'red' : 'black'}}>Course Goal</label>
    //             <input 
    //             style={{
    //                 borderColor: !isValid ? "red" : "#ccc",
    //                 background: !isValid ? "salmon" : "transparent"
    //             }}
    //             type="text" 
    //             value={enteredValue} 
    //             onChange={goalInputChangeHandler}/>
    //         </div>
    //         <Button type="submit">Add Goal</Button>
            
    //     </form>
    // );
};

export default CourseInput;