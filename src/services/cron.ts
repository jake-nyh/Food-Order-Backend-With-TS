import * as cron from 'node-cron';

const cronExpression = '* * * * *';

export default function configureCronJob() {
    console.log(`[cron task configured] cronExpression: ${cronExpression}`);
    let count = 0;
    
    cron.schedule(cronExpression, async() => {
        count ++;
        console.log(`cronExpression: ${cronExpression}`, count);
  });
}



