import React, { useState, useEffect } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.trim().includes("@"));

  let formIsValid = false;

  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid) {
      return;
    }
    if (!emailIsValid) {
      return;
    }

    console.log("", enteredName, "\n", enteredEmail);
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control ";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Email must not be empty and contain @</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
