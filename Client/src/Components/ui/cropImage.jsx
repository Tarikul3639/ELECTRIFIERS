export default function getCroppedImg(imageSrc, pixelCrop) {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous";  // Handle cross-origin images if necessary

      image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = pixelCrop.width;
          canvas.height = pixelCrop.height;
          const ctx = canvas.getContext("2d");

          ctx.drawImage(
              image,
              pixelCrop.x,
              pixelCrop.y,
              pixelCrop.width,
              pixelCrop.height,
              0,
              0,
              pixelCrop.width,
              pixelCrop.height
          );

          // Convert the canvas to a base64 image string
          const base64Image = canvas.toDataURL("image/jpeg");  // or 'image/png' if preferred
          resolve(base64Image);  // Return base64 image
      };

      image.onerror = (error) => reject(error);  // Handle errors if the image fails to load
  });
}
