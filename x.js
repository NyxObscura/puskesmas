import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
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

const markCommit = (x, y) => {
  const date = moment()
    .year(2024) // Tahun diperbarui ke 2024
    .startOf("year") // Mulai dari 1 Januari 2024
    .add(x, "w") // Tambah x minggu
    .add(y, "d") // Tambah y hari
    .format();

  const data = {
    date: date,
    commit: {
      message: `Commit on ${date}`,
      author: "service@obscuraworks.com",
      branch: "main",
    },
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
    displayUI(`📑 Commit created on: ${date}`, "success");
  });
};

const makeCommits = (n) => {
  if (n === 0) {
    displayUI("🎉 All commits have been created and pushed!", "success");
    return simpleGit().push();
  }

  const x = random.int(0, 51); // 52 minggu dalam setahun, gunakan max 51 agar tetap di 2024
  const y = random.int(0, 6); // 7 hari dalam seminggu

  const date = moment()
    .year(2024) // Tahun diperbarui ke 2024
    .startOf("year") // Mulai dari 1 Januari 2024
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
    commit: {
      message: `Commit #${n} on ${date}`,
      author: "service@obscuraworks.com",
      branch: "main",
    },
  };

  displayUI(`Creating commit #${n} on: ${date}`, "info");
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

displayUI(
  "🚀 Starting the automated commit process...\n" +
    chalk.yellow("Project.\n") +
    chalk.yellow("Version: 1.0.0"),
  "info"
);

//============ { CUSTOM COMMITS } ============\\
makeCommits(1000);