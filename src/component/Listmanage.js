import React, { useEffect, useState } from "react";
import axios from "axios";

export const ListManage = () => {
  const [list, setList] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [update, setUpdate] = useState(""); //수정값 저장

  // useEffect는 비동기처리를 할 수 없으므로 비동기처리 함수를 만든 후,
  // useEffect에 호출
  const List = async (event) => {
    await axios
      .get("/read")
      .then((res) => {
        console.log(res.data.result);
        // 불러온 데이터를 list에 담습니다.
        setList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    List();
  }, []);

  const onChange = (event) => {
    setUpdating(true);
    setUpdate(event.target.value);
  };

  //수정된값 보내기
  const onUpdate = async (idx) => {
    if (updating === true) {
      await axios
        .post("/change", {
          idx: idx,
          text: update,
        })
        .then((res) => {
          console.log("res");
          alert("완료");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onDelete = async (idx) => {
    await axios
      .post("/delete", {
        idx: idx,
      })
      .then((res) => {
        console.log("res");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {list.map((l) => (
        <ListFormat
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChange={onChange}
          idx={l.idx}
          text={l.text}
          updatetext={l.text}
          updateValue={() => setUpdate(Event.target.value)}
        />
      ))}
    </>
  );
};

export const ListFormat = (props) => {
  const [up, setUp] = useState(false);

  return (
    <div className="list">
      {up === false ? (
        <>
          <div className="title">
            <p>{props.idx}.</p>
            <h3 onClick={() => setUp(true)}>{props.text}</h3>
          </div>
          <button className="check" onClick={() => props.onDelete(props.idx)}>
            <input type="checkbox" id={props.idx} />
            <label for={props.idx} class="check-box"></label>
          </button>
        </>
      ) : (
        <form onSubmit={() => props.onUpdate(props.idx)}>
          <div className="title">
            <p>{props.idx}.</p>
            <textarea
              type="text"
              name="update"
              onChange={props.onChange}
              required
            >
              {props.updatetext}
            </textarea>
          </div>
          <div className="btn">
            <button type="submit">O</button>
            <button onClick={() => setUp(false)}>X</button>
          </div>
        </form>
      )}
    </div>
  );
};
