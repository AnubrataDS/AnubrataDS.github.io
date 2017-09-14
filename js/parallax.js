//obviously inspired by the firewatch website
//translate3d lags a bit , background-position-y is better but having a bit of trouble with alignment and stuff
function castParallax() {

    window.addEventListener("scroll", function(event) {

        var top = this.pageYOffset;
        var yPos;
        for (var i = 0; i < layers.length; i++) {


            var yPos = init[i] - (top * speed[i] / 100);
            //var yPos = -(top * speed[i] / 100);
            if (i == 6)
                layers[i].setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px);' +
                    '-webkit-transform: translate3d(0px, ' + yPos + 'px, 0px);' +
                    '-ms-transform: translateY(' + yPos + 'px, 0px);');
            else
            //console.log(yPos);
                layers[i].setAttribute('style', 'background-position-Y: ' + yPos + 'px;');
        }
    });


}
var layers = document.getElementsByClassName("parallax-layer");
var speed = [];
var init = []
for (var i = 0; i < layers.length; i++) {
    speed.push(layers[i].getAttribute('data-parallax-speed') * 100);
    _tmp = window.getComputedStyle(layers[i], null).backgroundPosition.trim().split(/\s+/),
        positions = {
            'left': parseFloat(_tmp[0]),
            'top': parseFloat(_tmp[1])
        };
    // var tops = layers[i].getComputedStyle(layers[i], null).backgroundPosition.trim().split(/\s+/),
    console.log('top ' + i + ': ' + document.documentElement.clientHeight * positions.top * 0.015);
    if (i != 6)
        init.push(positions.top);
    //init.push(document.documentElement.clientHeight * positions.top * 0.015);
    else
        init.push(0);
}

document.body.onload = castParallax();