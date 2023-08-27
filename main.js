var img = "";
var Status = "";
objects = [];

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status = Detecting';
}
function preload(){
    img = loadImage("dog_cat.jpg");
}
function draw(){
    image(img, 0, 0, 640, 420);
    if(Status != ""){
      for(i = 0; i< objects.length; i++) {
        document.getElementById('status').innerHTML = 'Status = Object Detected';

        fill('Blue');
        percent = floor(objects[i].confidence *100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
        noFill();
        stroke('Black');
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("Model loaded!");
    Status = true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}