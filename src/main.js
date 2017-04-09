// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// 注意路径。虽然与文件夹是同级，但要加上./
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'



Vue.use(VueRouter)
Vue.use(VueResource)


let router = new VueRouter({
	mode: 'history',
	routes: [
        //一级路由，index页面，路径就是/
		{
			path: '/',
			// 这里的component没有s！！！
			component: IndexPage
		},
        //一级路由，detail页面
        {
            path: '/detail',
            component: DetailPage,
            // 重定向：访问/detail的时候，自动跳转到它的子页面
            redirect: 'detail/analysis',
            //嵌套的子路由（二级路由）
            children: [
                //下面都是二级路由的各个页面
                {
                    // 嵌套子路由的路径不需要加/
                    path: 'analysis',
                    component: DetailAnaPage
                },
                {
                    path: 'count',
                    component: DetailCouPage
                },
                {
                    path: 'forecast',
                    component: DetailForPage
                },
                {
                    path: 'publish',
                    component: DetailPubPage
                }
            ]
        }
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})




// ==============
// new Vue({
// 	el: '#app',
// 	// 下面这句可以不要
// 	// template: '<p>hello world {{ word }}</p>',
// 	data: {
// 		word: 'hello world2'
// 	},
// 	// 此组件需要的子组件及其对应的配置（后者可以是变量）
// 	//如果前后一样，也可以采取es6的写法只写一个
// 	components: {
// 		'my-header': myHeader
// 	}
// })

