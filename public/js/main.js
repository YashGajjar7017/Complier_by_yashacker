API_KEY = "34c8103e63msh909728bfda25be5p1bb0fbjsnd587398101bf"; // PLEASE DON'T SHARE 
// API_KEY = "cc6dcd8390msh2e162a8a61f0938p1a4717jsn3b68ec13545b"; // PLEASE DON'T SHARE

var language_to_id = {
    "C": 50,
    "C++": 54,
    "Java": 62,
    "Python": 71,
};

function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")));
}

function decode(bytes) {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}

function errorHandler(jqXHR, textStatus, errorThrown) {
    $("#output").val(`${JSON.stringify(jqXHR, null, 4)}`);
    $("#run").prop("disabled", false);
}

function check(token) {
    $("#output").val($("#output").val() + "\nChecking submission status...");
    $.ajax({
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
        type: "GET",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        success: function (data, textStatus, jqXHR) {
            if ([1, 2].includes(data["status"]["id"])) {
                $("#output").val($("#output").val() + "\nStatus: " + data["status"]["description"]);
                setTimeout(function () {
                    check(token)
                }, 1000);
            } else {
                var output = [decode(data["compile_output"]), decode(data["stdout"])].join("\n").trim();
                $("#output").val(output);
                $("#run").prop("disabled", false);
            }
        },
        error: errorHandler
    });
}

function run() {
    $("#run").prop("disabled", true);
    $("#output").val("Creating submission...");
    $.ajax({
        url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true",
        type: "POST",
        contentType: "application/json",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        data: JSON.stringify({
            "language_id": language_to_id[$("#lang").val()],
            "source_code": encode($("#source").val()),
            "stdin": encode($("#input").val()),
            "redirect_stderr_to_stdout": true
        }),
        success: function (data, textStatus, jqXHR) {
            $("#output").val($("#output").val() + "\nSubmission created.");
            setTimeout(function () {
                check(data["token"])
            }, 2000);
        },
        error: errorHandler
    });
}


$("body").keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
        run();
    }
});

$("textarea").keydown(function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var append = "    ";
        $(this).val($(this).val().substring(0, start) + append + $(this).val().substring(end));

        this.selectionStart = this.selectionEnd = start + append.length;
    }
});

// ----------------line-number-code------------------
$("#source").focus();

// text area
var codeEditor = document.getElementById('source');
var lineCounter = document.getElementById('lineCounter');

codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});

codeEditor.addEventListener('keydown', (e) => {
    let {
        keyCode
    } = e;
    let {
        value,
        selectionStart,
        selectionEnd
    } = codeEditor;
    if (keyCode === 9) { // TAB = 9
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2)
    }
});

// ---------textarea-line-code--------------
var lineCountCache = 0;

function line_counter() {
    var lineCount = codeEditor.value.split('\n').length;
    var outarr = new Array();
    if (lineCountCache != lineCount) {
        for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + '.';
        }
        lineCounter.value = outarr.join('\n');
    }
    lineCountCache = lineCount;
}
codeEditor.addEventListener('input', () => {
    line_counter();
});

// -------------------------------@lineCounter1-------------------------------
$("#htmlTextarea").focus();

// text area
var codeEditor1 = document.getElementById('htmlTextarea');
var lineCounter1 = document.getElementById('lineCounter1');

codeEditor1.addEventListener('scroll', () => {
    lineCounter1.scrollTop = codeEditor1.scrollTop;
    lineCounter1.scrollLeft = codeEditor1.scrollLeft;
});

codeEditor1.addEventListener('keydown', (e) => {
    let {
        keyCode
    } = e;
    let {
        value,
        selectionStart,
        selectionEnd
    } = codeEditor1;
    if (keyCode === 9) { // TAB = 9
        e.preventDefault();
        codeEditor1.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
        codeEditor1.setSelectionRange(selectionStart + 2, selectionStart + 2)
    }
});

// -----------------textarea-line-code-------------------
var lineCountCache1 = 0;

function line_counter1() {
    var lineCount1 = codeEditor1.value.split('\n').length;
    var outarr = new Array();
    if (lineCountCache1 != lineCount1) {
        for (var x = 0; x < lineCount1; x++) {
            outarr[x] = (x + 1) + '.';
        }
        lineCounter1.value = outarr.join('\n');
    }
    lineCountCache1 = lineCount1;
}
codeEditor1.addEventListener('input', () => {
    line_counter1();
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

//--------------- navbar-setting-------------------

const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light"),
    searchToggle = document.querySelector(".searchToggle"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
}

// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // js code to keep user selected mode even page refresh or file reopen
    if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});

// js code to toggle search box
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});

//   js code to toggle sidebar
sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

body.addEventListener("click", e => {
    let clickedElm = e.target;

    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
});

// navbar-ended
// -------------------Sidebar1------------------
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById('lineCounter').style.marginTop = '10vh';
    document.getElementById('lineCounter1').style.marginTop = '10vh';
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById('lineCounter').style.marginTop = '12vh';
    document.getElementById('lineCounter1').style.marginTop = '12vh';
}
// -------------------Sidebar2------------------
function openNav1() {
    document.getElementById("mySidenav2").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById('lineCounter').style.marginTop = '10vh';
    document.getElementById('lineCounter1').style.marginTop = '10vh';
}

function closeNav1() {
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById('lineCounter').style.marginTop = '12vh';
    document.getElementById('lineCounter1').style.marginTop = '12vh';
}
// -------------------Sidebar3------------------
function openNav2() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("nav").style.top = "-75px";
}

function closeNav2() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("nav").style.top = "0px";
}
// -------------------Sidebar4------------------
function openNav3() {
    document.getElementById("mySidenav4").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById('lineCounter').style.marginTop = '10vh';
    document.getElementById('lineCounter1').style.marginTop = '10vh';
}

function closeNav3() {
    document.getElementById("mySidenav4").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById('lineCounter').style.marginTop = '12vh';
    document.getElementById('lineCounter1').style.marginTop = '12vh';
}

// ---------------------Html LiveEditor-------------------
function refresh() {
    var textContent = document.getElementById('htmlTextarea').value;
    document.getElementById('htmlTextarea1').srcdoc = textContent;
}

// --------------------Logout change code..------------------------
var logout = document.getElementById('logout')
logout.addEventListener('click', function () {
    sessionStorage.clear('sessionStorage')
    location.reload()
})

// -------------Extend-Line-----------
const box = document.getElementById("source");
box.style.height = box.scrollHeight + "px";

const box1 = document.getElementById("output");
box1.style.height = box1.scrollHeight + "px";

const box2 = document.getElementById("input")
box2.style.height = box2.scrollHeight + "px";

// --------------Stop function-------------
function stop() {
    $("#output").val("Code exited...\n =>Error code 1 \n =>code has been stopped");
}

// ---------------Print function-------------------
function printPageArea(areaID) {
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

// ------------------------Download_File_Code:-----------------------

const downloadFile = () => {
    const link = document.createElement("a");
    const content = document.querySelector("#source").value;
    const file = new Blob([content], { type: 'text/plain' });

    link.href = URL.createObjectURL(file);
    a = document.getElementById('lang').value;

    if (a == 'C') {
        b = 'c';
    }
    else if (a == 'C++') {
        b = 'cpp';
    }
    else if (a == 'Python') {
        b = 'py';
    }
    else if (a == 'Java' || a == 'Applet') {
        b = 'java';
    }
    else if (a == 'Html') {
        let text = prompt("HTML → html, CSS → css, JS → js")
        if (text == 'html' | text == 'HTML') {
            b = 'html';
        }
        else if (text == 'css' | text == 'CSS') {
            b = 'css';
        }
        else if (text == 'js' | text == 'JS') {
            b = 'js'
        }
        else {
            alert('wrong extension type')
        }
        // b = 'html';
    }
    else if (a == 'VB') {
        alert('Coming Soon...')
    }
    else if (a == 'Node') {
        alert('Coming Soon...')
    }
    else if (a == 'Encrypt') {
        b = 'sha256';
    }
    else if (a == 'Text') {
        confirm('warning : all the text is save to server');
        b = 'txt';
    }
    else {
        // b = 'bat';
        alert('Please select the language first or languague may not be supported for download..')
    }

    link.download = "The_Byter's_Machine." + b;
    link.click();

    URL.revokeObjectURL(link.href);
};



//*************** */ Language selector Code:*********************
let LangData = localStorage.getItem('lang');

function LangSelector() {

    // ---------------C-------------
    var lang = document.getElementById('lang').value;

    if (lang == 'C') {
        localStorage.setItem('lang', 'C');
        localStorage.setItem('editorChange', 1);

        document.getElementById('lineCounter').style.height = '62vh';
        document.getElementById('source').style.height = '62vh';


        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,.kali,.futureWork,.encrypt').fadeOut(900)
        $('#lineCounter,#IO,#source').delay(700).fadeIn();
        document.getElementById('source').innerHTML =
            `#include<stdio.h>
void main()
{
    printf("Hello world...");
}`
    }

    // ---------------cpp---------------
    else if (lang == 'C++') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,.kali,.futureWork,.encrypt').fadeOut(900)
        $('#lineCounter,#IO,#source').delay(700).fadeIn();
        localStorage.setItem('lang', 'Cpp');
        localStorage.setItem('editorChange', 2);
        document.getElementById('lineCounter').style.height = '62vh';
        document.getElementById('source').style.height = '62vh';

        document.getElementById('source').innerHTML =
            `#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World";
    return 0;
}`;

    }

    // ---------------python--------------- 
    else if (lang == 'Python') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,.kali,.futureWork,.encrypt').fadeOut(900)
        $('#lineCounter,#IO,#source').delay(700).fadeIn();

        localStorage.setItem('lang', 'Python');
        localStorage.setItem('editorChange', 3);

        document.getElementById('lineCounter').style.height = '62vh';
        document.getElementById('source').style.height = '62vh';

        document.getElementById('source').innerHTML =
            `print("hello world")`;

    }

    // ---------------java---------------
    else if (lang == 'Java') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,.kali,.futureWork,.encrypt').fadeOut(900)
        $('#lineCounter,#IO,#source').delay(700).fadeIn();

        localStorage.setItem('lang', 'Java');
        localStorage.setItem('editorChange', 4);

        document.getElementById('lineCounter').style.height = '62vh';
        document.getElementById('source').style.height = '62vh';

        document.getElementById('source').innerHTML =
            `public class Main
{
    public static void main(String[] args)
    {
        System.out.println("Hello World");
    }
}`;
    }

    // ---------------html---------------
    else if (lang == 'Html') {
        $('#lineCounter,#IO,#source,.futureWork,.encrypt,.kali').fadeOut(900)
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1').delay(700).fadeIn(); //#lineCounter

        localStorage.setItem('lang', 'Html');
        localStorage.setItem('editorChange', 4);

    }
    // ---------------hacking---------------
    else if (lang == 'Hacking') {
        $('#lineCounter,#IO,#source,#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,.futureWork,.encrypt').fadeOut(900);
        $('.kali').delay(700).fadeIn();

        localStorage.setItem('lang', 'Hacking');
        localStorage.setItem('editorChange', 5);

        setTimeout(window.location.href = 'http://192.168.1.8:8888', 2000);
    }
    // ---------------VB---------------
    else if (lang == 'VB') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,.encrypt,.kali,.futureWork').fadeOut(900)
        $('#lineCounter,#source,#IO').delay(700).fadeIn(); //#lineCounter

        localStorage.setItem('lang', 'Vb');
        localStorage.setItem('editorChange', 6);

        document.getElementById('source').innerHTML =
            `Imports System
Public Class Rectangle
Private length As Double
Private width As Double

'Public methods
------------------------------------------------------------------------------------------------------------------------
    Public Sub AcceptDetails()
        length = 4.5
        width = 3.5
    End Sub
------------------------------------------------------------------------------------------------------------------------
    Public Function GetArea() As Double
        GetArea = length * width
    End Function
------------------------------------------------------------------------------------------------------------------------
    Public Sub Display()
        Console.WriteLine("Length: {0}", length)
        Console.WriteLine("Width: {0}", width)
        Console.WriteLine("Area: {0}", GetArea())
    End Sub
------------------------------------------------------------------------------------------------------------------------
    Shared Sub Main()
        Dim r As New Rectangle()
        r.Acceptdetails()
        r.Display()
        Console.ReadLine()
    End Sub
------------------------------------------------------------------------------------------------------------------------
End Class`

    }
    // ---------------Node---------------
    else if (lang == 'Node') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,#lineCounter,#IO,#source,.encrypt,.kali').fadeOut(900)
        $('.futureWork').delay(700).fadeIn(); //#lineCounter

        localStorage.setItem('lang', 'Node');
        localStorage.setItem('editorChange', 7);
        document.getElementsByClassName("run").disabled = true;

    }
    // ---------------text---------------
    else if (lang == 'Text') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,#IO,#source.futureWork,.encrypt,.kali').fadeOut(900)
        $('#lineCounter,#source').delay(700).fadeIn(); //#lineCounter

        localStorage.setItem('lang', 'textMode');
        localStorage.setItem('editorChange', 8);

        document.getElementsByClassName("run").disabled = true;
        document.getElementById('lineCounter').style.height = '82vh';
        document.getElementById('source').style.height = '82vh';

        document.getElementById('source').innerHTML = `Start your code`;
    }
    // --------------Encrypt-----------------
    else if (lang == 'Encrypt') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,#lineCounter,#IO,#source,.futureWork,.kali').fadeOut(900)
        $('.encrypt').delay(700).fadeIn(); //#lineCounter

        localStorage.setItem('lang', 'encrypt');
        localStorage.setItem('editorChange', 9);

    }
    // -------------Applet--------------------
    else if (lang == 'Applet') {
        $('#htmlEditor,#htmlTextarea,#htmlTextarea1,#lineCounter1,#lineCounter,#IO,#source,.encrypt,.kali').fadeOut(900)
        $('.futureWork').delay(700).fadeIn(); //#lineCounter

        localStorage.setItem('lang', 'Applet');
        localStorage.setItem('editorChange', 10);
        document.getElementsByClassName("run").disabled = true;
    }

    else {
        localStorage.removeItem("lang");
        localStorage.setItem('editorChange', 0);
    }
}

// ------------------Full Scream Mode -----------------

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();  // Safari
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE/Edge
    }
};

document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
        console.log('Entered fullscreen:', document.fullscreenElement);
    } else {
        console.log('Exited fullscreen.');
    }
});

// ----------------layout change----------------
let layoutID = document.getElementById('layoutID');
let source1 = document.getElementById('source');
let mainContainer = document.getElementById('mainContainer')

layoutID.addEventListener('click', function () {
    let layout = document.getElementById('layout').value;

    if (layout == 'sbs') {
        lineCounter.style.height = '100vh';
        source1.style.height = '100vh';
        source1.style.width = '50vw';
        mainContainer.style.display = 'flex';
        mainContainer.style.flexDirection = 'column'
        source1.style.display = 'source1';

    }
    else if (layout == 'fm') {
        let videoEle = document.querySelector('body');
        enterFullScreen(videoEle);
        setInterval(function () {
            window.refresh()
        }, 100)
    }
    else if (layout == 'default') {
        lineCounter.style.height = '60vh';
        source1.style.height = '60vh';
        source1.style.width = '100vw';
    }
    else {
        alert('loop exit')
        lineCounter.style.height = '61vh';
        source1.style.height = '61vh';
        source1.style.width = '100vw';
    }
    console.log(layout);
})

// -----------------------Font-size----------------------

function setSize(size) {
    if (size == 12) {
        textarea.style.fontSize = '12px';
        lineTextarea.style.fontSize = '12px';
    }
    else if (size == 14) {
        textarea.style.fontSize = '14px';
        lineTextarea.style.fontSize = '14px';
    }
    else if (size == 16) {
        textarea.style.fontSize = '16px';
        lineTextarea.style.fontSize = '16px';
    }
    else if (size == 18) {
        textarea.style.fontSize = '18px';
        lineTextarea.style.fontSize = '18px';
    }
    else if (size == 20) {
        textarea.style.fontSize = '20px';
        lineTextarea.style.fontSize = '20px';
    }
    else if (size == 22) {
        textarea.style.fontSize = '22px';
        lineTextarea.style.fontSize = '22px';
    }
    else {
        textarea.style.fontSize = '16px';
        lineTextarea.style.fontSize = '16px';
    }
}

let textarea = document.getElementById('source');
let lineTextarea = document.getElementById('lineCounter');
let size = document.getElementById('fontsize');

size.addEventListener('change', function () {
    let size = document.getElementById('fontsize').value;
    setSize(size);
})
// textarea.style.fontSize = `${size}px`;

// -----------------------Background----------------------
let input = document.getElementById('input')
let output = document.getElementById('output')
let color1 = document.getElementById('color1');
color1.addEventListener('change', function () {

    let color = document.getElementById('color1').value;
    // setTimeout(textarea.style.backgroundColor = color, 100)  //This is settime out func()
    textarea.style.backgroundColor = color
    lineTextarea.style.backgroundColor = color

    input.style.backgroundColor = color
    output.style.backgroundColor = color

    // console.log(color);
    sessionStorage.setItem('textareacolor', color);

}, false)

// -----------------------FontColor----------------------
let color2 = document.getElementById('color2');
color2.addEventListener('change', function () {

    let fontclr = document.getElementById('color2').value;

    textarea.style.color = fontclr
    lineTextarea.style.color = fontclr

    input.style.color = fontclr
    output.style.color = fontclr
    // console.log(fontclr);

    sessionStorage.setItem('fontcolor', fontclr);
}, false)

// -----------------------DefaultColor----------------------
let defaultcolors = document.getElementById('defaultcolors')
defaultcolors.addEventListener('click', function () {

    textarea.style.backgroundColor = '#333';
    lineTextarea.style.backgroundColor = '#555';

    textarea.style.color = '#fff'
    lineTextarea.style.color = '#fff'

    sessionStorage.clear('fontcolor')
    sessionStorage.clear('textareacolor')

    textarea.style.fontSize = '16px';
    lineTextarea.style.fontSize = '16px';
    // location.reload();
})

// ----------------------Water remainder------------------
function waterRemiRender() {
    let waterReminder = localStorage.getItem('waterLiters');
    setTimeout(() => {
        // alert(`${waterReminder}L is left water to drink! there is break ! please go..`)
        alert(`Wait i have some special feature that i remiander to drink water after every 30 min`)
    }, 600000);
    console.log(waterReminder.innerHTML);
}

waterRemiRender();
// export { waterRemiRender }; //first export of me..

// ----------------------maintaince brake-----------------
$(document).ready(function () {
    $('.maintance').hide();
    let maintainceToken = 0;

    $('#maintaince').click(function () {
        let code = prompt("PLEASE ENTER THE SERVER TOKEN:");

        if (code === "yashacker") {
            maintainceToken++;
            sessionStorage.setItem('token_true', 'THENDKFNVSJMDNFIIJDFIMKZDFJIXDFHASUHBBSDHUD');
            // toggale class
            if (maintainceToken === 1 && sessionStorage.getItem('token_true')) {
                $('body').addClass('adder'), 1000;
                $('.maintance').show();
                if (sessionStorage.getItem('token_true')) {
                    sessionStorage.removeItem('token_true');
                    sessionStorage.setItem('token_false', 'YIEURNSDFHAJKRTHUISRTNALERTKMAKSRLQWOIREKW');
                } else {
                    sessionStorage.getItem('token_false');
                }
            } else {
                alert("Please try again");
            }
        } else {
            maintainceToken = 0;

        }
        // $('.home,.close').fadeTo(1000,0.4);
        // $('.home,.close').css("opacity", "0.5");
    });

    // Maintaince Off
    let tokenOff = document.getElementById('turnOff')
    tokenOff.addEventListener('click', function () {
        // token_true
        if (sessionStorage.getItem('token_true')) {
            sessionStorage.getItem('token_false');
        } else {
            alert("ckeck the sessionStorage : token_true");
        }

        // token_false
        if (sessionStorage.getItem('token_false')) {
            $('.home,.close').removeClass('backup'), 9000;
            $('.maintance').hide();
        } else {
            console.log('data not found!')
        }
    });

    $('.mainbreak').dblclick(function () {
        $('.maintance').hide();
    });

    // $('a[class="mainbreak"]').attr('disabled', true);  ->Set attribute to a class vai jqueary
});

// =========================share========================
function share() {
    let link = 'Code : Complier74124';
    alert(link + "\n\n→ Copy code!\n→ share it & use it..!");
}

// ========================encrypt=======================
function clearData() { //Clear data function
    document.getElementById("receverData").innerText += ' ';
}

const button1 = document.getElementById('encrypt')
button1.addEventListener('click', function () {
    let text = document.getElementById('sendData').value;

    let encoded = window.btoa(text);
    let decoded = window.atob(encoded);
    clearData()
    document.getElementById("receverData").innerHTML += `Encoded : ${encoded}\n Decoded : ${decoded}`;

    // document.getElementById("receverData").innerHTML += ' ';
    // document.getElementById("receverData").innerHTML += "Encoded : " + encoded;
})

const button2 = document.getElementById('clear')
button2.addEventListener('click', function () {
    // document.getElementById("receverData").innerText += ' ';
    clearData()
})

// ---------------Hash Check-----------------

var hash = window.location.hash.substring(1);
sessionStorage.setItem('userName', hash);
// console.log(hash);

//---------------- height change--------------------
let textHeight = document.getElementById('source').clientHeight
if (textHeight) {
    let textHeight1 = document.getElementById('source').clientHeight;
    document.getElementById('lineCounter').style.height += textHeight1;
    console.log(textHeight);
}

// ------------------join session-----------
function join() {
    let text = prompt("Enter your Session id:")
    setTimeout(() => {
        if (!text) {
            alert('wrong session id! please try again')
        }
        else {
            alert('we are joining you session')
        }
    }, 2000);
}