$(document).ready(function () {
    // Dropdown menu
    $(".dropdown-button").dropdown();
//added non working function to take urls and add them to photos
// event.preventDefault()
    
//     $("#ani-title")= titleInput
//     $("#ani-caption")= captionInput
// $("#ani-form-compose").hide()
// // $(document).on("submit","#addStory",postStory)
// // function previewIMG(full){
    
// //     $("#previewIMG").src = full
// // }
// function prepareStory(thumb, full){
//     let small = thumb
//     let fullSize = full
//     $(document).on("submit", function(small, fullSize){
//         $("#ani-title")= titleInput
//     $("#ani-caption")= captionInput
//         postStory({

//             small: thumbnail,
//             fullSize: url,
//             titleInput: title,
//             captionInput: title
//         })
//     })

// }
// function showTitleForm(photoUrls){
//     console.log(photoUrls)
//     let thumb = photoUrls[0]
//     let full = photoUrls[1]
//     $("#ani-form-compose").show()
    
//     postStory(thumb, full)

// }
// function openWidget(){
//     const  photoUrls = []
//     var widget = cloudinary.createUploadWidget({
//         cloudName: "dm2obdaq7",
//         uploadPreset: "doggie",
//         cropping: "server"
//     }, (error, result) => {
//         console.log(result)
        
//         /// checks for successful upload then saves values to an array let photoUrls = []
//         if (result.event === "success"){
//             photoUrls.push(result.info.thumbnail_url)
//             photoUrls.push(result.info.url) 
//             console.log(photoUrls)
//             showTitleForm(photoUrls)
//         }

//         // function handleStory(photoUrls){
            
//         //     console.log(photoUrls)
//         //}
//     });
//     console.log(photoUrls)
//     widget.open("https://my.example.come/my_example_image.jpg");
//     cloudinary.applyUploadWidget('#upload_widget_opener', {
//         cloudName: 'dm2obdaq7',
//         uploadPreset: 'doggie',
//         tags: [""],
//         cropping: true,
//         folder: 'doggie'
//     }, (error, result) => {
//         console.log(result)
//     });
//     console.log(photoUrls)

// }

// openWidget()
//     // Navbar for mobile
//     $(".button-collapse").sideNav({
//         "closeOnClick": true
//     });
// });