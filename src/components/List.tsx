import { useState, Dispatch, SetStateAction } from "react";
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
  deleteTodo: (id: number) => void;
}

const List = ({
  id,
  title,
  completed,
  provided,
  snapshot,
  todoData,
  setTodoData,
  deleteTodo,
}: GreetingsProps) => {
  const [isEditing, setIsEditing] = useState(false); // 수정중인지 여부
  const [editedTitle, setEditedTitle] = useState(title); // 수정할 글

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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let newTodoData = todoData.map((data: TodoListType) => {
      if (data.id === id) {
        // 수정하지 않은채로 동일하면
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditingContainer>
        <form>
          <input type="text" value={editedTitle} onChange={handleEditChange} />
        </form>

        <BtnContainer>
          <button type="submit" onClick={handleSubmit}>
            save
          </button>
          <button onClick={() => setIsEditing(false)}>x</button>
        </BtnContainer>
      </EditingContainer>
    );
  } else {
    return (
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
          <button onClick={() => setIsEditing(true)}>edit</button>
        </DeleteBtnContainer>
      </ListContainer>
    );
  }
};

export default List;

const EditingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0.25rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  color: #898a91;
  background-color: #f5f4f7;

  form {
    align-items: center;
  }
  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    margin-right: 1rem;
    border-radius: 0.25rem;
    color: #6a7280;
    border: 1px solid #ecebec;
  }
`;

const BtnContainer = styled.div`
  align-items: center;

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

const ListContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0.25rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  color: #898a91;
  background-color: ${(props) => (props.isDragging ? "#9DA2B0" : "#f5f4f7")};
  /* "#74b9ff" */
`;

const CheckboxSpanContainer = styled.div`
  align-items: center;

  input {
    cursor: pointer;
  }

  span {
    padding-left: 0.5rem;
  }
`;

const DeleteBtnContainer = styled.div`
  align-items: center;

  button {
    padding: 0.5rem 1rem;
    float: right;
    cursor: pointer;
  }
`;
