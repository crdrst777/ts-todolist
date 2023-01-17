import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TodoListType from "../../src/compiler/types";

interface GreetingsProps {
  // TodoDataProps
  setTodoData: Dispatch<SetStateAction<TodoListType[]>>;
}

const Form = ({ setTodoData }: GreetingsProps) => {
  const [value, setValue] = useState("");

  //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // todo 추가 (제출)
  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새로운 할일 데이터
    let newTodo: TodoListType = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할일에 새로운 할일 더해주기
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
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
