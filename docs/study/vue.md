# Vue

## composition Api 的 Ts 类型声明

### defineProps & defineEmits

::: danger Tip
    defineProps 或 defineEmits 
    只能是要么使用`运行时声明`，要么使用`类型声明`。
    同时使用两种声明方式会导致编译报错。
:::

#### 向下属性传递 :point_down: defineProps 

1. 仅限类型的 defineProps 声明

```typescript

    <script lang="ts" setup>
        const props = defineProps({
            message: String,
            list: String,
            name: String,
            arrFor: Array
        })
    </script>

    <script lang="ts" setup>
        const props = defineProps({
            message: { type: String, default: 'cc' },
            list: { type: String, default: 'bb' },,
            name: { type: String, default: 'aa' },,
            arrFor: { type: Array, default: () => [] },
        })
    </script>

    // 缺点：不可设置参数可选
```

2. withDefaults 编译器宏

```typescript

    <script lang="ts" setup>

    import { withDefaults } from 'vue'

    interface Props {
        message: string;
        name?: string;
        list: string[];
        user?: { name: string, age: number, class?: string }
    }

    const props = withDefaults(defineProps<Props>{
        message: 'hello world',
        list: () => [ 'a', 'b' ],
    })

    </script>
```

#### 向上事件 :point_up_2: defineEmits

> this.$emit('eventName','data')

```typescript

    <script lang="ts" setup>

    const emits = defineEmits<{
        (e: 'next-page', page: number): void,
        (e: 'change-size', size: number): void
    }>()

    const pageChageHandler = (page: number) => {
        emits('next-page', page);
    }

    </script>

```

#### 对外暴露 :point_up_2: defineExpose

> 源码类型: const defineExpose: (exposed?: Record<string, any>) => void

```typescript

    <script lang="ts" setup>
    interface User {
        name: string;
        age: number;
        class?: string;
    }
    interface Exo {
        space: Ref<string>;
        getValue: () => User
    }
    const space = ref<string>('project_root')
    const user = reactive<User>({ name: '小明', age: 12, class: '三年级一班' })
    const getValue = () => user
    const exposeObject = { space, user }

    defineExpose(exposeObject)

    </script>

```

#### 依赖注入 :speech_balloon: Provide & Inject

```typescript

    --- 1 ---
    // type.ts
    import { InjectionKey, Ref } from 'vue'
    export interface Params {
        name: string;
    }
    export const paramsKey: InjectionKey<Ref<Params>> = Symbol('');
    export type setParams = (params: Params) => void;
    export const setParamsKey: InjectionKey<setParams> = Symbol('');


    // parent

    import { paramsKey, setParamsKey, Params } from './type';
    const user = ref({ name: 'zs' });
    provide(paramsKey, user);

    function setUser(params: Params) {
        user.value.name = params.name;
    }
    provide(setParamsKey, setUser);


    // child
    <div @click="handleClick">{{ user }}</div>

    import { inject } from 'vue';
    import { paramsKey, setParamsKey } from './type';

    const user = inject(paramsKey);
    const setUser = inject(setParamsKey);
    console.log('user', user);

    function handleClick() {
        setUser?.({ name: 'ls' });
    }


    --- 2 ---
    //> inject
    // interface InjectionKey<T> extends Symbol {}
    // // 没有默认值
    // function inject<T>(key: InjectionKey<T> | string): T | undefined
    // // 有默认值
    // function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

    // // 有工厂函数
    // function inject<T>(
    //   key: InjectionKey<T> | string,
    //   defaultValue: () => T,
    //   treatDefaultAsFactory: true
    // ): T

    let defaultFn = inject('ab12',()=>'雏见泽'+'棉流',true) 
    console.log(defaultFn);

    interface Book {
        title: string
        year?: number
    }

    let a = inject<Ref>('static') // 无默认值
    //! 即使在子组件可以直接修改，但最好不要这么做，将会影响到provide的父组件以及其他所有inject的子组件。
    //! 这会导致 溯源 非常麻烦，所以修改方式统一为在父组件provide一个方法，子组件调用进行修改！
    // a.value = '直接作死修改'
    let pbook = inject<Book>('pbook') // 无默认值
    let changeFn:(val:string)=>void = inject('changeFn') // 无默认值
    let a2 = inject('static2','????') // 有默认值
    let a3 = inject('static3') // 无默认值且未找到则为 undefined
    let globalGuide = inject('guide') // 访问全局的

    setTimeout(() => {
        changeFn('injectFn传参')
    }, 5000);

```


#### 数据源处理

::: tip { code: 200 }
    Axios 处理完毕后，获得 success 的数据类型，在 Promiess.resolve 时，给数据进行类型定义
:::

```typescript

    // Api 提前做了 axios 拦截，错误信息直接给到 ErrorInfo 的格式
    interface UserQuery {
        page: number;
        size: number;
        keywords: string;
    }
    interface ErrorInfo {
        code: number,
        message: string;
        details: string;
    }
    export const fetchUserList = async (params: UserQuery): Promiess<UserList|ErrorInfo> => {
        try {
            const response = await axios.get('/api/user/list', { params });
            if (respone.code === 200) {
                return response.data as UserQuery;
            }
            return response.data as ErrorInfo;
        } catch(e) {
            return e as ErrorInfo;
        }
    }

```
