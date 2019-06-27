$(function() {
		var myDate = new Date(); //时间
//		var myDate = new Date("2019-08-10");
		var month = myDate.getMonth() //月
		var month_1 = month+1;//月
		var days = myDate.getDate() //日
//		console.log(month_1)
//		console.log(days)
		$('title').html("设置:当前时间"+month_1+"月"+days+"日")
		
		//			      民生           兴业              交通           招商              中信            广发
		var money = ['30000','50000','18000','27000','12000','47000'];
		//卡名
		var ka_name = ['minsheng','xingye','jiaotong','zhaoshang','zhongxin','guangfa'];
		//还款日期
		var refund_date = [month_1+1+'/9',month_1+'/26',month_1+1+'/6',month_1+'/20',month_1+'/27',month_1+1+'/10'];
		var prepare_rm = "";//选中准备要删除的数据下标
		var ka_na_rm = "";//要删除的卡名，还款数据
		//增加数据
		$('.increase').click(function() {
			$('.add_window').show()

		})
		//跳转页面
		$('.count_html').click(function() {
			window.location.href = "index.html"
		})
		//确认添加
		$('.affirm').click(function() {
			//还款天数总和
			var refund_days = []
			//计算已用=总额-可用
			key_already()
			
			var sethtml = []
			//提取
			var set_date = localStorage.getItem("set_data")
			console.log(set_date)
			if(set_date != null&&set_date != "") {
				sethtml.push(set_date)
			console.log(112)
				
			}
			
			var ka_nane_ = $('#nane_').attr('name');//准备到期提醒用
			var nane_ = $('#nane_').val();
			var rental_ = $('#rental_').val();
			var already_ = $('#already_').val();
			var usable_ = $('#usable_').val();
			var shouldRepay_ = $('#shouldRepay_').val();
			var date_ = $('#date_').val();
			if(nane_ != "" && rental_ != "" && already_ != "" && usable_ != "" && shouldRepay_ != "" && date_ != "") {
				var html_ = '<ul class="'+ka_nane_+'">' +
					'<li>' + nane_ + '</li>' +
					'<li>' + rental_ + '</li>' +
					'<li>' + already_ + '</li>' +
					'<li>' + usable_ + '</li>' +
					'<li>' + shouldRepay_ + '</li>' +
					'<li class="set_remove">' + date_ + '</li>' +
					'</ul>';
//				console.log(html_)
				sethtml.push(html_)
//				console.log(sethtml,"存储的数据")
				localStorage.setItem("set_data", sethtml);
				//					//提取
				//				var set_date = localStorage.getItem("date")
				
				//查询页面用到的数据
				localStorage.setItem(ka_nane_, shouldRepay_);
				//还款天数总和
				rsement_days(ka_nane_)
				//更新表格
				set_update()
				$('.add_window').hide()
				$('.nill_').val("")

			} else {
				$('.reminder').html("请把数据填完整！")
			}
		})
		//取消添加
		$('.abolish').click(function() {
			$('.add_window').hide()
			$('.nill_').val("")
		})
		//删除
		$('.set_box').on("click",".set_remove",function(index){
			var index_ = $(this).index(".set_remove")
			//准备要删除的数据下标
			prepare_rm = index_;
			$(".set_box .set_remove").eq(index_).addClass("rm_ba")
//			console.log(index_)
			$('.prompt_sagg').show()
			ka_na_rm = $(this).parent().attr("class")
			console.log(ka_na_rm)
		})
		//确认删除
		$('.set_ok').click(function(){
			console.log(ka_na_rm)
			
			var gmfset = []//删除之后再存储
			//提取数据
			var set_date = localStorage.getItem("set_data")
//			console.log(set_date,"刚拿出来的数据")
			var set_rm = set_date.split(",")
//			console.log(prepare_rm,"要删除的下标")
			//下标前的数据
			var usdata = set_rm.slice(0,prepare_rm)
			if(usdata!=""){
				gmfset.push(usdata)
			}
//			console.log(gmfset,"下标前的数据")
			//下标后的数据
			var usdata = set_rm.slice(prepare_rm+1)
			if(usdata!=""){
				gmfset.push(usdata)
			}
			
			localStorage.setItem("set_data", gmfset)
//			console.log(usdata)
			$('.prompt_sagg').hide()
			
			set_update()//更新表格
			localStorage.removeItem(ka_na_rm)//删除对应金额数据
			localStorage.removeItem(ka_na_rm+"sky")//删除对应天数数据
		})
		//取消删除
		$('.set_no').click(function(){
			$('.prompt_sagg').hide()
			$(".set_box .set_remove").removeClass("rm_ba")
		})
		
		//更新表格
		set_update()
		//提醒还钱.黄色背提示
		remind_repay();

		//获取焦点，自动填充名称金额
		$('#nane_').focus(function(){
			$('.fill').show();
		})
//		//			      民生           兴业              交通           招商              中信            广发
//		var money = ['30000','50000','18000','27000','12000','47000'];
//		//卡名
//		var ka_name = ['minsheng','xingye','jiaotong','zhaoshang','zhongxin','guangfa'];
//		//还款日期
//		var refund_date = [month_1+1+'/9',month_1+'/26',month_1+1+'/6',month_1+'/20',month_1+'/27',month_1+1+'/10'];
		//选择卡片
		$('.hhuname').click(function(){
			var this_ = $(this).index('.hhuname')
			$('#nane_').attr("name",ka_name[this_])
			$('#date_').val(refund_date[this_])
			
			$('#nane_').val($(this).val())
			$('#rental_').val(money[this_])
//			清空已用/可用金额
			$('#usable_').val("")
			$('#already_').val("")
			$('.fill').hide();
		})

		
		//更新表格
		function set_update(){
			
			//提醒还钱
			remind_repay();
			//提取
			var set_date = localStorage.getItem("set_data")
			if(set_date != null) {
				var set_out = set_date.indexOf(",")
//				console.log(set_out)
				if(set_out == -1) {
					$('.set_box').html(set_date)
				} else {
					$('.set_box').html("")

					var set_out = set_date.split(",")
					for(var i = 0; i < set_out.length; i++) {
						var html_ = set_out[i]
						$('.set_box').append(html_)
					}
				}
			}
		}
		//提醒还钱
		function remind_repay(){
//			console.log(days)
			var color_y = "yellow"
			if(days>=3&&days<=6){
				setTimeout(function(){
					$('.jiaotong li:last-child').css('background',color_y)
				},0)
			}
			if(days>=6&&days<=9){
				setTimeout(function(){
					$('.minsheng li:last-child').css('background',color_y)
				},0)
			}
			if(days>=7&&days<=10){
				setTimeout(function(){
					$('.guangfa li:last-child').css('background',color_y)
				},0)
			}
			if(days>=17&&days<=20){
				setTimeout(function(){
					$('.zhaoshang li:last-child').css('background',color_y)
				},0)
			}
			if(days>=24&&days<=26){
				setTimeout(function(){
					$('.xingye li:last-child').css('background',color_y)
				},0)
			}
			if(days>=25&&days<=27){
				setTimeout(function(){
					$('.zhongxin li:last-child').css('background',color_y)
				},0)
			}
		}

		//返回	
			$('.go_back').click(function(){
				$(".rm_ul").hide()
				$(".set_window").css('width','0')
			})
			
			//删除所有数据
			$('.rm_all_data').click(function(){
				//删除所有数据
				localStorage.clear()
				$(".rm_ul").hide()
				$(".set_window").css('width','0')
//				var html_ = ''
				$('.mmbw_rjfi').show()
				setTimeout(function(){
					window.location.reload()//刷新当前页面.
				},1500)
			})
			$("body").on("touchstart", function(e) {
			// e.preventDefault();
			 startX = e.originalEvent.changedTouches[0].pageX,
			 startY = e.originalEvent.changedTouches[0].pageY;
//			console.log(startX)
//			console.log(startY)
			});
			$("body").on("touchmove", function(e) {
			// e.preventDefault();
			 moveEndX = e.originalEvent.changedTouches[0].pageX,
			 moveEndY = e.originalEvent.changedTouches[0].pageY,
//			console.log(moveEndX)
//			console.log(moveEndY)
			 X = moveEndX - startX,
			 Y = moveEndY - startY;
//			console.log(X)
//			console.log(Y)
			   
			 if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
//			  从左向右滑动
//				$('.set_window').fadeIn(1000)
				$(".set_window").animate({
					width:"100%",
				},200,"linear",function(){
					//运动后做什么
					$('.rm_ul').show()
				});
			 }
			 else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
//			  从右向左滑动
			 }
			 else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
//			  alert("top 2 bottom");
			 }
			 else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
//			  alert("bottom 2 top");
			 }
			 else{
			  alert("just touch");
			 }
			});
			
			//计算还款天数
			function rsement_days(ka_nane_){
				var jfuj = 20;
				var jfuj2 = 24;
				var jfuj3 = 18;
				//款天数
				var skys = 0
				var ka_nane1 = ['guangfa', 'jiaotong', 'minsheng', 'xingye', 'zhaoshang', 'zhongxin']
				//账单日
				var ka_sky_come = ['21', '12', '19', '6', '2', '8']
				//还款日
				var ka_sky_repay = ['10', '6', '9', '26', '20', '27']
		//			  6.21|7.10		  6.12|7.6    6.19|7.9   6|26     2|20          8|27 
		console.log("----------------")
				for(var i=0;i<ka_nane1.length;i++){
					if(ka_nane1[i]==ka_nane_&&ka_nane1[i]!="jiaotong"){
						if(days>=ka_sky_come[i]||days<=ka_sky_repay[i]){
							skys = jfuj-(days-ka_sky_come[i])
						}
					}else if(ka_nane1[i]==ka_nane_&&ka_nane1[i]=="jiaotong"){
						if(days>=ka_sky_come[i]||days<=ka_sky_repay[i]){
							skys = jfuj2-(days-ka_sky_come[i])
						}
					}else if(ka_nane1[i]==ka_nane_&&ka_nane1[i]=="zhaoshang"){
						if(days>=ka_sky_come[i]||days<=ka_sky_repay[i]){
							skys = jfuj3-(days-ka_sky_come[i])
						}
					}
				}
		console.log(skys)
				localStorage.setItem(ka_nane_+"sky",skys);
				
			}





	})

		//js与jq,不能一起用，所以不能放在 $(function(){}) 中  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//键盘抬起
		//清空提示
		function key_uplift() {
			$('.reminder').html("")
		}
//		计算已用=总额-可用
		function key_already(){
			var rental_val =Number($('#rental_').val());
			var already_val =Number($('#already_').val());
//			console.log(rental_val)
//			console.log(already_val)
			if(already_val>=rental_val){
				already_val=rental_val
				$('#already_').val(rental_val)
			}
			$('#usable_').val(rental_val-already_val)
		}
		//input 输入框的判断。（数字 与.） 以外的字符不能输入，
		function num(obj){
			obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
			obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
			obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
		}