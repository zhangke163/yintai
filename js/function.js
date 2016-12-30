//2016-8-4
//解决获取类名的兼容问题
//classname：被定位的类名
//father：父类
function getClass(classname,father){
	father=father||document;  //父元素的初始化
	if(father.getElementsByClassName){
		return father.getElementsByClassName(classname);
	}else{
		var arr=father.getElementsByTagName("*");
		var newarr=[];
		for (var i = 0; i <= arr.length - 1; i++) {
			if(checkPre(arr[i].className,classname)){
				newarr.push(arr[i]);
			}
		}
		return newarr;
	}
}

function checkPre(str,classname){
	var a=str.split(" ");
	for(var i in a){
		if(a[i]==classname){
			return true;
		}
	}
	return false;
}

//2016-8-5
//解决获取样式的兼容函数，通用
//obj：对象
//attr：属性
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}

/***********************************************/
//1.获取元素的兼容函数
function $(selecter,father){
	if(typeof selecter=="string"){
		father=father||document;
		selecter=selecter.replace(/^\s*|\s*$/g,"")
		if(selecter.charAt(0)=="."){
			return getClass(selecter.slice(1),father);
		}else if(selecter.charAt(0)=="#"){
			return document.getElementById(selecter.slice(1));
		}else if(/^[a-z]+\d*$/g.test(selecter)){
			return father.getElementsByTagName(selecter);
		}
	}else if(typeof selecter=="function"){
		window.onload=function(){
			selecter();
		}
	}
}
/*
理解这个函数：
function aa(callback){
	box.onclick=function(){
		callback();
	}
}

aa(function(){
	alert(1);
})

 */
//2016年8月10日
//4.获取节点中的子节点
//father :父节点
//type ："a" 表示子节点只有元素节点  "b" 子节点有元素节点与文字节点
function getChilds(father,type){
	type=type||"a";
	var all=father.childNodes;
	var arr=[];
	for(var i=0;i<all.length;i++){
		if(type=="a"){
			if(all[i].nodeType==1){
				arr.push(all[i]);
			}
		}else if(type=="b"){
			if(all[i].nodeType==1||(all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
				arr.push(all[i]);
			}
		}
	}
	return arr;
}

//5.获取第一个一个子节点
function getFirst(father){
	return getChilds(father)[0];
}

//6.获取最后一个子节点
function getLast(father){
	var a=getChilds(father);
	return a[a.length-1];
}

//获取指定的子节点
function getOneChild(father,num){
	return getChilds(father)[num];
}

//8.获取下一个兄弟节点
function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	}
	while(next.nodeType==3 || next.nodeType==8){
		next=next.nextSibling;
		if(!next){
			return false;
		}
	}
	return next;
}

//9.获取上一个兄弟节点
function getPre(obj){
	var pre=obj.previousSibling;
	if(!pre){
		return false;
	}
	while(pre.nodeType==3 || pre.nodeType==8){
		pre=pre.previousSibling;
		if(!pre){
			return false;
		}
	}
	return pre;
}

//2016年8月11日
//10.把一个元素插入到某一个元素之后
//oldobj 是原来的元素
//newobj 是要插入的元素
//father 是原来的元素的父元素
function insertAfter(newobj,oldobj,father){
	father=father||document.body;
	var next=getNext(oldobj);
	if(next){
		father.insertBefore(newobj,next);
	}else{
		father.appendChild(newobj);
	}
}

//2016年8月11日
//11.绑定事件的兼容函数
//event:事件
//fun:事件处理程序
function addEvent(obj,event,fun,bool){
	if(obj.attachEvent){
		return obj.attachEvent("on"+event,function(){
			fun.call(obj);
		});
	}else{
		return obj.addEventListener(event,fun,false);
	}
}

//2016年8月15日
//12.兼容滚轮函数
//obj是滚轮事件的对象
//unfun是向上滚动的回调函数
//downdun是向下滚动的回调函数
function mouseWheel(obj,upfun,downfun){
	if(document.attachEvent){
		document.attachEvent("onmousewheel",scrollFn);//IE、 opera
	}else if(document.addEventListener){
		document.addEventListener("mousewheel",scrollFn,false);//chrome,safari   -webkit-
		document.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
	}
	function scrollFn(e){//定义事件处理程序
		var eve=e||window.event;
		if(eve.preventDefault){
			eve.preventDefault();
		}else{
			eve.returnValue=false;
		}
		//console.dir(e)
		var fangxiang=eve.wheelDelta||eve.detail;
		// alert(fangxiang)
		// FF 向上-3 向下 3
		// IE 向上120   向下-120
		// chrome 向上120   向下-120
		if(fangxiang==-3 || fangxiang==120){
			if(upfun){
				upfun();
			}
		}else if(fangxiang==3 || fangxiang==-120){
			if(downfun){
				downfun();
			}
		}
		
	}
	//事件对象.wheelDelta  获取滚轮滚动的方向 IE
	//事件对象.detail      获取滚轮滚动的方向 FF
}

//2016年8月16日
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
