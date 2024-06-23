import { createRoute, redirect } from "@tanstack/react-router"
import { rootRoute } from ".."
import { isLogged } from "shared/model"
import { store } from "app/store"
import { clearTopic, fetchTopic, fetchTopics, fetchTopicsCategories } from "entities/topics/model/topicSlice"
import { TopicsPage } from "./TopicsPage"
import { TopicPage } from "./TopicPage"
import { fetchUser } from "entities/user/model/userSlice"


export const topicsRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: () => { 
        store.dispatch(fetchTopics())
        store.dispatch(clearTopic())
        store.dispatch(fetchTopicsCategories())
    },
    path: '/topics',
    component: TopicsPage
})

export const topicRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: ({ params }) => { if (+params.topicId) {
        store.dispatch(fetchUser())
        store.dispatch(fetchTopic(+params.topicId))
    } },
    onLeave: () => {
        store.dispatch(fetchTopics())
    },
    path: '/topics/$topicId',
    component: TopicPage
})