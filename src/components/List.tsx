import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TodoListType from "../compiler/types";

interface GreetingsProps {
  // TodoDataProps
  todoData: TodoListType[];
  setTodoData: Dispatch<SetStateAction<TodoListType[]>>;
}

const List = ({ todoData, setTodoData }: GreetingsProps) => {
  const getStyle = (completed: boolean) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none", // true/false
    };
  };

  const handleCompleteChange = (id: number): void => {
    let newTodoData = todoData.map((data: TodoListType) => {
      if (data.id === id) {
        // state안의 id와 클릭한것의 id가 같으면
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  // todo 삭제
  const deleteTodo = (id: number) => {
    let newTodoData = todoData.filter((data: TodoListType) => data.id !== id);
    // console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
  };

  return (
    <>
      {todoData.map((data: TodoListType) => (
        <div style={getStyle(data.completed)} key={data.id}>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={() => handleCompleteChange(data.id)}
          />
          {data.title}
          <DeleteBtn onClick={() => deleteTodo(data.id)} />
        </div>
      ))}
    </>
  );
};

export default List;

const DeleteBtn = styled.button`
  color: "#fff";
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
`;
