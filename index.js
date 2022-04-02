$(document).ready(function () {
    setBackground();
    $("#color").change(function() {
        setBackground();
    });
    $(".tooltip").click(function() {
        navigator.clipboard.writeText($("#hexcode").text());
        $("#tooltip").text("Copied!");
    });
    $(".tooltip").mouseout(function() {
        $("#tooltip").text("Click to copy to clipboard");
    });
});

function setBackground() {
    var hsv = HEXtoHSV($("#color").val());
    console.log(hsv.v);
    if (hsv.v > 0.5) {
        hsv.v = 1 - hsv.v;
        var darkHEX = HSVtoHEX(hsv.h, hsv.s, hsv.v);
        $(":root").css("--main", darkHEX);
        $(":root").css("--contrast", $("#color").val());
        $("#hexcode").text($("#color").val().toUpperCase() + " → " + darkHEX.toUpperCase());
    } else {
        hsv.v = 1 - hsv.v;
        var darkHEX = HSVtoHEX(hsv.h, hsv.s, hsv.v);
        $(":root").css("--main", $("#color").val());
        $(":root").css("--contrast", darkHEX);
        $("#hexcode").text($("#color").val().toUpperCase());
    }
}

function HEXtoHSV(h) {
    let r = 0, g = 0, b = 0;
  
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }
    r = +r,
    g = +g,
    b = +b
    
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function HSVtoHEX(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    r = Math.round(r * 255),
    g = Math.round(g * 255),
    b = Math.round(b * 255)
    
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}