let navbar = document.getElementById("navbar");
let hamburgericon = document.getElementById("hamburgericon");
let introducImage = document.getElementById("introducImage");
let contactUsForm = document.forms["contactForm"];
// let formSuccess = false;
let errorMessage = "Something went wrong please try again later"
let formSuccessMessage = "Gracias, Sunil will be reached out to you via email."
const height = introducImage.clientHeight;
const width = introducImage.clientWidth;
const navlist2 = document.querySelectorAll("nav ul li a");
let captchaToken=null;
//  overflow hidden below 700px screen width
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
	document.getElementById("home").classList.remove("homeSection");
    document.getElementById("vertical").classList.remove("vertical");
    document.getElementById("circle1").classList.remove("circle1");
    document.getElementById("circle2").classList.remove("circle1");
    document.getElementById("circle3").classList.remove("circle1");
    document.getElementById("home").style.marginTop = "20%";
    document.querySelector("main").style.marginTop = "0px";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("myEmail").style.fontSize = "1.4rem";
    document.getElementById("myHometown").style.fontSize = "1.4rem";
    document.getElementById("contactheader").style.marginLeft = "-15px";
    document.getElementById("crossIcon").style.display = "none";
	document.getElementsByClassName("removePadding")[0].classList.remove("removePadding")
	// document.getElementById("downArrow").style.display = "none";
	//hide sidebar
	hideSidebar()
  }

// show sidebar icon
  if (window.screen.width < 700) {
    hamburgericon.parentElement.style.display = "inline-block";
  }
}

handleMobileResponsiveness();

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
	if (window.screen.width < 700) {
  let upArrowIcon = document.getElementById("upArrow");
  if (document.documentElement.scrollTop > 500) {
    upArrowIcon.style.display = "block";
    upArrowIcon.children[0].style.display = "inline-block";
  } else {
    upArrowIcon.style.display = "none";
    upArrowIcon.children[0].style.display = "none";
  }
}
}

// detecting scrolling
window.onscroll = function () {
  sectionActive();
  navbarDisplay();
	  upArrowDispaly();
};



//contact us form
contactUsForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	event.stopPropagation();
	var response = await grecaptcha.getResponse();
	

if(response.length == 0){
	Toastify({
		text: "Please confirm you are not robot",
		duration: 4000,
		close: true,
		toastId:"googleCaptchaConfirmError",
		cursor: `pointer`,
		gravity: "top", 
		position: "right", 
		style: {
			background: '#d51e1ec4'
		},
		padding: `23px 23px`,
		color: `#ffffff`,
		display: `inline-block`,
		}).showToast()
	return; 
}
	// if(!formSuccess){
		let submitState  = document.getElementById("submitContactForm")
	
		// SubmitText="...Submitting"
		// submitState.disabled = true;
let name = contactUsForm["name"].value
let email = contactUsForm["email"].value
let contactNo= contactUsForm["contactNumber"].value
let message= contactUsForm["message"].value

await formSubmitData({name, email, contactNo, message, callback:()=>{
	submitState.textContent ="Submit";
	submitState.disabled=false;
	grecaptcha.reset(); 
contactUsForm.reset();
// formSuccess = true;	
},submitState })


// }
});



// qpi call for storing contact us form values in db
async function formSubmitData({name, email, contactNo, message,callback, submitState}){
	if(!captchaToken) return;

	submitState.textContent = "...Submitting";
	submitState.disabled = true;

	// dev url
	// const baseUrl ='http://localhost:4000/portfolio/contact-us'
	const baseUrl = 'https://my-first-node-project2.vercel.app/portfolio/v1/contact-us'
	try {
		let contactUsData = {
				"name":name,
				"email":email,
				"message":message ,
				"contact_number":contactNo
			}
		const res = await axios.post(baseUrl,{"contactUsData":contactUsData, token:captchaToken})
		// console.log("res data contact us api", res);
		// {"contactUsData":{"index":0,"code":11000,"keyPattern":{"contact_number":1},"keyValue":{"contact_number":"9087553147"}},"message":"Contactus Details Stored Successfully"}
		if(res.status==201){
			toastMsg(false)
			callback()
		}
	} catch (error) {
		submitState.textContent = "Submit";
		submitState.disabled=false;
		grecaptcha.reset()  
		errorMessage = error?.response?.data?.message ? error?.response?.data?.message :errorMessage;
		// console.log("error while api calling",error?.response?.data?.message);
		toastMsg(true)
	}

}

// toast message form submitted
function toastMsg(error){
	Toastify({
		text: error ? errorMessage:formSuccessMessage,
		duration: 8000,
		close: true,
		toastId:"apiError",
		ursor: `pointer`,
		gravity: "top", 
		position: "right", 
		stopOnFocus: true, 
		style: {
			background: error ?  '#d51e1ec4': '#5dc332c9'
		},
		padding: `23px 23px`,
		color: `#ffffff`,
		display: `inline-block`,
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

// scroll to top on click uparrow icon
document.getElementById("upArrow").addEventListener('click', ()=>{
window.scrollTo(0,0)
})
document.getElementById('topZeroClick').addEventListener('click',()=>{
	window.scrollTo(0,0)	
})

//for hiding sidebar
function hideSidebar(){
navlist2.forEach((li) => {
		li.addEventListener("click", () => {
		  navbar.style.display = "none";
		  let body = document.querySelector("body");
		  if (body && body.classList) {
			body.classList.remove("stop-scrolling");
		  }
		});
	  });
}

// verifyCaptcha
function verifyCaptcha(token){
	// console.log(" verifyCaptcha token",token);
captchaToken=token;

}
