document.addEventListener('DOMContentLoaded', function() {
  const code = `(function getStory(){
    let projects;
    let xhr;

    function init() {
      createButton();
      createDropdown();
    }

    function createButton() {
      const $storyAttributes = document.querySelector('.story-attributes');
      console.log('story attributes', $storyAttributes);

      if (!$storyAttributes) return;

      const $timerBtn = document.createElement('button');
      $timerBtn.innerText = 'Start Harvest Timer';

      $timerBtn.addEventListener('click', startTimer);
      $storyAttributes.append($timerBtn);
    }

    function createDropdown() {
      makeRequest();
    }

    function makeRequest() {
      const json = JSON.stringify({
        url: 'https://api.harvestapp.com/v2/users/me.json'
      });

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener('readystatechange', function() {
        if (this.readyState === 4) {
          const json = JSON.parse(this.responseText);
          console.log(json);
        }
      });

      xhr.open("POST", 'https://localhost:8443/get-projects');
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(json);
    }

    function startTimer() {
      console.log('starting timer');
    }

    return init();

    $storyAttributes.append($timerBtn);
  })()`;

  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){
      chrome.tabs.executeScript(tabArray[0].id, { code });
    }
  )

}, false);
