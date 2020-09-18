<script>
  import { onMount } from "svelte";
	import { getPlaces } from "../utils/mintAPI";

	import Card from 'mint-components/components/card.svelte'

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
		<Card title={place.name} />
	{/each}
{/if}
