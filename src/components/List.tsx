import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TodoListType from "../compiler/types";

interface GreetingsProps {
  // TodoDataProps
  todoData: TodoListType[];
  setTodoData: Dispatch<SetStateAction<TodoListType[]>>;
}

const List = ({ todoData, setTodoData }: GreetingsProps) => {
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
        <ListContainer key={data.id}>
          <CheckboxSpanContainer>
            <input
              type="checkbox"
              defaultChecked={data.completed}
              onChange={() => handleCompleteChange(data.id)}
            />
            {data.completed ? (
              <span style={{ textDecoration: "line-through" }}>
                {data.title}
              </span>
            ) : (
              <span style={{ textDecoration: "none" }}>{data.title}</span>
            )}
          </CheckboxSpanContainer>
          <DeleteBtnContainer>
            <button onClick={() => deleteTodo(data.id)}>x</button>
          </DeleteBtnContainer>
        </ListContainer>
      ))}
    </>
  );
};

export default List;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0.25rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  color: #898a91;
  background-color: #f5f4f7;
`;

const CheckboxSpanContainer = styled.div`
  align-items: center;
`;

const DeleteBtnContainer = styled.div`
  align-items: center;

  button {
    padding: 0.5rem 1rem;
    float: right;
    border: none;
    background-color: #f5f4f7;
  }
`;
