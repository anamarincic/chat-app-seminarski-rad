import { JoinForm as Component } from "./JoinForm.component";

import { useState } from "react";

export function JoinForm(props) {
  const [state, setState] = useState({ displayName: '' });

  const submitForm = (event) => {
    event.preventDefault();
    props.onJoin(state);
  }

  const updateState = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <Component
      onSubmit={submitForm}
      onChange={updateState}
      formState={state}
    />
  );
}
