var VH = window.innerHeight;
var VW = window.innerWidth;
var mobile = true;
if(VW>600){mobile=false}
var scrollScale = 60;
if(mobile) scrollScale = 20;


let item = document.getElementById("ScrollBody");
let scroll = document.getElementById("scroll-wrapper");
let s = document.getElementById("lazyDrift");

let oldPos =  item.scrollTop;
let target = item.scrollTop;

function parallax() {
  var yPos = item.scrollTop;
  if(yPos-oldPos > 6000){
    yPos = oldPos + 10;
    
  }else if(yPos-oldPos < -6000){
    yPos = oldPos - 10;
  }
  oldPos = yPos;
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


item =  document.getElementById("ScrollBody");
item.addEventListener("scroll", function(){
    target = item.scrollTop;
    parallax();
    
});