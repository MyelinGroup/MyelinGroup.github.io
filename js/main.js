var VH = window.innerHeight;
var VW = window.innerWidth;
var mobile = true;
if(VW>600){mobile=false}
var scrollScale = 60;
if(mobile) scrollScale = 20;

let item = document.getElementById("BodyContainer");
let scroll = document.getElementById("scroll-wrapper");
let s = document.getElementById("lazyDrift");

let oldPos =  item.scrollTop;
let target = item.scrollTop;

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  console.log("HSBDIHBDIfj")
  document.getElementById("BodyContainer").style.overflow = "hidden";
  // if (window.addEventListener) // older FF
  //     window.addEventListener('DOMMouseScroll', preventDefault, false);
  // window.onwheel = preventDefault; // modern standard
  // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  // window.ontouchmove  = preventDefault; // mobile
  // document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
  document.getElementById("BodyContainer").style.overflowY = "scroll";

    // if (window.removeEventListener)
    // //     window.removeEventListener('DOMMouseScroll', preventDefault, false);
    // window.onmousewheel = document.onmousewheel = null; 
    // window.onwheel = null; 
    // window.ontouchmove = null;  
    // document.onkeydown = null;  
}

animationFunctions = []

function throttle(callback, delay) {
  let isThrottled = false;
  let savedArgs;

  function wrapper() {
      if (isThrottled) { 
          savedArgs = arguments; 
          return;
      }

      callback.apply(this, arguments); 

      isThrottled = true;

      setTimeout(() => {
          isThrottled = false; 
          if (savedArgs) {
              wrapper.apply(this, savedArgs); 
              savedArgs = null; 
          }
      }, delay);
  }

  return wrapper;
}


''
function parallax() {
  var yPos = item.scrollTop;
  if(yPos-oldPos > 6000){
    yPos = oldPos + 10;
    
  }else if(yPos-oldPos < -6000){
    yPos = oldPos - 10;
  }
  oldPos = yPos;
  // s.style.top = 0 - yPos/scrollScale + "%"; 
  
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

// item.addEventListener("scroll", function(){
//     target = item.scrollTop;
//     parallax();
    
// });

const parallaxElements = document.querySelectorAll('.parallax-layer');

function handleScroll() { 
    const scrollY = item.scrollTop;
    const scrollProgress = scrollY / (item.scrollHeight - window.innerHeight);

    parallaxElements.forEach(element => {
      if(element.style.opacity == 0){

        return;

      }
      console.log()
        const speed = element.dataset.parallaxSpeed || 0.5; // Get speed from data attribute 
        const offset = scrollProgress * speed * -200; // Customize offset value as needed

        anime({
            targets: element,
            translateY: offset,  
            easing: 'linear', 
            duration: 50  // Adjust for smoother transitions (optional)
        });
    });

}

function openKeyboard(close = false) {
  ele = document.getElementById('hiddenInput')
console.log("keyboard")
  if(close==true){
    ele.blur();
    ele.disabled = true;
    ele.readOnly = true;

  }else{
    ele.focus();

    ele.disabled = false;
    ele.readOnly = false;
  }
  // ele.setAttribute('tabindex', '0');


}
let scrollEventDebounce = true;
function hackerHouseAnimation(){
  const element = document.getElementById('Hackerhouse_inner'); 
  const rect = element.getBoundingClientRect();
  const distanceFromTop = rect.top;
  var cursorBlinker = null;
  if(distanceFromTop<350&&distanceFromTop>-200){
    if(scrollEventDebounce){
      disableScroll();
    scrollEventDebounce= false;
    console.log(item.scrollTop+distanceFromTop)

    anime({
      targets:item,
      easing: 'easeInOutQuad', 
      scrollTop:item.scrollTop+distanceFromTop-80,
      duration: 900,
    });

    anime({
      targets:element,
      easing: 'easeInOutQuad',
      backgroundColor: "#000",
      height: "90vh",
      duration: 1000,
      callback:()=>{}
    });

    anime({
      targets:document.getElementById('Hackerhouse'),
      easing: 'easeInOutQuad', 
      // width: "100vw",
      padding: 0,
      // height: "100vh",
      duration: 1000
    });

    var cursor = true;
    var speed = 600;
    if(cursorBlinker==null){
      openKeyboard();
    var cursorBlinker = setInterval(() => {
      ele = document.getElementsByClassName('cursor_blinking')[0]
      if(cursor) {
        anime({
          targets: ele,
          easing: 'linear', 
          opacity: "1",
          duration: 50,
        });
        cursor = false;
      }else {
        anime({
          targets: ele,
          easing: 'linear', 
          opacity: "0",
          duration: 50,
        });        
        cursor = true;
      }
    }, speed);
  }

    var terminalState = 0;
    var segments = [2,1,1,1,2,2,3,4,5,5,5,5,5]
    var text = "./top_secret/projects/arborhouse.sh"
    var textSplit = [];
    let curIndex = 0;
    let backspaceAnimationRunning = false;

    segments.forEach(x=>{
      if(curIndex>text.length) return;
      if(curIndex+x>text.length) textSplit.concat(text.slice(curIndex));
      textSplit.push(text.slice(curIndex,curIndex+x));
      // console.log(text.slice(curIndex,curIndex+x),curIndex);

      curIndex +=x;

    })

    function terminalTyper(event){

      if(terminalState==textSplit.length){

        if(event.key=="Enter"){          
          enableScroll();
          anime({
            targets: document.getElementById("Terminal_loading"),
            easing: 'linear', 
            opacity: ".7",
            duration: 1000,
          });

          anime({
            targets: document.getElementById("Terminal_Enter_Text"),
            easing: 'linear', 
            opacity: "0",
            duration: 50,
          });

          document.getElementsByClassName('cursor_blinking')[0].style.opacity = 0;
          clearInterval(cursorBlinker);
          cursorBlinker = null;
          window.removeEventListener("keypress",terminalTyper)
          terminalState+=1
          openKeyboard(true);

        }else{
        document.getElementById("Terminal_Enter_Text").textContent="Press Enter"
        if(backspaceAnimationRunning){anime.remove( document.getElementById("Terminal_Enter_Text"));}
          anime({
            targets: document.getElementById("Terminal_Enter_Text"),
            easing: 'easeInOutQuad', 
            keyframes: [
              {opacity: .5},
            ],
            duration: 1000,
          });
        } 
        return;
      }
      console.log(backspaceAnimationRunning)
      if(event.key=="Backspace"){
        if(!backspaceAnimationRunning){
          backspaceAnimationRunning = true
        document.getElementById("Terminal_Enter_Text").textContent="    Keep Typing"

          anime({
            targets: document.getElementById("Terminal_Enter_Text"),
            easing: 'easeInOutQuad', 
            keyframes: [
              {opacity: .85},
              {opacity: 0},
          ],
            duration: 2000,
            loop: true
          });
        }
       
        }else{
          document.getElementById("Terminal_Enter_Text").style.opacity = 0;
          if(backspaceAnimationRunning){anime.remove( document.getElementById("Terminal_Enter_Text"));}
          backspaceAnimationRunning = false;
          terminalState+=1;
          document.getElementById("Terminal_Filler").textContent = "";
          document.getElementById("Terminal").textContent = textSplit.slice(0,terminalState).join("");
        }
    }
    window.addEventListener("keydown",terminalTyper)

    


  }
  }else{
    scrollEventDebounce = true;
  }




}


animationFunctions.push(handleScroll)
animationFunctions.push(parallax)
animationFunctions.push(hackerHouseAnimation)



// var calEle = document.getElementById('calenderEle');

// var settings={
//   Color: '#999',                //(string - color) font color of whole calendar.
//   LinkColor: '#333',            //(string - color) font color of event titles.
//   NavShow: true,                //(bool) show navigation arrows.
//   NavVertical: false,           //(bool) show previous and coming months.
//   NavLocation: '#foo',          //(string - element) where to display navigation, if not in default position.
//   DateTimeShow: true,           //(bool) show current date.
//   DateTimeFormat: 'mmm, yyyy',  //(string - dateformat) format previously mentioned date is shown in.
//   DatetimeLocation: '',         //(string - element) where to display previously mentioned date, if not in default position.
//   EventClick: '',               //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
//   EventTargetWholeDay: false,   //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
//   DisabledDays: [],             //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
//   ModelChange: model            //(array of objects) new data object to pass into calendar (serving suggestion: passing through only the currently selected month's events if working with large dataset.
// }

// var events = [
//   {'Date': new Date(2023, 8, 20), 'Title': 'Doctor appointment at 3:25pm.'},
//   {'Date': new Date(2023, 8, 17), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
//   {'Date': new Date(2023, 8, 11), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
// ];

// caleandar(calEle, events);

//Click Through Functionality
// $('#ScrollBody').click(e => {
//   $('#ScrollBody').hide();
//   $(document.elementFromPoint(e.clientX, e.clientY)).trigger("click");
//   $('#ScrollBody').show();
// });
var popUpDisabled = true;

  document.addEventListener("DOMContentLoaded", function() { //pop up notif scripting
    const menu = document.getElementById("popUpMenu");
    const closeButton = document.getElementById("close-button");
    const continueButton = document.getElementById("continue-button");
    const bellIcon = document.getElementById("bell-icon");

    // Show menu on load
    if(!popUpDisabled){

    menu.style.display = "flex";

    // Function to close menu and unfreeze background scrolling
    const closeMenu = () => {
      menu.style.display = "none";
    };
    const showMenu = () => {
      menu.style.display = "flex";
    };

    // Close menu on 'X' or 'Continue'
    closeButton.addEventListener("click", closeMenu);
    bellIcon.addEventListener("click", showMenu);
  }else{
    menu.style.display = "none";
    bellIcon.style.display = "none";


  }

  
  });


document.addEventListener("DOMContentLoaded", function() {
  console.log(document.getElementById("lazyDrift").style);
  function animationLoop(){
    animationFunctions.forEach(ele =>{
      ele();

    });
    requestAnimationFrame(animationLoop)
  }
  requestAnimationFrame(animationLoop)

  document.getElementById("Terminal_outer").addEventListener("click",openKeyboard)

  // item.addEventListener('scroll', handleScroll);

});