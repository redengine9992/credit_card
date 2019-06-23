//确认按扭
		$('#affirm').click(function(){
			count();
		})
		//重置数据
		$('#reset').click(function(){
			$('input').val('')
			$('.rental').html('')
		})
		
		//清除
		$('.eliminate').click(function(){
			var this_ = $(this).index('.eliminate')+1
			$('.money'+this_).val('')
			$('.day_'+this_).val('')
			//计算结果
			count();
			
		})
		
		//input 输入框的清除判断
		function num(obj){
			obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
			obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
			obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
		}
		//计算结果
		function count(){
			var ovr1 = $('.epual_to1').html($('.money1').val()/$('.day_1').val())
			var ovr2 = $('.epual_to2').html($('.money2').val()/$('.day_2').val())
			var ovr3 = $('.epual_to3').html($('.money3').val()/$('.day_3').val())
			var ovr4 = $('.epual_to4').html($('.money4').val()/$('.day_4').val())
			var ovr5 = $('.epual_to5').html($('.money5').val()/$('.day_5').val())
			
//			var totalvalue = (Number(ovr1.html())+Number(ovr2.html())+Number(ovr3.html())+Number(ovr4.html())+Number(ovr5.html())).toFixed(2)
			var totalvalue =Number(ovr1.html())+Number(ovr2.html())+Number(ovr3.html())+Number(ovr4.html())+Number(ovr5.html())
			//只保留两位小数 .toFixed(2)
			var two_decimals = totalvalue.toFixed(2)
//			console.log(two_decimals)
			//已有金额
			var nndes = $('.nnde').val()
//			console.log(nndes)
			
			$('.rental').html(two_decimals-nndes)
		}