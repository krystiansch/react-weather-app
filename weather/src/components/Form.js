import React from "react";

const Form = props => {
  return (
    <form>
      <input
        type="text"
        placeholder="Wpisz miasto"
        onChange={props.change}
        value={props.value}
      />
    </form>
  );
};

export default Form;
