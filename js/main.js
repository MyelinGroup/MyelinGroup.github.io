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


item =  document.getElementById("ScrollBody");
// item.addEventListener("scroll", function(){
//     target = item.scrollTop;
//     parallax();
    
// });

const parallaxElements = document.querySelectorAll('.parallax-layer');

function handleScroll() { 
    const scrollY = item.scrollTop;
    const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);

    parallaxElements.forEach(element => {
      if(element.style.opacity == 0){

        // console.log("Not updating");
        return;

      }
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

let scrollEventDebounce = true;
function hackerHouseAnimation(){
  const element = document.getElementById('Hackerhouse_inner'); 
  const rect = element.getBoundingClientRect();
  const distanceFromTop = rect.top;
  if(distanceFromTop<900&&scrollEventDebounce){
    scrollEventDebounce= false;
    $(item).scrollTop(item.scrollTop+distanceFromTop);
    console.log(item.scrollTop+distanceFromTop)

    anime({
      targets:element,
      easing: 'linear', 
      width: "100vw",
      height: "100vh",
      backgroundColor: "#000",
      duration: 1000
    });

    var cursor = true;
    var speed = 600;
    setInterval(() => {
      if(cursor) {
        document.getElementsByClassName('cursor_blinking')[0].style.opacity = 0;
        cursor = false;
      }else {
        document.getElementsByClassName('cursor_blinking')[0].style.opacity = 1;
        cursor = true;
      }
    }, speed);

    var terminalState = 9;
    function terminalTyper(event){
      var text = [".","/","t","o","p","_se","cr","et","/code_","name","/arboretum.sh"];
      if(terminalState==text.length){
        console.log(event.key);
        if(event.key=="Enter"){          

          Terminal_loading
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

          window.removeEventListener("keypress",terminalTyper)

        }else{
        anime({
          targets: document.getElementById("Terminal_Enter_Text"),
          easing: 'linear', 
          opacity: ".7",
          duration: 1000,
        });
      }

        return;
      }
      terminalState+=1;
      document.getElementById("Terminal_Filler").textContent = "";
      text.slice(0,terminalState)
      document.getElementById("Terminal").textContent = text.slice(0,terminalState).join("");
    }
    window.addEventListener("keypress",terminalTyper)


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

  document.addEventListener("DOMContentLoaded", function() {
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
  function animationLoop(){
    animationFunctions.forEach(ele =>{
      ele();

    });
    requestAnimationFrame(animationLoop)
  }
  requestAnimationFrame(animationLoop)


  // item.addEventListener('scroll', handleScroll);

});