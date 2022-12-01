import type {
    ActionFunction, LoaderFunction
} from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { logout } from "~/utils/session.server";

export const action: ActionFunction = async ({
    request,
}) => {
    return logout(request);
};

export const Loader: LoaderFunction = async () => {
    return redirect("/");
};
