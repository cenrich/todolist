import React from 'react';
import { CssBaseline, Container, List, ListItem, ListItemText } from '@material-ui/core'
import TextField from '@material-ui/core/Textfield'
import ToDoList from './Components/ToDoList'  //A partir de acá se llama ToDoList mi ex anónimo
import nextId from 'react-id-generator'

class App extends React.Component {
// El estado es el controlador de todo lo que pasa en la aplicación
// Todo lo hago modificando el estado
// Inmutabilidad del estado - no trabajar por referencia - no hacer push al estado
  state = {
		task: '',
		todo: []
}

  fieldHandler(e){
    this.setState({ task: e.target.value })
  }

  enterHandler(e) {
    if (e.key === 'Enter') { //acá podría de paso validar que haya algún dato
      this.saveTask(e.target.name)
    }
  }

  saveTask(field) {
    let value = this.state[field]
    // this.state.todo.push(value) uno tiende a hacer esto y está mal
    // es modificar el estado por referencia y no se hace.     
    // haremos así:
    let newTodo = [...this.state.todo,{ id:nextId('task'),text: value, status:'pending'}] // así levanto todo lo qe está en la lista y  
    // agrego mi nievo valor
    this.setState({[field]:'', todo:newTodo})
    // blanqueo el campo y guardo la lista
    // inmutabilidad del estado: detruyo y creo uno nuevo con toda la información
  }

  changeStatus(id) {
    let newTodo = [ ...this.state.todo ]  //copio la lista de tareas
    let task = newTodo.find(e=>e.id===id) //busco la que corresponde con mi id
    task.status = task.status ==='pending'?'completed':'pending' //cambia el estado según situación original
    this.setState({todo:newTodo}) //actualiza estado - si no ponemos el setState, los elementos que consumen
    // no se enteran de que hubo un cambio
  }
    
  // componentDidMount() {
    //   fetch('unLugar').then(res=>this.setState({task:res}))
    // } 
    // esto serviría si yo quisiera recuperar datos de algún lado
    //  ya que el input está siempre vinculado al estado, puedo tenerlo con información precargada
    // y si lo modifico, me modifica el valor de ese estado 
    
    render() {
      const completed = [...this.state.todo.filter(e=>e.status==='completed')]
      const pending = [...this.state.todo.filter(e=>e.status==='pending')]
      
      return (
      <Container> 
			  <CssBaseline />
			  <h1>ToDo</h1>
        <TextField // Esto es un "campo controlado"
      // levanta su valor del estado y sabe cómo modificarlo
        value={this.state.task} 
        label={'Ingrese tarea'} 
        name={'task'} 
        // el name es lo que más nos importa y lo que está representado en el estado
        // no es visible para el usuario, lo llamo como me parezca
        // conviene que sea coherente con cómo lo denomino en estado
        onChange={(e)=>this.fieldHandler(e)}
        // Acá hay distintas filosofías de cuándo actualizar el estado
        // puede ser onChange, puede ser onBlur (al salir del input)
        onKeyPress={(e)=>this.enterHandler(e)}
        variant='outlined'
        />
      <ToDoList
        title={'Pendiente'}
        tag={'( )'}
        data={pending}
        cambiarEstado={this.changeStatus}
      />
      <ToDoList
        title={'Completo'}
        tag={'(X)'}
        data={completed}
        changeStatus={this.changeStatus}
      />

			</ Container>
)}}

export default App;



// ANTES:
// const arrowFun = (e) => console.log(e) y está implícito el return
// AHORA:
// arrowFun = (e) => { al estar esto, el return no está implícito
//  param.cosas = 'otrascosas'
//  return (
//     <li>
//       <span>
//         <p>
//           'Algo'
//        </p>
//      </span>
//    </li>
//  )
// }


