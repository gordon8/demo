//Tools
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        element.className += " " + value;
    }
}

function moveElement(elementId, finalX, finalY, delay) {
    var elem = document.getElementById(elementId);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = 0;
    }
    if (!elem.style.top) {
        elem.style.top = 0;
    }
    var xPos = parseInt(elem.style.left);
    var yPos = parseInt(elem.style.top);
    var dist;
    if (xPos === finalX && yPos === finalY) {
        return false;
    }
    if (finalX > xPos) {
        dist = Math.ceil((finalX - xPos)/10);
        xPos += dist;
    }
    if (finalX < xPos) {
        dist = Math.ceil((xPos - finalX)/10);
        xPos -= dist;
    }
    if (finalY > yPos) {
        dist = Math.ceil((finalY - yPos)/10);
        yPos += dist;
    }
    if (finalY < yPos) {
        dist = Math.ceil((yPos - finalY)/10);
        yPos -= dist;
    }
    elem.style.left = xPos + 'px';
    elem.style.top = yPos + 'px';

    elem.movement = setTimeout(function () {
        moveElement(elementId, finalX, finalY, delay);
    }, delay);
}

//首页
//为导航栏中当前页面添加class：here，高亮显示导航栏中当前页面，并为当前页面的body添加id
function highLightPage() {
    if (!document.getElementsByTagName || !document.getElementById ) {
        return false;
    }

    var headers = document.getElementsByTagName('header');
    if (headers.length < 1) {
        return false;
    }
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length < 1) {
        return false;
    }
    var links = navs[0].getElementsByTagName('a');
    for (var i = 0, len = links.length; i < len; i++) {
        var linkURL = links[i].getAttribute('href');
        if (window.location.href.indexOf(linkURL) !== -1) {
            addClass(links[i], 'here');
            var linkText = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id', linkText);
        }
    }
}

//准备滑动展示图
function prepareSlideshow() {
    if (!document.getElementsByTagName || !document.getElementById) {
        return false;
    }
    if (!document.getElementById('intro')) {
        return false;
    }
    var intro = document.getElementById('intro');
    var links = document.getElementsByTagName('a');
    if (links.length < 1) {
        return false;
    }
    var slideshow = document.createElement('div');
    slideshow.setAttribute('id', 'slideshow');
    var preview = document.createElement('img');
    preview.setAttribute('id', 'preview');
    preview.setAttribute('alt', 'a glimpse of what awaits you');
    preview.setAttribute('src', 'images/slideshow.gif');
    var frame = document.createElement('img');
    frame.setAttribute('id', 'frame');
    frame.setAttribute('src', 'images/frame.gif');
    slideshow.appendChild(frame);
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var destination;
    for (var i = 0, len = links.length; i < len; i++) {
        links[i].onmouseover = changePosition;
    }
}

function changePosition() {
    var destination = this.getAttribute('href');
    if (destination.indexOf('index.html') !== -1) {
        moveElement('preview', -0, 0, 5);
    }
    if (destination.indexOf('about.html') !== -1) {
        moveElement('preview', -150, 0, 5);
    }
    if (destination.indexOf('photos.html') !== -1) {
        moveElement('preview', -300, 0, 5);
    }
    if (destination.indexOf('live.html') !== -1) {
        moveElement('preview', -450, 0, 5);
    }
    if (destination.indexOf('contact.html') !== -1) {
        moveElement('preview', -600, 0, 5);
    }
}
//index.html  end

//about.html

//展示section
function showSection(id) {
    var sections = document.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++) {
        var sectionId = sections[i].getAttribute('id');
        if (sectionId === id) {
            sections[i].style.display = 'block';
        } else {
            sections[i].style.display = 'none';
        }
    }
}

function prepareIntervalNav() {
    if (!document.getElementsByTagName || !document.getElementById) {
        return false;
    }
    var articles = document.getElementsByTagName('article');
    if (articles.length < 1) {
        return false;
    }
    var navs = articles[0].getElementsByTagName('nav');
    if (navs.length < 1) {
        return false;
    }
    var links = navs[0].getElementsByTagName('a');
    if (links.length < 1) {
        return false;
    }
    for (var i = 0, len = links.length; i < len; i++) {
        var sectionId = links[i].getAttribute('href').split('#')[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = 'none';
        links[i].setAttribute('data-section', sectionId);
        links[i].onclick = function () {
            showSection(this.getAttribute('data-section'));
            return false;
        }; 
    }
}

//about.html end

//photos.html
//采用照片墙来展示a链接的图片

//显示照片函数

function showPic(whichPic) {
    if (!document.getElementById('placeholder')) return true;
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);

    if (!document.getElementById('description')) return false;
    var description = document.getElementById('description');
    var text = '';
    if (whichPic.getAttribute('title')) {
        text = whichPic.getAttribute('title');
    }
    if (description.firstChild.nodeType === 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

function prepareImagegallery() {
    if (!document.getElementsByTagName || !document.getElementById || !document.createElement) {
        return false;
    }
    if (!document.getElementById('imagegallery')) {
        return false;
    }
    var imagegallery = document.getElementById('imagegallery');
    var links = imagegallery.getElementsByTagName('a');
    if (links.length < 1) {
        return false;
    }
    var placeholder = document.createElement('img');
    placeholder.setAttribute('src', 'images/placeholder.gif');
    placeholder.setAttribute('id', 'placeholder');
    placeholder.setAttribute('alt', 'my image gallery');
    var description = document.createElement('p');
    var text = document.createTextNode('Choose an image');
    description.setAttribute('id', 'description');
    description.appendChild(text);
    insertAfter(description, imagegallery);
    insertAfter(placeholder, description);

    for (var i = 0, len = links.length; i < len; i++) {
        links[i].onclick = function () {
            return showPic(this);
        };
    }
}

//photos.html end

//live.html

function stripeTables() {
    if (!document.getElementsByTagName('table')) {
        return false;
    }
    var tables = document.getElementsByTagName('table');
    for (var i = 0, len = tables.length; i < len; i++) {
        var rows = tables[i].getElementsByTagName('tr');
        for (var j = 0; j < rows.length; j++) {
            if (j % 2) {
                addClass(rows[j], 'odd');
            }
        }
    }
}

function highLightRows() {
    var rows = document.getElementsByTagName('tr');
    if (rows.length < 1) {
        return false;
    }
    for (var i = 0, len = rows.length; i < len; i++) {
        //创建新属性，保存其原先class值
        rows[i]['data-class'] = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this, 'highlight');
        };
        rows[i].onmouseout = function () {
            this.className = this['data-class'];
        };
    }
}

function displayAbbrs() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
        return false;
    }
    var abbrs = document.getElementsByTagName('abbr');
    if (abbrs.length < 1) {
        return false;
    }
    var list = [];
    for (var i = 0, len = abbrs.length; i < abbrs.length; i++) {
        var key = abbrs[i].lastChild.nodeValue;
        var description = abbrs[i].getAttribute('title');
        list[key] = description;
    }
    // 注意此时list.length仍然为0

    var dList = document.createElement('dl');
    for (var k in list) {
        var dt = document.createElement('dt');
        var title = document.createTextNode(k);
        dt.appendChild(title);
        var dd = document.createElement('dd');
        var des = document.createTextNode(list[k]);
        dd.appendChild(des);
        dList.appendChild(dt);
        dList.appendChild(dd);
    }
    if (dList.childNodes.length < 1) {
        return false;
    }
    var header = document.createElement('h3');
    var headerText = document.createTextNode('Abbreviations');
    header.appendChild(headerText);
    var articles = document.getElementsByTagName('article');
    if (articles.length === 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dList);
}

//live.html end

//contact.html

function focusLabels() {
    if (!document.getElementsByTagName) {
        return false;
    }
    var labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute('for')) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute('for');
            if (!document.getElementById(id)) return false;
            var elem = document.getElementById(id);
            elem.focus();
        };
    }
}

function resetFields(whichForm) {
    if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichForm.elements.length; i++) {
        var elem = whichForm.elements[i];
        if (elem.type === 'submit') continue;
        var check = elem.placeholder || elem.getAttribute('placeholder');
        if (!check) continue;
        elem.oldClass = elem.className;
        elem.onfocus = function () {
            var text = this.placeholder || this.getAttribute('placeholder');
            if (this.value === text) {
                this.value = '';
                this.className = this.oldClass;
            }
        };
        elem.onblur = function () {
            if (this.value === '') {
                this.value = this.placeholder || this.getAttribute('placeholder');
                //添加className,改变其颜色
                addClass(this, 'placeholder');
            }
        };
        elem.onblur();
    }
}

//验证表单
function validataForm(whichForm) {
    for (var i = 0; i < whichForm.elements.length; i++) {
        var elem = whichForm.elements[i];
        if (elem.required === 'required') {
            if (!isFilled(elem)) {
                alert('Please fill in the ' + elem.name + ' field.');
                return false;
            }
        }
        //书上采用elem.type == 'email'来进行判断，但我使用ie11模拟
        //ie7文件input的type自动变成'text'，因此此处我修改为elem.id === 'email'
        //element.getAttribute("type")
        if (elem.id === 'email') {
            if (!isEmail(elem)) {
                alert('The ' + elem.name + ' field must be a valid email address.');
                return false;
            }
        }
    }
    return true;
}

function isFilled(field) {
    if (field.value.replace(' ','').length === 0) {
        return false;
    }
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value !== placeholder);
}

function isEmail(field) {
    return (field.value.indexOf('@') !== -1 && field.value.indexOf('.') !== -1);
}

function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisForm = document.forms[i];
        resetFields(thisForm);
        thisForm.onsubmit = function () {
            if (!validataForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        };
    }
}

//提交表单

//创建Ajax请求
function getHTTPObject() {
    if (typeof XMLHttpRequest === 'undefined') {
        XMLHTTPRequest = function () {
            try { return new ActiveXObject('Msxml2.XMLHTTP.6.0');}
                catch (e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP.3.0');}
                catch (e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP');}
                catch (e) {}
            return false;
        };
    }
    return new XMLHttpRequest();
}

//创建缓冲内容
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement('img');
    content.setAttribute('src', 'images/loading.gif');
    content.setAttribute('alt', 'loading...');
    element.appendChild(content);
}
//通过Ajax提交表单

function submitFormWithAjax(whichForm, theTarget) {
    var request = getHTTPObject();
    if (!request) {
        return false;
    }
    displayAjaxLoading(theTarget);
    var dataList = [];
    for (var i = 0, len = whichForm.elements.length; i < len; i++) {
        var elem = whichForm.elements[i];
        //书上没有对elem进行筛选
        // if (!elem.name) {
        //     continue;
        // }
        dataList[i] = elem.name + '=' + encodeURIComponent(elem.value);
    }
    var data = dataList.join('&');

    request.open("POST", whichForm.getAttribute('action'), true);
    request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status === 0) {
                var matchs = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matchs.length > 0) {
                    theTarget.innerHTML = matchs[1];
                } else {
                    theTarget.innerHTML = '<p>There was an error!</p>';
                }
            } else {
                theTarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
    };
    request.send(data);
    return true;
}

//加载所有事件

function loadEvents() {
    //index.html
    highLightPage();
    prepareSlideshow();

    //about.html
    prepareIntervalNav();

    //photos.html
    prepareImagegallery();

    //live.html
    stripeTables();
    highLightRows();
    displayAbbrs();

    //contact.html
    focusLabels();
    prepareForms();
}

addLoadEvent(loadEvents);