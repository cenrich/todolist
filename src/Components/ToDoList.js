import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

const ToDoList = ({title,data,cambiarEstado,tag}) => {
    return (
        <List>
            <h2>{title}</h2>
            {data.map((e,i)=>(
            <ListItem button key={i} onClick={()=>cambiarEstado(e.id)}>
                <ListItemText>
                    {`${tag} ${e.text}`}
                </ListItemText>
            </ListItem>))}
        </List>
    )
}



// Si pongo export default y lo que sería el contenido, es un componente anónimo. Ver cómo  hago para levantarlo

export default ToDoList