import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/table',
    name: '管理员',
    meta: { title: '管理员', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '管理员列表',
        component: () => import('@/views/travel/admin/list'),
        meta: { title: '管理员列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加管理员',
        component: () => import('@/views/travel/admin/save'),
        meta: { title: '添加管理员', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '修改管理员',
        component: () => import('@/views/travel/admin/save'),
        meta: { title: '编辑管理员', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    name: '景区分类管理',
    meta: { title: '景区分类', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '景区分类列表',
        component: () => import('@/views/travel/category/list'),
        meta: { title: '景区分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加景区分类',
        component: () => import('@/views/travel/category/save'),
        meta: { title: '添加景区分类', icon: 'tree' }
      }
    ]
  },

  {
    path: '/scenic',
    component: Layout,
    redirect: '/scenic/list',
    name: '景区管理',
    meta: { title: '景区', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '景区列表',
        component: () => import('@/views/travel/scenic/list'),
        meta: { title: '景区列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加景区',
        component: () => import('@/views/travel/scenic/info'),
        meta: { title: '添加景区', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduScenicInfoEdit',
        component: () => import('@/views/travel/scenic/info'),
        meta: { title: '编辑景区基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'spot/:id',
        name: 'EduScenicSpotEdit',
        component: () => import('@/views/travel/scenic/spot'),
        meta: { title: '编辑景区景点', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduScenicPublishEdit',
        component: () => import('@/views/travel/scenic/publish'),
        meta: { title: '发布景区', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: 'banner管理',
    meta: { title: 'banner', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'banner列表',
        component: () => import('@/views/travel/banner/list'),
        meta: { title: 'banner列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加banner',
        component: () => import('@/views/travel/banner/save'),
        meta: { title: '添加banner', icon: 'tree' }
      },
      {
        path: 'save/:id',
        name: '添加banner',
        component: () => import('@/views/travel/banner/save'),
        meta: { title: '修改banner', icon: 'tree' },
        hidden: true
      }
    ]
  },


  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:3000/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
