console.log("script loaded");

const inputImg = document.getElementById("input-image");
const previewImg = document.getElementById("preview-image");
const spinner = document.getElementById("spinner");
const extractedText = document.getElementById("extracted-text");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

inputImg.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  console.log("Selected file:", file);

  const reader = new FileReader();

  reader.onload = function (event) {
    previewImg.src = event.target.result;
  };

  reader.readAsDataURL(file);

  spinner.style.display = "block";

  const { createWorker } = Tesseract;

  const worker = createWorker({
    langPath: './model/',
    gzip: false,
    logger: m => console.log(m)
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage('handwriting');
    await worker.initialize('handwriting');

    await worker.setParameters({
      tessedit_pageseg_mode: '6'
    });

    // Wait until image is fully loaded
    previewImg.onload = async () => {

      // Ensure OpenCV is ready
      if (typeof cv === 'undefined') {
        alert("OpenCV not loaded");
        return;
      }

      // -------------------------------
      // 🔥 OPENCV PREPROCESSING START
      // -------------------------------

      let src = cv.imread(previewImg);

      // 1. Grayscale
      let gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

      // 2. Contrast Enhancement (helps faint handwriting)
      cv.equalizeHist(gray, gray);

      // 3. Blur (remove noise)
      let blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

      // 4. Adaptive Threshold
      let thresh = new cv.Mat();
      cv.adaptiveThreshold(
        blurred,
        thresh,
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY_INV,
        11,
        2
      );

      // 5. Morphological Processing
      let kernel = cv.Mat.ones(2, 2, cv.CV_8U);

      let morph = new cv.Mat();
      cv.morphologyEx(thresh, morph, cv.MORPH_CLOSE, kernel);

      // Optional: thicken strokes (good for thin handwriting)
      cv.dilate(morph, morph, kernel);

      // 6. Resize (match your training style)
      let finalMat = new cv.Mat();
      cv.resize(morph, finalMat, new cv.Size(300, 100));

      // Show processed image on canvas
      cv.imshow(canvas, finalMat);

      // Cleanup memory
      src.delete(); gray.delete(); blurred.delete();
      thresh.delete(); morph.delete(); finalMat.delete();
      kernel.delete();

      // -------------------------------
      // 🔥 OPENCV PREPROCESSING END
      // -------------------------------

      // Convert processed canvas → blob
      canvas.toBlob(async (blob) => {

        const { data } = await worker.recognize(blob);

        // Draw bounding boxes
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        data.words.forEach(word => {
          const { x0, y0, x1, y1 } = word.bbox;
          ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
        });

        extractedText.value = data.text;
        spinner.style.display = "none";

        await worker.terminate();
      });

    };

  })();

});