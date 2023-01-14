import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import 'antd/dist/reset.css';
import "./index.css";
import "./App.css";
import TranstractionTable from "./componentes/TranstractionTable";
import ButtonPanel from "./componentes/ButtonPanel";
import {columns} from "./componentes/MockData"

const App = () => {
  const [key, setKey] = useState("1");
  const callback =(key)=>{
    setKey(key)
    console.log("test", key)
  }
  const tableValueChange = () => {
    if(key == 1){
      return "Trantraction";
    }else if(key == 2){
      return "Category";
    }else if(key == 3){
      return "Budget";
    }else if(key == 4){
      return "Account";
    }
    return null
  }
  return (
    <div className="App">
      <ButtonPanel callback={callback}/>
      <TranstractionTable selectedColumn={tableValueChange()}/>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
