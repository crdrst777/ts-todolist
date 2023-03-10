import React, { useState, useCallback } from "react";
import "./App.css";
import styled from "styled-components";
import Lists from "./components/Lists";
import Form from "./components/Form";
import TodoListType from "../src/compiler/types";

function App() {
  console.log("App component");

  // useState에 제네릭을 쓰는 상황:
  // 상태가 null 인 상황이 발생 할 수 있거나, 초기값이 빈배열일때
  // 타입스크립트에서는 빈배열([])을 never type으로 인식함
  const [todoData, setTodoData] = useState<TodoListType[]>([]);
  const [value, setValue] = useState("");

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

  // todo 삭제
  // useCallback 을 이용한 함수 최적화.
  const deleteTodo = useCallback(
    (id: number) => {
      let newTodoData = todoData.filter((data: TodoListType) => data.id !== id);
      // console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
    },
    [todoData]
    // 함수 내에서 참조하는 state, props가 있다면 의존성 배열에 추가. todoData가 바뀔때만 다시 생성해줄수있게.
  );

  const deleteTodos = () => {
    setTodoData([]);
  };

  return (
    <Container>
      <TodoBlock>
        <Title>
          <p>할 일 목록</p>
          <button onClick={deleteTodos}>Delete All</button>
        </Title>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          deleteTodo={deleteTodo}
        />

        <Form value={value} setValue={setValue} createTodo={createTodo} />
      </TodoBlock>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #dce9ff;
`;
const TodoBlock = styled.div`
  width: 100%;
  padding: 1.5rem;
  margin: 1rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 /0.1);
  width: 75%;
  max-width: 32rem;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;

  p {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`;
