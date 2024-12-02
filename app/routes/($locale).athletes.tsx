import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from "@remix-run/react";

export async function loader({context}: LoaderFunctionArgs) {
    const {dcupl} = context;
    const athletesList = await dcupl.lists.create({modelKey: 'Athlete'});

    console.log(athletesList.catalog.fn.metadata());

  return {
    athletes: athletesList.catalog.query.execute()
  }
}

function AthleteCard({athlete}) {
    return (
        <div>
            <h2>{athlete.name}</h2>
        </div>
    )
}

export default function Page() {
    const {athletes} = useLoaderData<typeof loader>();
  return (
      <div>
          <h1>Our athletes</h1>
          {athletes.map((athlete) => AthleteCard({athlete}))}
      </div>
  );
}
