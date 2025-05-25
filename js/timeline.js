// js/timeline.js
export function addActivity(text) {
    const list = JSON.parse(localStorage.getItem('activities') || '[]');
    const entry = {
      id: crypto.randomUUID(),              // unique ID
      timestamp: new Date().toISOString(),
      text: text.trim()
    };
    list.push(entry);
    localStorage.setItem('activities', JSON.stringify(list));
    return entry;
  }
  
  export function deleteActivity(id) {
    const filtered = JSON.parse(localStorage.getItem('activities') || '[]')
      .filter(item => item.id !== id);
    localStorage.setItem('activities', JSON.stringify(filtered));
  }
  
  export function getActivities() {
    return JSON.parse(localStorage.getItem('activities') || '[]');
  }
  
  export function renderTimeline(container) {
    container.innerHTML = '';
    getActivities()
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .forEach(({ id, timestamp, text }) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="time">${new Date(timestamp).toLocaleTimeString()}</span>
          <span class="text">${text}</span>
          <button class="delete-btn" data-id="${id}">Delete</button>
        `;
        container.appendChild(li);
      });
  
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteActivity(btn.dataset.id);
        renderTimeline(container);
      });
    });
  }
  