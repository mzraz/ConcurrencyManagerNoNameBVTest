const doTask = (taskName) => {
  const begin = Date.now();
  return new Promise((resolve) => {
    setTimeout(() => {
      const end = Date.now();
      const timeSpent = end - begin + "ms";
      console.log(
        "\x1b[36m",
        "[TASK] FINISHED: " + taskName + " in " + timeSpent,
        "\x1b[0m"
      );
      resolve(true);
    }, Math.random() * 200);
  });
};

async function manageConcurrency(
  tasks,
  counter,
  concurrencyMax,
  concurrencyCurrent
) {
  const pendingTasks = [...tasks];
  let completedCount = counter;
  let activeCount = concurrencyCurrent;
  const totalTasks = tasks.length;
  let maxConcurrency = concurrencyMax;

  return new Promise((resolveAll) => {
    const startNextTask = () => {
      while (activeCount < maxConcurrency && pendingTasks.length > 0) {
        const taskName = pendingTasks.shift();
        activeCount++;
        console.log(
          `[START] Processing task: ${taskName} (${activeCount}/${maxConcurrency} active)`
        );
        doTask(taskName).then(() => {
          completedCount++;
          activeCount--;

          console.log(
            `[INFO] Task ${taskName} completed. Progress: ${completedCount}/${totalTasks} ` +
              `(${activeCount} active, ${pendingTasks.length} pending)`
          );

          if (completedCount === totalTasks) {
            console.log(`\n[COMPLETE] All ${totalTasks} tasks finished`);
            resolveAll();
          } else {
            startNextTask();
          }
        });
      }
    };

    startNextTask();

    setTimeout(() => {
      const newConcurrency = 2;
      console.log(
        `\n[CONFIG] Changing concurrency from ${maxConcurrency} to ${newConcurrency}\n`
      );
      maxConcurrency = newConcurrency;
      if (activeCount < maxConcurrency) startNextTask();
    }, 1000);
  });
}

function generateTaskList(count) {
  return [...Array(count)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))]
      .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
      .join("")
  );
}

async function init() {
  const numberOfTasks = 20;
  const concurrencyMax = 4;
  const concurrencyCurrent = 0;
  const counter = 0;

  const taskList = generateTaskList(numberOfTasks);
  console.log("[init] Concurrency Algo Testing...");
  console.log("[init] Tasks to process:", taskList.length);
  console.log("[init] Task list:", taskList);
  console.log("[init] Maximum Concurrency:", concurrencyMax, "\n");

  await manageConcurrency(
    taskList,
    counter,
    concurrencyMax,
    concurrencyCurrent
  );
  console.log("[init] All tasks completed successfully");
}
init().catch((err) => {
  console.error("[ERROR]", err);
});
