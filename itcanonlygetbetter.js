(function(){
  var type = 'webm',
      i = 0,
      j = 0;

  function init(){
    var v = document.querySelector('video');
    v.addEventListener('canplay',function(event){
      if(v.currentSrc.indexOf('mp4') !== - 1){
        type = 'mp4';
      }
      v.parentNode.removeChild(v);
      /* 
        ^ this checks if we need MP4 or webM. My Safari on Lion tells me 
          it groks WebM (as I have Perian installed). Alas, it doesn't. Damn
          you, Safari!
      */
      render();
    },false);
  };

  function render(){
    var container = document.createElement('section');
    var target = document.querySelector('article');
    target.parentNode.insertBefore(container,target);
    container.innerHTML = '<ul id="videocontainer"></ul>'+
                          '<form action="index.html">'+
                          '<div><label for="message">Your Message:</label>'+
                          '<input type="text" name="message" id="message"'+
                          ' value="html5 for all browsers">'+
                          '<input type="submit" value="OK, Go!">'+
                          '</div></form>';
    var wefixedit = document.createElement('section');
    wefixedit.className = 'yeswecan';
    wefixedit.innerHTML = '<p>This experiment shows that the final part of'+
                          ' All is Not Lost can easily be created for all'+ 
                          ' HTML5 browsers. Enjoy.</p>';
    container.parentNode.insertBefore(wefixedit,container.nextSibling);
    /* 
      ^ Why not only give messages to those who can read them and HTML 
        to those who can use it? Saves you having to write bad FAQs.
    */
    
    resizecontainer();
    window.addEventListener('resize',function(event){
      resizecontainer();
    },false);
    /*
      ^ Let's use all the space rather than telling people what resolution 
        they need, eh?
    */
    
    var s = document.location.href;
    if(s.indexOf('?message=') !== -1){
      s = s.split('?message=');
      s = s[1].replace(/%20/g,' ');
      plotvideos(s);
    }
    /* ^ you can send your message via URL :) */

    document.querySelector('form').addEventListener('submit',function(event){
      resizecontainer();
      plotvideos(document.querySelector('#message').value);
      event.preventDefault();
    },false);
    /* ^ no need to reload when new messages are entered */

  };
  
  function resizecontainer(){
    var container = document.querySelector('#videocontainer');
    var s = parseInt(window.innerWidth/120,10);
    container.style.width = (s*120) + 'px';
    container.style.margin = '10px auto';
  };

  function plotvideos(s){
    var c = document.querySelector('#videocontainer');
    s = s.toUpperCase();
    var bits = s.split('');
    var out = '';
    for(i=0,j=bits.length;i<j;i++){
      if(bits[i]!==' '){
        out += '<li>'+
               '<video src="atoz/'+bits[i]+'.'+type+'"'+
               ' width="120" height="90" autoplay loop></video>'+
               '</li>';
      } else {
        out += '<li>'+
               '<img src="atoz/index.jpg"'+
               ' alt="" width="120" height="90">'+
               '</li>';
      }
    }
    c.innerHTML = out;
    /* ^ How easy is this, eh? */

    var x = document.querySelectorAll('video');
    for(i=0,j=x.length;i<j;i++){
      x[i].addEventListener('ended',
        function(event){
          this.play();
        }
      ,false);
    }
    /* ^ As Firefox has no loop :( */

  };
  if(document.querySelector){
    init();
  }
})();