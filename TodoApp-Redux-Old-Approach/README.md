This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Opis

Załozeniem tego podprojektu jest opisanie jak w prawidłowy sposób powinna wyglądać struktura [Redux](https://redux.js.org/).
Redux w projekcie jest oparty o TypeScript

Czym są Akcje, Reducery, Stor.

W jaki sposób przygotować projekt by mozna było w łatwy i przyjemny sposob korzystać z jego pełnej mocy.

## Struktura Projektu

-src
| |
| -App
| | |
| | |*App.css
| | |*App.tsx
| |
| -store
| | |
| | -todo
| | |
| | |*actions.ts
| | |*types.ts

## Akcje dla Todo

W pierwszej kolejności przy pracy z Redux rozpoczynamy od przygotowania Akcji jakie powinny się znajdować.

# Czym są akcje

Zadaniem akcji jest przygotowanie opisu roznych mozliwych krokow, oraz przygotowaniem odpowiednich akcji.

# Stale opisujace moliwe akcje.

``` ts
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";
```

# Typy akcji oraz akcje

W pierwszej kolejności przyjzymy sie akcji tworzenia nowych zadan.
Do tego jest nam niezbedny interfejs, który opisze nam jakie elementy powinny znajdować sie w zwracanym obiekcie.
Ten obiekt nastepnie przekazywany jest bezpośrednio do reducera, o tym nieco poźniej.

// store/todo/actions.ts
``` ts
interface CreateTodoActionType {
type: typeof CREATE_TODO;
payload: Todo; // Interface opisujacy co powinno znajdować sie w ciele Todo. //store/todo/types.ts
}
```

Jak juz posiadamy przygotowany interfejs to trzeba przygotowac kreator akcji.
Zadaniem jego jest ułatwienie piszacemu kod by odpowiednio TYP (type) i DANE (payload) zostaly przekazane w dalszej kolejności.
Wiemy, ze tworząc nową notatke przekazujemy do createTodoActionCreator tylko opis, niczym innym nie musimy sie przejmować.

// store/todo/actions.ts
``` ts
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
W dalszej kolejnosci dla kazdej stałej trzeba utworzyć odpowiednio Typy Akcji oraz Akcje.
