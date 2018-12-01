$(document).ready(function () {
    // Dropdown menu
    $(".dropdown-button").dropdown();
//added non working function to take urls and add them to photos
// event.preventDefault()
    
    // $("#ani-title")= titleInput
    // $("#ani-caption")= captionInput
$("#ani-form-compose").hide()
$(document).on("submit","#addStory",prepareStory)
// function previewIMG(full){
    
//     $("#previewIMG").src = full
// }
let captionInput = $("#ani-title")
let titleInput = $("#ani-caption")
let photoUrls = []

function prepareStory(event){
    event.preventDefault()
    if (!captionInput.val().trim() || !titleInput.val().trim() || photoUrls.length<1) {
        return;
      }
      console.log(photoUrls)
      console.log(titleInput)
      console.log(captionInput)
       postStory({
        title: titleInput,
        caption: captionInput,
        thumbUrl: photoUrls[0],
        url: photoUrls[1]
       })  
      

}

function postStory(data){
    $.post("/api/upload-photos",).then(console.log(data))


}
function showTitleForm(photoUrls){
    console.log(photoUrls)
    $("#ani-form-compose").show()
    
    

}
function openWidget(){
    // const  photoUrls = []
    var widget = cloudinary.createUploadWidget({
        cloudName: "dm2obdaq7",
        uploadPreset: "doggie",
        cropping: "server"
    }, (error, result) => {
        console.log(result)
        
        /// checks for successful upload then saves values to an array let photoUrls = []
        if (result.event === "success"){
            photoUrls.push(result.info.thumbnail_url)
            photoUrls.push(result.info.url) 
            console.log(photoUrls)
            showTitleForm(photoUrls)
        }

        // function handleStory(photoUrls){
            
        //     console.log(photoUrls)
        //}
    });
    console.log(photoUrls)
    widget.open("../images/1.jpg");
    cloudinary.applyUploadWidget('#upload_widget_opener', {
        cloudName: 'dm2obdaq7',
        uploadPreset: 'doggie',
        tags: [""],
        cropping: true,
        folder: 'doggie'
    }, (error, result) => {
        console.log(result)
    });
    console.log(photoUrls)

}

openWidget()
    // Navbar for mobile
    $(".button-collapse").sideNav({
        "closeOnClick": true
    });
})