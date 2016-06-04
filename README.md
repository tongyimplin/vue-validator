# vue-validator-mini

Validator component for Vue.js

# Compatibility
- Vue.js `1.0.20`+

# 说明
## 使用前
本框架重要的指令就两个分别是**v-valid**和**v-watch-param**

> PS请在配置Vue的时候不要在methods方法中定义**_doValid**方法，因为这是框架内置的一个方法，并且保证data.validation为空以免冲突

### v-valid
该指令是基于v-model的基础上扩展的用法与v-model一样，但是添加了v-vliad的控件可以添加入**length**,**range**等参数,v-vliad中的参数**必须是data.params**中的参数

### v-watch-param
该指令主要用于显示被监控变量的检查结果信息以及样式，在初始化Vue对象的时候可以传入vconf对象，进行配置也可以不传，在填值的时候只需填写对应的data.params中的变量key值即可。
如：
```
<input type="text"
	v-valid="params.name"
	length="4,8:姓名长度应该在4-8位之间" />
<span v-watch-param="name"></span>
```
下面是配置的信息的案例：
```
new Vue({
	el: '#validationAPP',
	...
	//这是验证的配置信息
	vconf: {
		//这是验证结果的显示成功或失败后的显示样式
		cls: {
			//这是成功样式写法与在html元素的class中无异
			success: 'c-green',
			error: 'c-red'
		},
		//成功后显示的文字
		ok: '✔',
		//失败后的文字前缀
		err: '✘ '
	}
});
```

### 使用_doValid方法验证是否正确
定义事件方法submit,在提交按钮上注册该事件 
```
submit: function() {
	//当且仅当需要被验证的变量上标注的属性都被验证通过才返回true
	var valid = this._doValid();
}
```

### v-valid 和 v-watch-param的实际使用案例
```
<div id="validationAPP" class="container">
	<div class="row cl">
		<input type="text" class="input-text f-l w300" 
			v-valid="params.name"
			length="4,8:姓名长度应该在4-8位之间"
			required="姓名不能为空"
			email="姓名必须为邮件格式" />
		<span class="ml-10 lh30" v-watch-param="name"></span>
	</div>
	<div class="row cl">
		<input type="text" class="input-text f-l w300" 
			v-valid="params.age"
			range="1,6:数值范围应该在1-6之间" />
		<span class="lh30 ml-10" v-watch-param="age"></span>
	</div>
	<div class="row">
		<p>{{params.name}}</p>
	</div>
	<div class="row">
		<button class="btn btn-primary" @click="submit">submit</button>
	</div>
</div>
<script type="text/javascript">
$(function(){
	var app = new Vue({
		el: '#validationAPP',
		data: {
			params:{
				name: '',
				age: 0
			}
		},
		methods: {
			submit: function(){
				console.log(this._doValid());
			}
		},
		vconf: {
			cls: {
				success: 'c-green',
				error: 'c-red'
			},
			ok: '✔',
			err: '✘ '
		}
	});
});
</script>
```

,并且在methods中已经内置了_doValid方法，请不要重复定义，以免冲突

input是文本输入框，该文本框绑定
## required: 必须有该参数
## not-blank: (中间允许有空格)
## not-empty: (不允许为空的)
## length: 长度,eg:length=6表示长度只能有6位，length="1,8"表示1到8位，length=",8"最多8位 ，length="8,"表示至少需要8位
## range: 数值范围，eg:range=5数值必须等于5（感觉有点鸡肋，暂时这样吧），range="1,5"表示between 1 and 5，range=",5"表示最大的数值只能为5,ps小数对比可能会出现未知错误
## number: 表示只接受数值
## pattern: 符合正则才行
## email: 邮件格式
## money: 金额必须带有小数，如12.3,12.43,12.323。没有小数不能通过验证
## IP： 适配ipv4地址
## url: 浏览器地址格式
## date: 日期格式，yyyy-MM-dd
## ~~datetime: 日期时间格式yyyy-MM-dd HH:ii:ss~~ 暂不支持
## phone: 手机号码格式 ,适配13*,18*,15*,17*,16*,14*
## mobile： 电话号码格式,适配有区号或无区号的电话号码
## digits: 仅支持整数
## unsign: 仅支持正整数

# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `vuejs/vue-validator` repository !

# Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/vuejs/vue/blob/dev/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

