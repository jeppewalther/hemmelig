
var master_key = "rapand"


function ReplaceContentInContainer(selector) {
    var nodeList = document.querySelectorAll(selector);
    for (var i = 0, length = nodeList.length; i < length; i++) {
        var inner = nodeList[i].textContent || nodeList[i].innerText || "";

        console.log(inner);
        if(inner.charAt(0) == '{'){
            //console.log(inner);
            nodeList[i].innerHTML = sjcl.decrypt(master_key, inner);
        }
    }
}

var send_keypress = function(elem){
    var press = jQuery.Event("keypress");
    press.ctrlKey = false;
    press.which = 40;
    elem.trigger(press);
}

var encrypt_textfield = function(txtfield){
    var text = txtfield[0].value;
    console.log('encrypt text field', text);
    var encrypted_data = sjcl.encrypt(master_key, text);
    txtfield[0].value = encrypted_data;
}

var decrypt_textfield = function(txtfield){
    var text = txtfield[0].value;
    console.log('decrypt text field', text);
    var decrypted_data = sjcl.decrypt(master_key, text);
    txtfield[0].value = decrypted_data;
}

var add_encryption_button = function(txtfield){
    var enc_button = $("<a href='#' style='z-depth:1000; position: absolute; left: 0'>E</a>");
    var txt_width = txtfield.width();
    enc_button.css('left', txt_width - 10);
    enc_button.click(function(event){
        console.log('encryption button clicked', txtfield);
        var text = txtfield[0].value;
        if (!text || !text.length) return;
        if (text[0] == '{'){
            decrypt_textfield(txtfield);
        } else {
            encrypt_textfield(txtfield);
        }
        txtfield.sendkeys(' {backspace}');
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

ReplaceContentInContainer(".userContent");

//var elements = document.getElementsByClassName("userContent");
//console.log(elements);


