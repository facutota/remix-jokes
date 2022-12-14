import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams, useCatch } from "@remix-run/react";
import type { Joke } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke };

export function ErrorBoundary() {
  const { jokeId } = useParams();
    return ( 
      <div className="error-container">{`Hay un error cargando el chiste del Id ${jokeId}. Perdon`} </div>
    )
  
}


export const loader = async ({ params }: LoaderArgs) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }
  return json({ joke });
};

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="error-container">
        Huh? What the heck is "{params.jokeId}"?
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}