<script>
  export let profile = {};
  import Image from 'mint-components/src/components/ImageLoader.svelte';
</script>
<style>
  .profile {
    margin: 20px;
    display: grid;
		grid-column-gap: 20px;
		grid-template-columns: 250px 1fr 1fr;
  }
</style>
<div class="profile">
  <Image src={profile.mediaUrl} alt={profile.title} width="250px" />
  <h1>{profile.title}</h1>
</div>
