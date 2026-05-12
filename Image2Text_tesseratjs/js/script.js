import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";


console.log("script loaded")

const inputImg = document.getElementById("input-image");
const previewImg = document.getElementById("preview-image");
const spinner = document.getElementById("spinner");
const extractedText = document.getElementById("extracted-text");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const model1 = document.getElementById("model1");
const model2 = document.getElementById("model2");

var file = "";


inputImg.addEventListener("change", async (e) => {
  file = e.target.files[0];
  console.log("Selected file:", file);

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    previewImg.src = event.target.result;
  };

  reader.readAsDataURL(file);
  return file;
});



//buttons for calling the ocr models
model1.addEventListener("click", () => {
  console.log("model1 called");

  tesseract(file);
});


model2.addEventListener("click", () => {
  console.log("model2 called");

  trocr(file);
});



//tesseract model
async function tesseract(file) {

  if (!file) return;

  console.log("tesseract model loaded");
  model1.disabled = true;
  model2.disabled = true;

  spinner.style.display = "block";

  const { createWorker } = Tesseract;

  const worker = createWorker({
    langPath: './model/',
    gzip: false,
    logger: m => console.log(m)
  });

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

  model1.disabled = false;
  model2.disabled = false;

  await worker.terminate();
}

//trocr model
async function trocr(file) {

  console.log("trocr model loaded");
  if (!file) return;

  model1.disabled = true;
  model2.disabled = true;

  spinner.style.display = "block";

  const client = await Client.connect("vivek007ejfb/trocr_gradio");

  const result = await client.predict("/ocr_pipeline", {
    pil_image: file,
  });

  console.log(result.data);

  extractedText.value = result.data[1];

  spinner.style.display = "none";

  model1.disabled = false;
  model2.disabled = false;

}
