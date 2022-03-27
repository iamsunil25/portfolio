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
        document.getElementById("about1").classList.remove("mt-5", "mb-5");
        document.getElementById("about2").classList.remove("mb-5");
        document.getElementById("about3").classList.remove("mt-5");
        document.getElementById("about3").classList.add("mt-4");
        document.getElementById("about2").classList.add("mt-4");
        document.getElementById("navbar").style.display = "none";
        document.getElementById("home").style.marginTop = "20%";
        document.querySelector("main").style.marginTop = "0px";
        document.getElementById("myEmail").style.fontSize = "1.4rem";
        document.getElementById("myHometown").style.fontSize = "1.4rem";
        document.getElementById("contactheader").style.marginLeft = "-15px";
    }

    if (window.screen.width > 800) {
        hamburgericon.parentElement.style.display = "none";
        document.getElementById("about1").classList.add("mt-5", "mb-5");
        document.getElementById("about2").classList.add("mb-5");
        document.getElementById("about3").classList.add("mt-5");
    }
}
handleMobileResponsiveness();

//handline for hover effect on image 
introducImage.addEventListener("mousemove", handleMove);

function handleMove(e) {
    const xVal = e.layerX;
    const yVal = e.layerY;

    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);

    const string =
        "perspective(500px) scale(1.1) rotateX(" +
        xRotation +
        "deg) rotateY(" +
        yRotation +
        "deg)";

    introducImage.style.transform = string;
}

introducImage.addEventListener("mouseout", function() {
    introducImage.style.transform =
        "perspective(500px) scale(1) rotateX(0) rotateY(0)";
});

introducImage.addEventListener("mousedown", function() {
    introducImage.style.transform =
        "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
});

introducImage.addEventListener("mouseup", function() {
    introducImage.style.transform =
        "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
});

//this is used for show navbar when scrolltop >200
function navbarDisplay() {
    if (document.documentElement.scrollTop > 200 && window.screen.width > 700) {
        navbar.style.display = "block";
    } else {
        navbar.style.display = "none";
    }
}

//this is  used for show arrow icon when scrolltop >300
function upArrowDispaly() {
    let upArrowIcon = document.getElementById("upArrow");
    if (document.documentElement.scrollTop > 400) {
        upArrowIcon.style.display = "block";
        upArrowIcon.children[0].style.display = "inline-block";
    } else {
        upArrowIcon.style.display = "none";
        upArrowIcon.children[0].style.display = "none";
    }
}

// detecting scrolling
window.onscroll = function() {
    sectionActive();
    navbarDisplay();
    upArrowDispaly();
};

// for hiding navbar
let crossIcon = document.getElementById("crossIcon");
crossIcon.addEventListener("click", () => {
    navbar.style.display = "none";
});

// toggling sidebar
hamburgericon.addEventListener("click", () => {
    if (navbar.style.display == "none") {
        navbar.style.display = "inline-block";
    } else {
        navbar.style.display = "none";
    }
});

//for hiding sidebar
// document.addEventListener("click", (event) => {
//     const element = document.getElementById("navbar");
//     const closest = event.target.closest(`.${element.id}`);
//     console.log(closest);
//     if (!closest && event.target.id != "hamburgericon") {
//         navbar.style.display = "none";
//     }
// });
