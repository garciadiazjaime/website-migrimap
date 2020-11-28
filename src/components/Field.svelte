<script>
  export let label = '';
  export let content = '';
</script>
<style>
  .input {
    border-top: 1px solid #aeaeae;
    padding: 8px 0 12px;
  }
  .input p {
    margin: 0;
  }
  .label {
    font-weight: 600;
    font-size: 0.8rem;
    opacity: .6;
  }
</style>
{#if content}
  <div class="input">
    <div class="label">{label}</div>
    <p>
      {content}
    </p>
  </div>
{/if}
