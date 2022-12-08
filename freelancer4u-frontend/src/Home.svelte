<script>
    import { isAuthenticated, user, jwt_token } from "./store";
    import auth from "./authService";
    import { onMount } from "svelte";
  
    let auth0Client;
  
    onMount(async () => {
      auth0Client = await auth.createClient();
      isAuthenticated.set(await auth0Client.isAuthenticated());
      var userResult = await auth0Client.getUser();
      user.set(userResult);
      const claims = await auth0Client.getIdTokenClaims();
      const id_token = await claims.__raw;
      jwt_token.set(id_token);
      console.log(id_token);
    });
  
    function login() {
      auth.loginWithPopup(auth0Client);
    }
  
    function logout() {
      auth.logout(auth0Client);
    }
  </script>

<h1>Welcome to Freelancer4U!</h1>

{#if $isAuthenticated}
  <p>Your are logged in</p>
{:else}
  <p>Not logged in</p>
{/if}

{#if $isAuthenticated}
  <button type="button" class="btn btn-primary" on:click={logout}>Log Out</button
  >
{:else}
  <button type="button" class="btn btn-primary" on:click={login}>Log In</button>
{/if}