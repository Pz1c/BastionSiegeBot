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
go to patrol<br>

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

# add remove friend/target
add/remove friend user [username] - add/remove username into/from friend list (no attack) example "add friend user Galbarad"
add/remove friend aliance from [username] - add/remove aliance into/from friend list example "add friend aliance from Galbarad" (telegram has problem with emoji so you can add friend aliance only after attacking at list one member)
add/remove target [username]/from [username] - add/remove user/aliance into/from target list
example "add target Galbarad" - add user with nik Galabrad to your target list (not recomended ;)
example "add target from Galbarad" - add aliance where user with nik Galabrad is a member to your target list
