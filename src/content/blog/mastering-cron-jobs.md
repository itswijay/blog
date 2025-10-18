---
title: "Cron Job එකක් හරියට ලියමු"
date: 2025-10-18
excerpt: "Linux Cron Jobs use කරල automated task එකක් නිවැරදිව ලියන විදිහ සරලව සිංහලෙන්"
author: "Pubudu Wijesundara"
tags: ['cronjobs', 'crontab', 'automation', 'linux', 'scripting', 'devops', 'control', 'task sheduling','system administration', 'sinhala']
image:
language: 'si'
featured: true
---

![Cron Jobs Banner](/images/blog/cron-jobs-cover.png)
හිතන්න ඔයාට මොනව හරි වැඩක් හැමදාම එකම වෙලාවට කරගන්න ඕනේ වෙනව කියල. අන්න ඒ වගේ වෙලාවට තමයි අපි cron jobs use කරන්නෙ. 

Unix based operating systemවල(like linux) configuration file  එකක් තියනව crontab කියල. crontab කියන්නේ cron table කියන අර්ථය. අපිට පුළුවන් මේ configuration file එක හරහා automated tasks schedule කරන්න. මෙන්න මේ schedule කරන taskවලට තමයි cron jobs කියල කියන්නෙ. 

සරල උදාහරණයකින්ම කතාවට බහිමු. හිතන්න ඔයාට හැමදාම රෑ 10ට backup එකක් ගන්න තියනව කියල. අපි මේ වැඩේට cron job එකක් ලියන විදිහ බලමු.

හැම user කෙනෙක්ටම (including root) එයාලටම වෙන් උන crontab එකක් තියනව. අපිට පුළුවන් මේ configuration file එක edit කරන්න crontab -e command එක use කරල.

### **Crontab file structure**

crontab එකක fields 6ක් තියනව. 
```sql
* * * * * command_to_run
│ │ │ │ │
│ │ │ │ └─ Day of the week (0-7, Sunday=0 or 7)
│ │ │ └── Month (1-12)
│ │ └─── Day of the month (1-31)
│ └──── Hour (0-23)
└───── Minute (0-59)
```

මේක තමයි හැමෝම පටලවගන්න තැන. මම එකින් එක සරලව විස්තර කරන්නම්.

පලවෙනි fields 5න් කියවෙන්නෙ time frame එක ගැන. අන්තිම field එකේ තමයි අපිට run වෙන්න ඕනේ command එක හෝ script file එකේ path එක දෙන්න ඕනෙ. මේ fields වෙන් කරන්නේ සාමාන්‍යයෙන් තනි space එකකින්.

දැන් අපි ගත්ත උදාහරණයට cron job එකක් ලියන්න try එකක් දෙමු 

මට ඕනේ කරන්නේ daily රෑ 10ට command එකක් run කරන්න. 

- පලවෙනි field එකට අදාල වෙන්නෙ minutes. මට ඕනේ වෙන්නේ 10.00 pmවලදි command එක run කරන්න. එහෙනම් minutes=0 වෙන්න ඕනෙ. මතක තියාගන්න අපි මෙතන ඉලක්කම් දෙකක් use කරන්නේ අවශ්‍ය වුනොත් විතරයි.

- දෙවෙනි field එකට අදාල වෙන්නෙ hour එක. 10.00 pm නම් hour=22 වෙන්න ඕනෙ.

- තුන්වෙනි field එක day of the month. මෙතැනදී අපිට මාසෙ දවස් 31ම command එක run වෙන්න ඕනෙ නිසා star mark(*)  එක දෙන්න ඕනෙ. `* = any` 

- හතරවෙනි field එකට අදාල වෙන්නෙ month එක. මෙතනත් අපිට මාස 12ම run වෙන්න ඕනේ වෙන නිසා `*` එකක් use කරන්න වෙනව.

- පස්වෙනි field එකට අදාල වෙන්නෙ day of the week. මේකෙන් කියවෙන්නේ සතියේ දවස් 7න් මොන දවස්වලද command එක run වෙන්න ඕනේ කියන එක. මේකටත් අපිට දාන්න වෙන්නෙ `*` mark එක කියල දැන් හැමෝටම තේරෙනව ඇති. මෙතැනදී කියන්න ඕනේ * mark එකට අමතරව 0-7 දක්වා ඉලක්කම් මේ field එකට use කරන්න පුළුවන්. `sunday=0 or 7` කියල ගන්න පුළුවන්. 

```sql
- Sunday => 0 or 7
- Monday => 1
- Tuesday => 2
- Wednesday => 3
- Thursday => 4
- Friday => 5
- Saturday => 6
```

- අවසාන field එකේ අපිට අදාල command එක හෝ script එකට අදාල path එක දෙන්න ඕනේ. මෙතන මතක තියාගන්න ඕනේ දෙයක් තමයි script එකට path එකක් දෙනවනම් absolute path එක දෙන්න ඕනෙ. ඒ කියන්නෙ script එකට අදාල full path එක.

eg: `/home/kasun/scripts/backup.sh`


හරි දැන් අපි සම්පුර්නෙන්ම cron job එක ලියාගෙන ඉවරයි

```bash
0 22 * * * /home/kasun/scripts/db_backup.sh
```


මම කලින් කිව්ව command එක use කරල දැන් අපිට පුළුවන් අපේ cron job එක crontab එකේ  save කරගන්න. 
```bash
crontab -e
```

දැනට set කරල තියන cron jobs list කරගන්න crontab -l command එක අපිට use කරන්න පුළුවන්.
```bash
crontab -l
```

---
දැන් මම කියන්න යන්නේ ගොඩක් දෙනෙක් පටලවගන්න තැන් කිහිපයක් ගැන. 

- Every half hour : `*/30 * * * * command_to_run`
- Every two hours : `0 */2 * * * command_to_run`
- At 8 AM every 3 days : `0 8 */3 * * /home/pubudu/scripts/cleanup.sh`
- Every 15 minutes between 9 AM and 5 PM, Monday–Friday : `*/15 9-17 * * 1-5 command_to_run`
- At 3:30 AM every day except Sunday : `30 3 * * 1-6 command_to_run`
- Every 10 minutes during the first half of each hour, only on weekdays : `0-30/10 * * * 1-5 command_to_run`
- At 11:59 PM on the last day of every month : `59 23 28-31 * * [ "$(date +\%d -d tomorrow)" == "01" ] && command_to_run`
- Every 30 minutes on weekends only : `*/30 * * * 6,0 command_to_run`
- At 2:15 AM on the first Monday of every month : `15 2 1-7 * 1 [ "$(date +\%u)" -eq 1 ] && command_to_run`

අවශ්‍යනම් අපිට පුළුවන් comment එකකින් cron job එක විස්තර කරන්න පස්සෙ අවශ්‍ය කෙනෙක්ට ලේසියෙන්ම කියවගන්න.
Eg: `*/10 9-17 * * 1-5 /home/kamal/scripts/report.sh  # Every 10 mins during office hours`

ඔයාල හොඳට මේ උදාහරණ  ටික අධ්‍යයනය කරොත් තේරේවි  එකම pattern එකක් මේ හැම job එකකම තියෙන්නේ කියල. 


අවසානයට මම ඔයාලට පොඩි bonus tip එකක් දෙන්නම්. 

<a href="https://crontab.guru/" target="_blank" style="text-decoration: none;">https://crontab.guru/</a>

මේ වෙබ් සයිට් එකෙන් ලේසියෙන්ම ඔයාලගේ cron job  එකට අදාල time frame එක හරියටම හරිද කියල confirm කරගන්න පුළුවන්. මම මේක මුලින් දුන්නෙ නැත්තෙ මේ වගේ දෙයක් හරියට ඉගෙන ගන්න ඕනේ නම් ඒක practically මුලින් කරල අවබෝධ කරගන්න ඕනෙ. ඒ අවබෝධය මත තමයි අපි tools use කරන්න ඕනෙ වැඩේ පහසු කරගන්න.

එහෙනම් හැමෝටම වේවා! 