import React, { useState } from "react";
import axios from "axios";

export const Main = () => {
  const [todo, setTodo] = useState("");

  const onChange = (event) => {
    setTodo(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // 브라우저의 도움없이 직접 이벤트를 처리
    return await axios
      .post("/list", {
        //REST API에 작성했던 '/' url 작성
        content: todo, // content라는 이름에 todo(input의 value)를 담아서 보냄
      })
      .then((res) => {
        // 전송성공하면
        //console.log(res);
        alert("전송성공");
        window.location.reload(); // 화면을 새로고침
      })
      .catch((err) => {
        // 에러발생 시
        console.log(err);
      });
  };
  return (
    <form className="write" onSubmit={onSubmit}>
      <input
        className="Input"
        type="text"
        value={todo}
        name="todo"
        onChange={onChange}
        required
      />
      <button type="submit" className="Btn">
        ENTER
      </button>
    </form>
  );
};
