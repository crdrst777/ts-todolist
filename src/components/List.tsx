import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TodoListType from "../compiler/types";

interface GreetingsProps {
  id: number;
  title: string;
  completed: boolean;
  provided: any;
  snapshot: any;
  todoData: TodoListType[];
  setTodoData: Dispatch<SetStateAction<TodoListType[]>>;
}

const List = ({
  id,
  title,
  completed,
  provided,
  snapshot,
  todoData,
  setTodoData,
}: GreetingsProps) => {
  const handleCompleteChange = (id: number) => {
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

  /**
   *
   * @param id 숫자
   * @returns void
   * @todo todo삭제 함수
   * @deprecated
   */

  const deleteTodo = (id: number) => {
    let newTodoData = todoData.filter((data: TodoListType) => data.id !== id);
    // console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
  };

  return (
    <>
      <ListContainer
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
      >
        <CheckboxSpanContainer>
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => handleCompleteChange(id)}
          />
          {completed ? (
            <span style={{ textDecoration: "line-through" }}>{title}</span>
          ) : (
            <span style={{ textDecoration: "none" }}>{title}</span>
          )}
        </CheckboxSpanContainer>
        <DeleteBtnContainer>
          <button onClick={() => deleteTodo(id)}>x</button>
        </DeleteBtnContainer>
      </ListContainer>
    </>
  );
};

export default List;

const ListContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0.25rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  color: #898a91;
  /* background-color: #f5f4f7; */
  background-color: ${(props) => (props.isDragging ? "#9DA2B0" : "#f5f4f7")};
  /* "#74b9ff" */
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
    background-color: transparent;
  }
`;
