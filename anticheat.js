function antiCheat() {
  document.getElementById("inputarea").innerHTML = "";
  window.alert("[Watchdog Cheat Detection] You have been detected copying, cutting, or pasting content on this webpage. Your current progress has been wiped and you will now restart. Please refrain from cheating in the future.");
}

window.addEventListener("copy", antiCheat);
window.addEventListener("cut", antiCheat);
window.addEventListener("paste", antiCheat);
