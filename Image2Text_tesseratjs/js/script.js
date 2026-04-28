console.log("script loaded")

const inputImg = document.getElementById("input-image");
const previewImg = document.getElementById("preview-image");
const spinner = document.getElementById("spinner");
const extractedText = document.getElementById("extracted-text");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

inputImg.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log("Selected file:", file);

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    previewImg.src = event.target.result;
  };

  reader.readAsDataURL(file);

  spinner.style.display = "block";

  //Calling the tesseract OCR
  const { createWorker } = Tesseract;

  const worker = createWorker({
    langPath: './model/',
    gzip: false,
    logger: m => console.log(m)
  });

  if (!worker) {
    alert("Error...Failed to load the model")
  }

  (async () => {
    await worker.load();
    await worker.loadLanguage('handwriting');
    await worker.initialize('handwriting');

    await worker.setParameters({
      tessedit_pageseg_mode: '6',
    });

    const { data } = await worker.recognize(file);

    //create the bounding box
    canvas.width = previewImg.width;
    canvas.height = previewImg.height;

    data.words.forEach(word => {
      const { x0, y0, x1, y1 } = word.bbox;

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    });


    extractedText.value = data.text;
    spinner.style.display = "none";

    await worker.terminate();
  })();


});