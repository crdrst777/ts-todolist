import React, { Dispatch, SetStateAction } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoListType from "../compiler/types";
import List from "./List";

interface GreetingsProps {
  // TodoDataProps
  todoData: TodoListType[];
  setTodoData: Dispatch<SetStateAction<TodoListType[]>>;
  deleteTodo: (id: number) => void;
}

// React.memo 컴포넌트 렌더링 최적화
const Lists = React.memo(
  ({ todoData, setTodoData, deleteTodo }: GreetingsProps) => {
    console.log("Lists component");

    // 드래그가 끝났을때 실행될 함수
    const handleEnd = (result: any) => {
      // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됩니다.
      console.log(result);
      // 목적지가 없으면(이벤트 취소) 이 함수를 종료합니다.
      if (!result.destination) return;
      // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
      const newTodoData = [...todoData];
      // 변경시키는 아이템을 배열에서 지워줍니다. a.splice(n, 1) -> n번째 인덱스의 아이템 1개를 삭제
      // [reorderedItem] -> 1.에서 지운 그 아이템 하나를 담은 배열
      const [reorderedItem] = newTodoData.splice(result.source.index, 1);
      // (하나도 제거하지않고(0)) 원하는 자리에 reorderedItem을 추가
      newTodoData.splice(result.destination.index, 0, reorderedItem);
      setTodoData(newTodoData); // 변경된 newTodoData로 상태변경
      // localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    return (
      <>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="todo">
            {(provided: any) => (
              // Droppable을 사용해서 그 안에서 주는 정보를 이 div요소에 주는거임.
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoData.map((data: TodoListType, index) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()} // 이 모듈에서 id는 string값을 가져야한다고해서
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <List
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        completed={data.completed}
                        provided={provided}
                        snapshot={snapshot}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        deleteTodo={deleteTodo}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
);

export default Lists;
