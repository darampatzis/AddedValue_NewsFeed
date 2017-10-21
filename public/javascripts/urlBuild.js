//var myUrl = "http://mydomain.com/something";
var myUrl = 'http://localhost:3000';

function addParamToURL(name, value) {
    var re = new RegExp("([?&]" + name + "=)([^&]+)?", "");

    function add(sep) {
        myUrl += sep + name + "=" + encodeURIComponent(value);
    }

    function change() {
        myUrl = myUrl.replace(re, "$1" + encodeURIComponent(value));
    }

    if (myUrl.indexOf("?") === -1) {
        add("?");
    } else {
        if (re.test(myUrl)) {
            change();
        } else {
            add("&");
        }
    }
}

console.log(myUrl);

addParamToURL("foo", "asdf");
console.log(myUrl);

addParamToURL("bar", "qwerty");
console.log(myUrl);

addParamToURL("foo", "123");
console.log(myUrl);