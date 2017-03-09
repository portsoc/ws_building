/**
 * Update sthe time on screen
 */
function updateTime() {
  window.timenow.textContent = Date.now();
}

/**
 * Prepares a timeout to call updateTime
 * every second
 */
function start() {
  setInterval(updateTime, 1000);
}
window.addEventListener('load', start);
