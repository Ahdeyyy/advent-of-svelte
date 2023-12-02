import type { PageLoad } from './$types';

type TallyItem = {
    name: string;
    tally: number;
};

export const load = (async ({ fetch }) => {
    const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-one.json");
    const all = await res.json() as TallyItem[];


    return {
        all,

    };
}) satisfies PageLoad;