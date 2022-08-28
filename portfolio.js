let navbar = document.getElementById("navbar");
let hamburgericon = document.getElementById("hamburgericon");
let introducImage = document.getElementById("introducImage");

const height = introducImage.clientHeight;
const width = introducImage.clientWidth;
if (!window.screen.width < 700) {
  document.querySelector("body").style.overflowX = "hidden";
}
//getting all sections
const sections = document.querySelectorAll("section");

// getting all li from ul(navbar)
const navlist = document.querySelectorAll("nav ul li");

// tab active with scrolling according to section
function sectionActive() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });
  navlist.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
}

// this function is used for handling mobile responsiveness
function handleMobileResponsiveness() {
  if (window.screen.width < 700) {
    document.getElementById("line").classList.remove("line");
    document.getElementById("line2").classList.remove("line2");
    document.getElementById("line3").classList.remove("line");
    document.getElementById("vertical").classList.remove("vertical");
    document.getElementById("circle1").classList.remove("circle1");
    document.getElementById("circle2").classList.remove("circle1");
    document.getElementById("circle3").classList.remove("circle1");
    // document.getElementById("about1").classList.remove("mt-5", "mb-5");
    // document.getElementById("about2").classList.remove("mb-5");
    // document.getElementById("about3").classList.remove("mt-5");
    // document.getElementById("about3").classList.add("mt-4");
    // document.getElementById("about2").classList.add("mt-4");
    document.getElementById("home").style.marginTop = "20%";
    document.querySelector("main").style.marginTop = "0px";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("myEmail").style.fontSize = "1.4rem";
	
    document.getElementById("myHometown").style.fontSize = "1.4rem";
    document.getElementById("contactheader").style.marginLeft = "-15px";
    document.getElementById("crossIcon").style.display = "none";
	document.getElementById("downArrow").style.display = "none";

  }

  if (window.screen.width > 800) {
    hamburgericon.parentElement.style.display = "none";
    // document.getElementById("about1").classList.add("mt-5", "mb-5");
    // document.getElementById("about2").classList.add("mb-5");
    // document.getElementById("about3").classList.add("mt-5");
  }
}
handleMobileResponsiveness();

//handling  hover effect on image
// introducImage.addEventListener("mousemove", handleMove);

// function handleMove(e) {
//   const xVal = e.layerX;
//   const yVal = e.layerY;

//   const yRotation = 20 * ((xVal - width / 2) / width);
//   const xRotation = -20 * ((yVal - height / 2) / height);

//   const string =
//     "perspective(500px) scale(1.1) rotateX(" +
//     xRotation +
//     "deg) rotateY(" +
//     yRotation +
//     "deg)";

//   introducImage.style.transform = string;
// }

// introducImage.addEventListener("mouseout", function () {
//   introducImage.style.transform =
//     "perspective(500px) scale(1) rotateX(0) rotateY(0)";
// });

// introducImage.addEventListener("mousedown", function () {
//   introducImage.style.transform =
//     "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
// });

// introducImage.addEventListener("mouseup", function () {
//   introducImage.style.transform =
//     "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
// });

//this is used for show navbar when scrolltop >200
function navbarDisplay() {
  if (document.documentElement.scrollTop > 200 && window.screen.width > 700) {
    navbar.style.display = "block";
  } else if (window.screen.width > 700) {
    navbar.style.display = "none";
  }
}

//this is  used for show arrow icon when scrolltop >300
function upArrowDispaly() {
  let upArrowIcon = document.getElementById("upArrow");
  if (document.documentElement.scrollTop > 500) {
    upArrowIcon.style.display = "block";
    upArrowIcon.children[0].style.display = "inline-block";
  } else {
    upArrowIcon.style.display = "none";
    upArrowIcon.children[0].style.display = "none";
  }
}

// detecting scrolling
window.onscroll = function () {
  sectionActive();
  navbarDisplay();
  upArrowDispaly();
};

let x = document.forms["contactForm"];
let formSuccess = false;
let errorMessage = "something went wrong please try again later."
let formSuccessMessage = "Thank you, you will get reply soon."
//contact us form
x.addEventListener('submit', async (event) => {
	console.log("form");
	event.preventDefault()
	event.stopPropagation();
	if(!formSuccess){
		document.getElementById("submitContactForm").textContent="...Submitting"
let name = document.forms["contactForm"]["name"].value
let email = document.forms["contactForm"]["email"].value
let contactNo=  document.forms["contactForm"]["contactNumber"].value
let message= document.forms["contactForm"]["message"].value
formSuccess = true	
await formSubmitData({name, email, contactNo, message})
document.getElementById("submitContactForm").textContent="Submitted";
x.reset()

}
// if(!name){
// 	let nameError = document.getElementsByClassName("nameError")[0].style.display = "block"
// 	document.getElementById("nameContactForm").style.border ="1px solid #dc3545";

// } else{
// 	let nameError = document.getElementsByClassName("nameError")[0].style.display = "none"
// 	document.getElementById("nameContactForm").style.border ="none"
// }


// if(!email){
// 	let nameError = document.getElementsByClassName("emailError")[0].style.display = "block"
// 	document.getElementById("emailContactForm").style.border ="1px solid #dc3545";
// } else{
// 	let nameError = document.getElementsByClassName("emailError")[0].style.display = "none"
// 	document.getElementById("emailContactForm").style.border ="none"
// }





});

async function formSubmitData({name, email, contactNo, message}){
	
	// if(process && process.env && process?.env?.BASEURL){
	// 	 baseUrl = process?.env?.BASEURL || "https://portfolio-e8010-default-rtdb.firebaseio.com"
	// }else{


	let	baseUrl = "https://portfolio-e8010-default-rtdb.firebaseio.com"
	try {
		const res = await axios.post(`${baseUrl}/portfolio.json`,{
			"name":name,
			"email":email,
			"message":message,
			"contactNo":contactNo
		})
		if(res.status==200){
	toastMsg(false)
		}
	} catch (error) {
		toastMsg(true)
	}

}

// toast message form submitted
function toastMsg(error){
	console.log("got it");
	Toastify({
		text: error ? errorMessage:formSuccessMessage,
		duration: 3000,
		close: true,
		ursor: `pointer`,
		gravity: "top", // `top` or `bottom`
		position: "right", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: error ?  '#d51e1ec4': '#5dc332c9'
		},
		// duration: `2000`,
		padding: `23px 23px`,
		color: `#ffffff`,
		display: `inline-block`,
				// offset: {
		// 	x: 320, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
		// 	y: 320 // vertical axis - can be a number or a string indicating unity. eg: '2em'
		//   },
		// background: `-webkit-linear-gradient(315deg, #73a5ff, #5477f5)`,
		// background:,
		// position: `fixed`,
		// top: `-150px`,
		// right: `15px`,
		// opacity: `0`,
		// transition: `all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)`,
		// borderRadius: `2px`,
		// c
		}).showToast();
}

// for hiding navbar
let crossIcon = document.getElementById("crossIcon");
crossIcon.addEventListener("click", () => {
  navbar.style.visibility = "hidden";
});

// toggling sidebar
hamburgericon.addEventListener("click", () => {
  if (navbar.style.display == "none") {
    // let navbar = document.getElementById("navbar").style
    navbar.style.display = "block";
    navbar.style.position = "fixed";
    let body = document.querySelector("body");
    if (body && body.classList) {
      body.classList.add("stop-scrolling");
    }
  } else {
    navbar.style.display = "none";
  }
});

//for hiding sidebar
const navlist2 = document.querySelectorAll("nav ul li a");
navlist2.forEach((li) => {
  li.addEventListener("click", () => {
    navbar.style.display = "none";
    let body = document.querySelector("body");
    if (body && body.classList) {
      body.classList.remove("stop-scrolling");
    }
  });
});