
export const UploadImageService = async(local_url,index) => {
    return new  Promise(async (resolve, reject) => {
    try {
    const header = new Headers();
    header.append('Accept', 'application/json, text/plain, */*')
    var nameExtension = Math.random()
    let formData = new FormData();
    let payload = { uri: local_url, name: nameExtension + "-FJ-COLA.jpg", type: 'image/jpeg' }
    formData.append("imageFile",local_url );
    let upload =  await fetch('https://www.smestoreph.com/upload', {
      method: 'POST',
      body: formData
    })
      if (upload.ok) {
        const responseJson = await upload.json(); // Assuming the response is in JSON format
        resolve( {index:index,data:responseJson})
      } else {
        const errorData = await upload.json(); // Assuming the error response is in JSON format
        resolve( errorData)
      }
    } catch (error) {
      console.log('uploadImageService',error)
      resolve( error)
    }
  });
  }