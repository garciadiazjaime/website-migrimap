<script>
  import { onMount } from "svelte";
	import { getPlaces } from "../utils/mintAPI";
	import Profile from "../components/Profile.svelte";
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';
	import Modal from 'mint-components/src/components/Modal.svelte';
  import LocationPicker from 'mint-components/src/components/LocationPicker.svelte';
  import UpdateLocationCTA from 'mint-components/src/components/UpdateLocationCTA.svelte';
	//import { profile } from "console";

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
		places = await getPlaces();
	});

	function presenter(data) {
		console.log(data.phone)
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
			<Card profile={presenter(place)} cardAction={() => openProfile(presenter(place))} />
		{/each}
	{/if}
</div>
<Drawer bind:isVisible={drawerIsVisible} shaded>
  <Profile profile={currentProfile} />
</Drawer>
<Modal bind:isVisible={modalIsVisible}>
  <LocationPicker {defaultCoords}>
    ¿En qué área te encuentras?
  </LocationPicker>
</Modal>
