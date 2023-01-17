import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface GreetingsProps {
  // TodoDataProps
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  createTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ value, setValue, createTodo }: GreetingsProps) => {
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
`;

const InputText = styled.input`
  flex: 10;
  padding: 5px;
`;

const SubmitBtn = styled.input`
  flex: 1;
`;
