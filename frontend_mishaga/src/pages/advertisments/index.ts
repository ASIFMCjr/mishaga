import { isLogged } from "shared/model";
import { AdvertismentsPage } from "./ui/AdvertismentsPage";
import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "..";
import { clearAd, fetchAd, fetchAdsByCategory } from "entities/ads/model/adsSlice";
import { store } from "app/store";
import { AdvertismentPage } from "./ui/AdvertismentPage";
import { fetchUser } from "entities/user/model/userSlice";

export const advertismentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: () => { store.dispatch(fetchAdsByCategory(store.getState().ads.category)); store.dispatch(clearAd()) },
    path: '/advertisments',
    component: AdvertismentsPage
})

export const advertismentRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: async () => { if (!isLogged.get()) throw redirect({ to: '/auth' }) },
    loader: ({ params }) => { if (+params.advId) {store.dispatch(fetchUser());store.dispatch(fetchAd(+params.advId))} },
    path: '/advertisments/$advId',
    component: AdvertismentPage
})