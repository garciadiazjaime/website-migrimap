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
		return {
			id: data._id,
			mediaUrl: data.imageUrl,
			title: data.name,
			phone: data.phone,
			socialNetwork: data.socialNetwork,
			website: data.website,
			caption: data.description,
			keywords: data.profile,
			language: data.language,
			address: data.address,
			capacity: data.capacity,
			schedule: data.schedule,
			servicesFree: data.servicesFree,
			servicesNonFree: data.servicesNonFree,
			ceo: data.ceo,
			owner: data.owner,
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
	h1 {
		color: black;
		background: #f0b513;
		display: inline-block;
		padding: 10px 20px;
		line-height: 1.2;
		margin-bottom: 30px;
	}

	.banner {
		box-sizing: border-box;
		width: 100%;
		padding: 40px;
		background-image: url('https://images.unsplash.com/photo-1500964757637-c85e8a162699');
		background-size: cover;
	}
	.grid-container {
		display: grid;
		padding: 20px;
		max-width: 1024px;
		margin: 0 auto;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fill, minmax(247px, 1fr));
	}
</style>

<div class="banner">
	<h1>MigriMap -  Directorio de recursos para migrantes</h1>
	<div on:click={() => modalIsVisible = true}>
		<UpdateLocationCTA />
	</div>
</div>
<div class="grid-container">
	{#if places}
		{#each places as place}
			<Card
				profile={presenter(place)}
				cardAction={() => openProfile(presenter(place))}
				buttonColor="#ff6745"
			/>
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
