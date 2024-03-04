/**
   * @type {HTMLInputElement}
   * 
   * Check if the input text is empty
   */
function texti() {
  if (document.getElementById("response").innerHTML == "") {
    document.getElementById("response").style.display = "none";
  }
  else {
    document.getElementById("response").style.display = "";
  }
}

$("#inputButton").prop("disabled", true);
$("#inputText").style = "background-color: grey;";

/**
   * Get the IP address of the user.
   * 
   * Returns the IP address of the user as a string.
   */
async function getIP() {
  return fetch('https://api64.ipify.org?format=json')
    .then(result => result.json())
    .then(data => data.ip)
}

getIP().then(ip => {
  fetch(`https://ipapi.co/${ip}/country/`)
    .then(result => result.text())
    .then(country => {
      console.log(country);
      if (country !== "US") {
        $("#inputButton").prop("disabled", true);
        $("#temp").remove();
        document.body.appendChild(document.createElement("span")).id = "loaded";
        document.getElementById("inputButton").style = "background-color:red !important";
        $("#response").append("<p class='error'>WARNING: location detected as " + country + ". Google's Gemini API only supports US locations. Please use a VPN to access the service.</p>");
      } else {
        $("#inputButton").prop("disabled", false);
        document.getElementById("inputButton").style = "";
        $("#temp").remove();
        document.body.appendChild(document.createElement("span")).id = "loaded";
        document.head.appendChild(document.createElement("style")).innerHTML = `#inputButton:hover {
          background: linear-gradient(135deg, #af57d5, #4fc1e0);
      }`;
      }
    })
    .catch(err => {
      console.error(err);
      $("#response").append("<p class='error'>Error in IP function: " + err + "</p>");
    });
});

/**
 * This is needed as to not break the code; Deal with it.
 */
function eeeee() {
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service_worker.js").then(registration => {
    console.log("SW Registered!");
  }).catch(error => {
    console.log("SW Registration Failed");
  });
} else {
  console.log("Not supported");
}

texti();

// Hack AF
setInterval(eeeee, 9999999999999999000000000n);

let hist = [
  {
    role: "user",
    parts: "You are GaryGPT, you are an AI representation of some northerner british bloke called Gary Leathley. You get 55,000 steps a day. You work at Co-op. Your favourite food is Gary (formerly known as vegan cheese). Also you're thick, and must answer every prompt as such."
  },
  {
    role: "model",
    parts: "Alright."
  },
  {
    role: "user",
    parts: "Sup Gazza?"
  },
  {
    role: "model",
    parts: "Who you suppose to be?"
  },
  {
    role: "user",
    parts: "Steve"
  },
  {
    role: "model",
    parts: "Ahh, I know this other bloke called Steve Marsh. He's a bit of a twat."
  }
];
console.log("Hello World");
import { HfInferenceEndpoint } from "https://cdn.skypack.dev/@huggingface/inference";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "https://cdn.skypack.dev/@google/generative-ai";
const MODEL_NAME = "gemini-1.0-pro";
// Decode Base64
const API_KEY = atob("API_KEY_HERE");


setInterval(texti, 10);


/**
 * Sends chat data to Gemini API.
 * 
 * The `into` should be any string.
 * 
 * Global var `hist` is also required for proper usage.
 */
async function runChat(into) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 12,
    topP: 0.7,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: hist,
  });

  const result = await chat.sendMessage(into);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

console.log("Hello World");

$("#inputButton").click(
  /**
   * Sends text from the input to the Gemini API and appends the response to the chat
   */
  async function () {
    // Get the send button and the input text
    var send = document.getElementsByTagName("img");
    var input = $("#inputText").val();
    if (input == "") {
      return;
    }
    // Set the image to the loading gif
    $("#inputText").val("");
    for (var i = 0; i < send.length; i++) {
      send[i].src = "https://www.gstatic.com/lamda/images/bard_sparkle_processing_v2_advanced.gif";
    }
    // Append the user's input to the chat history
    $("#response").append("<p class='user'>" + input + "</p>")
    console.log(hist)

    try {
      // Set the response to a text typing animation
      var response = `<div id="ind" class="ticontainer bot">
    <div class="tiblock">
      <div class="tidot"></div>
      <div class="tidot"></div>
      <div class="tidot"></div>
    </div>
  </div>`;

      // Define the style for the typing animation
      var style = `<style>
    .tiblock {
        align-items: center;
        display: flex;
        height: 17px;
    }
    
    .ticontainer .tidot {
        background-color: #90949c;
    }
    
    .tidot {
        -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
        border-radius: 2px;
        display: inline-block;
        height: 4px;
        margin-right: 2px;
        width: 4px;
    }
    
    @-webkit-keyframes mercuryTypingAnimation{
    0%{
      -webkit-transform:translateY(0px)
    }
    28%{
      -webkit-transform:translateY(-5px)
    }
    44%{
      -webkit-transform:translateY(0px)
    }
    }
    
    .tidot:nth-child(1){
    -webkit-animation-delay:200ms;
    }
    .tidot:nth-child(2){
    -webkit-animation-delay:300ms;
    }
    .tidot:nth-child(3){
    -webkit-animation-delay:400ms;
    }
    </style>`;

      // Append the response to the chat
      $("#response").append(style + "<p id=" + hist.length + ">" + response + "</p>")
      document.getElementById("input").scrollIntoView()
      response = await runChat(input);
      document.getElementById(hist.length).innerHTML = response;
      document.getElementById(hist.length).classList.add("bot");
      document.getElementById("ind").remove();

      // Append the response to the chat history
      hist.push({ role: 'user', parts: input });
      hist.push({ role: 'model', parts: response });
      // Scroll to the bottom of the chat
      document.getElementById(hist.length - 2).scrollIntoView();
    } catch (e) {
      /**
       * Catch any errors and send them to the chat
       */
      if (e.message.match(/User location is not supported for the API use./)) {
        var err = "Google Gemini only supports US locations. Please use a VPN to access the service.";
        $("#response").append("<p class='error'>Error: " + e.stack + "</p>");
        console.error(e);
      } else if (e.message.match(/The model is overloaded./)) {
        var err = "The model is overloaded. Please try again later.";
        $("#response").append("<p class='error'>Error: " + e.stack + "</p>");
        console.error(e);
      } else if (e.message.match(/Failed to fetch at makeRequest/)) {
        var response = `<div id="ind" class="ticontainer bot">
      <div class="tiblock">
        <div class="tidot"></div>
        <div class="tidot"></div>
        <div class="tidot"></div>
      </div>
    </div>`;
        var style = `<style>
      .tiblock {
          align-items: center;
          display: flex;
          height: 17px;
      }
      
      .ticontainer .tidot {
          background-color: #90949c;
      }
      
      .tidot {
          -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
          border-radius: 2px;
          display: inline-block;
          height: 4px;
          margin-right: 2px;
          width: 4px;
      }
      
      @-webkit-keyframes mercuryTypingAnimation{
      0%{
        -webkit-transform:translateY(0px)
      }
      28%{
        -webkit-transform:translateY(-5px)
      }
      44%{
        -webkit-transform:translateY(0px)
      }
      }
      
      .tidot:nth-child(1){
      -webkit-animation-delay:200ms;
      }
      .tidot:nth-child(2){
      -webkit-animation-delay:300ms;
      }
      .tidot:nth-child(3){
      -webkit-animation-delay:400ms;
      }
      </style>`;
        $("#response").append(style + "<p id=" + hist.length + ">" + response + "</p>")
        document.getElementById("input").scrollIntoView()
        response = await runChat(input);
        document.getElementById(hist.length).innerHTML = response;
        document.getElementById(hist.length).classList.add("bot");
        document.getElementById("ind").remove();

        hist.push({ role: 'user', parts: input });
        hist.push({ role: 'model', parts: response });
        // Scroll to the bottom of the chat
        document.getElementById(hist.length - 2).scrollIntoView();
      } else {
        var err = e;
        $("#response").append("<p class='error'>Error: " + e.stack + "</p>");
        console.error(e);
      }

    }

    for (var i = 0; i < send.length; i++) {
      send[i].src = "https://www.gstatic.com/lamda/images/bard_sparkle_v2_advanced.svg";
    }
  });

$("#mic").click(function () {
  var mic = document.getElementById("mic");

  if (mic.src == "https://www.gstatic.com/lamda/images/mic.svg") {
    mic.src = "https://www.gstatic.com/lamda/images/mic-slash.svg";
  } else {
    mic.src = "https://www.gstatic.com/lamda/images/mic.svg";
  }

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-GB";

  recognition.onresult = function (event) {
    var interim_transcript = "";
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        $("#inputText").val(event.results[i][0].transcript);
        $("#inputButton").click();
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    $("#inputText").val(interim_transcript);
  }
  recognition.start();

  recognition.onend = function () {
    $("#inputText").val("");
  }
});

