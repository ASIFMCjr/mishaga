import { createRoute, redirect } from "@tanstack/react-router"
import { AuthPage } from "./ui/AuthPage"
import { rootRoute } from ".."
import { isLogged } from "shared/model"

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => {if (isLogged.get()) throw redirect({to: '/'})},
    path: '/auth',
    component: AuthPage
})