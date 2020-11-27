<script>
  import Image from 'mint-components/src/components/ImageLoader.svelte';
  import Button from 'mint-components/src/components/LinkButton.svelte';
  import Location from 'mint-components/src/components/Location.svelte';
  import Field from './Field.svelte';
  import { formatPhoneNumber } from 'mint-components/src/utils/postUtil';
  export let profile = {};
</script>
<style>
  .profile {
    margin: 20px;
    display: grid;
		grid-column-gap: 20px;
    grid-row-gap: 20px;
		grid-template-columns: 1fr;
    align-items: start;
  }

  @media (min-width: 600px) {
		.profile {
      grid-template-columns: 366px 1fr;
		}
  }


  .linkbox {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 3fr 2fr 2fr;
  }
</style>
<div class="profile">
  <div>
    <Image src={profile.mediaUrl} alt={profile.title} height="150px"/>
    <h2>{profile.title}</h2>
    {#if profile.address}
      <Location address={profile.address} dist={profile.dist} coords={profile.gps} />
    {/if}
    <div class="linkbox">
      {#if profile.phone}
      <Button href={`tel:${profile.phone}`}>
        {formatPhoneNumber(profile.phone)}
      </Button>
      {/if}
      {#if profile.socialNetwork}
      <Button href={profile.socialNetwork} background="#3b5998" blank>
        Facebook
      </Button>
      {/if}
      {#if profile.website}
      <Button href={profile.website} background="#008f11" blank>
        Sitio Web
      </Button>
      {/if}
    </div>
  </div>
  <div>
    {#if profile.caption}
      <p>
        {profile.caption}
      </p>
    {/if}
    <Field label='Perfil' content={profile.keywords} />
    <Field label='Idiomas' content={profile.language} />
    <Field label='Capacidad' content={profile.capacity} />
    <Field label='Horarios' content={profile.schedule} />
    <Field label='Servicios gratuitos' content={profile.servicesFree} />
    <Field label='Servicios con costo' content={profile.servicesNonFree} />
    <Field label='Director' content={profile.ceo} />
    <Field label='Encargado' content={profile.owner} />
  </div>
</div>
