javascript:{function offset(e){var t=e.getBoundingClientRect();return{top:t.top+document.documentElement.scrollTop,left:t.left+document.documentElement.scrollLeft}}var selector="[data-seleniumid]",seleniumDiv=document.createElement("div");seleniumDiv.setAttribute("id","seleniumDiv"),seleniumDiv.innerHTML='<style>.seleniumHighlight{box-shadow: 0 0 20px rgba(81, 203, 238, 1) !important;padding: 3px 0px 3px 3px;margin: 5px 1px 3px 0px;border: 3px solid rgba(81, 203, 238, 1) !important;background: rgba(81, 203, 238, 1) !important;}.seleniumrecordLB{height: 640px;width: 820px;z-index: 10001;}.codeInputTextArea{margin-top: 20px;height: 600px;width: 800px}.context-menu {display: none;position: absolute;z-index: 9999;padding: 12px 0;width: 240px;background-color: #fff;border: solid 1px #dfdfdf;box-shadow: 1px 1px 2px #cfcfcf;}.context-menu--active {display: block;}.context-menu__items {list-style: none;margin: 0;padding: 0;}.context-menu__item {display: block;margin-bottom: 4px;}.context-menu__item_deactivate {display: none;}.context-menu__item:last-child {margin-bottom: 0;}.context-menu__link {display: block;padding: 4px 12px;color: #0066aa;text-decoration: none;}.context-menu__link:hover {color: #fff;background-color: #0066aa;}.ghost-select {display: none;z-index: 9000;position: absolute !important;cursor: default !important;}#big-ghost{background-color:rgba(239, 28, 190, 0.6);border:1px solid #aaf81a;position:absolute;}.ghost-active {display: block !important;}.ghost-select > span {background-color: rgba(239, 28, 190, 0.6);border: 1px solid #b20e8c;width: 100%;height: 100%;float: left;}.overlay-ghost-Element.selectedElement{background: rgba(0, 239, 67, 0.5) !important;}.modal {display: block;position: fixed;z-index: 900000;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);}.modal-content {background-color: #fefefe;margin: auto;padding: 20px;border: 1px solid #888;width: 80%;}.close {color: #aaaaaa;float: right;font-size: 28px;font-weight: bold;}.close:hover,.close:focus {color: #000;text-decoration: none;cursor: pointer;}</style><div class="ghost-select"><span></span></div><div id="context-menu" class="context-menu">    <ul class="context-menu__items">        <li class="context-menu__item">            <a class="context-menu__link" onclick="recordScreen()"><i class="fa test"></i>Open Screen Recorder</a>        </li>        <li class="context-menu__item context-menu__item_select">            <a class="context-menu__link" onclick="recordSelectedFieldsMenueItem()" ><i class="fa fa-SelectRec"></i> REC All Selected Fields </a>        </li>        <li class="context-menu__item">            <a class="context-menu__link" onclick="genAllRecordFieldsMenueItem()" ><i class="fa fa-getCodeAll"></i> GEN Recorded Fields Code</a>        </li>        <li class="context-menu__item">            <a class="context-menu__link" onclick="genAllFieldsOfPageMenueItem()" ><i class="fa fa-getCodeAll"></i> GEN All Page Fields </a>        </li>        <li class="context-menu__item context-menu__item_select">            <a class="context-menu__link" onclick="genAllSelectedFieldsMenueItem()" ><i class="fa fa-SelectGenCode"></i> GEN Selected Fields Code </a>        </li>    </ul></div><div id="overlay-ghost_context-menu" class="context-menu" style="z-index: 10002">    <ul class="context-menu__items">        <li class="context-menu__item">            <a class="context-menu__link" onclick="recordScreenClose()"><i class="fa recordScreen Close"></i>Close Screen Record</a>        </li>        <li class="context-menu__item">            <a class="context-menu__link" onclick="generateTestElements()"><i class="fa test Close"></i> Generate Selected Elements</a>        </li>    </ul></div>',document.body.appendChild(seleniumDiv);var clickedTarget,fields=[];function capitalise(e){return e.charAt(0).toUpperCase()+e.slice(1)}function camelize(e){return e.replace(/-([a-zA-Z])/g,function(e,t){return t.toUpperCase()})}function cleanRecording(){fields=[]}function recordPage(){Array.prototype.forEach.call(document.querySelectorAll(selector),function(e){fields.push(e)})}function record(e){null==e.getAttribute("data-seleniumid")?tempAlert("Keine data-seleniumid-Element gefunden!",5e3):fields.push(e)}function createRecordedFieldsCode(){var e=[];Array.prototype.forEach.call(fields,function(n){var o=!1;Array.prototype.forEach.call(e,function(e,t){if(n===t)return o=!0}),o||e.push(n)}),generateCode(e)}function generateCode(e){var i=document.createElement("textarea");i.setAttribute("value",""),Array.prototype.forEach.call(e,function(e){var t=i.getAttribute("value"),n=e.getAttribute("data-seleniumid"),o=convertAttributName(e.getAttribute("data-seleniumid"));i.setAttribute("value",t+"\t@FindBy(xpath = \"//*[@data-seleniumid='"+n+"']\")\n\tprivate WebElement "+o+";\n\n")}),Array.prototype.forEach.call(e,function(e){var t=e.getAttribute("data-seleniumid");t=convertAttributName(t);var n=e.tagName.toLowerCase().valueOf();if(n=="a".valueOf()||"input"==n&&"submit"==e.type){var o="click"+capitalise(t);i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(){\n\t\t"+t+".click(); \n\t}\n\n"))}if(n=="span".valueOf()||n=="div".valueOf()||n=="label".valueOf()){o="getTextOf"+capitalise(t);i.setAttribute("value",i.getAttribute("value").concat("\tpublic String "+o+"(){\n\t\treturn "+t+".getText();\n\t}\n\n"))}if(n=="select".valueOf()){o="select"+capitalise(t)+"ByValue";i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(String value) {\n\t\t new Select("+t+").selectByValue(value);\n\t}\n\n"));o="select"+capitalise(t)+"ByLabel";i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(String label) {\n\t\t new Select("+t+").selectByVisibleText(label);\n\t}\n\n"));o="select"+capitalise(t)+"ByIndex";i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(int index) {\n\t\t new Select("+t+").selectByIndex(index);\n\t}\n\n"))}if(n=="textarea".valueOf()){o="enter"+capitalise(t);i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(CharSequence input) {\n\t\t"+t+'.sendKeys(Keys.chord(Keys.CONTROL, "a"), input);\n\t}\n\n')),o="getValueOf"+capitalise(t),i.setAttribute("value",i.getAttribute("value").concat("\tpublic String "+o+"(){\n\t\treturn "+t+'.getAttribute("value");\n\t}\n\n'))}if(n=="input".valueOf())switch(e.type){case"text":o="enter"+capitalise(t);i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(CharSequence input) {\n\t\t"+t+'.sendKeys(Keys.chord(Keys.CONTROL, "a"), input);\n\t}\n\n')),o="getValueOf"+capitalise(t),i.setAttribute("value",i.getAttribute("value").concat("\tpublic String "+o+"(){\n\t\treturn "+t+'.getAttribute("value");\n\t}\n\n'));break;case"image":o="click"+capitalise(t);i.setAttribute("value",i.getAttribute("value").concat("\tpublic void "+o+"(){\n\t\t"+t+".click(); \n\t}\n\n"))}}),0==e.length?tempAlert("Keine Elemente für die Generierung gefunden",5e3):displayGeneratedCode(i.getAttribute("value"))}function displayGeneratedCode(e){recordScreenClose();var t=document.createElement("div");t.setAttribute("class","modal"),t.innerHTML='<div class="modal-content"><span class="close" onclick="hideGeneratedCode();">&times;</span><textarea class="codeInputTextArea">'+e+"</textarea></div>",document.querySelector(".ghost-select").parentElement.appendChild(t),cleanRecording()}function hideGeneratedCode(){var e=document.querySelector(".modal");e.parentNode.removeChild(e)}function tempAlert(e,t){var n=document.createElement("div");n.setAttribute("style","position:absolute;top:"+menuPositionY+"px;left:"+menuPositionX+"px;background-color:#B9C5C8;font:bold;z-index:9999;border:2px black solid;"),n.innerHTML=e,setTimeout(function(){n.parentNode.removeChild(n)},t),document.body.appendChild(n)}function convertAttributName(e){return e=camelize(e=e.charAt(0).toLowerCase()+e.slice(1))}function clickInsideElement(e,t){var n=e.srcElement||e.target;if(n.classList.contains(t))return n;for(;n=n.parentNode;)if(n.classList&&n.classList.contains(t))return n;return!1}function getPosition(e){if(!e)e=window.event;return{x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop}}var clickCoords,menu,menuPositionX,menuPositionY,menuGhost,menuGhostPositionX,menuGhostPositionY,contextMenuActive="context-menu--active",menuState=0,menuGhostState=0;function initMenue(){menu=document.querySelector("#context-menu"),menuGhost=document.querySelector("#overlay-ghost_context-menu"),contextListener(),keyupListener(),resizeListener()}function contextListener(){document.addEventListener("click",function(e){e.target.classList.contains("context-menu")||e.target.classList.contains("context-menu__item")||(toggleMenuOff(),toggleGhostMenuOff())}),document.addEventListener("contextmenu",function(e){e.target.classList.contains("overlay-ghost")?(toggleGhostMenuOn(),positionMenuGhost(e)):(clickedTarget=e.target,toggleMenuOn(),positionMenu(e)),e.preventDefault()})}function keyupListener(){window.onkeyup=function(e){27===e.keyCode&&(toggleMenuOff(),toggleGhostMenuOff())}}function resizeListener(){window.onresize=function(e){toggleMenuOff(),toggleGhostMenuOff()}}function toggleMenuOn(){1!==menuState&&(0==selectionfields.length?document.querySelector(".context-menu__item_select").classList.add("context-menu__item_deactivate"):document.querySelector(".context-menu__item_select").classList.remove("context-menu__item_deactivate"),menuState=1,menu.classList.add(contextMenuActive))}function toggleGhostMenuOn(){1!==menuGhostState&&(0==selectionfields.length?document.querySelector(".context-menu__item_select").classList.add("context-menu__item_deactivate"):document.querySelector(".context-menu__item_select").classList.remove("context-menu__item_deactivate"),menuGhostState=1,menuGhost.classList.add(contextMenuActive))}function toggleMenuOff(){0!==menuState&&(menuState=0,clickedTarget=null,menu.classList.remove(contextMenuActive))}function toggleGhostMenuOff(){0!==menuGhostState&&(menuGhostState=0,clickedTarget=null,menuGhost.classList.remove(contextMenuActive))}function positionMenu(e){clickCoords=getPosition(e),menuPositionX=clickCoords.x,menuPositionY=clickCoords.y,menu.style.left=menuPositionX+"px",menu.style.top=menuPositionY+"px"}function positionMenuGhost(e){clickCoords=getPosition(e),menuGhostPositionX=clickCoords.x,menuGhostPositionY=clickCoords.y,menuGhost.style.left=menuGhostPositionX+"px",menuGhost.style.top=menuGhostPositionY+"px"}function recordScreen(){var e=document.createElement("div");e.setAttribute("id","overlay-ghost"),e.setAttribute("class","overlay-ghost"),e.setAttribute("style","background: rgba(0, 6, 239, 0.1); position:absolute;width: "+document.documentElement.scrollWidth+"px; height:"+document.documentElement.scrollHeight+"px; top:0px; left:0px; z-index: 10000"),document.body.appendChild(e),Array.prototype.forEach.call(document.querySelectorAll(selector),function(e){if(console.log(e),0<offset(e).top){var t=offset(e).top,n=offset(e).left,o=parseInt(e.offsetWidth),i=parseInt(e.offsetHeight),l=document.createElement("div");l.setAttribute("id","overlay-ghost-"+e.getAttribute("data-seleniumid")),l.setAttribute("class","overlay-ghost-Element"),l.setAttribute("style","border:1px black solid; background: rgba(0, 6, 239, 0.3); position:absolute;width: "+o+"px; height:"+i+"px; top:"+t+"px; left:"+n+"px; z-index:20000;"),l.addEventListener("click",function(e){selectGhostElement(e.target)});var c=document.createElement("span");c.setAttribute("style","display: none !important;"),c.innerText=e.getAttribute("data-seleniumid"),l.appendChild(c),document.querySelector("#overlay-ghost").appendChild(l)}})}function generateTestElements(){cleanRecording(),Array.prototype.forEach.call(document.querySelectorAll(".selectedElement"),function(e){record(document.querySelector("[data-seleniumid="+e.querySelector("span").innerText+"]"))}),createRecordedFieldsCode(),selectionfields=[]}function recordScreenClose(){var e=document.querySelector("#overlay-ghost");console.log(e),e.parentNode.removeChild(e)}function selectGhostElement(e){e.classList.contains("selectedElement")?e.classList.remove("selectedElement"):e.classList.add("selectedElement")}function genAllRecordFieldsMenueItem(){createRecordedFieldsCode()}function genAllFieldsOfPageMenueItem(){cleanRecording(),recordPage(),createRecordedFieldsCode()}function recordSelectedFieldsMenueItem(){Array.prototype.forEach.call(selectionfields,function(e,t){record(t)}),selectionfields=[]}function genAllSelectedFieldsMenueItem(){cleanRecording(),Array.prototype.forEach.call(selectionfields,function(e,t){record(t)}),createRecordedFieldsCode(),selectionfields=[]}var selectionfields=[];function selectElements(e){document.removeEventListener("mousemove",openSelector),document.removeEventListener("mouseup",selectElements);var r=0,u=5e3,d=0,m=5e3;Array.prototype.forEach.call(document.querySelectorAll("[data-seleniumid]"),function(e){var t=e;if(1==doObjectsCollide(document.querySelector(".ghost-select"),t)){selectionfields.push(t);var n=t.offsetWidth,o=t.offsetHeight,i=t.offsetWidth,l=t.offsetHeight,c=checkMaxMinPos(offset(t).top,offset(t).left,offset(t).top,offset(t).left,n,o,i,l,r,u,d,m);r=c.maxX,u=c.minX,d=c.maxY,m=c.minY;var s=t.parentNode;t.style&&"auto"===t.style.left&&"auto"===t.style.top&&(t.style.left=s.style.left,t.style.top=s.style.top);var a=document.querySelector("#big-ghost");a||((a=document.createElement("div")).setAttribute("id","big-ghost"),a.setAttribute("class","big-ghost"),document.body.appendChild(a)),a.style.width=parseInt(r)+parseInt(40)-parseInt(u),a.style.height=parseInt(d)+parseInt(20)-parseInt(m),a.style.top=parseInt(m)-parseInt(10),a.style.left=parseInt(u)-parseInt(20)}}),document.querySelector(".ghost-select").classList.remove("ghost-active"),document.querySelector(".ghost-select").style.width=0,document.querySelector(".ghost-select").style.height=0}function openSelector(e){var t=Math.abs(initialW-e.pageX),n=Math.abs(initialH-e.pageY);document.querySelector(".ghost-select").style.width=t,document.querySelector(".ghost-select").style.height=n,e.pageX<=initialW&&e.pageY>=initialH?document.querySelector(".ghost-select").style.left=e.pageX:e.pageY<=initialH&&e.pageX>=initialW?document.querySelector(".ghost-select").style.topn=e.pageY:e.pageY<initialH&&e.pageX<initialW&&(document.querySelector(".ghost-select").style.left=e.pageX,document.querySelector(".ghost-select").style.top=e.pageY)}function doObjectsCollide(e,t){var n=offset(e).top,o=offset(e).left,i=offset(t).top,l=offset(t).left;return!(n+e.offsetHeight<i||n>i+t.offsetHeight||o+e.offsetWidth<l||o>l+t.offsetWidth)}function checkMaxMinPos(e,t,n,o,i,l,c,s,a,r,u,d){"use strict";return t<o?t<r&&(r=t):o<r&&(r=o),o+c<t+i?a<t&&(a=t+i):a<o+c&&(a=o+c),e<n?e<d&&(d=e):n<d&&(d=n),n+s<e+l?u<e&&(u=e+l):u<n+s&&(u=n+s),{maxX:a,minX:r,maxY:u,minY:d}}document.addEventListener("mousedown",function(e){document.querySelectorAll(".big-ghost")&&Array.prototype.forEach.call(document.querySelectorAll(".big-ghost"),function(e){e.parentNode.removeChild(e)}),document.querySelector(".ghost-select").classList.remove("ghost-active"),2===e.button&&(document.querySelector(".ghost-select").classList.add("ghost-active"),document.querySelector(".ghost-select").style.left=e.pageX,document.querySelector(".ghost-select").style.top=e.pageY,initialW=e.pageX,initialH=e.pageY,document.addEventListener("mouseup",selectElements),document.addEventListener("mousemove",openSelector))}),initMenue();}