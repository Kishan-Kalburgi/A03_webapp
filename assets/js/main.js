function myFunction() {
    var month = parseInt($("#month").val());

    $("#imageLoad").html(" ");

    var x = document.createElement("IMG");
    x.setAttribute("src", getImagePath(month));
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("alt", "The Pulpit Rock");
    $("#imageLoad").append(x);
}

function getImagePath(month) {
    if (typeof month != "number" && isNaN(month)) {
        throw Error("Input should be number")
    }
    if (month < 1 || month > 12) {
        throw Error("Input should range from 1-12.")
    }
    var imgSrc;
    switch (month) {
        case 1:
            imgSrc = "Images/BikeRacing26.jpg";
            break;
        case 2:
            imgSrc = "Images/birds.jpg";
            break;
        case 3:
            imgSrc = "Images/cook.jpg";
            break;
        case 4:
            imgSrc = "Images/dog.jpg";
            break;
        case 5:
            imgSrc = "Images/elephant.jpg";
            break;
        case 6:
            imgSrc = "Images/fighter.jpg";
            break;
        case 7:
            imgSrc = "Images/rat.jpg";
            break;
        case 8:
            imgSrc = "Images/panda.jpg";
            break;
        case 9:
            imgSrc = "Images/farmer.jpg";
            break;
        case 10:
            imgSrc = "Images/rockstar-concert.jpg";
            break;
        case 11:
            imgSrc = "Images/king.jpg";
            break;
        case 12:
            imgSrc = "Images/superman.jpg";
            break;
    }
    return imgSrc;
}