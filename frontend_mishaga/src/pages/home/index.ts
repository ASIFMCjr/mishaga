import { createRoute, redirect } from "@tanstack/react-router"
import { HomePage } from "./ui/HomePage"
import { rootRoute } from ".."
import { isLogged } from "shared/model"

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    path: '/',
    component: HomePage
})