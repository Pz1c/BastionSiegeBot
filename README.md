# BastionSiegeBot
JS Chrome extension for telegram game BastionSiege

# how to install
download and unpack project<br>
open chrome://extensions/<br>
enable developers mode<br>
load unpacked extencion - chose folder with unpacked project<br>
reload tab with web.telegram<br>
!! chat with BastionSiegeBot should be active<br>
!! BastionSiegeBot should use English interface<br>
!! you should have barracks, walls, trebuchet

# Bot can:
upgrade buildings from build list<br>
spend gold<br>
recruit workers, warriors and archers<br>
recruit archers under attack<br>
repair wall after battle<br>
find suitable attack target and attack him<br>

# command list
smart build on/off start/stop smart building<br>
build on  walls,barracks,house,town_hall,sawmill,mine,farm,trebuchet - add object to build list<br>
build off - remove object from build list<br>
start now - start AI cycle<br>
stop now - remove all task, set AI timeout 100 days<br>
clean task - remove all tasks, no timeout<br>
force stop - stop AI cycle - no action from AI<br>
force start - start AI cycle (cancel force stop)<br>
stop attack - stop auto attack (before aliance attack)<br>
start attack - start auto atack<br>
show settings - show current settings<br>
