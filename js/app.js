// js/app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => console.log('ServiceWorker registered'))
      .catch(err => console.error('SW registration failed:', err));
  });
}

// js/app.js
import { addActivity, renderTimeline, getActivities } from './timeline.js';

document.addEventListener('DOMContentLoaded', () => {
  // ——— DOM references ———
  const timelineEl  = document.getElementById('timeline');
  const startSelect = document.getElementById('start-hour');
  const endSelect   = document.getElementById('end-hour');
  const exportBtn   = document.getElementById('export-btn');

  let nextTimer = null;

  // ——— Expose to popup ———
  // Prefix with “_” to avoid collisions
  window._addActivity       = addActivity;
  window._renderTimeline    = renderTimeline;
  window._getActivities     = getActivities;
  window._scheduleNextPrompt = scheduleNextPrompt;  // defined below

  // ——— Populate Active-Hour Selects ———
  for (let h = 0; h < 24; h++) {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const ampm   = h < 12 ? 'AM' : 'PM';
    const label  = `${hour12}:00 ${ampm}`;
    startSelect.add(new Option(label, h));
    endSelect.add(new Option(label, h));
  }
  // Restore saved
  startSelect.value = localStorage.getItem('startHour') || '9';
  endSelect.value   = localStorage.getItem('endHour')   || '17';
  startSelect.onchange = () => localStorage.setItem('startHour', startSelect.value);
  endSelect.onchange   = () => localStorage.setItem('endHour',   endSelect.value);

  // ——— Initial render & export ———
  renderTimeline(timelineEl);
  exportBtn.addEventListener('click', () => {
    const content = getActivities()
      .map(a => `${a.timestamp} – ${a.text}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `allonsy-activities-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  });

  // ——— Popup logic ———
  function showPopup() {
    // opens a focused, minimal window
    const features = [
      'width=400',
      'height=200',
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no'
    ].join(',');
    window.open('prompt.html', 'LogActivity', features);
  }

  function scheduleNextPrompt() {
    clearTimeout(nextTimer);
    nextTimer = setTimeout(showPopup, 30 * 60 * 1000);
  }

  // 1) First popup immediately on load
  showPopup();
});
