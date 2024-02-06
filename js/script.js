const slideWrapper = document.querySelector('.slide_wrapper');
const slideContainer = slideWrapper.querySelector('.slides');
const slides = slideContainer.querySelectorAll('li');
let currentIdx = 0;
const slideCount = slides.length;
const slideWidth = 200;
const slideMargin = 30;
const slideToShow = 3;
const prevBtn = slideWrapper.querySelector('.prev');
const nextBtn = slideWrapper.querySelector('.next');

//슬라이드 배치 slideContainer의 너비의 지정

slideContainer.style.width = slideWidth*slideCount + slideMargin*(slideCount-1)+'px';

// `${slideWidth} *3 + ${slideMargin} * ${slideWidth}-1` 
//이동함수
/*
moveSlide 함수는 매개변수 idx가 들어오면 할일
idx숫자를 활용해서 slideContainer의 translateX의 값을 완성한다.
.slideContainer{
    width:100px;
    transform:translate(-230px);
}
*/
function moveSlide(idx){
    slideContainer.style.transform = `translateX(${-idx*(slideWidth + slideMargin)}px)`;
    currentIdx = idx;
}
//다음 버튼으로 이동하기

nextBtn.addEventListener('click',()=>{
  if(currentIdx == (slideCount-slideToShow) ){
    moveSlide(0);
  }
    else {
      moveSlide(currentIdx + 1);
    }
  });
  


  prevBtn.addEventListener('click',()=>{
    if(currentIdx == 0){
      moveSlide(slideCount - slideToShow);
    }
      else {
        moveSlide(currentIdx - 1);
      }
    });

// prevBtn.addEventListener('click',()=>{
//     moveSlide(currentIdx-1);
// });
