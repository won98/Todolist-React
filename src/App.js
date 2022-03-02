import "./App.css";
import { Main } from "./component/main";
import { ListManage } from "./component/Listmanage";
const App = () => {
  return (
    <div className="App">
      <h2>Todo List</h2>
      <Main />
      <ListManage />
    </div>
  );
};

export default App;
