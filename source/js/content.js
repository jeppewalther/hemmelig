
console.log("content script: hellow world");

var elements = document.getElementsByClassName("userContent");
console.log(elements);

function ReplaceContentInContainer(selector, content) {
    var nodeList = document.querySelectorAll(selector);
    for (var i = 0, length = nodeList.length; i < length; i++) {
        var inner = nodeList[i].textContent || nodeList[i].innerText || "";

        console.log(inner);
        if(inner.charAt(0) == "{"){
            //console.log(inner);
            nodeList[i].innerHTML = sjcl.decrypt("rapand", inner);
        }


    }
}
ReplaceContentInContainer(".userContent", "HELLO WORLD");
data = sjcl.encrypt("rapand", "Den tekst er virkelig hemmelig");

console.log("Data:", data);
