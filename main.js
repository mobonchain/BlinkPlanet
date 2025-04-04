const fs = require('fs');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const colors = require('colors');

console.clear();
const tokens = fs.readFileSync('data.txt', 'utf8').split('\n').map(line => line.trim());
const proxies = fs.readFileSync('proxy.txt', 'utf8').split('\n').map(line => line.trim());

async function getUserData(token, proxy) {
  const agent = new HttpsProxyAgent(proxy);
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Origin': 'https://game.bpexplorer.io',
    'Referer': 'https://game.bpexplorer.io/desktop/home',
    'Token': token,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
  };

  try {
    const response = await axios.get('https://bpx-backend.blinkplanet.com/api/v1/user/me', {
      headers,
      httpsAgent: agent
    });

    return response.data;
  } catch (error) {
    console.error(colors.red(`Error fetching user data: ${error.message}`));
    return null;
  }
}

async function claimDailyLogin(token, proxy) {
  const agent = new HttpsProxyAgent(proxy);
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Origin': 'https://game.bpexplorer.io',
    'Referer': 'https://game.bpexplorer.io/desktop/home',
    'Token': token,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
  };

  const payload = {
    taskID: 'daily_login'
  };

  try {
    const response = await axios.post('https://bpx-backend.blinkplanet.com/api/v1/tasks/claim', payload, {
      headers,
      httpsAgent: agent
    });

    console.log(colors.green(`Successfully claimed daily login task.`));
    return response.data;
  } catch (error) {
    console.error(colors.red(`Error claiming task: ${error.message}`));
    return null;
  }
}

async function postClickData(token, proxy, clicks, points) {
  const agent = new HttpsProxyAgent(proxy);
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Origin': 'https://game.bpexplorer.io',
    'Referer': 'https://game.bpexplorer.io/desktop/home',
    'Token': token,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
  };

  const payload = {
    clicks: clicks,
    points: points
  };

  try {
    const response = await axios.post('https://game.bpexplorer.io/api/clicks', payload, {
      headers,
      httpsAgent: agent
    });

    console.log(colors.green(`Successfully posted click data: ${clicks} clicks, ${points} points.`));
    return response.data;
  } catch (error) {
    console.error(colors.red(`Error posting click data: ${error.message}`));
    throw new Error(`Failed to post click data: ${error.message}`);
  }
}

async function processAccounts() {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const proxy = proxies[i];

    if (!token || !proxy) continue;

    console.log(colors.cyan(`=============================================================`));
    console.log(colors.cyan(`Tài khoản ${i + 1}`));

    const userData = await getUserData(token, proxy);

    if (userData) {
      const blinkers = userData.blinkers;

      const dailyLoginTask = userData.completed_tasks.find(task => task.taskID === "daily_login");

      console.log(colors.green(`Points $BX : ${blinkers}`));
      
      if (dailyLoginTask && dailyLoginTask.status === "UNCLAIMED") {
        console.log(colors.yellow('Hôm nay: Chưa điểm danh'));
        console.log(colors.green('Điểm danh thành công'));
        await claimDailyLogin(token, proxy);
      } else {
        console.log(colors.blue('Hôm nay: Đã điểm danh'));
        console.log(colors.blue('Bỏ qua quá trình điểm danh'));
      }

      if (userData.energy > 0) {
        console.log(colors.green(`Energy: ${userData.energy}`));

        let remainingEnergy = userData.energy;

        while (remainingEnergy > 0) {
          let clicks = Math.floor(Math.random() * (23 - 6 + 1)) + 6;

          if (clicks > remainingEnergy) {
            console.log(colors.yellow(`Adjusting click count to remaining energy: ${remainingEnergy}`));
            clicks = remainingEnergy;
          }

          const points = clicks * 2;

          console.log(colors.magenta(`- Click ${clicks} lần, chờ ${Math.floor(Math.random() * (7 - 4 + 1)) + 4} giây để tiếp tục click....`));

          try {
            await postClickData(token, proxy, clicks, points);
          } catch (error) {
            console.error(colors.red(`Stopping due to error: ${error.message}`));
            return;
          }

          remainingEnergy -= clicks;

          if (remainingEnergy > 0) {
            const delay = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
            console.log(colors.cyan(`Waiting for ${delay} seconds before next click...`));
            await new Promise(resolve => setTimeout(resolve, delay * 1000));
          }
        }

        console.log(colors.green('Energy depleted. Stopping further clicks.'));
      } else {
        console.log(colors.red('Energy: 0'));
        console.log(colors.red('Đã hết năng lượng, bỏ qua....'));
      }
    }
    console.log(colors.cyan('============================================================='));

  }

  console.log(colors.cyan('Waiting for 65-70 minutes before the next cycle...'));
  const delayTime = Math.floor(Math.random() * (70 - 65 + 1)) + 65;
  setTimeout(processAccounts, delayTime * 60 * 1000);
}

processAccounts();
