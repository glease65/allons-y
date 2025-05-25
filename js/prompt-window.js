// js/prompt-window.js
document.addEventListener('DOMContentLoaded', () => {
    const form  = document.getElementById('log-form');
    const input = document.getElementById('activity-input');
    input.focus();  // grab attention
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = input.value.trim();
      // guard: need a valid opener and text
      if (!text || !window.opener || window.opener.closed) return;
  
      // call into parent (see below how these are exposed)
      window.opener._addActivity(text);
      window.opener._renderTimeline(
        window.opener.document.getElementById('timeline')
      );
      window.opener._scheduleNextPrompt();
  
      window.close();
    });
  });
  