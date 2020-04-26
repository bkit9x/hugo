var mon = document.getElementsByClassName('breadcrumb-item')[2].innerText;
var host = 'http://localhost:8080/antiquiz/';

var listdapan = document.querySelectorAll("input[type='radio']");
//post cau hoi va dapan
var a = document.getElementsByClassName("que");
for (let i = 0; i < a.length; i++) {
    var qtext = a[i].getElementsByClassName("qtext")[0].innerText;
    var dapan = a[i].querySelectorAll("input[type='radio']");
    postdata(host+'post.php', {mon:mon, q:qtext, a:[dapan[0].parentElement.innerText,dapan[1].parentElement.innerText,dapan[2].parentElement.innerText,dapan[3].parentElement.innerText]});
}

var myiv;
antiquiz();



function antiquiz() {
    myiv = setInterval(kfun(), 30000);
}


function kfun(){

    //post dapan da chon
    for (let i = 0; i < listdapan.length; i++) {
        if (listdapan[i].checked==true) {
            var qtext = listdapan[i].parentNode.parentNode.parentNode.parentNode.getElementsByClassName('qtext')[0].innerText;
            postdata(host+'selected-answer.php', {mon:mon, q:qtext, a:listdapan[i].parentElement.innerText});
        }    
    }




    for (let k = 0; k < a.length; k++) {
        var div = document.getElementById(a[k].id);
        var qtext = div.getElementsByClassName("qtext")[0].innerText;
        getdata(host+"get.php",{mon:mon, q: qtext}, a[k].id);        
    }
}

function postdata(url, data) {
    $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        dataType: 'json',
    });
}


function getdata(url, data, id) {
    $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function (data) {
            var input = document.getElementById(id).querySelectorAll("input[type='radio']");
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < input.length; j++) {
                    if (input[j].parentElement.innerText.indexOf(data[i].content) >= 0) {
                        input[j].parentElement.append(" ["+data[i].slg+"]");                        
                    }
                }
            }
        },        
    });
}
