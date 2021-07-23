window.onscroll = function(){
    myfunction()
}

function myfunction(){
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ){
        document.getElementById("lkj").style.top = "0";
        
    }
    else
    {
         document.getElementById("lkj").style.top = "-100px";
    }
}
function myfunctionn(){
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ){
        document.getElementById("lkj").style.top = "0";
        
    }
    else
    {
         document.getElementById("lkj").style.top = "-100px";
    }
}
window.onload = function(){
    myfunctionn()
}

console.log(window.screen.width)
// const sections = document.querySelectorAll("section");
// const navlist = document.querySelectorAll("nav ul li");
// window.addEventListener("scroll", ()=>{
//     let current = ''
//     sections.forEach(section=>{
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;
//         if(pageYOffset >= (sectionTop-sectionHeight / 3)){
//             current = section.getAttribute("id")
//         }
//         console.log(sectionTop)
//     })
//     navlist.forEach(li=>{
//         li.classList.remove("active")
//         if(li.classList.contains(current)){
//             li.classList.add("active")
//         }
//     })
// })