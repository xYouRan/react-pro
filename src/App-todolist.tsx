import React, { useState, useEffect } from 'react'

//react 本身完全支持js

// 使用ts 注意事项
// 1.你自己定义的变量的类型
// 2.宿主环境（浏览器，node)环境内的变量类型
// 3.第三方框架的数据类型
// 泛型等等类型推导，熟练使用一些工具函数Omit，Pick，Partial等函数

interface Todo {
  title: string
  done: boolean
}
type inputEvent = React.ChangeEvent<HTMLInputElement>
const App: React.FC = function () {
  const [val, setVal] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([
    {
      title: '吃饭',
      done: true,
    },
    {
      title: '睡觉',
      done: false,
    },
    {
      title: '打豆豆',
      done: false,
    },
    {
      title: '打豆豆',
      done: false,
    },
  ])

  const actice = todos.filter((todo) => todo.done).length

  function handleAdd(): void {
    setTodos([...todos, { title: val, done: false }])
    setVal('')
  }

  function handleSetTodo(e: inputEvent, i: number) {
    const nextTodos = [...todos]
    nextTodos[i].done = e.target.checked
    setTodos(nextTodos)
  }

  const [allDone, setAllDone] = useState(false)

  function handleToggleAll(e: inputEvent) {
    const nextTodos = [...todos]
    nextTodos.forEach((todo) => (todo.done = e.target.checked))
    setTodos(nextTodos)
    setAllDone(e.target.checked)
  }

  useEffect(() => {
    setAllDone(actice === todos.length)
  }, [todos])

  function handleRemoteTodo(i: number) {
    const nextTodos = [...todos]
    nextTodos.splice(i, 1)
    setTodos(nextTodos)
  }

  function handleClear() {
    setTodos(todos.filter((todo) => !todo.done))
  }

  return (
    <div>
      {/* <h1>{val}</h1> */}
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value)
        }}
      />
      <button onClick={handleAdd}>添加</button>
      <button onClick={handleClear}>清理</button>
      {todos.length ? (
        <ul>
          {todos.map((todo, i) => (
            <li key={todo.title}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => handleSetTodo(e, i)}
              />
              <span>{todo.title}</span>
              <span onClick={() => handleRemoteTodo(i)}>×</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>暂无数据</div>
      )}

      <div>
        全选
        <input
          type="checkbox"
          checked={allDone}
          onChange={(e) => {
            handleToggleAll(e)
          }}
        />
        {actice}/{todos.length}
      </div>
    </div>
  )
}

export default App
