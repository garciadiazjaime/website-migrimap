<script>
  import { onMount } from "svelte";
	import { getPlaces } from "../utils/mintAPI";
	import Profile from "../components/Profile.svelte";
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';

	let places = [];
	let visible;
	let currentProfile = {};

  onMount(async () => {
		places = await getPlaces();
	});

	function presenter(data) {
		return {
			id: data._id,
			caption: data.description,
			mediaUrl: data.image,
			title: data.name,
			phone: data.phone,
			keywords: data.servicesFree,
			address: data.address,
			dist: 1500,
			gps: [-117.1148935, 32.5062778],
		}
	}

	function openProfile (profile) {
		visible = true;
		currentProfile = profile;
	}
</script>

<svelte:head>
	<title>MigriMap</title>
</svelte:head>
<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fill, minmax(247px, 1fr));
	}
</style>

<div class="grid-container">
	{#if places}
		{#each places as place}
			<Card profile={presenter(place)} cardAction={() => openProfile(place)} />
		{/each}
	{/if}
</div>
<Drawer bind:visible shaded>
  <Profile profile={currentProfile} />
</Drawer>
