<template>
  <div>
  	<div class="index-wrap">
  		<div class="index-left">
  			<div class="index-left-block">
  				<h2>全部产品</h2>

  				<template v-for="product in productList">
  					<h3>{{product.title}}</h3>
					<ul>
						<li v-for="item in product.list">
							<a :href="item.url">{{item.name}}</a>
							<span v-if="item.hot" class="hot-tag">HOT</span>
						</li>
					</ul>
					<div v-if="!product.last" class="hr"></div>
  				</template>
  			</div>
  			<div class="index-left-block lastest-news">
  				<h2>最新消息</h2>
  				<ul>
  					<li v-for="item in newsList">
  						<a :href="item.url" class="new-item">{{item.title}}</a>
  					</li>
  				</ul>
  			</div>
  		</div>
  		<!-- 第三步，渲染组件（3步的名字都要是一样的） -->
  		<slide-show :slides="slides" :inv="slideSpeed"></slide-show>
  		<div class="index-right">
  			<div class="index-board-list">
  				<!-- v-for的第二个参数声明了对应list的index值；注意这里class绑定的用法（数组、对象及字符串拼接） -->
  				<div class="index-board-item" v-for="(item,index) in boardList" :class="[{'line-last': index%2 !== 0},'index-board-'+ item.id]">
  					<div class="index-board-item-inner">
  						<h2>{{item.title}}</h2>
  						<p>{{item.description}}</p>
  						<div class="index-board-button">
  							<a href="" class="button">立即购买</a>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
// 第一步，引入组件
import slideShow from '../components/slideShow'

export default {
	// 第二步，注册组件
	components: {
		slideShow
	},
  created() {
  	this.$http.get('/api/getNewsList')
  	.then((res) => {
  		console.log(res);
  		this.newsList = res.data
  	},(err) => {
  		console.log(err);
  	})
  },
  data () {
    return {
    	slideSpeed: 3000,
    	slides: [
	        {
	        	// 这里要通过require引入图片的地址，否则webpack不知道src是变量还是字符串。(当图片地址通过 js引入的时候，需要用到require)
	          src: require('../assets/slideShow/pic1.jpg'),
	          title: 'xxx1',
	          href: 'detail/analysis'
	        },
	        {
	          src: require('../assets/slideShow/pic2.jpg'),
	          title: 'xxx2',
	          href: 'detail/count'
	        },
	        {
	          src: require('../assets/slideShow/pic3.jpg'),
	          title: 'xxx3',
	          href: 'detail/publish'
	        },
	        {
	          src: require('../assets/slideShow/pic4.jpg'),
	          title: 'xxx4',
	          href: 'detail/forecast'
	        }
    	],
    	productList: {
    		pc: {
    			title: 'PC产品',
    			list: [
    				{
    					name: '数据统计',
    					url: 'http://starcraft.com'
    				},
    				{
    					name: '数据统计',
    					url: 'http://starcraft.com',
    					hot: true
    				},
    				{
    					name: '数据统计',
    					url: 'http://starcraft.com'
    				},
    				{
    					name: '数据统计',
    					url: 'http://starcraft.com'
    				}
    			]
    		},
    		app: {
    			title: '手机应用类',
    			last: true,
    			list: [
    				{
    					name: '应用产品数据',
    					url: 'http://starcraft.com'
    				},
    				{
    					name: '应用产品数据',
    					url: 'http://starcraft.com'
    				},
    				{
    					name: '应用产品数据',
    					url: 'http://starcraft.com',
    					hot: true
    				},
    				{
    					name: '应用产品数据',
    					url: 'http://starcraft.com'
    				}
    			]
    		}
    	},
    	newsList: [],
    	boardList: [
    		{
    			title: '开放产品',
    			description: '开饭产品是一款开放产品',
    			id: 'car',
    			saleout: false
    		},
    		{
    			title: '开放产品',
    			description: '开饭产品是一款开放产品',
    			id: 'earth',
    			saleout: false
    		},
    		{
    			title: '开放产品',
    			description: '开饭产品是一款开放产品',
    			id: 'loud',
    			saleout: false
    		},
    		{
    			title: '开放产品',
    			description: '开饭产品是一款开放产品',
    			id: 'hill',
    			saleout: false
    		}
    	]
    }
  }
}
</script>

<style scoped>
.index-arap {
	width: 1200px;
	margin: 0 auto;
	overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  /* 超出文字的处理 */
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>