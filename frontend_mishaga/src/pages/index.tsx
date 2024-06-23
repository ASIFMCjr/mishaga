import { createRouter, createRootRoute } from '@tanstack/react-router'
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
import { Header } from 'widgets/header';
import { homeRoute } from 'pages/home';
import { authRoute } from 'pages/auth';
import { profileRoute } from 'pages/profile';
import { advertismentRoute, advertismentsRoute } from 'pages/advertisments';

import { Outlet } from "@tanstack/react-router"
import { useAppSelector } from "shared/api/hooks"
import { isLogged } from "shared/model"
import { eventRoute, eventsRoute } from './events';
import { topicRoute, topicsRoute } from './topics';


const MainComponent = () => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  return isAuth || isLogged.get() ? (
      <div className="w-full">
          <Header />
          <div className="py-5 w-10/12 m-auto flex">
              <Outlet/>
          </div>
      </div>
  ) : (<Outlet/>)
}

export const rootRoute = createRootRoute({ component: MainComponent })
const routeTree = rootRoute.addChildren(
  [
    homeRoute, 
    authRoute, 
    profileRoute, 
    eventsRoute, 
    eventRoute,
    advertismentsRoute,
    advertismentRoute,
    topicsRoute,
    topicRoute
  ])
export const router = createRouter({
  routeTree
})

