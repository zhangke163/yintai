$(function() {
	//遮罩

	function zhuangui() {
		var box = $("li", $(".zhuangui-right-cardboxone")[0]);
		var zhezhao = $(".zhuangui-img-zhezhao");
		for (var i = 0; i < box.length; i++) {
			box[i].index = i;
			box[i].className = "zhuangui-right-cardboxone-" + (i + 1);
			box[i].onmouseover = function() {
				zhezhao[this.index].style.height = this.offsetHeight;
				zhezhao[this.index].style.width = this.offsetWidth;
				animate(zhezhao[this.index], {
					opacity: 0.3
				});
			}
			box[i].onmouseout = function() {
				animate(zhezhao[this.index], {
					opacity: 0
				});
			}
		}
	}
	zhuangui()
	//下拉菜单

	function usetabmeun() {
		var shop = $(".shopping")[0];
		var bag = $(".yt-bags")[0];
		var weixin = $(".weixin")[0];
		var weixina = $(".weixinact")[0];
		var shouji = $(".shouji")[0];
		var shoujia = $(".shoujiact")[0];
		tabmeun(shop, bag)
		tabmeun(weixin, weixina)
		tabmeun(shouji, shoujia)
	}
	usetabmeun()
	// 下拉菜单封装函数

	function tabmeun(father, son) {
		father.onmouseover = function() {
			son.style.display = "block";
		}
		father.onmouseout = function() {
			son.style.display = "none";
		}
		son.onmouseover = function() {
			son.style.display = "block"
		}
		son.onmouseout = function() {
			son.style.display = "none";
		}
	}
	//下拉列表

	function topnavlist() {
		var myyt = $(".wodeyt")[0];
		var myyta = $(".wodeytact")[0];
		hover(myyt, function() {
			myyta.style.display = "block";
			myyta.style.height = 35 + "px";
			animate(myyta, {
				height: 35 * 7
			}, 100);
		}, function() {
			myyta.style.display = "none";
		})
	}
	topnavlist()
	//图片边框动画效果

	function biankuang() {
		var box = $(".linestyle");
		var line_top = $(".line-top");
		var line_left = $(".line-left");
		var line_right = $(".line-right");
		var line_bottom = $(".line-bottom");
		for (var i = 0; i < box.length; i++) {
			box[i].index = i;
			hover(box[i], function() {
				animate(line_top[this.index], {
					width: box[this.index].offsetWidth
				}, 400);
				animate(line_left[this.index], {
					height: box[this.index].offsetHeight
				}, 400);
				animate(line_right[this.index], {
					height: box[this.index].offsetHeight
				}, 400);
				animate(line_bottom[this.index], {
					width: box[this.index].offsetWidth
				}, 400);
			}, function() {
				animate(line_top[this.index], {
					width: 0
				}, 400);
				animate(line_left[this.index], {
					height: 0
				}, 400);
				animate(line_right[this.index], {
					height: 0
				}, 400);
				animate(line_bottom[this.index], {
					width: 0
				}, 400);
			})
		}
	}
	biankuang()

	//楼层图片

	function floornav() {
		var nav = $(".floornav");
		for (var i = 0; i < nav.length; i++) {
			nav[i].className = "floornav floornav" + (i + 1);
		}
	}
	floornav()
	//banner选项卡

	function selectCard3() {
		var btn = $("li", $(".tuijian-card-nav")[0]);
		var card = $(".card-imgsbox");
		var shover = $("s", $(".tuijian-card-nav")[0])
		for (var i = 0; i < card.length; i++) {
			btn[i].index = i;
			btn[i].onmouseover = function() {
				for (var j = 0; j < card.length; j++) {
					card[j].style.display = "none";
					shover[j].style.opacity = "0";
					btn[j].style.borderBottom = "4px solid #333";
				}
				card[this.index].style.display = "block";
				shover[this.index].style.opacity = "1";
				this.style.borderBottom = "4px solid #e5004f";
			}
		}
	}
	selectCard3()
	//banner轮播效果

	function banner() {
		var bannerImg = $("a", $(".class-imgs-imgs")[0]);
		var imgbox = $(".banner-imgs")[0];
		var imgbg = $(".banner-imgbox")[0];
		var lbtn = $(".banner-btnleft")[0];
		var rbtn = $(".banner-btnright")[0];
		var btn = $("li", $(".banner-btnbox")[0]);
		var rightimg = $(".banner-right")[0];
		var leftnav = $(".banner-leftnav")[0];
		var num = 0;
		var btnFlag = false;

		function lunbo(type) {
			type = type || "right";
			if (type == "right") {
				num++;
				if (num >= bannerImg.length) {
					num = 0;
				}
			} else if (type == "left") {
				num--;
				if (num <= -1) {
					num = bannerImg.length - 1;
				}
			}

			for (var j = 0; j < bannerImg.length; j++) {
				bannerImg[j].style.opacity = "0";
				imgbg.style.opacity = "0";
				imgbg.className = ".banner-imgbox";
				btn[j].style.backgroundColor = "#211616";
			}
			imgbg.className = "banner-imgbox banner-imgbox" + (num + 1);
			animate(imgbg, {
				opacity: 1
			}, 200);
			animate(bannerImg[num], {
				opacity: 1
			}, 200);
			btn[num].style.backgroundColor = "#e5004f";
		}
		var t = setInterval(lunbo, 3000);
		lbtn.onclick = function() {
			lunbo("left");
		}
		rbtn.onclick = function() {
			lunbo("right");
		}
		for (var k = 0; k < btn.length; k++) {
			btn[k].index = k;
			btn[k].onmouseover = function() {
				num = this.index - 1;
				lunbo();
			}
		}
		hover(imgbg, function() {
			lbtn.style.display = "block";
			rbtn.style.display = "block";
			clearInterval(t);
			rightimg.onmouseover = function() {
				lbtn.style.display = "none";
				rbtn.style.display = "none";
				animate(rightimg, {
					right: 10
				}, 200);
			}
			rightimg.onmouseout = function() {
				lbtn.style.display = "block";
				rbtn.style.display = "block";
				animate(rightimg, {
					right: -1
				}, 300);
			}
			leftnav.onmouseover = function() {
				lbtn.style.display = "none";
				rbtn.style.display = "none";
			}
			leftnav.onmouseout = function() {
				lbtn.style.display = "block";
				rbtn.style.display = "block";
			}
		}, function() {
			lbtn.style.display = "none";
			rbtn.style.display = "none";
			t = setInterval(lunbo, 3000);
		});

	}
	banner();

	function bannerLeftNav() {
		var yiji = $(".banner-leftnav-yiji");
		var erji = $(".banner-leftnav-erji");
		var yijihover = $(".banner-leftnav-yiji-hover");
		for (var i = 0; i < yiji.length; i++) {
			yiji[i].index = i;
			var yijiImg = $("s", yijihover[i])[0];
			yijiImg.className = "banner-leftnav-icon" + (i + 1);

			hover(yiji[i], function() {
				erji[this.index].style.display = "block";
				this.style.backgroundColor = "#e5004f";
				var yijiImg = $("s", this)[0];
				var yijiB = $("b", this)[0];
				yijiImg.className = yijiImg.className + " " + "banner-leftnav-icon" + (this.index + 1) + "-hover";
				yijiB.style.display = "none";

			}, function() {
				erji[this.index].style.display = "none";
				this.style.backgroundColor = "";
				var yijiImg = $("s", this)[0];
				var yijiB = $("b", this)[0];
				yijiImg.className = "banner-leftnav-icon" + (this.index + 1);
				yijiB.style.display = "block";
			});


		}

	}
	bannerLeftNav()

	//选项卡

	function selectCard4() {
		var nav = $(".nav", $(".zhuangui-rightnavbox")[0]);
		var navjiao = $("s", $(".zhuangui-rightnavbox")[0]);
		var card = $("ul", $(".zhuangui-right")[0]);

		function qingkong() {
			for (var i = 0; i < nav.length; i++) {
				nav[i].style.color = "#777";
				nav[i].style.fontWeight = "normal";
				card[i + 1].style.display = "none";
				nav[i].style.borderBottom = "3px solid #333";
				navjiao[i].style.opacity = "0";
			}
		}
		for (var i = 0; i < nav.length; i++) {
			nav[i].index = i;
			nav[i].onmouseover = function() {
				qingkong();
				this.style.color = "#444";
				this.style.fontWeight = "bold";
				card[this.index + 1].style.display = "block";
				this.style.borderBottom = "3px solid #e5004f";
				navjiao[this.index].style.opacity = "1";
			}
		}
	}
	selectCard4();

	//专栏轮播

	function clnzLunbo() {
		var imgbox = $(".floor-centerbox");
		for (var i = 0; i < imgbox.length; i++) {
			lunbo(i)
		}

		function lunbo(i) {
			var imgs = $(".floor-centerbox-imgs", imgbox[i]);
			var zhezhao = $("a", imgbox[i]);
			var btns = $(".imgbtn", imgbox[i]);
			var lbtn = $(".floor-centerbox-lbtn", imgbox[i])[0];
			var rbtn = $(".floor-centerbox-rbtn", imgbox[i])[0];
			var now = 0;
			var next = 0;
			var ow = imgbox[0].offsetWidth;
			for (var j = 1; j < imgs.length; j++) {
				imgs[j].index = j;
				imgs[j].style.left = 384 + "px";
			}

			function huantu(type) {
				var type = type || "right";
				if (type == "right") {
					next++;
					if (next >= imgs.length) {
						next = 0;
					}
					imgs[now].style.left = 0;
					imgs[next].style.left = ow + "px";
					btns[now].className = "imgbtn";
					btns[next].className = "imgbtn btnact";
					animate(imgs[now], {
						left: -ow - 5
					})
					animate(imgs[next], {
						left: 0
					});
				} else if (type == "left") {
					next--;
					if (next <= -1) {
						next = imgs.length - 1;
					}
					imgs[now].style.left = 0;
					imgs[next].style.left = -ow + "px";
					btns[now].className = "imgbtn";
					btns[next].className = "imgbtn btnact";
					animate(imgs[now], {
						left: ow
					})
					animate(imgs[next], {
						left: 0
					});
				} else if (type == "now") {
					if (next == imgs[now].index) {
						return false;
					}
					imgs[now].style.left = 0;
					imgs[next].style.left = (-ow - 5) + "px";
					btns[now].className = "imgbtn";
					btns[next].className = "imgbtn btnact";
					animate(imgs[now], {
						left: ow
					})
					animate(imgs[next], {
						left: 0
					});
				}
				now = next;
			}
			hover(imgbox[i], function() {
				animate(lbtn, {
					opacity: 0.6
				}, 200);
				animate(rbtn, {
					opacity: 0.6
				}, 200);
				lbtn.onclick = function() {
					huantu("left");
				}
				rbtn.onclick = function() {
					huantu("right");
				}

			}, function() {
				animate(lbtn, {
					opacity: 0
				}, 200);
				animate(rbtn, {
					opacity: 0
				}, 200);
			})
			for (var k = 0; k < btns.length; k++) {
				btns[k].index = k;
				btns[k].onclick = btns[k].onmouseover = function() {
					if (this.index == now) {
						return false;
					}
					next = this.index;
					if (next > now) {
						next++;
						huantu("left");
					}
					if (next < now) {
						next--;
						huantu("right");
					}
				}
			}
			//图片遮罩
			for (var n = 0; n < zhezhao.length; n++) {
				zhezhao[n].onmouseover = function() {
					animate(this, {
						opacity: 0.1
					}, 200);
				}
				zhezhao[n].onmouseout = function() {
					animate(this, {
						opacity: 0
					}, 200);
				}
			}
		}
	}
	clnzLunbo()
	//logo轮播

	function clnzLunbologo() {
		var bigbox = $(".floor-leftbox-bottombox");
		for (var i = 0; i < bigbox.length; i++) {
			lunbo(i)
		}

		function lunbo(i) {
			var logobox = $(".floor-left-bottom-logobox", bigbox[i]);
			var lbtn = $(".floor-left-bottom-lbtn", bigbox[i])[0];
			var rbtn = $(".floor-left-bottom-rbtn", bigbox[i])[0];
			// alert(rbtn)
			var now = 0;
			var next = 0;
			var ow = bigbox[0].offsetWidth;
			for (var j = 1; j < logobox.length; j++) {
				logobox[j].style.left = ow + "px";
			}

			function huantu(type) {
				var type = type || "right";
				if (type == "right") {
					next++;
					if (next >= logobox.length) {
						next = 0;
					}
					logobox[now].style.left = 0;
					logobox[next].style.left = ow + "px";
					animate(logobox[now], {
						left: -ow
					}, 300)
					animate(logobox[next], {
						left: 0
					}, 300);
				} else if (type == "left") {
					next--;
					if (next <= -1) {
						next = logobox.length - 1;
					}
					logobox[now].style.left = 0;
					logobox[next].style.left = -ow + "px";
					animate(logobox[now], {
						left: ow
					}, 300)
					animate(logobox[next], {
						left: 0
					}, 300);
				}
				now = next;
			}
			lbtn.onclick = function() {
				huantu("left");
			}
			rbtn.onclick = function() {
				huantu("right");
			}
		}
	}
	clnzLunbologo()

// 楼层跳转
	var rightbn = $(".right-box")[0];
	document.documentElement.scrollTop = 1;
	if (document.documentElement.scrollTop == 1) {
		var scrollobj = document.documentElement;
	} else {
		var scrollobj = document.body;
	}
	//谷歌兼容

	function lc() {
		var st = scrollobj.scrollTop;
		if (st > 1200) {
			rightbn.style.display = "block";
		} else {
			rightbn.style.display = "none";
		}
	}
	addEvent(window, 'scroll', lc)// 相应高度出现楼层按钮
	var pingpai = $(".floorbox");
	var rightbtns = $(".right-box0");
	var head = $(".topnavbox")[0];
	var returnt = $(".right-box1")[0]
	for (var i = 0; i < rightbtns.length; i++) {
		rightbtns[i].index = i;
		rightbtns[i].onclick = function() {
			var ot = pingpai[this.index].offsetTop;
			animate(scrollobj, {
				scrollTop: ot
			})
		}
	}
	returnt.onclick = function() {
		var ob = head.offsetTop;
		animate(scrollobj, {
			scrollTop: ob
		})
	}
	var pt = []
	for (var i = 0; i < pingpai.length; i++) {
		pt.push(pingpai[i].offsetTop);

	};

	function lc3() {
		for (var i = 0; i < rightbtns.length; i++) {
			if (scrollobj.scrollTop > pt[i] - 300) {
				for (var j = 0; j < rightbtns.length; j++) {
					rightbtns[j].style.cssText = ""
				};
				rightbtns[i].style.cssText = "font-size:14px;background:#e5004f;color:#fff;line-height:18px";

			}
		};
	}// 移入，点击效果
	addEvent(window, "scroll", lc3)
	

	//页尾遮罩

	function yeweizhezhao() {
		var bigbox = $(".qitabigbox")[0];
		var box = $("div", bigbox);
		for (var i = 0; i < box.length; i++) {
			box[i].className = "qitabox-" + (i + 1);
			box[i].onmouseover = function() {
				var img = $("a", this)[0];
				animate(img, {
					opacity: 0.3
				}, 200);
			}
			box[i].onmouseout = function() {
				var img = $("a", this)[0];
				animate(img, {
					opacity: 0
				}, 200);
			}
		}
	}
	yeweizhezhao()



})