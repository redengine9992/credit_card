
		
		//清除
//		$('.eliminate').click(function(){
//			var this_ = $(this).index('.eliminate')+1
//			$('.money'+this_).val('')
//			$('.day_'+this_).val('')
//			//计算结果
//			count();
//			
//		})
		
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
			var already = $('.already').val()
			var dayss = $('.dayss').val()
//			console.log(already)
//			console.log(dayss)
			
			if(already==null||already==""){
				$('.already').val("")
				$('.already').attr("placeholder","请填写")
			}else if(dayss==null||dayss==""){
				$('.dayss').val("")
				$('.dayss').attr("placeholder","请填写")
			}else{
				var get_date = localStorage.getItem("refund_gross")
				var ovr = (Number(already)-get_date)/Number(dayss)
				console.log(ovr)
//				console.log(get_date)
				//只保留两位小数 .toFixed(2)
				var two_decimals =ovr.toFixed(2)
//				var two_decimals_ = abs(two_decimals)
//				console.log(ovr)
				
				$('.rental').html(-two_decimals)
			}

		}