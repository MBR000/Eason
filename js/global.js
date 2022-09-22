//一切调用的主入口
function addLoadEvent(func){
    var oldonload = window.onload
    if(typeof oldonload != 'function'){
        window.onload = func
    }
    else{
        window.onload = function(){
            oldonload()
            func()
        }
    }
}

function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement)
        parent.appendChild(newElement)
    else
        parent.insertBefore(newElement, targetElement.nextSibling)
}

function addClass(element, value){
    if(!element.className)
        element.className = value
    else{
        newClassName = element.className
        newClassName += ' '
        newClassName += value
        element.className = newClassName
    }
}

function highlightPage(){
    if(!document.getElementsByTagName)
        return false
    if(!document.getElementById)
        return false
    var headers = document.getElementsByTagName('header')
    if(headers.length == 0)
        return false
    var navs = headers[0].getElementsByTagName('nav')
    if(navs.length == 0)
        return false
    var links = navs[0].getElementsByTagName('a')
    for(let i = 0; i < links.length; i++){
        let linkurl = links[i].href
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = 'here'
            var linktext = links[i].lastChild.nodeValue.toLowerCase()
            document.body.setAttribute('id', linktext)
        }
    }
}

function moveElement(elementID, final_x, final_y, interval){
    if(!document.getElementById)
        return false
    if(!document.getElementById(elementID))
        return false
    var elem = document.getElementById(elementID)
    if(elem.movement)
        clearTimeout(elem.movement)
    if(!elem.style.left)
        elem.style.left = '0px'
    if(!elem.style.top)
        elem.style.top = '0px'
    var xpos = parseInt(elem.style.left)
    var ypos = parseInt(elem.style.top)
    if(xpos == final_x && ypos == final_y){
        return true
    }

    if(xpos < final_x){
        let dist = Math.ceil((final_x - xpos)/10)
        xpos = xpos + dist
    }
    else if(xpos > final_x){
        let dist = Math.floor((xpos - final_x)/10)
        xpos = xpos - dist
    }

    if(ypos < final_y){
        let dist = Math.ceil((final_y - ypos)/10)
        ypos = ypos + dist
    }
    else if(ypos > final_y){
        let dist = Math.floor((ypos - final_y)/10)
        ypos = ypos - dist
    }
    elem.style.left = xpos + 'px'
    elem.style.top = ypos + 'px'
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")"
    elem.movement = setTimeout(repeat, interval)
}

function prepareSlideshow(){
    if(!document.getElementById)
        return false
    if(!document.getElementsByTagName)
        return false
    if(!document.getElementById('intro'))
        return false
    var intro = document.getElementById('intro')
    var slideshow = document.createElement('div')
    slideshow.setAttribute('id','slideshow')
    var frame = document.createElement('img')
    // frame就是个四个角圆角，其它透明的边框
    // frame.setAttribute('src','../img/frame.png')
    // frame.setAttribute('alt','')
    // frame.setAttribute('id','frame')
    slideshow.appendChild(frame)
    var preview = document.createElement('img')
    preview.setAttribute('src','../img/slideshow.png')
    preview.setAttribute('alt','')
    preview.setAttribute('id','preview')
    slideshow.appendChild(preview)
    insertAfter(slideshow, intro)
    var links = document.getElementsByTagName('a')
    // console.log(links)
    for(let i = 0; i < links.length; i++){
        //错位的问题：它是多次移动，取得floor导致了最后距离不够
        links[i].onmouseover = function(){
            let destination = this.href
            if(destination.indexOf('index.html') != -1)
                moveElement('preview', 0, 0, 10)
            if(destination.indexOf('about.html') != -1)
                moveElement('preview', -325, 0, 10)
            if(destination.indexOf('photos.html') != -1)
                moveElement('preview', -325 * 2, 0, 10)
            if(destination.indexOf('live.html') != -1)
                moveElement('preview', -325 * 3, 0, 10)
            if(destination.indexOf('contact.html') != -1)
                moveElement('preview', -325 * 4, 0, 10)
        }
        links[i].onmouseout = function(){
            let destination = this.baseURI
            if(destination.indexOf('index.html') != -1)
                moveElement('preview', 0, 0, 10)
            if(destination.indexOf('about.html') != -1)
                moveElement('preview', -325, 0, 10)
            if(destination.indexOf('photos.html') != -1)
                moveElement('preview', -325 * 2, 0, 10)
            if(destination.indexOf('live.html') != -1)
                moveElement('preview', -325 * 3, 0, 10)
            if(destination.indexOf('contact.html') != -1)
                moveElement('preview', -325 * 4, 0, 10)
        }
    }
}

function showSection(id){
    // console.log('in', id)
    var sections = document.getElementsByTagName('section')
    for(let i = 0; i < sections.length; i++){
        if(sections[i].getAttribute('id') != id)
            sections[i].style.display = 'none'
        else
            sections[i].style.display = 'block' 
    }
}

function prepareInternalnav(){
    if(!document.getElementById)
        return false
    if(!document.getElementsByTagName)
        return false
    var articles = document.getElementsByTagName('article')
    if(articles.length == 0)
        return false
    var navs = articles[0].getElementsByTagName('nav')
    if(navs.length == 0)
        return false
    var nav = navs[0]
    var links = nav.getElementsByTagName('a')
    for(let i = 0; i < links.length; i++){
        let sectionID = links[i].href.split('#')[1]
        console.log(sectionID)
        if(!document.getElementById(sectionID))
            continue
        document.getElementById(sectionID).style.display = 'none'
        links[i].onclick = function(){
            showSection(sectionID)
            return false
        }
    }
}

function stripeTables(){
    if(!document.getElementsByTagName)
        return false
    var tables = document.getElementsByTagName('table')
    for(let i = 0; i < tables.length; i++){
        var odd = false
        var rows = tables[i].getElementsByTagName('tr')
        for(let j = 0; j < rows.length; j++){
            if(odd == true){
                addClass(rows[j], 'odd')
                odd = false
            }
            else
                odd = true
        }
    }
}

function highlightRows(){
    if(!document.getElementsByTagName)
        return false
    var rows = document.getElementsByTagName('tr')
    for(let i = 0; i < rows.length; i++){
        rows[i].oldClassName = rows[i].className
        rows[i].onmouseover = function(){
            
            addClass(rows[i], 'highlight')
            // console.log(rows[i].className)
        }
        rows[i].onmouseout = function(){
            
            rows[i].className = rows[i].oldClassName
        }
    }
}

function showPic(whichpic){
    console.log(whichpic)
    if(!document.getElementById('placeholder'))
        return true
    var source = whichpic.href
    console.log(source)
    var placeholder = document.getElementById('placeholder')
    placeholder.setAttribute('src', source)
    if(!document.getElementById('description'))
        return false
    if(whichpic.getAttribute('title'))
        var text = whichpic.getAttribute('title')
    else
        var text = ''
    var description = document.getElementById('description')
    if(description.firstChild.nodeType == 3)
        description.firstChild.nodeValue = text
    return false
}

function preparePlaceholder(){
    if(!document.createElement) return false
    if(!document.createTextNode) return false
    if(!document.getElementById) return false
    if(!document.getElementById('imagegallery')) return false
    var placeholder = document.createElement('img')
    placeholder.setAttribute('id', 'placeholder')
    placeholder.setAttribute('src', '../img/photos/1.jpg')
    placeholder.setAttribute('alt', 'my image gallery')
    var description = document.createElement('p')
    description.setAttribute('id', 'description')
    var desctext = document.createTextNode('1')
    description.appendChild(desctext)
    var gallery = document.getElementById('imagegallery')
    insertAfter(description, gallery)
    insertAfter(placeholder, description)
}

function prepareGallery(){
    if(!document.getElementsByTagName) return false
    if(!document.getElementById) return false
    if(!document.getElementById('imagegallery')) return false
    var gallery = document.getElementById('imagegallery')
    var links = gallery.getElementsByTagName('a')
    for(let i = 0; i < links.length; i++){
        links[i].onmousemove = function(){
            return showPic(links[i])
        }
    }
}

function focusLables(){
    if(!document.getElementsByTagName)
        return false
    var labels = document.getElementsByTagName('label')
    for(let i = 0; i < labels.length; i++){
        if(!labels[i].getAttribute('for'))
            continue
        
        //点击标题，方框会聚焦
        labels[i].onclick = function(){
            let id = this.getAttribute('for')
            if(!document.getElementById(id))
                return false
            var elem = document.getElementById(id)
            elem.focus()
        }
    }
}

function isFilled(field){
    if(field.value.replace(' ','').length == 0)
        return false
    var placeholder = field.placeholder || field.getAttribute('placeholder')
    return (field.value != placeholder)
}

function isEmail(field){
    return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1)
}

function validateForm(whichform){
    for(let i = 0; i < whichform.elements.length; i++){
        var element = whichform.elements[i]
        if(element.required == 'required'){
            if(!isFilled(element)){
                alert('Please fill in the ' + element.name + ' field')
                return false
            }
        }
        if(element.type== 'email'){
            if(!isEmail(element)){
                alert('The ' + element.name + ' field must be a email address')
                return false
            }
        }
    }
    return true
}

function prepareForms(){
    for(let i = 0; i < document.forms.length; i++){
        var thisform = document.forms[i]
        console.log(thisform)
        thisform.onsubmit = function(){
            if(!validateForm(this))
                return false
            var article = document.getElementsByTagName('article')[0]
            if(submitFormWithAjax(this, article))
                return false
            // console.log('ok')
            return true
        }
    }
}

function getHTTPObject(){
    if(typeof XMLHttpRequest == 'undefined')
        XMLHttpRequest = function(){
        try{ return new ActiveXObject('Msxml2.XMLHTTP.6.0')}
            catch(e){}
        try{ return new ActiveXObject('Msxml2.XMLHTTP.3.0')}
            catch(e){}
        try{ return new ActiveXObject('Msxml2.XMLHTTP')}
            catch(e){}    
        return false
        }
    return new XMLHttpRequest()
}

function displayAjaxLoading(element){
    while(element.hasChildNodes())
        element.removeChild(element.lastChild)
    // console.log('ok')
    var box = document.createElement('div')
    box.setAttribute('class', 'ajaxbox')
    var content = document.createElement('img')
    content.setAttribute('src', '../img/loading.png')
    content.setAttribute('class', 'ajaximg')
    box.appendChild(content)
    element.appendChild(box)
}

function submitFormWithAjax(whichform, thetarget){
    var request = getHTTPObject()
    if(!request){
        return false
    }
    displayAjaxLoading(thetarget)
    var dataParts = []
    var element
    for(let i = 0; i < whichform.elements.length; i++){
        element = whichform.elements[i]
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value)
    }

    var data = dataParts.join('&')
    console.log(data)
    request.open('GET', whichform.getAttribute('action'), true)
    request.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    
    request.onreadystatechange = function(){
        console.log(request)
        if(request.readyState == 4){
            if(request.status == 200 || request.status == 0){
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/)
                if(matches.length > 0)
                    thetarget.innerHTML = matches[1]
                else
                    thetarget.innerHTML = '<p>There was an error</p>'
            }
            else
            thetarget.innerHTML = '<p>' + request.statusText + '</p>'
        }
    }
    request.send(data)
    return true
}

addLoadEvent(highlightPage)
addLoadEvent(prepareSlideshow)
addLoadEvent(prepareInternalnav)
addLoadEvent(stripeTables)
addLoadEvent(highlightRows)
addLoadEvent(preparePlaceholder)
addLoadEvent(prepareGallery)
addLoadEvent(focusLables)
addLoadEvent(prepareForms)

