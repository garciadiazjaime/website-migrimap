<script>
  import { onMount } from "svelte";
  import { getPlaces } from "../utils/mintAPI";

  let places = [];

  onMount(async () => {
    places = await getPlaces();
	});
</script>

<svelte:head>
	<title>MigriMap</title>
</svelte:head>


{#if places}
	{#each places as place}
		{place.name} 
	{/each}
{/if}
