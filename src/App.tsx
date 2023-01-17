import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import TodoListType from "../src/compiler/types";

function App() {
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

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />

        <Form value={value} setValue={setValue} createTodo={createTodo} />
      </div>
    </div>
  );
}

export default App;
