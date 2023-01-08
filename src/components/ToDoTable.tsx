import React, {useEffect} from 'react';
import {ITodo} from "../models/ITodo"
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import {LoadingButton} from '@mui/lab';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {RouteNames} from "../routes";
import {NavLink} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {Loader} from "./Loader/Loader";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function ToDoTable() {
  const {todos, isLoading} = useTypedSelector(state => state.todoReducer)
  const {SelectTodo, getTodos, deleteTodo} = useActions()
  const dispatch = useDispatch()

  const updateHandler = (todo: ITodo) => {
    dispatch(SelectTodo(todo))
  }

  const addHandler = () => {
    dispatch(SelectTodo({} as ITodo))
  }

  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id))
  }

  useEffect(() => {
    getTodos()
  }, [])

  if (isLoading)
    return <Loader/>

  return (
    <div style={{padding: '20px 40px'}}>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Описание</StyledTableCell>
              <StyledTableCell align="center">Приоритет</StyledTableCell>
              <StyledTableCell align="center">Раздел</StyledTableCell>
              <StyledTableCell align="center">Сделано</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell style={{padding: 0}}></StyledTableCell>
              <StyledTableCell style={{padding: 0}}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <StyledTableRow key={todo.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{todo.description}</StyledTableCell>
                <StyledTableCell align="center">{todo.priority}</StyledTableCell>
                <StyledTableCell align="center">{todo.domain}</StyledTableCell>
                <StyledTableCell align="center"><Checkbox checked={todo.isDone}/></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center" style={{padding: 0}}>
                  <NavLink to={RouteNames.UPDATE_TODO_ROUTE}>
                    <LoadingButton
                      variant='outlined'
                      size='small'
                      onClick={() => updateHandler(todo)}
                    >
                      Изменить
                    </LoadingButton>
                  </NavLink>
                </StyledTableCell>
                <StyledTableCell align="center" style={{padding: 0}}>
                  <LoadingButton
                    variant='outlined'
                    size='small'
                    onClick={() => deleteHandler(todo.id)}
                  >
                    Удалить</LoadingButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!todos.length && <h2 style={{marginTop: '5px'}}>Добавьте новую запись...</h2>}
      <NavLink to={RouteNames.CREATE_TODO_ROUTE}>
        <button className='roundedBtn'
                onClick={addHandler}
        >+
        </button>
      </NavLink>
    </div>
  )
}