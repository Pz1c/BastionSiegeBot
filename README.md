# BastionSiegeBot
JS Chrome extension for telegram game BastionSiege

# how to install
download and unpack project
open chrome://extensions/
enable developers mode
load unpacked extencion - chose folder with unpacked project
reload tab with web.telegram
!! chat with BastionSiegeBot should be active
!! BastionSiegeBot should use English interface

# Bot can:
upgrade buildings from build list
spend gold
recruit workers, warriors and archers
recruit archers under attack
repair wall after battle
find suitable attack target and attack him

# command list
build on  walls,barracks,house,town_hall,sawmill,mine,farm,trebuchet - add object to build list
build off - remove object from build list
start now - start AI cycle
stop now - remove all task, set AI timeout 100 days
clean task - remove all tasks, no timeout
force stop - stop AI cycle - no action from AI
force start - start AI cycle (cancel force stop)
stop attack - stop auto attack (before aliance attack)
start attack - start auto atack