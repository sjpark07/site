//header - nav menu
const mainMenu = document.querySelectorAll('nav > .top_menu > ul > li');
const header = document.querySelector('header');
const initHeight = header.offsetHeight;
let tallestHeight = 0;

for(let mm of mainMenu){
	//서브메뉴의 높이구하기
	let smHeight = mm.querySelector('ul').offsetHeight;	

	if(smHeight > tallestHeight){
		tallestHeight = smHeight;
	}
	let headerHeight = tallestHeight + initHeight + 50;
	
	mm.addEventListener('mouseover',()=>{
		header.style.height = `${headerHeight}px`;
	});
	mm.addEventListener('mouseout',()=>{
		header.style.height = `${initHeight}px`;
	});	
}
// 스크롤시 메뉴색변경
const herder = document.querySelector("nav");

document.addEventListener("scroll", () => {
  if (window.scrollY > 950) {
    herder.classList.add("fixed");
   } else {
    herder.classList.remove("fixed");
   }
   console.log(window.scrollY);
});

//fix image animation
const fix_img1 = document.querySelector(".fix_img1");
document.addEventListener("scroll", () => {
  if (window.scrollY > 896) {
    fix_img1.classList.add("animated1");
   } else {
    fix_img1.classList.remove("animated1");
   }
   console.log(window.scrollY);
});

const fix_img2 = document.querySelector(".fix_img2");
document.addEventListener("scroll", () => {
  if (window.scrollY > 1699) {
    fix_img2.classList.add("animated2");
   } else {
    fix_img2.classList.remove("animated2");
   }
   console.log(window.scrollY);
});

const fix_img3 = document.querySelector(".fix_img3");
document.addEventListener("scroll", () => {
  if (window.scrollY > 2547) {
    fix_img3.classList.add("animated3");
   } else {
    fix_img3.classList.remove("animated3");
   }
   console.log(window.scrollY);
});

const fix_img4 = document.querySelector(".fix_img4");
document.addEventListener("scroll", () => {
  if (window.scrollY > 3415) {
    fix_img4.classList.add("animated4");
   } else {
    fix_img4.classList.remove("animated4");
   }
   console.log(window.scrollY);
});
//event slide
const slideWrapper = document.querySelector('.slide_wrapper');
const slideContainer = slideWrapper.querySelector('.slides');
let slides = slideContainer.querySelectorAll('li');
let currentIdx = 0;
let slideCount = slides.length;
const slideWidth = 375;
const slideMargin = 40;
const moveAmt = slideWidth + slideMargin;
const slideToShow = 3;
const prevBtn = slideWrapper.querySelector('.prev');
const nextBtn = slideWrapper.querySelector('.next');
let timer;

//복사본 생성
//슬라이드 요소를 복사해 뒤에 추가
for(let slide of slides){
  let slideClone = slide.cloneNode(true);
  slideContainer.appendChild(slideClone);
}
//슬라이드 요소를 복사해 앞에 추가
for(let i = 4;i>=0;i--){
  let slideClone = slides[i].cloneNode(true);
  slideContainer.prepend(slideClone);
}

//slideContainer의 너비를 지정
slides = slideContainer.querySelectorAll('li');
let newslideCount = slides.length;

//슬라이드 중앙 배치
slideContainer.style.width = slideWidth*newslideCount+slideMargin *(newslideCount-1)+'px';
slideContainer.style.transform = `translateX(${moveAmt*-slideCount}px)`;

//이동함수
function moveSlide(idx){
  slideContainer.style.left = `${-idx*moveAmt}px`;
  currentIdx = idx;

  if(currentIdx == -slideCount || currentIdx == slideCount){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = 0;
    },500);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },550);
    
    currentIdx = 0;
  }
  console.log(currentIdx);
}
//이전 버튼으로 이동하기
/*
prevBtn.addEventListener('click',()=>{  
  moveSlide(currentIdx-1); 
});

//다음 버튼으로 이동하기
nextBtn.addEventListener('click',()=>{  
  moveSlide(currentIdx+1); 
});
*/
prevBtn.addEventListener('click',debounce(()=>{
  moveSlide(currentIdx-1);
},500));
nextBtn.addEventListener('click',debounce(()=>{
  moveSlide(currentIdx+1); 
},500));

//debounce 

function debounce(callback, time){
  console.log(typeof(callback));
  let slideTrigger = true;
  console.log(slideTrigger);
  return ()=>{
    if(slideTrigger){
      callback();
      slideTrigger = false;
      setTimeout(()=>{
        slideTrigger = true;
      },time);
    }
    console.log(slideTrigger);
  }
  console.log(slideTrigger);
}

window.addEventListener('keydown', (e) => {
  debounce(() => {
    if (e.key === 'ArrowRight') {
      moveSlide(currentIdx + 1); 
    }
    if (e.key === 'ArrowLeft') {
      moveSlide(currentIdx - 1); 
    }
  }, 500)();
});

function autoSlide(){
  timer = setInterval(()=>{
    moveSlide(currentIdx+1); 
  }, 4000);
}

//ul에 마우스가 들어오면 멈추기, 나가면 다시 시작
slideContainer.addEventListener('mouseenter',()=>{
  clearInterval(timer);
});
slideContainer.addEventListener('mouseleave',()=>{
  autoSlide();
});
let xAxis = {
  downX:0,
  upX:0
}
let yAxis = {
  downY:0,
  upY:0
}

slideContainer.addEventListener('mousedown',(e)=>{
  xAxis.downX = e.clientX;
  yAxis.downY = e.clientY;
});
slideContainer.addEventListener('mouseup',(e)=>{
  xAxis.upX = e.clientX;
  yAxis.upY = e.clientY;
  let differenceX;
  let differenceY;

  differenceX = Math.abs(xAxis.downX - xAxis.upX);
  differenceY = Math.abs(yAxis.downY - yAxis.upY);

  if(differenceX > differenceY){
    if(xAxis.upX >= xAxis.downX){//swipe to right
      console.log('right');
      moveSlide(currentIdx - 1); 
    } else{//swipe to left
      console.log('left');
      moveSlide(currentIdx + 1); 
    }
  } else{
    if(yAxis.upY >= yAxis.downY){//swipe to bottom
      console.log('bottom');
    }else{//swipe to top
      console.log('top');
    }
  }
});

//recommend slide

//beverage
const slideWrapper2 = document.querySelector('.slide_wrapper_be');
const slideContainer2 = slideWrapper2.querySelector('.slides_be');
let slides2 = slideContainer2.querySelectorAll('.be');
let currentIdx2 = 0;
let slideCount2 = slides2.length;
const slideWidth2 = 350;
const slideMargin2 = 30;
const moveAmt2 = slideWidth2 + slideMargin2;
const slideToShow2 = 2;
const prevBtn2 = slideWrapper2.querySelector('.prev_be');
const nextBtn2 = slideWrapper2.querySelector('.next_be');
let timer2;

//복사본 생성
//슬라이드 요소를 복사해 뒤에 추가
for(let slide2 of slides2){
  let slideClone2 = slide2.cloneNode(true);
  slideContainer2.appendChild(slideClone2);
}
//슬라이드 요소를 복사해 앞에 추가
for(let ii = 3;ii>=0;ii--){
  let slideClone2 = slides2[ii].cloneNode(true);
  slideContainer2.prepend(slideClone2);
}

//slideContainer2의 너비를 지정
slides2 = slideContainer2.querySelectorAll('.be');
let newslideCount2 = slides2.length;

//슬라이드 중앙 배치
slideContainer2.style.width = slideWidth2*newslideCount2+slideMargin2 *(newslideCount2-1)+'px';
slideContainer2.style.transform = `translateX(${moveAmt2*-slideCount2}px)`;

//이동함수
function moveSlide2(idx2){
  slideContainer2.style.left = `${-idx2*moveAmt2}px`;
  currentIdx2 = idx2;

  if(currentIdx2 == -slideCount2 || currentIdx2 == slideCount2){
    setTimeout(()=>{
      slideContainer2.classList.remove('animated');
      slideContainer2.style.left = 0;
    },500);
    setTimeout(()=>{
      slideContainer2.classList.add('animated');
    },550);
    
    currentIdx2 = 0;
  }
  console.log(currentIdx2);
}
//이전 버튼으로 이동하기
/*
prevBtn.addEventListener('click',()=>{  
  moveSlide2(currentIdx2-1); 
});

//다음 버튼으로 이동하기
nextBtn.addEventListener('click',()=>{  
  moveSlide2(currentIdx2+1); 
});
*/
prevBtn2.addEventListener('click',debounce2(()=>{
  moveSlide2(currentIdx2-1);
},500));
nextBtn2.addEventListener('click',debounce2(()=>{
  moveSlide2(currentIdx2+1); 
},500));

//debounce 

function debounce2(callback2, time2){
  console.log(typeof(callback2));
  let slideTrigger2 = true;
  console.log(slideTrigger2);
  return ()=>{
    if(slideTrigger2){
      callback2();
      slideTrigger2 = false;
      setTimeout(()=>{
        slideTrigger2 = true;
      },time2);
    }
    console.log(slideTrigger2);
  }
  console.log(slideTrigger2);
}

// window.addEventListener('keydown', (ee) => {
//   debounce2(() => {
//     if (ee.key === 'ArrowRight') {
//       moveSlide2(currentIdx2 + 1); 
//     }
//     if (ee.key === 'ArrowLeft') {
//       moveSlide2(currentIdx2 - 1); 
//     }
//   }, 500)();
// });

function autoSlide2(){
  timer = setInterval(()=>{
    moveSlide2(currentIdx2+1); 
  }, 4000);
}

// //ul에 마우스가 들어오면 멈추기, 나가면 다시 시작
// slideContainer2.addEventListener('mouseenter',()=>{
//   clearInterval(timer2);
// });
// slideContainer2.addEventListener('mouseleave',()=>{
//   autoSlide2();
// });
// let xAxis2 = {
//   downX:0,
//   upX:0
// }
// let yAxis2 = {
//   downY:0,
//   upY:0
// }

// slideContainer2.addEventListener('mousedown',(ee)=>{
//   xAxis2.downX = ee.clientX;
//   yAxis2.downY = ee.clientY;
// });
// slideContainer2.addEventListener('mouseup',(ee)=>{
//   xAxis.upX = ee.clientX;
//   yAxis.upY = ee.clientY;
//   let differenceX;
//   let differenceY;

//   differenceX = Math.abs(xAxis.downX - xAxis.upX);
//   differenceY = Math.abs(yAxis.downY - yAxis.upY);

//   if(differenceX > differenceY){
//     if(xAxis.upX >= xAxis.downX){//swipe to right
//       console.log('right');
//       moveSlide(currentIdx2 - 1); 
//     } else{//swipe to left
//       console.log('left');
//       moveSlide(currentIdx2 + 1); 
//     }
//   } else{
//     if(yAxis.upY >= yAxis.downY){//swipe to bottom
//       console.log('bottom');
//     }else{//swipe to top
//       console.log('top');
//     }
//   }
// });


//dessert
const slideWrapper3 = document.querySelector('.slide_wrapper_ds');
const slideContainer3 = slideWrapper3.querySelector('.slides_ds');
let slides3 = slideContainer3.querySelectorAll('.ds');
let currentIdx3 = 0;
let slideCount3 = slides3.length;
const slideWidth3 = 350;
const slideMargin3 = 30;
const moveAmt3 = slideWidth3 + slideMargin3;
const slideToShow3 = 2;
const prevBtn3 = slideWrapper3.querySelector('.prev_ds');
const nextBtn3 = slideWrapper3.querySelector('.next_ds');
let timer3;

//복사본 생성
//슬라이드 요소를 복사해 뒤에 추가
for(let slide3 of slides3){
  let slideClone3 = slide3.cloneNode(true);
  slideContainer3.appendChild(slideClone3);
}
//슬라이드 요소를 복사해 앞에 추가
for(let iii = 3;iii>=0;iii--){
  let slideClone3 = slides3[iii].cloneNode(true);
  slideContainer3.prepend(slideClone3);
}

//slideContainer3의 너비를 지정
slides3 = slideContainer3.querySelectorAll('.ds');
let newslideCount3 = slides3.length;

//슬라이드 중앙 배치
slideContainer3.style.width = slideWidth3*newslideCount3+slideMargin3 *(newslideCount3-1)+'px';
slideContainer3.style.transform = `translateX(${moveAmt3*-slideCount3}px)`;

//이동함수
function moveSlide3(idx3){
  slideContainer3.style.left = `${-idx3*moveAmt3}px`;
  currentIdx3 = idx3;

  if(currentIdx3 == -slideCount3 || currentIdx3 == slideCount3){
    setTimeout(()=>{
      slideContainer3.classList.remove('animated');
      slideContainer3.style.left = 0;
    },500);
    setTimeout(()=>{
      slideContainer3.classList.add('animated');
    },550);
    
    currentIdx3 = 0;
  }
  console.log(currentIdx3);
}
//이전 버튼으로 이동하기
/*
prevBtn.addEventListener('click',()=>{  
  moveSlide(currentIdx3-1); 
});

//다음 버튼으로 이동하기
nextBtn.addEventListener('click',()=>{  
  moveSlide(currentIdx3+1); 
});
*/
prevBtn3.addEventListener('click',debounce3(()=>{
  moveSlide3(currentIdx3-1);
},500));
nextBtn3.addEventListener('click',debounce3(()=>{
  moveSlide3(currentIdx3+1); 
},500));

//debounce 

function debounce3(callback3, time3){
  console.log(typeof(callback3));
  let slideTrigger3 = true;
  console.log(slideTrigger3);
  return ()=>{
    if(slideTrigger3){
      callback3();
      slideTrigger3 = false;
      setTimeout(()=>{
        slideTrigger3 = true;
      },time3);
    }
    console.log(slideTrigger3);
  }
  console.log(slideTrigger3);
}

// window.addEventListener('keydown', (eee) => {
//   debounce3(() => {
//     if (eee.key === 'ArrowRight') {
//       moveSlide3(currentIdx3 + 1); 
//     }
//     if (eee.key === 'ArrowLeft') {
//       moveSlide3(currentIdx3 - 1); 
//     }
//   }, 500)();
// });

function autoSlide3(){
  timer = setInterval(()=>{
    moveSlide3(currentIdx3+1); 
  }, 4000);
}

// //ul에 마우스가 들어오면 멈추기, 나가면 다시 시작
// slideContainer3.addEventListener('mouseenter',()=>{
//   clearInterval(timer3);
// });
// slideContainer3.addEventListener('mouseleave',()=>{
//   autoSlide3();
// });
// let xAxis = {
//   downX:0,
//   upX:0
// }
// let yAxis = {
//   downY:0,
//   upY:0
// }

// slideContainer2.addEventListener('mousedown',(e)=>{
//   xAxis.downX = e.clientX;
//   yAxis.downY = e.clientY;
// });
// slideContainer2.addEventListener('mouseup',(e)=>{
//   xAxis.upX = e.clientX;
//   yAxis.upY = e.clientY;
//   let differenceX;
//   let differenceY;

//   differenceX = Math.abs(xAxis.downX - xAxis.upX);
//   differenceY = Math.abs(yAxis.downY - yAxis.upY);

//   if(differenceX > differenceY){
//     if(xAxis.upX >= xAxis.downX){//swipe to right
//       console.log('right');
//       moveSlide(currentIdx2 - 1); 
//     } else{//swipe to left
//       console.log('left');
//       moveSlide(currentIdx2 + 1); 
//     }
//   } else{
//     if(yAxis.upY >= yAxis.downY){//swipe to bottom
//       console.log('bottom');
//     }else{//swipe to top
//       console.log('top');
//     }
//   }
// });








//MAP

var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}