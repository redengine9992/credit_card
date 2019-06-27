$(function() {

	//存储数组
	var dates = []
	//记数
	var numeration = 0;
	//判断不能记录相同金额/不能多次点击
	var alike = 0;

	renewal() //更新记录

	adjust() //调节滚动条位置
	//更新记录
	function renewal() {
		//提取
		var get_date = localStorage.getItem("date")
		//				console.log(get_date)
		if(get_date != null) {
			//截取
			var cut_out = get_date.indexOf(",")
			if(cut_out == -1) {
				//console.log("走一")
				var html_ = '<li class="reco">记录</li>';
				html_ += '<li>' + get_date + '</li>'
				$('.datas ul').html(html_)
				dates[0] = get_date;
				numeration = 1;
			} else {
				//console.log("走二")

				var html_ = '<li class="reco">记录</li>';
				var cut_out = get_date.split(",")
				//console.log(cut_out)
				for(var i = 0; i < cut_out.length; i++) {
					dates[i] = cut_out[i]
					html_ += '<li>' + cut_out[i] + '</li>';
				}
				numeration = i;
				$('.datas ul').html(html_)

			}
		}

	}
	//记录
	$('.record').click(function() {
		//总值total_value
		var total_value = $('.rental').html();
		if(total_value == 0 || total_value == "" || total_value == Infinity || alike == total_value) {
			alert("记录失败！请重新输入")
		} else {
			alike = total_value
			var myDate = new Date; //时间
			//					var myDate = new Date("2019-01-15");
			var year = myDate.getFullYear() //年
			//				console.log(year)
			var month = myDate.getMonth() //月
			var month_1 = month + 1;
			var days = myDate.getDate() //日
			var hour = myDate.getHours() //时
			var minutes = myDate.getMinutes() //分
			var second = myDate.getSeconds() //秒
			var remarkval = $('.remark').val() //备注
			if(remarkval == "") {
				remarkval = "无"
			}
			var wqvb = year + '年' + month_1 + '月' + days + '日' + hour + '时' + minutes + '分' + second + '秒<br />' + '每日至少刷卡' + '<span class="color_">' + total_value + '</span>元/备注：<span class="color_">' + remarkval + '</span>';
			dates[numeration] = wqvb
			//存储
			localStorage.setItem("date", dates);
			localStorage.setItem("total_value", total_value);
			numeration++;
			$('.box2 .on1').siblings().remove()

			//调节滚动条位置
			adjust()
			//更新记录
			renewal()
			//显示当前可用卡
			usable_stuck()
		}
	})

	var name1 = ["招商", "兴业", "民生", "交通", "广发"];

	var myDate = new Date();
	//			var myDate = new Date("2019-06-13");

	var days = myDate.getDate()
	//			console.log(days)
	setTimeout(function() {
		if(days >= 3 && days <= 17) {
			$('.box').append('<li style="background: red;color: #fff;">' + name1[0] + '</li>')
		}
	}, 100)
	setTimeout(function() {
		if(days >= 7 && days <= 20) {
			$('.box').append('<li style="background: blue;color: #fff;">' + name1[1] + '</li>')
		}
	}, 400)
	setTimeout(function() {
		if(days >= 20 || days <= 4) {
			$('.box').append('<li style="background: darkorange;color: #fff;">' + name1[2] + '</li>')
		}
	}, 700)
	setTimeout(function() {
		if(days >= 13 && days <= 27) {
			$('.box').append('<li style="background: #ff0097;color: #fff;">' + name1[3] + '</li>')
		}
	}, 1000)
	setTimeout(function() {
		if(days >= 22 || days <= 5) {
			$('.box').append('<li style="background: yellowgreen;color: #fff;">' + name1[4] + '</li>')
		}
	}, 1300)

	//显示当前可用卡
	usable_stuck()

	function usable_stuck() {
		setTimeout(function() {
			var total_value = localStorage.getItem("total_value")
			//				console.log(total_value)
			if(total_value != null) {
				var lis = $('.box li').length;
				//  可用卡数
				var li_l = lis - 1;
				//金额除可用卡数=每个卡要刷额度
				var ovjg = total_value / li_l;
				//					console.log(ovjg)
				var lll = ovjg.toString() //数字转字符串
				//					console.log(lll)
				//					var lll = "0.22222"
				var jgrgx = lll.indexOf(".") //找到点的位置
				//					console.log(jgrgx)
				var aa = jgrgx + 3; //点的位置加3.再截取、保留后两位
				var rr = lll.slice(0, aa)
				//					console.log(rr);

				for(var i = 0; i < li_l; i++) {
					$('.box2').append('<li>' + rr + '</li>')

				}
			}
		}, 1300)

	}
	//调节滚动条位置
	function adjust() {
		setTimeout(function() {
			var dahei = $('.datas ul').height()
			//				console.log(dahei,"滚动条位置")
			$('.datas').scrollTop(dahei)
		}, 0)

	}
	//跳转设置页面
	$('.set_html').click(function() {
		window.location.href = "indexset.html"
	})

	//6.0版加入
	//还款总金额计算与存储++++++++++++++++++++++++++++++
	var ka_res = [];
	//总金额
	var refund_gross = 0;
	var ka_nane1 = ['guangfa', 'jiaotong', 'minsheng', 'xingye', 'zhaoshang', 'zhongxin']
	for(var i = 0; i < ka_nane1.length; i++) {
		//				console.log(ka_nane1[i])
		//暂时存储
		var moment = localStorage.getItem(ka_nane1[i]);
		if(moment != null) {
			refund_gross += Number(moment)
			ka_res.push(moment)
		}

	}
	//				console.log(refund_gross)
	//				console.log(ka_res)
	localStorage.setItem("refund_gross", refund_gross);
	//总金额计算与存储--------------------------	
	$('.should_repay').val(refund_gross + "元")
	
	//还款总天数计算与存储++++++++++++++++++++++++++++++
	var sum_days = [];
	//总天数
	var days_sky = 0;
	var ka_nanesky = ['guangfasky', 'jiaotongsky', 'minshengsky', 'xingyesky', 'zhaoshangsky', 'zhongxinsky']
	for(var i = 0; i < ka_nanesky.length; i++) {
		//				console.log(ka_nane1[i])
		//暂时存储
		var momentsky = localStorage.getItem(ka_nanesky[i]);
		if(momentsky != null) {
			days_sky += Number(momentsky)
			sum_days.push(momentsky)
		}

	}

	localStorage.setItem("days_sky", days_sky);
	$('.dayss').val(days_sky + "天")
	//总金额计算与存储--------------------------	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	//清除
	//		$('.eliminate').click(function(){
	//			var this_ = $(this).index('.eliminate')+1
	//			$('.money'+this_).val('')
	//			$('.day_'+this_).val('')
	//			//计算结果
	//			count();
	//			
	//		})
})
//input 输入框的清除判断
function num(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}
//计算结果
function count() {
	var already = $('.already').val()
//	var dayss = $('.dayss').val()
	//			console.log(already)
	//			console.log(dayss)

	if(already == null || already == "") {
		$('.already').val("")
		$('.already').attr("placeholder", "请填写")
	}else {
		var get_date = localStorage.getItem("refund_gross")
		var days_sky = localStorage.getItem("days_sky")
		var ovr = (Number(already) - get_date) / days_sky
		console.log(ovr)
		//				console.log(get_date)
		//只保留两位小数 .toFixed(2)
		var two_decimals = ovr.toFixed(2)
		//				var two_decimals_ = abs(two_decimals)
		//				console.log(ovr)

		$('.rental').html(-two_decimals)
	}

}