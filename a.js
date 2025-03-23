import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import chalk from "chalk";
import boxen from "boxen";

const path = "./data.json";

const displayUI = (message, type = "info") => {
  const colors = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: colors[type],
    backgroundColor: "#555555",
  };
  
  console.log(boxen(chalk[colors[type]](message), boxenOptions));
};

const makeCommits = async () => {
  let startDate = moment("2023-08-15"); // Mulai dari 15 Agustus 2023
  let endDate = moment("2023-12-31"); // Hingga 31 Desember 2023
  let currentDate = startDate.clone();
  
  while (currentDate.isSameOrBefore(endDate)) {
    const date = currentDate.format();

    const data = {
      date: date,
      commit: {
        message: `Commit on ${date}`,
        author: "service@obscuraworks.com",
        branch: "main",
      },
    };

    displayUI(`Creating commit on: ${date}`, "info");
    
    await jsonfile.writeFile(path, data);
    await simpleGit().add([path]).commit(`Commit on ${date}`, { "--date": date });

    currentDate.add(1, "day"); // Lanjut ke hari berikutnya
  }

  displayUI("🎉 All commits have been created and pushed!", "success");
  await simpleGit().push();
};

displayUI(
  "🚀 Starting the automated commit process...\n" +
    chalk.yellow("Project.\n") +
    chalk.yellow("Version: 1.0.0"),
  "info"
);

//============ { CUSTOM COMMITS } ============\\
makeCommits();