import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const jwt_token = writable([]);