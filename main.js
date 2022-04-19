Webcam.set({
    width:360,
    height:200,
    image_format:"png",
    png_quality:100
})
camera = document.getElementById("camera");

function startWebcam(){
    Webcam.attach(camera);
}
function tas(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = '<img id="capturedimg" src="'+data_url+'" >';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/VtX06KX2T/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model is Loaded!")
}
function identifyobj(){
    img = document.getElementById("capturedimg");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        document.getElementById("object-result").innerHTML = result[0].label;
        document.getElementById("acc-result").innerHTML = result[0].confidence.toFixed(4);
    }
}