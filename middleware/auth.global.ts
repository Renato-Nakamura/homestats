export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.name == "index") return;
  if (to.name == "invited") return;

  const logged = await verifyLogin()
  if (!logged) return navigateTo("/");
});
