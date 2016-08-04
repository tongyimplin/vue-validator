/**
 * @author jafar.tang
 * @email 461415520@qq.com
 * 扩展Vue.js的验证能力,待验证的参数必须放在data.params中，并且保证data.validation为空
 * required: 必须有该参数
 * not-blank: (中间允许有空格)
 * not-empty: (不允许为空的)
 * length: 长度,eg:length=6表示长度只能有6位，length="1,8"表示1到8位，length=",8"最多8位 ，length="8,"表示至少需要8位
 * range: 数值范围，eg:range=5数值必须等于5（感觉有点鸡肋，暂时这样吧），range="1,5"表示between 1 and 5，range=",5"表示最大的数值只能为5,ps小数对比可能会出现未知错误
 * number: 表示只接受数值
 * pattern: 符合正则才行
 * email: 邮件格式
 * money: 金额必须带有小数，如12.3,12.43,12.323。没有小数不能通过验证
 * IP： 适配ipv4地址
 * url: 浏览器地址格式
 * date: 日期格式，yyyy-MM-dd
 * datetime: 日期时间格式yyyy-MM-dd HH:ii:ss
 * phone: 手机号码格式 ,适配13*,18*,15*,17*,16*,14*
 * mobile： 电话号码格式,适配有区号或无区号的电话号码
 * digits: 仅支持整数
 * unsign: 仅支持正整数
 * equals: 必须与另外一个参数相等,改参数必须在params内部
 * initial: 初始化的值
 */
(function(Vue){
  /**
   * 验证工具
   * @author jafar.tang
   * @param {Object} _app
   */
  	var Validator = function(_app, conf) {
	  	var ValidatorClosure = function (_app, conf) {
	  		this._init(_app, conf);
	  	}
	  	ValidatorClosure.prototype = {
	  		/**
	  		 * 初始化
	  		 * @param {Object} _app
	  		 * @param {Object} conf
	  		 */
	  		_init: function(_app, conf) {
	  			this.app = _app;
	  			if(!conf) {
	  				conf = {};
	  			}
	  			if(!conf.cls) {
	  				conf.cls = {
	  					
	  				}
	  			}
	  			//成功失败后的样式
	  			this.cls = {
	  				success: conf.cls.success || 'c-green',
	  				error: conf.cls.error || 'c-red'
	  			};
	  			//成功后的提示文字
	  			//this.ok = conf.ok || '✔';
	  			this.ok = "";
	  			//失败后的文字前缀
	  			this.err = conf.err || '✘ ';
	  		},
	  		/**
	  		 * 必须要有值才行
	  		 * @param {Object} v
	  		 * @param {Object} args
	  		 * @param {Object} msg
	  		 */
	  		required: function(v) {
	  			return !v ? false : true;
	  		},
	  		'notBlank': function(v) {
	  			var reg = /^[^\s]+$/ig;
	  			return this.pattern(v, reg);
	  		},
	  		'notEmpty': function(v) {
	  			if(typeof(v) === 'string') {
		  			return v.trim().length>0;
	  			}else if(typeof(v) === 'number'){
	  				return !isNaN(v);
	  			}
	  		},
	  		length: function(v, args) {
	  			//args获取判断长度
	  			var arg0,arg1;
	  			args = args.split(',');
	  			//长度
	  			var len = v.length;
	  			if(args.length == 2) {
	  				arg0 = parseInt(args[0]);
	  				arg1 = parseInt(args[1]);
	  			}else {
	  				arg0 = parseInt(args[0]);
	  			}
	  			if(args.length == 2) {
	  				//范围比较
	  				return typeof(arg0)=='number' && typeof(arg1)=='number' ? len>=arg0 && len<=arg1 : len>=arg0 || len<=arg1;
	  			}else {
	  				//长度相等
	  				return len==arg0;
	  			}
	  		},
	  		range: function(v, args) {
	  			//args获取判断长度
	  			var arg0,arg1;
	  			args = args.split(',');
	  			//长度
	  			var len = v.length;
	  			if(args.length == 2) {
	  				arg0 = parseInt(args[0]);
	  				arg1 = parseInt(args[1]);
	  			}else {
	  				arg0 = parseInt(args[0]);
	  			}
	  			if(args.length == 2) {
	  				//范围比较
	  				return typeof(arg0)=='number' && typeof(arg1)=='number' ? v>=arg0 && v<=arg1 : v>=arg0 || v<=arg1;
	  			}else {
	  				//长度相等
	  				return v==arg0;
	  			}
	  		},
	  		number: function(v) {
	  			return isNaN(v);
	  		},
	  		pattern: function(v, reg) {
	  			if(!v) return true;
	  			var _v = v+'';
//	  			return _v.match(reg) ? true : false;
				return new RegExp(reg, 'ig').test(_v);
	  		},
	  		email: function(v) {
	  			var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/ig;
	  			return this.pattern(v, reg);
	  		},
	  		url: function(v, args) {
	  			var reg = '';
	  			return this.pattern(v, reg);
	  		},
	  		money: function(v) {
	  			var reg = /^[0-9]+[\.][0-9]{0,3}$/g;
	  			return this.pattern(v, reg);
	  		},
	  		ip: function(v, args) {
	  			//ipv4
	  			var reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
	  			return this.pattern(v, reg);
	  		},
	  		date: function(v, args) {
	  			if (fmt == null) {
	  		        fmt = "yyyyMMdd";
	  		    }
	  		    var yIndex = fmt.indexOf("yyyy");
	  		    if (yIndex ==- 1) {
	  		        return false;
	  		    }
	  		    var year = date.substring(yIndex, yIndex + 4);
	  		    var mIndex = fmt.indexOf("MM");
	  		    if (mIndex ==- 1) {
	  		        return false;
	  		    }
	  		    var month = date.substring(mIndex, mIndex + 2);
	  		    var dIndex = fmt.indexOf("dd");
	  		    if (dIndex ==- 1) {
	  		        return false;
	  		    }
	  		    var day = date.substring(dIndex, dIndex + 2);
	  		    if (!isNumber(year) || year > "2100" || year < "1900") {
	  		        return false;
	  		    }
	  		    if (!isNumber(month) || month > "12" || month < "01") {
	  		        return false;
	  		    }
	  		    if (day > getMaxDay(year, month) || day < "01") {
	  		        return false;
	  		    }
	  		    return true;
	  		},
	  		datetime: function(v, args) {
	  			var reg = '';
	  			return this.pattern(reg);
	  		},
	  		phone: function(v, args) {
	  			var reg = /^[1][385764][0-9]{9}$/;
	  			return this.pattern(v, reg);
	  		},
	  		mobile: function(v, args) {
	  			var reg0 = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
	      		var reg1 = /^[1-9]{1}[0-9]{5,8}$/;
	  			return this.pattern(v, reg0) || this.pattern(v, reg1);
	  		},
	  		digits: function(v) {
	  			return v == parseInt(v);
	  		},
	  		unsign: function(v) {
	  			return v == this.digits(v);
	  		},
	  		getMaxDay: function (year, month) 
	  		{
	  		    if (month == 4 || month == 6 || month == 9 || month == 11) {
	  		        return "30";
	  		    }
	  		    if (month == 2) {
	  		        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
	  		            return "29";
	  		        }
	  		        else {
	  		            return "28";
	  		        }
	  		        return "31";;
	  		    }
	  		},
	  		equals: function(v, args) {
	  			return this.app.params[args] == v;
	  		},
	  		check: function(v, params, _key) {
	  			_key = _key.replace('params.','');
	  			for(var key in params) {
	  				//如果是initial则跳过
	  				if(key === 'initial') { continue; }
	  				var _val = params[key];
	  				//输入值防空判断
	  				if(!_val) {
	  					_val = '';
	  				}
	  				var pos = _val.indexOf(':');
	  				pos = pos==-1?0:pos;
	  				var args = _val.substr(0, pos);
	  				var msg = pos?_val.substr(pos+1, _val.length):_val;
	  				if(!this[key](v, args)) {
	  					//不可以
	  					this.app.validation[_key].cls = this.cls.error;
	  					this.app.validation[_key].msg = this.err+msg;
	  					this.app.validation[_key].valid = false;
	  					break;
	  				}else {
	  					//可以
	  					this.app.validation[_key].cls = this.cls.success;
	  					this.app.validation[_key].msg = this.ok;
	  					this.app.validation[_key].valid = true;
	  					//如果自定义的为false那么valid也要为false
	  					if(!this.app.validation[_key].cValid) {
		  					this.app.validation[_key].cls = this.cls.error;
		  					this.app.validation[_key].msg = this.err+this.app.validation[_key].cMsg;
		  					this.app.validation[_key].valid = false;
	  					}else if(this.app.validation[_key].cMsg) {
	  						this.app.validation[_key].msg = this.ok+this.app.validation[_key].cMsg;
	  					}
	  				}
	  			}
	  		}
	  	}
	  	return {
	  		create: function(_app, conf) {
	  			return new ValidatorClosure(_app, conf);
	  		}
	  	}
	}
	
	/*//valid的参数与model相仿
	var model = Vue.directive('model');
	//复制一下
	var m = {};
	for(var key in model) {
		m[key] = model[key];
	}
	model = m;*/
	var model = {};
	var params = ['required','not-blank','not-empty','length','range','number','pattern',
				'email','url','date','datetime','phone','mobile','digits','equals', 'initial'];
	//改造params参数
	model.params = params;
	/*var _bind = model.bind;
	model.bind = function() {
		_bind.call(this);
		var _update = this.update;
		this.update = function(v) {
			_update.call(this, 1);
			this.update = this._update1;
     		this._unbind = this._unbind1;
			var validator = this.vm.$validator;
			//输入值改变时
			if(validator) {
				validator.check(v, this.params, this.expression); 
			}
		}.bind(this)
	}*/
	model.bind = function() {
		var key = this.expression;
		key = key.replace('params.', '');
		this.vm.validation[key].valid = this.params.initial ? this.params.initial : false;
		this.el.onchange = this.el.onblur = function(event) {
			var v = this.el.value || '';
			var validator = this.vm.$validator;
			return validator.check(v, this.params, this.expression); 
		}.bind(this);
		
		//缓存元素一遍调用
		var doms = this.vm.$doms;
		if(!doms) {
			doms = [];
		}
		doms.push(this);
		this.vm.$doms = doms;
		//监听
		/*this.vm.$watch(key, function(v){
			var validator = this.vm.$validator;
			//输入值改变时
			if(validator) {
				validator.check(v, this.params, this.expression); 
			}
		}.bind(this));*/
	}
	model.update = function() {}
	model.unbind = function() {}
	//注册验证数据
	Vue.directive('valid', model);	
	//注册验证结果显示
	Vue.directive('watch-param', {
		bind: function() {
			var key = this.expression;
			//用户定义的className
			var _oCls = this.el.className;
			//监听
			this.vm.$watch('validation.'+key, function(val){
				this.el.className = _oCls+' '+val.cls;
				this.el.innerHTML = val.msg;
			}.bind(this),{deep:true});
		},
		update: function(val) {
			
		},
		unbind: function(){}
	});
	//拦截Vue的初始化
	Vue.prototype._reloadinit = Vue.prototype._init;
	Vue.prototype._init = function reload_init(t){
		//先检测是否有data.param
		var params = t.data.params;
		var vconf = t.vconf;
		var validation = {};
		var watch = {};
		if(params) {
			//初始化验证信息
			for(var key in params) {
				validation[key] = {msg:'', cls:'', valid: true, cValid: true, cMsg:''};
			}
			t.data.validation = validation;
			if(!t.methods) t.methods = {};
			//注册验证方法
			t.methods._doValid = function() {
				var valid = true;
				/*for(var key in this.validation) {
					var _obj = this.validation[key];
					if(!_obj.valid) {
						valid = false;
						break;
					}
				}*/
				//升级版验证方法
				for(var key in this.$doms) {
					var dom = this.$doms[key];
					if(dom && dom.el) {
						dom.el.onblur();
						var _key = dom.expression;
						_key = _key.replace('params.','');
						if(!this.validation[_key].valid){
							valid = false;
							break;
						}
					}
				}
				return valid;
			}
			
			//添加错误信息的方法
			t.methods._addError = function(key, msg) {
				var param = this.validation[key];
				if(param) {
					param.cValid = false;
					param.cMsg = msg;
					this.validation[key] = param;
				}
				this.$doms.every(function(dom, index, arr) {
					var _key = dom.expression;
					if(_key.indexOf(key) != -1) {
						dom.el.onblur();
					}
					return true;
				});
			}
			
			//清楚错误方法
			t.methods._clrError = function(key, msg) {
				var param = this.validation[key];
				if(param) {
					param.cValid = true;
					param.cMsg = msg || '';
					this.validation[key] = param;
				}
				this.$doms.every(function(dom, index, arr) {
					var _key = dom.expression;
					if(_key.indexOf(key) != -1) {
						dom.el.onblur();
					}
					return true;
				});
			}
			
			//清楚样式
			t.methods._clearValid = function() {
				for(var key in this.validation) {
					var valid = this.validation[key];
					valid.cls = '';
					valid.msg = '';
				}
			}
		}
		//进入之前先重新构造方法
		this._reloadinit(t);
		//这里已经初始化完成，现在需要做的监听需要validate的变量
		var app = this;
		//验证器
		this.$validator = (Validator()).create(app, vconf);
	};
	
}(Vue));
