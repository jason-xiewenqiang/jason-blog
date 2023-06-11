# Redux

### store

1. Redux Store 是全局唯一的。即整个应用程序一般只有一个 Store
2. Redux Store 是树状结构，可以更天然地映射到组件树的结构，虽然不是必须的

### 三个基本概念

1. State: State 即 Store，一般就是一个纯 JavaScript Object
2. Action: Action 也是一个 Object，用于描述发生的动作
3. Reducer: Reducer 则是一个函数，接收 Action 和 State 并作为参数，通过计算得到新的 Store

### 规则

> 在 Redux 中，所有对于 Store 的修改都必须通过这样一个公式去完成，即通过 Reducer 完成，而不是直接修改 Store

1. 可预测性（Predictable）：即给定一个初始状态和一系列的 Action，一定能得到一致的结果，同时这也让代码更容易测试
2. 易于调试：可以跟踪 Store 中数据的变化，甚至暂停和回放

### 一个完整的 Redux 的逻辑

1. 先创建 Store
2. 再利用 Action 和 Reducer 修改 Store
3. 最后利用 subscribe 监听 Store 的变化

### React-redux

> 在 react-redux 的实现中，为了确保需要绑定的组件能够访问到全局唯一的 Redux Store，利用了 React 的 Context 机制去存放 Store 的信息

```js
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

> 使用时，使用到 useSelector 和 useDispatch

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export function Counter() {
  // 从 state 中获取当前的计数值
  const count = useSelector((state) => state.value);

  // 获得当前 store 的 dispatch 方法
  const dispatch = useDispatch();

  // 在按钮的 click 时间中去分发 action 来修改 store
  return (
    <div>
      <button onClick={() => dispatch({ type: "counter/incremented" })}>
        +
      </button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: "counter/decremented" })}>
        -
      </button>
    </div>
  );
}
```

### 执行异步

> redux-thunk

- 设置中间件

```js
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composedEnhancer);
```

- 发送请求

```js
function fetchData() {
  return dispatch => {
    dispatch({ type: 'FETCH_DATA_BEGIN' });
    fetch('/some-url').then(res => {
      dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
    }).catch(err => {
      dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
    })
  }
}
```

- 调用

```js
import fetchData from './fetchData';

function DataList() {
  const dispatch = useDispatch();
  // dispatch 了一个函数由 redux-thunk 中间件去执行
  dispatch(fetchData());
}
```

