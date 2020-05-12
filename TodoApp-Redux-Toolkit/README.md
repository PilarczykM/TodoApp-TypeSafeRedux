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
    │   │    ├── todos              # Główny folder dla Todos w redux
    │   │    │    ├── slices.ts     # Plik w którym są tworzony jest slice dla todos.
    │   │    │    └── types.ts      # Typy z których cała aplikacja moze korzystac dla Todo.
    │   │    ├── counter            # Główny folder dla Counter w redux
    │   │    │    └── slices.ts     # Plik w którym są tworzony jest slice dla counter.
    │   │    └── store.ts           # W tym pliku tworzony jest store, tworzony jest rootReducer oraz ładowane middleware.
    ├── package.json
    └── README.md
