# User-View-Client

The `user-view-client` is a react application where where it fetches data from
**GET API** request to
a[public API](https://jsonplaceholder.typicode.com/users). The response needs
from the request needs be rendered in the application.

## Start the Project in development

- Clone the repository

```bash
git clone https://github.com/Biswal21/user-view-client.git
```

- Change directory

```bash
cd user-view-client
```

- Create an `.env.local` file on the root directory of the project and add an
  environment variable

```bash
VITE_API_URL=https://jsonplaceholder.typicode.com/users
```

- Execute in shell
  ```bash
  yarn install
  ```
- Start the project

```bash
yarn run dev
```

## Functionalities Implemented

- Managing application state in **redux**(react-redux).
- Response & Error Handling from API request.
- Response rendering in a table.
- User experience for viewing detailed data from response.

### Managing Application State with Redux

- The whole application's state is managed by redux which updates the state
  using `useDispatch()` hook from `react-redux` library and adding actions using
  `reduxAsyncThunk` under the hood of `@redux/toolkit` which returns promise
  from a async fetch API, which can be a `pending, fulfilled, rejected`
  corresponding to response type still fetching, response with success status,
  response with error status respectively.
- The state schema used to handle the response from the API call is

```ts
type InitialState = {
  loading: boolean;
  data: User[];
  error: string;
};
```

- Sample Response schema from API

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  }
]
```

### Response & Error Handling

- The **GET API** call requested through `axios` request handlers to the public
  API responds with either success response or might be some type of error
  response. The response with success status(i.e. **200 Status OK**) is handled
  by redux's action dispacther hook `useDispatch()` using redux toolkit and
  update the state of application data.
- When the API call returns an error response along with **5xx or 4xx** error
  codes, maybe because of network errors or invalid API response etc. These
  error response were handled by updating error property of the state of
  application through redux action dispacther hook `useDispatch()` and then
  rendering the error message through an alert component on web page.
- The API call might take time due to poor network speed or data transfer might
  be heavy due large payloads. This updates the loading(boolean) property of
  application's state, which leads to rendering of a loading spinner of the
  application.

### Rendering Components involved

- The rendering components involved are
  - Parent listing `Users` component to be rendered on the home page
  - The home page comprises of heading of the data and a Table component
  - Then each row comprises of rendering 4 important required columns:
    `id, name, username, email` and 1 user interface column `more info`
  - After clicking on button `View Details` on each row it popups a `modal`
    component which renders more details of each row.
- All the components are being implemented using `Chackra-UI` UI library which
  complemented the implementation pace of the problem statement.

### Response rendering in a Table

- The success response needs to rendered in a table where the data is rendered
  in a rows of a Table using `Chakra-UI` table components.
- Example screenshot

  ![Users Table image](https://raw.githubusercontent.com/Biswal21/user-view-client/main/src/assets/users-home-page.png)

### User experience for viewing detailed data from response

- The modal pops up with more details of each user like its
  - Email
    - It was field which could be copied on clipboard for better user experience
      in some quick usage for user to contact the user.
  - Username
  - Phone number
    - It was field which could be copied on clipboard for better user experience
      in some quick usage for user to contact the user.
  - Website
  - Company
  - Address
    - Suite
    - City
    - Zipcode
- Example screenshot
  ![User Modal image](https://raw.githubusercontent.com/Biswal21/user-view-client/main/src/assets/user-modal.png)
