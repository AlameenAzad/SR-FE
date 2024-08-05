import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        name: 'index',
      },
      {
        path: 'login',
        component: () => import('pages/user/Login.vue'),
        name: 'login',
      },
      {
        path: 'stripe',
        component: () => import('pages/StripeConnect.vue'),
        name: 'stripe',
      },
      {
        path: 'calendly',
        component: () => import('pages/user/Calendly.vue'),
        name: 'Add Calendly',
      },
    ],
  },
  {
    path: '/user',
    children: [
      // {
      //   path: 'creation',
      //   component: () => import('layouts/BasicLayout.vue'),
      //   name: 'creation',
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('pages/user/Onboarding.vue'),
      //       name: 'onboarding',
      //     },
      //   ]
      // },
      {
        path: 'setup',
        component: () => import('layouts/BasicLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/setup/Setup.vue'),
            name: 'setup',
          },
        ]
      },
    ],
  },
  {
    path: '/settings',
    children: [
      {
        path: 'userSettings',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/user/Settings.vue'),
            name: 'Edit Account',
          },
        ],
        meta: {
          requiresAuth: true,
          title: 'Edit Account'
        },
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/dashboard/sales',
    children: [
      {
        path: 'sales',
        name: 'sales',
        component: () => import('src/pages/dashboard/Sales.vue'),
      },
      {
        path: 'money',
        name: 'money',
        component: () => import('src/pages/dashboard/Money.vue'),
      },
      // {
      //   path: 'accounts',
      //   name: 'accounts',
      //   component: () => import('src/pages/dashboard/Accounts.vue'),
      //   children: [
      //     {
      //       component: () =>
      //         import('components/accounts/CreateAccountDialog.vue'),
      //       path: 'new',
      //     },
      //   ],
      // },
      {
        path: 'accounts',
        name: 'accounts',
        component: () => import('src/pages/dashboard/Accounts.vue'),
      },
      {
        path: 'pipeline',
        name: 'pipeline',
        component: () => import('src/pages/dashboard/Kanban.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
      title: 'Dashboard'
    },
  },
  // {
  //   path: '/products',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('pages/products/Products.vue'),
  //       name: 'products',
  //     },
  //   ],
  //   meta: {
  //     requiresAuth: true,
  //     title: 'Products'
  //   },
  // },
  {
    path: '/products',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/products/NewProducts.vue'),
        name: 'products',
      },
    ],
    meta: {
      requiresAuth: true,
      title: 'Products'
    },
  },
  {
    path: '/reps',
    redirect: '/reps/manage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () => import('src/pages/reps/all.vue'),
      },
      // {
      //   path: 'manage',
      //   name: 'manage',
      //   component: () => import('src/pages/reps/allReps.vue'),
      // },
      // {
      //   path: 'closers',
      //   name: 'closers',
      //   component: () => import('src/pages/reps/Closers.vue'),
      // },
      // {
      //   path: 'setters',
      //   name: 'setters',
      //   component: () => import('src/pages/reps/Setters.vue'),
      // },
      {
        path: 'matchup',
        name: 'match up',
        component: () => import('src/pages/reps/MatchUp.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
      title: 'Reps'
    },
  },
  {
    path: '/leaderboard',
    redirect: '/leaderboard/team',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'team',
        name: 'team',
        component: () => import('src/pages/leaderboard/Team.vue'),
      },
      // {
      //   path: 'global',
      //   name: 'global',
      //   component: () => import('src/pages/leaderboard/Global.vue'),
      // },
    ],
    meta: {
      requiresAuth: true,
      title: 'Leaderboard'
    },
  },
  {
    path: '/pathfinder',
    redirect: '/pathfinder/metric',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'metric',
        name: 'metric',
        component: () => import('src/pages/pathfinder/Metric.vue'),
      },
      {
        path: 'path',
        name: 'path',
        component: () => import('src/pages/pathfinder/NewPath.vue'),
      },
      // {
      //   path: 'path',
      //   name: 'path',
      //   component: () => import('src/pages/pathfinder/Path.vue'),
      // },
    ],
    meta: {
      requiresAuth: true,
      title: 'Pathfinder'
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/404.vue'),
  },
]

export default routes
