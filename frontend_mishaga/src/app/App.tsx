import { RouterProvider } from "@tanstack/react-router"
import { Provider } from 'react-redux'
import { router } from "pages/index"
import "./App.css";
import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
