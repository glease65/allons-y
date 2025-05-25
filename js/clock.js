// js/clock.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('clock-container');

  // 1. Build the linear-clock wrapper
  container.innerHTML = `<div class="linear-clock"></div>`;
  const linear = container.querySelector('.linear-clock');

  // 2. Add the three time segments
  const segments = [
    { cls: 'morning',   label: 'Morning'   },
    { cls: 'afternoon', label: 'Afternoon' },
    { cls: 'evening',   label: 'Evening'   },
  ];
  segments.forEach((s, i) => {
    // colored bar
    const segEl = document.createElement('div');
    segEl.className = `segment ${s.cls}`;
    linear.appendChild(segEl);
    // text label
    const lbl = document.createElement('div');
    lbl.className = `segment-label ${s.cls}`;
    lbl.textContent = s.label;
    linear.appendChild(lbl);
  });

  // 3. Hour ticks & labels from 6→12→12 (19 labels)
  const hours = [6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
  hours.forEach((h, i) => {
    const pct = (i / (hours.length - 1)) * 100;
    // tick
    const tick = document.createElement('div');
    tick.className = 'tick';
    tick.style.left = `${pct}%`;
    linear.appendChild(tick);
    // label
    const label = document.createElement('div');
    label.className = 'tick-label';
    label.style.left = `${pct}%`;
    label.textContent = h;
    linear.appendChild(label);
  });

  // 4. “Now” indicator
  const indicator = document.createElement('div');
  indicator.id = 'time-indicator';
  linear.appendChild(indicator);

  // 5. Positioning logic: map current time (6 AM→12 AM) to 0–100%
  function updateIndicator() {
    const now = new Date();
    let hour = now.getHours();
    // treat 0–5 AM as 24–29 h to wrap into our 6→24 window
    if (hour < 6) hour += 24;
    // hours elapsed since 6 AM
    const elapsed = (hour + now.getMinutes()/60 + now.getSeconds()/3600) - 6;
    const pct = (elapsed / 18) * 100;  // 18 h total from 6→24
    indicator.style.left = `${Math.min(Math.max(pct, 0), 100)}%`;
  }

  updateIndicator();
  setInterval(updateIndicator, 1000);
});
