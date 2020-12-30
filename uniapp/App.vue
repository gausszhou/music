<script>
	export default {
    // uni-app 完成初始化启动
		onLaunch: function() {
			console.log('App Launch')
		},
    // uni-app启动，或从后台进入前台使用
		onShow: function() {
			console.log('App Show')
		},
    // uni-app从前台进入后台
		onHide: function() {
			console.log('App Hide')
		},
    // uni-app 报错
    onError:function(){
      console.log('App Error')
    }
	}
</script>

<style>
	/*每个页面公共css */
	/*定义全局样式 */
  @import "/common/common.scss";
  @import "/common/customize.scss";
  @import "/common/iconfont.css";
</style>
