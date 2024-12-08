import { useState, FormEvent } from 'react'
import './App.css'
import icone from './assets/imagem.jpg'

interface PropsInfo{
  text:string,
  isCompleted: boolean,
}

function App() {

  const [lista, setLista] = useState<PropsInfo[]>([]);
  const [novoItem, setNovoItem] = useState("");

  function addTarefa(form: FormEvent){
    form.preventDefault();
    if(!novoItem){
      return;
    }else{
      setLista([...lista,{text: novoItem, isCompleted: false}]);
      setNovoItem("");
      document.getElementById("item");
    }
  }

  function clicou(index:number){
    const auxList = [...lista];
    auxList[index].isCompleted = !auxList[index].isCompleted;
    setLista(auxList);
  }

  function deletar(index: number){
    const auxList = [...lista];
    auxList.splice(index,1);
    setLista(auxList);
  }

  function deletarTudo(){
    setLista([]);
  }

  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={addTarefa}>
        <input 
          id='item'
          onChange={(e)=>setNovoItem(e.target.value)}
          value={novoItem}
          type='text' 
          placeholder='Enter your ask' 
        />
        <button type='submit'>Add Task</button>
      </form>
      <main>
        {
          lista.length < 1 ?
          <img src={icone} />:
          lista.map((item, index)=>(
            <div className='tarefas'>
              <div onClick={()=>clicou(index)} className={item.isCompleted ? "tarefa completo" : "tarefa"}>{item.text}</div>
              <div onClick={()=>deletar(index)} className='delete'><button>Delete <i className="fa-solid fa-trash"></i></button></div>
            </div>
          ))
        }
        {
          lista.length > 0 && <div><button onClick={()=>deletarTudo()} className='deletarTudo'>Delete all task</button></div>
        }
        
      </main>
    </div>
  )
}

export default App
