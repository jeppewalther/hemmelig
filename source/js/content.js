
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




var encrypt_textfield = function(txtfield){
    var text = txtfield[0].value;
    console.log('encrypt text field', text);
    var encrypted_data = sjcl.encrypt('rapand', text);
    txtfield[0].value = encrypted_data;
}

var decrypt_textfield = function(txtfield){
    var text = txtfield[0].value;
    console.log('decrypt text field', text);
    var decrypted_data = sjcl.decrypt('rapand', text);
    txtfield[0].value = decrypted_data;
}

var add_encryption_button = function(txtfield){
    var enc_button = $("<a href='#' style='z-depth:1000; position: absolute; left: 0'>E</a>");
    var txt_width = txtfield.width();
    enc_button.css('left', txt_width - 10);
    enc_button.click(function(event){
        console.log('encryption button clicked', txtfield);
        if (txtfield.text()[0] == '{'){
            decrypt_textfield(txtfield);
        } else {
            encrypt_textfield(txtfield);
        }
    });
    txtfield.parent().append(enc_button);
}

$(document).bind('focusin', function(event){
    var elem = event.target;
    add_encryption_button($(elem));
});


function UpdateDOM(){
    //console.log('DOM CHANGED');
    root = document;
    $.each(FindEditableElements(root), function(i, elem){
        console.log('add encryption button to', elem);
        try {
            AddEncryptionButton(elem);
        } catch (exception) {
            console.warn('could not add button to elemement: ', elem, exception);
        }
    });
}

ReplaceContentInContainer(".userContent", "HELLO WORLD");
data = sjcl.encrypt("rapand", "Den tekst er virkelig hemmelig");

console.log("Data:", data);
