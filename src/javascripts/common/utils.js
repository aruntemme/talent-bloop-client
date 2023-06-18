import router from 'steroid-router';

const pathNavigator = (path) => {
  const { origin } = window.location;
  window.location.href = `${origin}/${path}`;
};

const initializeRouter = (arrayOfRoutes) => {
  const routerCallbacks = [];
  console.log('arrayOfRoutes', arrayOfRoutes);
  arrayOfRoutes.forEach((element) => {
    routerCallbacks.push({
      match: element[0],
      action: element[1],
    });
  });

  routerCallbacks.push({
    match: '(.*)',
    action: () => pathNavigator('index.html'),
  });

  router(routerCallbacks);
};

export {
  pathNavigator,
  initializeRouter,
};
