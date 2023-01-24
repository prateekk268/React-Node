import { useState } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');
  
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes('@');
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetNameInput();

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = enteredEmailIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;



// import { useEffect, useRef, useState } from "react";

// const SimpleInput = (props) => {
//     const nameInputRef = useRef();
//     const [enteredName, setEnteredName] = useState("");
//     const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
//     const [enteredNameTouched, setEnteredNameTouched] = useState(false);

//     useEffect(() => {
//         if(enteredNameIsValid) {
//             console.log("Name Input is Valid!");
//         }
//     },[enteredNameIsValid]) 

//     const nameInputChangeHandler = (event) => {
//         setEnteredName(event.target.value);
//     }

//     const nameInputBlurHandler = event => {
//         setEnteredNameTouched(true);

//         if(enteredName.trim() === "") {
//             setEnteredNameIsValid(false)
//             return;
//         }
//     }

//     const formSubmissionHandler = (event) => {
//         event.preventDefault();

//         setEnteredNameTouched(true);

//         if(enteredName.trim() === "") {
//             setEnteredNameIsValid(false);
//             return;
//         }

//         setEnteredNameIsValid(true);

//         console.log(enteredName);

//         const enteredValue = nameInputRef.current.value;
//         console.log(enteredValue);

//         // nameInputRef.current.value = ""; => NOT IDEAL, DON'T MANIPULATE THE DOM
//         setEnteredName("");
//     }
  
//     const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

//     const nameInputClasses = nameInputIsInvalid 
//     ? "form-control invalid"
//     : "form-control";

//   return (
//     <form onSubmit={formSubmissionHandler}>
//       <div className={nameInputClasses}>
//         <label htmlFor="name">Your Name</label>
//         <input 
//         ref={nameInputRef}
//         type="text"
//         id="name"
//         onChange={nameInputChangeHandler} 
//         onBlur={nameInputBlurHandler}
//         value={enteredName} 
//         />
//       </div>
//       { nameInputIsInvalid && (
//         <p className="error-text">Name must not be empty</p>
//       )}
//       <div className="form-action">
//         <button>Submit</button>
//       </div>
//     </form>
//   );
// };