import multer from 'multer'

const storage = multer.diskStorage({  //which means the file will be saved on your computer/server (on "disk").
    filename: function(req,file,callback){
        callback(null,file.originalname) //Save the file with the same name as the user's file.
    }
})

const upload = multer({storage})

export default upload 