import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface GreetingsProps {
  // TodoDataProps
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  createTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ value, setValue, createTodo }: GreetingsProps) => {
  console.log("Form component");

  //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <FormContainer onSubmit={createTodo}>
      <InputText
        type="text"
        name="value"
        placeholder="해야 할 일을 입력하세요"
        value={value}
        onChange={handleChange}
      />

      <SubmitBtn type="submit" value="입력" />
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  padding-top: 0.5rem;
`;

const InputText = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-right: 1rem;
  color: #a0a2a5;
  border: 1px solid #ecebec;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 /0.1);
`;

const SubmitBtn = styled.input`
  padding: 0.5rem;
  border: 1px solid #6da3de;
  color: #6da3de;
  border-radius: 0.25rem;
  background-color: #ffffff;
  :hover {
    color: #ffffff;
    background-color: #8bbfff;
  }
`;
