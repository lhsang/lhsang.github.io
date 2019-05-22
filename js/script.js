function getInfoReader() {
    setTimeout(function () {
        var div = document.getElementsByClassName("_4cqr")[0];
        var user = div.getElementsByTagName("a")[0].getAttribute("href"); 
        console.log(user);
    }, 5000);
}