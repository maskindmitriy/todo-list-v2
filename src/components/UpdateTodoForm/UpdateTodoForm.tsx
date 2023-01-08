import React, {useState} from "react"
import {Checkbox, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import styles from './UpdateTodoForm.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {RouteNames} from "../../routes";
import {NavLink} from "react-router-dom";
import {usePathname} from "../../hooks/usePathname";

//Обработать ошибку при добавлении нового todo,
export function UpdateTodoForm() {
  const isCreate = usePathname() === RouteNames.CREATE_TODO_ROUTE
  const {selectedTodo, todos, isLoading} = useTypedSelector(state => state.todoReducer)
  const dispatch = useDispatch()
  const {updateTodo, SetTodo} = useActions()

  const [form, setForm] = useState(isCreate ? {
    id: (todos.length + 1).toString(), description: '', priority: '', domain: '', isDone: false
  } : {
    id: selectedTodo.id,
    description: selectedTodo.description,
    priority: selectedTodo.priority,
    domain: selectedTodo.domain,
    isDone: selectedTodo.isDone
  })

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const updateHandler = () => {
    dispatch(updateTodo({...form}))
  }

  const createHandler = () => {
    dispatch(SetTodo({...form}))
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.loginForm}>
        <TextField id="id" placeholder='ID'
                   required
                   variant="outlined"
                   disabled={true}
                   name='id'
                   value={form.id}
        />
        <TextField id="description" placeholder='Описание'
                   required
                   variant="outlined"
                   value={form.description}
                   name='description'
                   onChange={changeHandler}
        />
        <TextField id="priority" placeholder='Приоритет'
                   required
                   variant="outlined"
                   value={form.priority}
                   name='priority'
                   onChange={changeHandler}
        />
        <TextField id="domain" placeholder='Раздел'
                   required
                   variant="outlined"
                   value={form.domain}
                   name='domain'
                   onChange={changeHandler}
        />
        <div>
          Сделано?
          <Checkbox
            checked={form.isDone}
            onChange={() => setForm({...form, isDone: !form.isDone})}
          />
        </div>
        <NavLink to={RouteNames.TO_DO_LIST_ROUTE}>
          <LoadingButton variant='outlined'
                         onClick={isCreate ? createHandler : updateHandler}
                         loading={isLoading}
          >Создать</LoadingButton>
        </NavLink>
      </form>
    </div>
  )
}