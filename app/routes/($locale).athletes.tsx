import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from "@remix-run/react";

export async function loader({context}: LoaderFunctionArgs) {
    const {dcupl} = context;
    const athletesList = await dcupl.lists.create({modelKey: 'Athlete'});
    const athletes = athletesList.catalog.query.execute()

    console.log(athletesList.catalog.fn.metadata());
    console.log(athletes);

  return {
    athletes
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
          <p>Athlete count {athletes.length}</p>
            {athletes.map((athlete) => (
                <AthleteCard key={athlete.key} athlete={athlete} />
            ))}
      </div>
  );
}
