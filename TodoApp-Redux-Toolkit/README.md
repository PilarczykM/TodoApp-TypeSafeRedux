This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Opis

Załozeniem tego podprojektu jest opisanie jak w możliwie prawidłowy sposób powinna wyglądać struktura [Redux](https://redux.js.org/).
Redux w projekcie jest oparty o TypeScript.
Paczka instalująca Redux pochodzi z nowego zestawu narzędzi [Redux-Toolkit](https://redux-toolkit.js.org/)

Instalacja reduxa:
``` node
npm install @reduxjs/toolkit redux-logger @types/redux-logger
```
W skład paczki zawarty jest "immer" pozwalający nam na mutowanie bezpośrednio stanu aplikacji, który później przetwarzany jest na niemutowalną funkcje. <b>Pamiętaj, że jest to tylko udogodnienie, nie trzeba z tego korzystać</b>
</br>
Posiada również getDefaultMiddleware w sklad którego wchodzi przeglądarkowy redux DevTool oraz Thunk - do zapytań asynchronicznych.

## Struktura Projektu
    .
    ├── public                      # Główny folder do ktorego wstrzykiwany jest React.
    |   ├── index.html              # Główny plik do którego React jest hookowany.
    |   └── ...
    ├── src                         # Główny folder w którym najwiecej czasu spędzisz
    |   ├── App                     # Folder komponentu APP
    │   │    ├── App.css            # Style dla komponentu APP
    │   │    └── App.tsx            # Główny plik komponentu APP, to w nim znajduje się logika
    │   ├── store                   # Folder w ktorym przechowywany jest store redux aplikacji
    │   │    ├── todos              # Główny folder dla Todos w redux
    │   │    │    ├── slices.ts     # Plik w którym są tworzony jest slice dla todos.
    │   │    │    └── types.ts      # Typy z których cała aplikacja moze korzystac dla Todo.
    │   │    ├── counter            # Główny folder dla Counter w redux
    │   │    │    └── slices.ts     # Plik w którym są tworzony jest slice dla counter.
    │   │    └── store.ts           # W tym pliku tworzony jest store, rootReducer oraz ładowane są middleware.
    ├── package.json
    └── README.md

## Typy
Tak jak w podstawowym podejściu budowy zalezności redux, tak i tutaj prace zaczynamy od zdefiniowania podstawowych typów w aplikacji.
``` ts
export interface Todo {
  id: string;
  desc: string;
  isComplete: boolean;
}
```
## createSlice
Jest to funkcja zawarta w bibliotece <b>@reduxjs/toolkit</b>, która z założenia ma ograniczyć nadmiarową ilość kodu wymaganego przy tworzeniu <i>boilerplate kodu</i>.
</br>
Funkcja ta akceptuje "slice name", stan początkowy, obiekt wypełniony reducerami, następnie automatycznie generuje nam kreatory akcji, typy akcji, które odpowiadają odpowiednio reducerom oraz sam stan aplikacji dla poszczególnego <b>"kawałka"</b>.

``` ts
export const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    ...
    edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
      const todoToEdit = state.find((todo) => todo.id === payload.id);
      if (todoToEdit) {
        todoToEdit = payload.desc;
      }
    },
    ...
  },
});
```
Powyżej jest tylko wycinek todoSlice, który zawiera nazwa, początkowy stan, oraz reducery w sklad którego wchodzą inne reducery oraz wymieniony reducer edit.
</br>
### Rozbudowany reducer do createSlice
Sam reducer moze przyjać funkcje, która będzie modyfikować stan aplikacji w zależności od potrzeby, lub w bardziej zawansowany sposób przyjmować obiekt posiadający odpowiednio <b>{ reducer, prepare }</b>, reducer przyjmuje payload jak w każdym przypadku, natomiast prepare pozwala nam przygotować nasz payload.
</br>
W poniższym przypadku tworzone jest nowe zadanie, podczas tworzenia nowego zadania wypełniamy go odpowiednio polami {id, desc, isComplete} niestety w samym reducerze nie mozmy bezpośrednio wykonać zewnetrznej metody <i>uuid()</i>. Dlatego powstała metoda przygotowująca nasz nowy payload o nazwie <b>prepare</b>.
``` ts
export const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
      ) => {
        state.push(payload);
      },
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false,
        },
      }),
      ...
    },
  }
});
```

## createSlice a extraReducery
Slice reducer posiada jeszcze taką fajną opcje ukrytą pod nazwą extraReducers, działa bardzo podobnie jak główne reducers, ale pozwala nam reagować na istniejące już akcje. Przykład poniżej opisuje w jaki sposób mozna zwiększać licznik przy każdej akcji dokonanej w liście zadań.
``` ts
export const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [todosSlice.actions.create.type]: (state) => state + 1,
    [todosSlice.actions.edit.type]: (state) => state + 1,
    [todosSlice.actions.toggle.type]: (state) => state + 1,
    [todosSlice.actions.remove.type]: (state) => state + 1,
  },
});
```
todosSlice.actions.create.type - Jest to typ akcji zwracany przy akcji <i>create</i> przez funkcję todosSlice.
</br>
Gdy akcja zostanie wykonana w <b>counterSlice</b> zostanie odpalona część zawarta w <b>extraReducers</b> zwiększająca stan countera o 1 <i>(state) => state + 1</i>

## !!! Kreator akcji jest już gotowy !!!
Kreator akcji wykorzystywany jest przy dispachowaniu akcji, dzieki niemu nie musimy zastanawiać się jakie parametry powinny zostać przekazane do funckji, aby zmienić stan aplikacji.
</br>
Dodatkowo sam creator akcji został już dla nas stworzony dzięki funkcji createSlice
``` ts
export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: deleteTodoActionCreator,
} = todosSlice.actions;
```
W powyższym przykładzie wyciągamy z gotowego już todosSlice wszystkie przygotowane akcje i w powyższym przykładzie nadajemy im odpowiednie nazwy.
