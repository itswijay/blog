---
title: "ඔයාගේ Lap එකේ RAM එක තව කොච්චර දුරට වැඩි කරගන්න පුලුවන්ද?"
date: 2025-10-19
excerpt: "Everything You Need to Know about upgrading your Laptop RAM"
author: "Pubudu Wijesundara"
tags: ["laptop RAM upgrade", "how to add RAM to laptop", "sinhala", "increase laptop RAM capacity", "laptop performance tips", "laptop RAM slots"]
image: '/images/blog/ram-upgrading.png'
language: 'si'
featured: false
---

![Ram upgrading Banner](/images/blog/ram-upgrading.png)
## අද කතාකරන්න යන්නෙ ගොඩක් සරල මාතෘකාවක් ගැන...

1. ඔයාගේ ලැප්ටොප් එකේ  RAM එක තව RAM card එකක් ගහල වැඩි කරගන්න පුලුවන්ද ?

2. ඔයාගේ ලැප්ටොප් එකේ RAM slot කීයක් තියනවද ?

3. RAM එක වැඩි කරගන්න පුලුවන්නම් වැඩි කරගන්න පුළුවන් උපරිම ප්‍රමාණය කොච්චරද ?

ටිකක් පරණ ලැප්ටොප් එකක්  තියන හැමෝටම එන ප්‍රශ්නයක් තමයි මේක. සමහරු දන්නෙවත් නෑ තමන්ගේ ලැප්ටොප් එකේ RAM එක වැඩි  කරගන්න පුළුවන් කියලවත්. අපි බලමු  හරියටම මේ ප්‍රශ්න ටික විසඳගන්නෙ කොහොමද කියල.  

ගොඩක් දෙනෙක් use කරන්නෙ windows නිසා මම අද කතා කරන්නේ windows laptop ගැන 

•  මුලින්ම යන්න ඔයාගේ Task Manager එකට. -> `press Win + Ctrl + Esc`

නැත්නම්: `Right click on Taskbar then choose Task manager`

•  ඊට පස්සේ perfomance කියන Tab එකට යන්න.

•  ඒකෙ වම් පැත්තේ  memory select කරන. 

•  දැන් ඔයාලට Slots used: යටතේ බලාගන්න පුළුවන් දැනට  RAM slot කීයක් use කරල තියවද  සහ ලැප්ටොප් එකේ ඔක්කොම slots කීයක් තියනවද කියල.

•  එතනට mouse pointer එක අරන් ගියොත් ඔයාලට බලාගන්න පුළුවන් දැනට plug කරල තියන RAMවල capacity  සහ speed එක.   

---
දැන් අපි බලමු අපිට කොච්චර ප්‍රමාණයකට RAM එක වැඩි කරගන්න පුලුවන්ද කියල. 

මේක ලැප්ටොප් එකින් එකට වෙනස් වෙනවා. 

•  මුලින්ම යන්න ඔයාගේ Command Prompt එකට (CMD) -> `Win+R` then type cmd and hit Enter.

•  cmd එකේ මුලින්ම  `wmic memphysical get maxcapacity`  කියල type කරල Enter දෙන්න.
```powershell
wmic memphysical get maxcapacity
```

•  දැන් ඔයාලට display වෙන්නේ උපරිම RAM capacity එක කිලෝබයිට් (kb) වලින්. (GB කරගන්න ඕනේ නම් ඒ ගාන `1048576` න් බෙදන්න.)

- wmic memphysical get maxcapacity, memorydevices මේ command එක  use කරල ඔයාලට RAM capacity එකත් එක්ක slot ගානත් බලාගන්න පුළුවන්.
```powershell
wmic memphysical get maxcapacity, memorydevices
```

ඔයාලගෙ ප්‍රශ්න ටික විසඳිලා අලුත් දෙයක් ඉගෙන ගන්න  ඇති කියල හිතනවා. 



*Until next time — keep hacking your way forward.*