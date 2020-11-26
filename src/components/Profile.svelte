<script>
  export let profile = {};
  import Image from 'mint-components/src/components/ImageLoader.svelte';
  import Phone from 'mint-components/src/components/LinkButton.svelte';
  import { formatPhoneNumber } from 'mint-components/src/utils/postUtil';
</script>
<style>
  .profile {
    margin: 20px;
    display: grid;
		grid-column-gap: 20px;
    grid-row-gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: start;
  }
  .tag {
    font-weight: 600;
    font-size: 0.8rem;
    opacity: .6;
  }
  p {
    margin-top: 5px;
  }
</style>
<div class="profile">
  <div>
    <h2>{profile.name}</h2>
    <Image src={profile.image} alt={profile.title} height="150px"/>
    <a href={profile.gmaps} target="_blank">{profile.address}</a>
    {#if profile.phone}
      <Phone href={`tel:${profile.phone}`}>
        {formatPhoneNumber(profile.phone)}
      </Phone>
    {/if}
    <a href={profile.socialNetwork} target="_blank">{profile.socialNetwork}</a>
    <a href={profile.website} target="_blank">{profile.website}</a>
  </div>
  <div>
    <p>
      {profile.description}
    </p>
    <div class="tag">Perfil</div>
    <p>
       {profile.profile}
    </p>

    <div class="tag">Idiomas</div>
    <p>
      {profile.language}
    </p>

    <div class="tag">Capacidad</div>
    <p>
      {profile.capacity}
    </p>

    <div class="tag">Horarios</div>
    <p>
      {profile.schedule}
    </p>

      <div class="tag">Servicios gratuitos</div>
    <p>
      {profile.servicesFree}
    </p>

    <div class="tag">Servicios con costo</div>
    <p>
       {profile.servicesNonFree}
    </p>

    <div class="tag">Director</div>
    <p>
      {profile.ceo}
    </p>

    <div class="tag">Encargado</div>
    <p>
      {profile.owner}
    </p>
  </div>
</div>
