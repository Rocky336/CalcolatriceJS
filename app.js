var buffer_cur = "";
var buffer_res = "";
var last_op="+";

function op(){
    if(last_op=="+")      buffer_res+=Number(buffer_cur);
    else if(last_op=="-") buffer_res-=Number(buffer_cur);
    else if(last_op=="*") buffer_res*=Number(buffer_cur);
    else if(last_op=="/") buffer_res/=Number(buffer_cur);
    else if(last_op=="^") buffer_res=Math.pow(buffer_res,Number(buffer_cur));
}

function setup_onClick(name){
    if(name=="C")
        buffer_cur = "";
    else if(name=="DEL")
        buffer_cur = (buffer_cur+"").substring(0, (buffer_cur+"").length - 1);
    else if(name=="/"||name=="*"||name=="+"||name=="-"||name=="^"){
        last_op = name;
        if(buffer_res=="") buffer_res = Number(buffer_cur);
        else op();
        buffer_cur = "";
    }
    else if(name=="="){
        op();
        buffer_cur = buffer_res;
        buffer_res = "";
    } else if(name=="."){
        if(buffer_cur.indexOf(".")>=0)return;
        buffer_cur += ".";
    }else if(Number(name)!=NaN)   buffer_cur += ""+name;
    document.getElementById("display").innerHTML = buffer_cur!=""?buffer_cur:buffer_res;
}

document.addEventListener("DOMContentLoaded",function(){
    let btn = document.createElement("button");
    let buttons = [];
    buttons.push("^");
    buttons.push("C");
    buttons.push("DEL");
    buttons.push("/");
    
    for (let i = 7; i <= 9; i++) buttons.push(i);
    buttons.push("*");
    for (let i = 4; i <= 6; i++) buttons.push(i);
    
    buttons.push("+");
    for (let i = 1; i <= 3; i++) buttons.push(i);
    buttons.push("-");
    buttons.push("");
    buttons.push("0");
    buttons.push(".");
    buttons.push("=");

    for (let i = 0; i < buttons.length; i++) {
        btn.innerHTML = buttons[i];
        document.getElementById("button-container")
        .appendChild(btn.cloneNode(true))
        .addEventListener("click", ()=> setup_onClick(buttons[i]));
    }
})