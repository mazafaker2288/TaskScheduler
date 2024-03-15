class TaskScheduler {
    constructor() {
      this.tasks = [];
      this.timer = null;
    }
  
    addTask(task, delay) {
      const scheduledTime = Date.now() + delay;
      this.tasks.push({ task, scheduledTime });
      this.tasks.sort((a, b) => a.scheduledTime - b.scheduledTime);
      this.startScheduler();
    }
  
    startScheduler() {
      if (!this.timer && this.tasks.length > 0) {
        const nextTask = this.tasks[0];
        const delay = Math.max(nextTask.scheduledTime - Date.now(), 0);
        this.timer = setTimeout(() => {
          this.executeTask();
        }, delay);
      }
    }
  
    executeTask() {
      const { task } = this.tasks.shift();
      task();
      this.timer = null;
      this.startScheduler();
    }
  
    cancelAllTasks() {
      clearTimeout(this.timer);
      this.tasks = [];
      this.timer = null;
    }
  }
  
  module.exports = TaskScheduler;
  