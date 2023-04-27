var VH = window.innerHeight;

function parallax() {
    var s = document.getElementById("lazyDrift");
    
  var yPos = window.pageYOffset;  
  console.log(yPos);
  s.style.top = 0 - yPos/20 + "%"; 
  var scroll = document.getElementById("scroll-wrapper");

  var range = [100,VH*.8];
  if(yPos<range[0]){
    scroll.style.opacity = 1;
  }else if(yPos<range[1]){
    scroll.style.opacity = 1-(yPos - range[0])/(range[1]-range[0])
  }else{
    scroll.style.opacity = 0;
  }

  range = [VH,VH+200];
  if(yPos<range[0]){
    s.style.opacity = 1;
  }else if(yPos<range[1]){
    s.style.opacity = 1-(yPos - range[0])/(range[1]-range[0])
    console.log((yPos - range[0])/(range[1]-range[0]));
  }else{
    s.style.opacity = 0;
  }
  

}

window.addEventListener("scroll", function(){
    parallax(); 
});