Object_Detector = "";
Input_Status = "";
Input = "";
Objects = [];
Video = "";
Object_Text = "";
Object_X = 0;
Object_Y = 0;

function preload(){}
function setup(){
    Canvas = createCanvas(500, 400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
}
function draw(){
    image(Video, 0, 0, 500, 400);
    if(Input_Status != ""){
        Object_Detector.detect(Video, gotResults);
        for(i = 0; i < Objects.length; i++){
            fill("#bd9eff");
            noFill();
            Percentage = floor(Objects[i].confidence * 100);
            Object_Text = Objects[i].label;
            Object_X = Objects[i].x;
            Object_Y = Objects[i].y;
            Object_Width = Objects[i].width;
            Object_Height = Objects[i].height;
            text(Object_Text + " " + Percentage + "%", Object_X, Object_Y);
            stroke("#bd9eff");
            rect(Object_X, Object_Y, Object_Width, Object_Height);
        }
        if(Object_Text == Input){
            Video.stop();
            Object_Detector.detect(gotResults);
            document.getElementById("Status").innerHTML = "Model Status: " + Input + " detected!";
        }
        else{
            document.getElementById("Status").innerHTML = "Model Status: Object Not Detected";
        }
    }
}
function Start(){
    Object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Model Status: Detecting Your Object";
    Input = document.getElementById("User").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    Input_Status = true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    Objects = results;
}