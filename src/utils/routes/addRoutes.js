const addRoutes = router => (routes) => {
  routes.forEach(route => route(router));
  return router;
};

export default addRoutes;
