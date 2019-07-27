const filter = {
    "khanacademy": ["math", "programming", "english", "academy", "khan", "khanacadedmy", "khan academy"],
    "npm": ["reactjs", "javascript", "html", "c", "npm", "ES6"],
    "wikipedia": ["vietnam", "china", "melbourne", "wiki", "wikipedia", "wiki pedia"],
    "vr": ["game", "virtual reality", "virtual", "reality", "vr"]
}

$(function() {
    // init atvs
      atvImg();
  });

  $.ajaxSetup({
    async: false
  });
  const definition = document.querySelector('.definition')
  const search = document.querySelector('.search');
  search.addEventListener('keydown', () => filterResult(search.value), false);
  search.addEventListener('keyup', () => filterResult(search.value), false);
  search.addEventListener('keypress', () => filterResult(search.value), false);
  const defaultText = definition.innerText;

  function filterResult(query) {
    const itemList = document.querySelectorAll('.atvImg');
    const notFoundMessage = document.querySelector('.searchMessage');
    definition.innerHTML = defaultText;

    if(query && query.length > 0) {
        let notFound = 0;
        let _this = [...itemList];
        _this.forEach((item) => {
            let searchKey = item.getAttribute('name');
            let arrayValue = filter[searchKey];
            if (arrayValue.includes(query.toLowerCase().trim())) {
                item.style.display = 'flex';
                definition.style.width = item.offsetWidth + 'px';
                definition.style.display = 'block';
                const context = definition.innerText.split(' ');
                console.log('context', context);
                const replacement = context[Math.floor(Math.random()*context.length)];
                definition.innerHTML = definition.innerText.replace(new RegExp(replacement, 'g'), '<b class="found">' + query.toLowerCase().trim() +'</b>')
                notFound--;
            } else {
                item.style.display = 'none';
                notFound++;
            }
        });
        if(notFound == _this.length) {
            notFoundMessage.style.display = "block";
            definition.style.display = 'none';
        } else {
            notFoundMessage.style.display = "none";
        }
    } else {
        [...itemList].forEach((item) => {
            item.style.display = 'flex';
            notFoundMessage.style.display = "none";
            definition.style.display = 'none';
        });
    }
  }

  filterResult();

  function atvImg(){
  
      var d = document,
          de = d.documentElement,
          bd = d.getElementsByTagName('body')[0],
          win = window,
          imgs = d.querySelectorAll('.atvImg'),
          totalImgs = imgs.length,
          supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;
  
      if(totalImgs <= 0){
          return;
      }
  
      // build HTML
      for(var l=0;l<totalImgs;l++){
  
          var thisImg = imgs[l],
              layerElems = thisImg.querySelectorAll('.atvImg-layer'),
              totalLayerElems = layerElems.length;
  
          if(totalLayerElems <= 0){
              continue;
          }
  
          while(thisImg.firstChild) {
              thisImg.removeChild(thisImg.firstChild);
          }
      
          var containerHTML = d.createElement('div'),
              shineHTML = d.createElement('div'),
              shadowHTML = d.createElement('div'),
              layersHTML = d.createElement('div'),
              hrefHTML = d.createElement('a')
              layers = [];
  
          thisImg.id = 'atvImg__'+l;
          containerHTML.className = 'atvImg-container';
          shineHTML.className = 'atvImg-shine';
          shadowHTML.className = 'atvImg-shadow';
          layersHTML.className = 'atvImg-layers';
          hrefHTML.classNAme = 'atvHref';
          hrefHTML.href = thisImg.getAttribute('data-link');

          for(var i=0;i<totalLayerElems;i++){
              var layer = d.createElement('div'),
                  imgSrc = layerElems[i].getAttribute('data-img');
  
              layer.className = 'atvImg-rendered-layer';
              layer.setAttribute('data-layer',i);
              layer.style.backgroundImage = 'url('+imgSrc+')';
              layersHTML.appendChild(layer);
  
              layers.push(layer);
          }
          containerHTML.appendChild(hrefHTML);
          hrefHTML.appendChild(shadowHTML);
          hrefHTML.appendChild(layersHTML);
          hrefHTML.appendChild(shineHTML);
          thisImg.appendChild(containerHTML);
  
          var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
          thisImg.style.transform = 'perspective('+ w*3 +'px)';
  
          if(supportsTouch){
              win.preventScroll = false;
  
              (function(_thisImg,_layers,_totalLayers,_shine) {
                  thisImg.addEventListener('touchmove', function(e){
                      if (win.preventScroll){
                          e.preventDefault();
                      }
                      processMovement(e,true,_thisImg,_layers,_totalLayers,_shine);		
                  });
                  thisImg.addEventListener('touchstart', function(e){
                      win.preventScroll = true;
                      processEnter(e,_thisImg);		
                  });
                  thisImg.addEventListener('touchend', function(e){
                      win.preventScroll = false;
                      processExit(e,_thisImg,_layers,_totalLayers,_shine);		
                  });
              })(thisImg,layers,totalLayerElems,shineHTML);
          } else {
              (function(_thisImg,_layers,_totalLayers,_shine) {
                  thisImg.addEventListener('mousemove', function(e){
                      processMovement(e,false,_thisImg,_layers,_totalLayers,_shine);		
                  });
                  thisImg.addEventListener('mouseenter', function(e){
                      processEnter(e,_thisImg);		
                  });
                  thisImg.addEventListener('mouseleave', function(e){
                      processExit(e,_thisImg,_layers,_totalLayers,_shine);		
                  });
              })(thisImg,layers,totalLayerElems,shineHTML);
          }
      }
  
      function processMovement(e, touchEnabled, elem, layers, totalLayers, shine){
  
          var bdst = bd.scrollTop,
              bdsl = bd.scrollLeft,
              pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
              pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
              offsets = elem.getBoundingClientRect(),
              w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth, // width
              h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight, // height
              wMultiple = 320/w,
              offsetX = 0.52 - (pageX - offsets.left - bdsl)/w, //cursor position X
              offsetY = 0.52 - (pageY - offsets.top - bdst)/h, //cursor position Y
              dy = (pageY - offsets.top - bdst) - h / 2, //@h/2 = center of container
              dx = (pageX - offsets.left - bdsl) - w / 2, //@w/2 = center of container
              yRotate = (offsetX - dx)*(0.07 * wMultiple), //rotation for container Y
              xRotate = (dy - offsetY)*(0.1 * wMultiple), //rotation for container X
              imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)', //img transform
              arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
              angle = arad * 180 / Math.PI - 90; //convert rad in degrees
  
          //get angle between 0-360
          if (angle < 0) {
              angle = angle + 360;
          }
  
          //container transform
          if(elem.firstChild.className.indexOf(' over') != -1){
              imgCSS += ' scale3d(1.07,1.07,1.07)';
          }
          elem.firstChild.style.transform = imgCSS;
          
          //gradient angle and opacity for shine
          shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
          shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';	
  
          //parallax for each layer
          var revNum = totalLayers;
          for(var ly=0;ly<totalLayers;ly++){
              layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
              revNum--;
          }
      }
  
      function processEnter(e, elem){
          elem.firstChild.className += ' over';
      }
  
      function processExit(e, elem, layers, totalLayers, shine){
  
          var container = elem.firstChild;
  
          container.className = container.className.replace(' over','');
          container.style.transform = '';
          shine.style.cssText = '';
          
          for(var ly=0;ly<totalLayers;ly++){
              layers[ly].style.transform = '';
          }
  
      }
  
  }