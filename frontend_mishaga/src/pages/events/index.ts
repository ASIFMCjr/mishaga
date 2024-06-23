import { createRoute, redirect } from "@tanstack/react-router"
import { rootRoute } from ".."
import { isLogged } from "shared/model"
import { store } from "app/store"
import { EventsPage } from "./ui/EventsPage"
import { clearEvent, fetchEvent, fetchEvents } from "entities/events/model/eventSlice"
import { EventPage } from "./ui/EventPage"

export const eventsRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: () => { store.dispatch(fetchEvents()); store.dispatch(clearEvent()) },
    path: '/events',
    component: EventsPage
})

export const eventRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: ({ params }) => { if (+params.eventId) store.dispatch(fetchEvent(+params.eventId)) },
    path: '/events/$eventId',
    component: EventPage
})