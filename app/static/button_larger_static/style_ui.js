/* s : 커스텀 슬라이드 함수 */
var customSlideFn = function(wrapper, options) {
	options = options || {};
	var loop = options.loop== false ? false : true;
	var categoryWrap = $(wrapper);
	var categoryInner = options.innerWrap || $('.slideInnerWrap', categoryWrap);
	var slideWrap = $('> ul', categoryInner);
	var menuEle = $('li', slideWrap);
	var btnPrev = $('.btnPrev', categoryWrap);
	var btnNext = $('.btnNext', categoryWrap);
	var speed = options.speed || 700;
	var eleW = [] // 각요소의 넓이를 저장한다.
		, totalW = 0 // 전체넓이를 구하기위해 0으로 값셋팅
		, setMaxW = options.setMaxW == true ? true : false // 요소의 가장 큰 넓이로 셋팅한다.
		, eleMaxW = 0
		, viewW = categoryInner.outerWidth();//슬라이드 뷰영역 넓이
	var lastIdx = options.lastIdx || menuEle.length-1// 리스트 요소 마지막 인덱스 값
		, firstIdx = options.firstIdx || 0// first index설정
		, oldIdx = firstIdx // 이전 인덱스
		, newIdx = firstIdx; // 현재 인덱스
	var posC = categoryInner.outerWidth() / 2; //wrapper의 넓이 반값을 구한다.
	var maxP // 다음이동시 최대로 움직일수 있는값
		, slideWrapPosL //움지기는 요소의 left값;
	var plusW = options.plusW || 0;// 볼드시 폰트사이즈 변경으로 텍스트 떨어지는 현상 막기위해 각요소의 넓이값에 더함
	var areaMove = options.areaMove == false ? false : true;
	var disabledClass = options.disabledClass//좌우 버튼 disabled 클래스string
		, btnDisabled = options.btnDisabled || false;
	var isSlideState = true;
	var eleAlign = options.eleAlign || 'center';//요소이동시 left/center/right 위치 지정 기본 center


	if(!loop) {
		if(oldIdx == firstIdx) {
			btnPrev.addClass('disabled');
		}else if(oldIdx == lastIdx) {
			btnNext.addClass('disabled');
		}
	}

	$('> ul li', categoryInner).each(function(i) {
		var _this = $(this);
		var _thisW = Math.ceil(_this.outerWidth())+ plusW;

		eleW[i] = _thisW;
		_this.css('width', _thisW).data('distL', totalW);
		totalW += _thisW;

		if(setMaxW) {//요소중 가장 큰 넓이값으로 셋팅
			eleMaxW = Math.max(eleW[i], eleMaxW);
			if(lastIdx == i) {
				menuEle.css('width', eleMaxW).data('distL', eleMaxW);
				totalW = eleMaxW * (i+1);
			}
		}
	});

	$('> ul', categoryInner).css('width', totalW);
	maxP = totalW - viewW;
	
	if(maxP <= 0) {
		btnPrev.hide();
		btnNext.hide();
		return {isSlideState : false};
	}else{
		btnPrev.show();
		btnNext.show();
	}
	
	var slideTo = function(idx, mSpeed) {
		newIdx = idx;
		oldIdx = idx;
		moveEleFn(idx, mSpeed);
	}

	var transitionFn = function(mPos, mSpeed) {
		var duration = mSpeed || speed;
		slideWrap.css({
			'left' : -mPos,
			'transition-delay' : options.delay || 0,
			'transition-property' : 'left',
			'transition-duration' : duration +'ms'
		});
		setTimeout(function() {options.slideAfter && options.slideAfter(newIdx, firstIdx, lastIdx, mPos , maxP);}, mSpeed || speed);
	}
	
	slideWrap.on('transitionend', function() {
		if(!options.slideAfter) options.transitionEnd && options.transitionEnd(newIdx, firstIdx, lastIdx, slideWrapPosL , maxP);
	});

	var moveEleFn = function(nIdx, mSpeed) {
		var posL = menuEle.eq(nIdx).data('distL');//각요소에 저장된 position값 left
		var thisW = eleW[nIdx];
		var nowEleC = posC - (thisW / 2);
		var mDist;// 움직일 거리

		if(eleAlign == 'center') {//선택된 요소가 중앙정렬일떄
			mDist = posL - nowEleC;
			
			if(nowEleC < posL && maxP > mDist){
				transitionFn(mDist, mSpeed);
			}else if(maxP < mDist && parseInt(slideWrap.css('left')) != maxP) {
				mDist = maxP;
				transitionFn(mDist, mSpeed);
			}else if(parseInt(slideWrap.css('left')) != 0 || nIdx == lastIdx){
				mDist = 0;
				transitionFn(mDist, mSpeed);
			}
		}else if(eleAlign == 'left') {//선택된 요소가 좌측정렬일때
			mDist = posL;
			if(mDist > maxP) {
				mDist = maxP;
				transitionFn(mDist, mSpeed);
			}else{
				transitionFn(mDist, mSpeed);
			}
		}else if(eleAlign == 'right') {//선택된 요소가 우측정렬일때 
			mDist = posL;
			if(mDist + eleW[nIdx] < viewW) {
				mDist = 0;
				transitionFn(mDist, mSpeed);
			}else{
				mDist = (posL + eleW[nIdx]) - viewW;
				transitionFn(mDist, mSpeed);
			}
		}
		
		options.slideBefore && options.slideBefore(newIdx, firstIdx, lastIdx, mDist, maxP);
	}
	
	var areaMoveFn = function(dir, mSpeed) {
		slideWrapPosL = Math.abs(parseInt(slideWrap.css('left')));
		var remainPos = (totalW - slideWrapPosL) - categoryInner.outerWidth();
		var movingP;

		if(dir == 'next') {
			if(remainPos > posC && remainPos > 0) {
				movingP = slideWrapPosL + posC;
			}else if(remainPos <= posC && remainPos > 0){
				movingP = slideWrapPosL + remainPos;
			}else{
				movingP = 0;
			}
		}else if(dir == 'prev'){
			if(slideWrapPosL > posC && slideWrapPosL > 0) {
				movingP = slideWrapPosL - posC;
			}else if(slideWrapPosL <= posC && slideWrapPosL > 0){
				movingP = 0;
			}else{
				movingP = maxP;
			}
		}
		
		options.slideBefore && options.slideBefore(newIdx, firstIdx, lastIdx, movingP, maxP);
		transitionFn(movingP, mSpeed);
	}
	
	if(!btnDisabled) {//옵션에서 내부 버튼 클릭 요소 컨트롤
		btnPrev.click(function() {
			if($(this).hasClass(disabledClass)) return;

			if(areaMove) {
				areaMoveFn('prev');
			}else{
				newIdx = oldIdx - 1 < firstIdx ? lastIdx : oldIdx - 1;
				if(oldIdx == firstIdx && !loop) {
					newIdx = oldIdx;
					return;
				}
				
				oldIdx = newIdx;
				moveEleFn(newIdx);
			}
		});
		
		btnNext.click(function() {
			if($(this).hasClass(disabledClass)) return;

			if(areaMove) {
				areaMoveFn('next');
			}else{
				newIdx = oldIdx + 1 > lastIdx ? firstIdx : oldIdx + 1;
				if(oldIdx == lastIdx && !loop) {
					newIdx = oldIdx;
					return;
				}
				oldIdx = newIdx;
				moveEleFn(newIdx);
			}
		});
	}
	

	return{
		  slideTo : function(idx, mSpeed) {
			slideTo(idx, mSpeed);
		}
		, getIndex : function() {return oldIdx;}
		, getLastIndex : function() {return lastIdx;}
		, isSlideState : isSlideState
	}
}
/* e : 커스텀 슬라이드 함수 */

/* s : 구매선택박스 */
var select_ui_fn = function(target) {
	var targetWrap = $(target);
	var btnView = $('> .btnSelect', targetWrap);// 선택요소 노출및 오픈버튼
	var optWrap = $('> .selectListBox', targetWrap);// 옵션 리스트ul요소
	var optEle = $('li', optWrap);//option 리스트 li요소 
	var selectVal = btnView.find('input[type=hidden]').val();
	
	btnView.click(function(e) {e.preventDefault();
		optWrap.show();
		optWrap.one('mouseleave', function() {$(this).hide();});
	});
	
	optEle.click(function(e) {e.preventDefault();
		var _this = $(this);
		var _thisIdx = $(this).index();
		settingFn(_thisIdx);
		$('> .btnSelect', targetWrap).focus();
		optWrap.hide();
	});
	
	var settingFn = function(idx) {
		var _cloneItem = optEle.eq(idx).find('.btnSelect > *').clone();

		btnView.empty().append(_cloneItem);
		selectVal = btnView.find('input[type=hidden]').val();
	}
	
	return{
		getVal : function(i) {return btnView.find('input[type=hidden]').val();}
		, setOpt : function(i) {settingFn(i);}
	}
	
}
/* e : 구매선택박스 */