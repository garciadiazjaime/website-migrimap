<script>
  import { onMount } from "svelte";
	import { getPlaces } from "../utils/mintAPI";
	import Profile from "../components/Profile.svelte";
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';
	import Modal from 'mint-components/src/components/Modal.svelte';
  import LocationPicker from 'mint-components/src/components/LocationPicker.svelte';
  import UpdateLocationCTA from 'mint-components/src/components/UpdateLocationCTA.svelte';

	let places = [];
	let drawerIsVisible = false;
  let modalIsVisible = false;
	let currentProfile = {};

	const defaultCoords = {
    lat: 32.5286807,
    lng: -117.0477024,
    zoom: 11,
    title: 'Zona Centro'
  }

  onMount(async () => {
		await refreshProfiles()
	});

	async function refreshProfiles() {
		const coordinates = JSON.parse(window.localStorage.getItem('@location'))

		const lngLat = coordinates ? [coordinates.lng, coordinates.lat] : [defaultCoords.lng, defaultCoords.lat];

		places = await getPlaces(lngLat);
	}

	function presenter(data) {
		console.log(data.phone)
		return {
			id: data._id,
			caption: data.description,
			mediaUrl: data.imageUrl,
			title: data.name,
			phone: data.phone,
			keywords: data.servicesFree,
			address: data.address,
			dist: 1500,
			gps: [-117.1148935, 32.5062778],
		}
	}

	function openProfile (profile) {
		drawerIsVisible = true;
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

<div on:click={() => modalIsVisible = true}>
  <UpdateLocationCTA />
</div>
<div class="grid-container">
	{#if places}
		{#each places as place}
			<Card profile={presenter(place)} cardAction={() => openProfile(place)} />
		{/each}
	{/if}
</div>
<Drawer bind:isVisible={drawerIsVisible} shaded>
  <Profile profile={currentProfile} />
</Drawer>
<Modal bind:isVisible={modalIsVisible}>
  <LocationPicker {defaultCoords} on:coordinatesChange={refreshProfiles} >
    ¿En qué área te encuentras?
  </LocationPicker>
</Modal>
