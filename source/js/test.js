/**
 * Created with IntelliJ IDEA.
 * User: juw
 * Date: 9/20/13
 * Time: 4:04 AM
 * To change this template use File | Settings | File Templates.
 */


console.log("I am legend");


var raw_data = "Jeg er en rapand rasmus";

var encrypted_data = sjcl.encrypt("password", raw_data);
console.log("Encrypted data: ", encrypted_data);


var decrypted_data = sjcl.decrypt("password", encrypted_data);
console.log("Decrypted data: ", decrypted_data);


//localStorage['some_key_2'] = "pop_da_op";
