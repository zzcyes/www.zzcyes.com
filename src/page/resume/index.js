import './index.css'
$(document).ready(function(){
	 $('body').css('visibility','visible');
	//浅青蓝
    $(".bg-gblue a").click(function(){
		$(".sidebar").css("background-color","#00bfa5");	//左侧栏 背景色
		$("aside li").css("background-color","#00bfa5");	//右侧栏 背景色
		
		$(".main a").css("color","#4db6ac");	//main中链接 字体颜色颜色
		$("h4 a").css("border-color","#4db6ac");	//预览按钮 边框色
		$("h5 a").css("border-color","#4db6ac");	//预览按钮 边框色
		
		$(".side-info dt").css("color","#9f3");	//左侧栏 联系方式和应聘岗位 字体颜色
		
		$(".note").css("color","#f0f2f1");	//左侧栏 介绍 文字颜色
		
		$("h3").css("color","#004d40");		//main中小标题 字体颜色
		
		$(".main-info dt").css("color","#00796b");	//main大标题 字体颜色
		$(".main-info dt").css("border-color","#00796b");	//main中大标题下 边框颜色
		$(".circle").css("background","#00796b");	//main左边框圆环 背景颜色
		
		$(".exp").css("border-color","#00796c");	//main中左 边框颜色
		
		$(".main").css("background","#f0f2f1");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});
	
	//红色
	 $(".bg-red a").click(function(){
		$(".sidebar").css("background-color","#FF0033");
		$("aside li").css("background-color","#FF0033");
		
		$(".main a").css("color","#FF6666");
		$("h4 a").css("border-color","#FF6666");
		$("h5 a").css("border-color","#FF6666");
		
		$(".side-info dt").css("color","#8B0000");
		
		$(".note").css("color","#f0f2f1");
		
		$("h3").css("color","#CD3700");
		
		$(".main-info dt").css("color","#CD0000");
		$(".main-info dt").css("border-color","#CD0000");
		$(".circle").css("background","#CD0000");
		
		$(".exp").css("border-color","#CD0001");//main中左 边框颜色
	
		$(".main").css("background","#CCCCFF)");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});
	
	// 橘色
	$(".bg-orange a").click(function(){
		$(".sidebar").css("background-color","#FF9900");
		$("aside li").css("background-color","#FF9900");
		
		$(".main a").css("color","#FF9933");
		$("h4 a").css("border-color","#FF9933");
		$("h5 a").css("border-color","#FF9933");
		
		$(".side-info dt").css("color","#FF6600");
		
		$(".note").css("color","#f0f2f1");
		
		$("h3").css("color","#CD661D");
		
		$(".main-info dt").css("color","#CD8500");
		$(".main-info dt").css("border-color","#CD8500");
		$(".circle").css("background","#CD8500");
		
		$(".exp").css("border-color","#CD8501");//main中左 边框颜色
		
		$(".main").css("border-color","#f0f2f1");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});

	// 黄色
	$(".bg-yellow a").click(function(){
		$(".sidebar").css("background-color","#B8860B");
		$("aside li").css("background-color","#B8860B");
		
		$(".main a").css("color","#CDAD00");
		$("h4 a").css("border-color","#CDAD00");
		$("h5 a").css("border-color","#CDAD00");
		
		$(".side-info dt").css("color","yellow");
		
		$(".note").css("color","#f0f2f1");
		
		$("h3").css("color","#FFB90F");
		
		$(".main-info dt").css("color","#FFC125");
		$(".main-info dt").css("border-color","#FFC125");
		$(".circle").css("background","#FFC125");
		
		$(".exp").css("border-color","#FFC126");//main中左 边框颜色
		
		
		
		$(".main").css("border-color","#f0f2f1");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});
	
	// 绿色
	$(".bg-green a").click(function(){
		$(".sidebar").css("background-color","#00FA9A");
		$("aside li").css("background-color","#00FA9A");
		
		$(".main a").css("color","#7FFF00");
		$("h4 a").css("border-color","#7FFF00");
		$("h5 a").css("border-color","#7FFF00");
		
		$(".side-info dt").css("color","#228B22");
		
		$(".note").css("color","#f0f2f1");
		
		$("h3").css("color","#006400");
		
		$(".main-info dt").css("color","green");
		$(".main-info dt").css("border-color","green");
		$(".circle").css("background","green");
		
		$(".exp").css("border-color","green");//main中左 边框颜色
		
		$(".exp").css("border-color","#00796c");	
		
		$(".main").css("border-color","#f0f2f1");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});
	
	// 蓝色
	$(".bg-blue a").click(function(){
		$(".sidebar").css("background-color","#1E90FF");
		$("aside li").css("background-color","#1E90FF");
		
		$(".main a").css("color","#6495ED");
		$("h4 a").css("border-color","#6495ED");
		$("h5 a").css("border-color","#6495ED");
		
		$(".side-info dt").css("color","#0000CD");
		
		$(".note").css("color","#f0f2f1");
		
		$("h3").css("color","#191970");
		
		$(".main-info dt").css("color","#0000CD");
		$(".main-info dt").css("border-color","#0000CD");
		$(".circle").css("background","#0000CD");
		
		$(".exp").css("border-color","#0000CE");//main中左 边框颜色
		
		
		
		$(".main").css("border-color","#f0f2f1");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});
	
	// 紫色
	$(".bg-purple a").click(function(){
		$(".sidebar").css("background-color","#BF3EFF");
		$("aside li").css("background-color","#BF3EFF");
		
		$(".main a").css("color","#DA70D6");
		$("h4 a").css("border-color","#DA70D6");
		$("h5 a").css("border-color","#DA70D6");
		
		$(".side-info dt").css("color","#8B1C62");
		
		$(".note").css("color","purple");
		$("h3").css("color","#9400D3");
		
		$(".main-info dt").css("color","#8B008B");
		$(".main-info dt").css("border-color","#8B008B");
		$(".circle").css("background","#8B008B");
		
		$(".exp").css("border-color","#8B008C");//main中左 边框颜色
		
		
		
		$(".main").css("border-color","#f0f2f1");	//main 背景颜色
		
		$(".main-info dd").css("border-color","#616161");	//main 字体颜色
		
		//把配色的七种颜色恢复
		$(".bg-gblue").css("background","#00bfa5");
		$(".bg-red").css("background","#FF0033");
		$(".bg-orange").css("background","orange");
		$(".bg-yellow").css("background","#B8860B");
		$(".bg-green").css("background","#00FA9A");
		$(".bg-blue").css("background","#1E90FF");
		$(".bg-purple").css("background","#BF3EFF");
	});
		
		
		
   
	
    //紫色
    $(".photo-head").click(function(){
        const imgs = [1,2,3,4,5,6]
        let radom =parseInt(parseInt(Math.random()*10)%6);
        if(radom>=imgs.legnth){
            radom = 5;
        }
        $(".photo-head").attr("src",`assets/image/head-${imgs[radom]}.jpg`);
    });
});