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

// Disable the input button and input text
$("#inputButton").prop("disabled", true);
$("#inputText").style = "background-color: grey;";

/**
 * This is needed as to not break the code; Deal with it.
 */
function dealWithIt() {
}

// Registers the service worker needed for the PWA
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
setInterval(dealWithIt, 999999999);

// The chat history
let hist = [
  {
    role: "user",
    content: [{ "type": "text", "text": "Sup Gazza?" }]
  },
  {
    role: "assistant",
    content: [{ "type": "text", "text": "Who you suppose to be?" }]
  },
  {
    role: "user",
    content: [{ "type": "text", "text": "Steve" }]
  },
  {
    role: "assistant",
    content: [{ "type": "text", "text": "Ahh, I know this other bloke called Steve Marsh. He's a bit of a twat." }]
  }
];

// Import Claude from Anthropic API
import Anthropic from "https://cdn.skypack.dev/@anthropic-ai/sdk";
// API Key encoded in Base64
const API_KEY = atob("YOUR_API_KEY");
const anthropic = new Anthropic({
  apiKey: API_KEY,
});

setInterval(texti, 10);

/**
 * Sends chat data to Claude API.
 * 
 * The `into` should be any string.
 * 
 * Global var `hist` is also required for proper usage.
 */
async function runChat(into) {
  let messages = hist
  messages.push({ role: 'user', content: [{ "type": "text", "text": into }] })
  console.log(messages)
  const msg = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1000,
    temperature: 0.9,
    system: "You are GaryGPT, you are an AI representation of some northerner british bloke called Gary. You get 55,000 steps a day. You work at Co-op. Your favourite food is Gary (formerly known as vegan cheese). Also you're thick, and must answer every prompt as such. Answer in short sentences.",
    messages: messages
  });
  return msg.content[0].text
}

$("#inputButton").click(
  /**
   * Sends text from the input to the Claude API and appends the response to the chat.
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
      $("#response").append(style + "<p id=" + (hist.length + 1) + ">" + response + "</p>")
      document.getElementById("input").scrollIntoView()
      console.log(hist)

      response = await runChat(input);
      document.getElementById(hist.length).innerHTML = response;
      document.getElementById(hist.length).classList.add("bot");
      document.getElementById("ind").remove();

      // Append the response to the chat history
      hist.push({ role: 'assistant', content: [{ "type": "text", "text": response }] });
      // Scroll to the bottom of the chat
      document.getElementById(hist.length - 1).scrollIntoView();
    } catch (e) {
      /**
       * Catch any errors and send them to the chat
       */
      if (e.message.match(/User location is not supported for the API use./)) {
        var err = "Google Claude only supports US locations. Please use a VPN to access the service.";
        $("#response").append("<p class='error'>Error: " + e.stack + "</p>");
        console.error(e);
      } else if (e.message.match(/Overloaded/)) {
        var err = "The assistant is overloaded. Please try again later.";
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

        hist.push({ role: 'user', content: [{ "type": "text", "text": input }] });
        hist.push({ role: 'assistant', content: [{ "type": "text", "text": response }] });
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

$("#mic").click(
  /**
   * Starts the microphone and sends the audio to the Claude API. DEPRECATED.
   */
  function () {
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

$("#inputButton").prop("disabled", false);
document.getElementById("inputButton").style = "";
$("#temp").remove();
document.body.appendChild(document.createElement("span")).id = "loaded";
document.head.appendChild(document.createElement("style")).innerHTML = `#inputButton:hover {background: linear-gradient(135deg, #af57d5, #4fc1e0);}`;