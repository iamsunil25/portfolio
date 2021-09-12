

 const sections = document.querySelectorAll("section");

const navlist = document.querySelectorAll("nav ul li");
window.addEventListener("scroll", ()=>{
    let current = ''
    sections.forEach(section=>{
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= (sectionTop-sectionHeight / 3)){
            current = section.getAttribute("id")
        }
     
    })
    navlist.forEach(li=>{
        li.classList.remove("active")
        if(li.classList.contains(current)){
             li.classList.add("active")
           
           
        }
    })
})

window.onscroll = function () {
    myfunction()
}
window.onload = function(){
    myfunction()
}

function myfunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 || window.screen.width < 700) {
        document.getElementById("lkj").style.top = "0";

    }

    else {
        document.getElementById("lkj").style.top = "-100px";
    }
}
function myfunctionn() {

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("lkj").style.top = "0";

    }
    else {
        document.getElementById("lkj").style.top = "-100px";
    }
}
function media()
{
    if(window.screen.width<700)
    {
     document.getElementById('line').classList.remove('line')
     document.getElementById('line2').classList.remove('line2')
       document.getElementById('line3').classList.remove('line')
     document.getElementById('vertical').classList.remove('vertical')
     document.getElementById('circle1').classList.remove('circle1')
      document.getElementById('circle2').classList.remove('circle1')
       document.getElementById('circle3').classList.remove('circle1')

       document.getElementById('about1').classList.remove('mt-5','mb-5')
      document.getElementById('about2').classList.remove('mb-5')
       document.getElementById('about3').classList.remove('mt-5')

  document.getElementById('about3').classList.add('mt-4')

  document.getElementById('about2').classList.add('mt-4')
      

       document.getElementById('lkj').style.display = 'none';
       document.getElementById('home').style.marginTop = '20%';
       document.querySelector('main').style.marginTop = '0px';
      
        document.getElementById('skj').style.fontSize = '1.5rem'
        document.getElementById('skjj').style.fontSize = '1.5rem'
    document.getElementById('contactheader').style.marginLeft = '-15px'
    }


    if(window.screen.width > 800)
{
 document.getElementById('hamb').style.display = 'none';
 document.getElementById('about1').classList.add('mt-5','mb-5')
      document.getElementById('about2').classList.add('mb-5')
       document.getElementById('about3').classList.add('mt-5')

}

}
media()

 if(!window.screen.width<700){
document.querySelector('body').style.overflowX='hidden';
   document.getElementById('up').style.fontSize = '80px';
 }




let el = document.getElementById('tilt')
const height = el.clientHeight
const width = el.clientWidth

el.addEventListener('mousemove', handleMove)


function handleMove(e) {

  const xVal = e.layerX
 
  const yVal = e.layerY
  

  const yRotation = 20 * ((xVal - width / 2) / width)

  

  const xRotation = -20 * ((yVal - height / 2) / height)
  
  
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  
 
  el.style.transform = string
}


el.addEventListener('mouseout', function() {
  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

el.addEventListener('mousedown', function() {
  el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})


el.addEventListener('mouseup', function() {
  el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})