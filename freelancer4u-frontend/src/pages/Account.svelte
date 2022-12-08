<script>
    import { isAuthenticated, user } from "../store";
</script>

<h1>Account Details</h1>

{#if $isAuthenticated}
    <p><img src={$user.picture} /></p>
    <p><b>Name:</b> {$user.name}</p>
    <p><b>Nickname:</b> {$user.nickname}</p>
    <p><b>Email:</b> {$user.email}</p>
    <p><b>Roles:</b> {$user.user_roles}</p>
{:else}
    <p>Not logged in</p>
{/if}
