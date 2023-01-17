import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import List from "./components/List";
import TodoListType from "../src/compiler/types";

function App() {
  // useState에 제네릭을 쓰는 상황:
  // 상태가 null 인 상황이 발생 할 수 있거나, 초기값이 빈배열일때
  // 타입스크립트에서는 빈배열([])을 never type으로 인식함
  const [todoData, setTodoData] = useState<TodoListType[]>([]);
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
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />

        <Form onSubmit={createTodo}>
          <InputText
            type="text"
            name="value"
            placeholder="해야 할 일을 입력하세요"
            value={value}
            onChange={handleChange}
          />

          <SubmitBtn type="submit" value="입력" />
        </Form>
      </div>
    </div>
  );
}

export default App;

const Form = styled.form`
  display: flex;
`;

const InputText = styled.input`
  flex: 10;
  padding: 5px;
`;

const SubmitBtn = styled.input`
  flex: 1;
`;
