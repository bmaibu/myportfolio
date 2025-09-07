
function animateBar(id, percent) {
  const bar = document.getElementById(id);
  let current = 0;

  const interval = setInterval(() => {
    if (current >= percent) {
      clearInterval(interval);
    } else {
      current++;
      bar.style.width = current + '%';
      bar.textContent = current + '%';
    }
  }, 20);
}

// Animate all skill bars on load
window.onload = () => {
  animateBar("html-bar", 80);
  animateBar("css-bar", 70);
  animateBar("js-bar", 65);
  animateBar("mg-bar", 60);       
  animateBar("ex-bar", 70);       
  animateBar("react-bar", 70);    
  animateBar("nd-bar", 70);       
  animateBar("cpp-bar", 60);      
  animateBar("dsa-bar", 50);      
  animateBar("oop-bar", 60);      
  animateBar("gh-bar", 70);       
};

