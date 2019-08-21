let translateButton = document.getElementById('translateButton');
let clearButton = document.getElementById('clearButton');
let inputField = document.getElementById('inputField');
let errorArea = document.getElementById('errorArea');
let resultArea = document.getElementById('resultArea');

translateButton.addEventListener('click', function() {
  let text = inputField.value;
  if (!text) {
    errorArea.hidden = true;
    resultArea.hidden = true;
    return;
  }

  let requestUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190820T143930Z.b3f9f959c75612f1.4c8f777d75daded6d1ce271fef0fd83b7eb5f69e&text=${text}&lang=ru`
  
  fetch(requestUrl, {
    method: 'POST',
  }).then(function (response) {
    if (response.status !== 200) {
      errorArea.innerHTML = 'Error. Status Code: ' + response.status;
      errorArea.hidden = false;
      resultArea.hidden = true;
      return;
    }

    response.json().then(function (data) {
        console.log(data);
        resultArea.innerHTML = data.text.toString().toLowerCase();
        resultArea.hidden = false;
    });
  }).catch(function (err) {
    errorArea.innerHTML = 'App error';
    errorArea.hidden = false;
    resultArea.hidden = true;
    console.log('Fetch Error :', err);
  });
});

clearButton.addEventListener('click', function() {
  inputField.value = '';
  errorArea.hidden = true;
  resultArea.hidden = true;
});