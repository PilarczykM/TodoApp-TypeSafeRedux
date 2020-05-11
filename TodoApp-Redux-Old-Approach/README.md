This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Opis

Załozeniem tego podprojektu jest opisanie jak w możliwie prawidłowy sposób powinna wyglądać struktura [Redux](https://redux.js.org/).
Redux w projekcie jest oparty o TypeScript

Czym są Akcje, Reducery, Stor.

W jaki sposób przygotować projekt, by mozna było w łatwy i przyjemny sposob korzystać z jego pełnej mocy.

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
    │   │    ├── todos              # Główny folder dla store Todos
    │   │    │    ├── actions.ts    # Plik w którym są typy akcji oraz akcje dla todos.
    │   │    │    └── types.ts      # Typy z których cała aplikacja moze korzystac dla Todo.
    │   │    └── index.ts           # W tym pliku tworzony jest store, tworzony jest rootReducer oraz ładowane middleware.
    ├── package.json
    └── README.md

# Akcje

Akcje reprezentują zmiany stanu aplikacji. Użycie akcji to jedyny prawidłowy sposób na zmianę czegokolwiek w storze

## Czym są akcje

Zadaniem akcji jest przygotowanie opisu roznych mozliwych krokow, które można wykonać do zmiany stanu Todo, oraz przygotowaniem odpowiednich kreatorów akcji.

### Stale opisujace moliwe akcje.

``` ts
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";
```

### Typy akcji oraz akcje

W pierwszej kolejności przyjżymy się akcji tworzenia nowych zadań.
Do tego jest nam niezbedny interfejs, który opisze nam jakie elementy powinny znajdować sie w <b>zwracanym obiekcie</b>.
Ten obiekt nastepnie przekazywany jest bezpośrednio do reducera, o tym nieco poźniej.

``` ts
// store/todo/actions.ts
interface CreateTodoActionType {
type: typeof CREATE_TODO;
payload: Todo; // Interface opisujacy co powinno znajdować sie w ciele Todo. //store/todo/types.ts
}
```

Jak juz posiadamy przygotowany interfejs to trzeba przygotowac kreator akcji.
Zadaniem kreatora akcji jest ułatwienie piszącemu przekazywanie odpowiednich parametrów do funkcji w zależności od wtmaganej akcji.

<b>Przykład:</b> Tworząc nową notatke kreator akcji wymusza od nas podanie opisu (desc) notatki, nie musimy sie przejmować jaki typ akcji jest w środku, bo to własnie kreator akcji <b>createTodoActionCreator</b> przygotował to za nas.

``` ts
// store/todo/actions.ts
const createTodoActionCreator = ({ desc }: { desc: string }): CreateTodoActionType => {
  return {
    type: CREATE_TODO,
    payload: {
      id: uuid(),
      desc,
      isComplete: false,
    },
  };
};
```
W dalszej kolejnosci dla kazdej stałej trzeba utworzyć odpowiednio Typy Akcji oraz Akcje (kreator akcji).

# Reducery

Reducer to funkcja, która przyjmuje stan aplikacji oraz akcję i na tej podstawie generuje nowy, zaktualizowany stan.

## Todo reducer
Reducer ten jest czystą funkcją, której zadaniem jest odpowiednie zwrócenie nowego stanu aplikacji w zależności od oczekiwanej akcji.
Do sprawdzenia jaka akcja została wykorzystana używamy prostej metody warunku wielokrotnego wyboru switch case, gdzie główną zmienną rozpatrywaną jest typ akcji (<b>action.type</b>), a przypadkami są stworzone dla nas wcześniej stałe w postaci akcji.

``` ts
export const todosReducer = (state: Todo[] = todosInitialState, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO: {
      return [...state, action.payload];
    }
    case EDIT_TODO: {
      let { id, desc } = action.payload;
      return state.map((todo) => (todo.id === id ? { ...todo, desc } : todo));
    }
    case TOGGLE_TODO: {
      let { id, isComplete } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !isComplete } : todo
      );
    }
    case DELETE_TODO: {
      let { id } = action.payload;
      return state.filter((todo) => todo.id !== id);
    }
    default:
      return state;
  }
};
```
<b>UWAGA</b> Każdy reducer przyjmuje dwa parametry: stan aplikacji, oraz akcje zawierającą typ i payload.
Stan aplikacji powinien zawsze zostać zainicjalizowany przy pierwszym rozruchu reducera.
Akcja zawiera typ, który oczekujemy, że zostanie wykonany - najprościej mówiąc jest to jego nazwa.
Pauload to nic innego jak dane, które oczekujemy że zostaną nadpisane w nowym stanie aplikacji.
<i>Później opisze przykład przejścia całego procesu na przykładzie tworzenia nowej notatki.</i>
