import { createRoute, redirect } from "@tanstack/react-router"
import { rootRoute } from ".."
import { isLogged } from "shared/model"
import { ProfilePage } from "./ui/ProfilePage"
import { store } from "app/store"
import { fetchUser } from "entities/user/model/userSlice"

export const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: () => { store.dispatch(fetchUser()) },
    path: '/profile',
    component: ProfilePage
})