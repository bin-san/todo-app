import { createSignal, createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { render, Show, For, Index } from "solid-js/web";

const [todos, setTodos] = createStore([]);
const [selc, setSelc] = createSignal('All')
let todoId = 0;
let myInput: HTMLInputElement;
function App() {
  return (
    <>
      <input type="text" ref={myInput} />
      <button
        onClick={(e) => {
          if (myInput.value !== "") {
            setTodos(
              produce((todos) =>
                todos.push({
                  id: ++todoId,
                  title: myInput.value,
                  completed: false,
                }),
              ),
            );
          }
        }}
      >
        +ADD
      </button>
      <br />
      <h3>tasks:</h3>
      <select onChange={
        (e)=>{
          setSelc(e.target.value)
        }
      }>
        <option value="All">All</option>
        <option value="true">Completed</option>
        <option value="false">Remaining</option>
      </select>
      <button onclick={(e)=>{
        let l = []
        for (let i of todos) {
          if (!i.completed) {
            l.push(i)
          }
        }
        setTodos(l)
      }}>delete completed tasks</button>
      <For each={todos}>{(item) => <div style={{
        display: (selc()==='All' || (selc()===item.completed.toString()))?'flex':'none', gap: '10px', "align-items": 'center'}}>
      <input type="checkbox" onChange={(e)=>{
        if (e.target.checked) {
          setTodos(
            (todo)=>todo.id === item.id,
            produce(
              (todo)=>todo.completed = true
            )
          )
        }
        else {
          setTodos(
            (todo)=>todo.id === item.id,
            produce(
              (todo)=>todo.completed = false
            )
          )
        }
      }}/><label style={{
        "text-decoration": (item.completed)?"line-through":null,
        "font-style": (item.completed)?"italic":null,
      }}>{item.title}</label><br/>
      </div>}</For>
    </>
  );
}

render(() => <App />, document.getElementById("app")!);
