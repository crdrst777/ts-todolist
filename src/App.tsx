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

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />

        <Form setTodoData={setTodoData} />
      </div>
    </div>
  );
}

export default App;
