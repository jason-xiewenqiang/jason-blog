# React Hooks

> Hooks 的使用规则: 只能在函数组件的顶级作用域使用；只能在函数组件或者其他 Hooks 中使用。

```js
    // 可以检测 hooks 是否违反只用规则
    npm install eslint-plugin-react-hooks --save-dev

    // ESLint 配置文件
    {
        "plugins": [
            // ...
            "react-hooks"
        ],
        "rules": {
            // ...
            // 检查 Hooks 的使用规则
            "react-hooks/rules-of-hooks": "error",
            // 检查依赖项的声明
            "react-hooks/exhaustive-deps": "warn"
        }
    }

```

### useState

> 让函数 组件具有维持状态的能力

```js
import React, { useState } from "react";

function Example() {
  // 创建一个保存 count 的 state，并给初始值 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### useEffect

> 用于执行一段副作用，涵盖 componentDidMount、componentDidUpdate、componentWillUnMount 三个生命周期

举个例子，某个组件用于显示一篇 Blog 文章，那么这个组件会接收一个参数来表示 Blog 的 ID。而当 ID 发生变化时，组件需要发起请求来获取文章内容并展示

```js
import React, { useState, useEffect } from "react";

function BlogView({ id }) {
  // 设置一个本地 state 用于保存 blog 内容
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    // useEffect 的 callback 要避免直接的 async 函数，需要封装一下
    const doAsync = async () => {
      // 当 id 发生变化时，将当前内容清楚以保持一致性
      setBlogContent(null);
      // 发起请求获取数据
      const res = await fetch(`/blog-content/${id}`);
      // 将获取的数据放入 state
      setBlogContent(await res.text());
    };
    doAsync();
  }, [id]); // 使用 id 作为依赖项，变化时则执行副作用

  // 如果没有 blogContent 则认为是在 loading 状态
  const isLoading = !blogContent;
  return <div>{isLoading ? "Loading..." : blogContent}</div>;
}
```

> 特殊用法

- 1.没有依赖项，则每次 render 后都会重新执行

```js
useEffect(() => {
  // 每次 render 完一定执行
  console.log("re-rendered");
});
```

- 2.空数组作为依赖项，则只在首次执行时触发，对应到 Class 组件就是 componentDidMount

```js
useEffect(() => {
  // 组件首次渲染时执行，等价于 class 组件中的 componentDidMount
  console.log("did mount");
}, []);
```

- 3.允许你返回一个函数，用于在组件销毁的时候做一些清理的操作

```js
// 设置一个 size 的 state 用于保存当前窗口尺寸
const [size, setSize] = useState({});
useEffect(() => {
  // 窗口大小变化事件处理函数
  const handler = () => {
    setSize(getSize());
  };
  // 监听 resize 事件
  window.addEventListener("resize", handler);

  // 返回一个 callback 在组件销毁时调用
  return () => {
    // 移除 resize 事件
    window.removeEventListener("resize", handler);
  };
}, []);
```

> 总结 4 种时机：

1. 每次 render 后执行：useEffect(() => {})
2. 仅第一次 render 后执行：useEffect(() => {}, [])
3. 第一次以及依赖项发生变化后执行：useEffect(() => {}, [deps])
4. 组件 unmount 后执行：useEffect() => { return () => {} }, [])

### useCallback

> 缓存回调函数

```js
import React, { useState, useCallback } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count] // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return <button onClick={handleIncrement}>+</button>;
}
```

### useMemo

> 缓存计算的结果: 如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算

```js
//...
// 使用 userMemo 缓存计算的结果
const usersToShow = useMemo(() => {
    if (!users) return null;
    return users.data.filter((user) => {
      return user.first_name.includes(searchKey));
    }
  }, [users, searchKey]);
//...
```

### useRef

> 在多次渲染之间共享数据: 使用 useRef 保存的数据一般是和 UI 的渲染无关的

```js
import React, { useState, useCallback, useRef } from "react";

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null);

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
  }, []);

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <div>
      {time / 10} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
```

> 除了存储跨渲染的数据之外，useRef 还有一个重要的功能，就是保存某个 DOM 节点的引用

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### useContext

> 定义全局状态: 要跨层次，或者同层的组件之间要进行数据的共享
> Context 更多的是提供了一个强大的机制，让 React 应用具备定义全局的响应式数据的能力
```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
// 创建一个 Theme 的 Context

const ThemeContext = React.createContext(themes.light);
function App() {
  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // 使用 themes.dark 作为当前 Context
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
    >
      I am styled by theme context!
    </button>
  );
}
```
