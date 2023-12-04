import type { PageLoad } from './$types';

type WeightData = { name: string, weight: number }

export const load = (async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
    const data = await response.json() as WeightData[];

    return {
        weightData: data
    };
}) satisfies PageLoad;