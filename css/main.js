var VH = window.innerHeight;
var VW = window.innerWidth;
var mobile = true;
if(VW>600){mobile=false}
var scrollScale = 40;
if(mobile) scrollScale = 20;


window2 = $(window)
let scroll = document.getElementById("scroll-wrapper");
let s = document.getElementById("lazyDrift");

console.log(scroll)

function parallax() {
  var yPos = window2.scrollTop();
  s.style.top = 0 - yPos/scrollScale + "%"; 
  
  var range = [100,VH*.8];
  if(yPos<range[0]){
    scroll.style.opacity = 1;
  }else if(yPos<range[1]){
    scroll.style.opacity = 1-(yPos - range[0])/(range[1]-range[0])
  }else{
    scroll.style.opacity = 0;
  }

  range = [VH,(VH*2.5)];
  if(yPos<range[0]){
    s.style.opacity = 1;
  }else if(yPos<range[1]){
    s.style.opacity = 1-(yPos - range[0])/(range[1]-range[0])
  }else{
    s.style.opacity = 0;
  }
  

}

window.addEventListener("scroll", function(){
    parallax(); 
});