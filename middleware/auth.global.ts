export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.name == "index") return;
  const logged = await verifyLogin()
  if (!logged) return navigateTo("/");
});
