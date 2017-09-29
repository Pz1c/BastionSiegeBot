// CONSTANT
var command_top_level = ':arrow_up: Up menu';
var command_info = ':scroll: Info';
var command_building = '🏘 Buildings';
var command_town_hall = '🏤 Town hall';
var command_house = 'Houses';
var command_trade = 'Trade';
var command_trade_buy = 'Buy';
var command_trade_food = 'Food';
var command_trade_wood = 'Wood';
var command_trade_stone = 'Stone';
var command_storage = 'Storage';
var command_upgrade = 'Upgrade';
var command_back = 'Back';
var command_farm = 'Farm';
var command_sawmill = 'Sawmill';
var command_mine = 'Mine';
var command_hire = 'Hire';

var arr_command = [command_top_level,command_info,command_building,command_town_hall,
                   command_house,command_trade,command_trade_buy,command_trade_food,
                   command_trade_wood,command_trade_stone,command_storage,command_upgrade,
                   command_back, command_farm, command_sawmill, command_mine, command_hire];
var arr_res_command = {food:command_trade_food,wood:command_trade_wood,stone:command_trade_stone};

var ai_step_id_initial = 0;
var ai_step_id_build_info = 1;
var ai_step_id_town_hall_info = 2;
var ai_step_id_town_hall_decision = 3;
var ai_step_id_house_info = 4;
var ai_step_id_house_decision = 5;
var ai_step_id_storage_info = 6;
var ai_step_id_storage_decision = 7;
var ai_step_id_decision = 8;
var ai_step_id_market = 9;
var ai_step_id_market_buy = 10;
var ai_step_id_market_buy_resource = 11;
var ai_step_id_market_buy_count = 12;
var ai_step_id_market_complete = 13;
var ai_step_id_farm_info = 14;
var ai_step_id_farm_decision = 15;
var ai_step_id_sawmill_info = 16;
var ai_step_id_sawmill_decision = 17;
var ai_step_id_mine_info = 18;
var ai_step_id_mine_decision = 19;
var ai_step_id_hire = 20;
var ai_step_id_hire_complete = 21;


var ai_task_id_get_info = 0;
var ai_task_id_buy_resources = 1;
var arr_building = [
{code:'town_hall',img:'🏤'},
{code:'storage',img:'🏚'},
{code:'house',img:'🏘'},
{code:'barrack',img:'🛡'},
{code:'wall',img:'🏰'},
{code:'sawmill',img:'🌲'},
{code:'mine',img:'⛏'},
{code:'farm',img:'🌻'}];

var arr_upgrade = ['gold', 'wood', 'stone', 'food'];
var arr_numeric_val = ['army','food','gold','people','stone','territory','wood'];


console.log("bot there!!!");

// VARIABLES
var arr_command_stack = [], last_command, ai_step_id = ai_step_id_initial, ai_task_id = ai_task_id_get_info, ai_timeout = 0;
var castle={task_list:[]};

//AI core
function getBuildCodeForUp() {
  var up_code;
  var min_cost = -1;
  for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
    if (!castle[arr_building[i].code]) {
      continue;
    }
    if ((min_cost < 0) || (min_cost > castle[arr_building[i].code].up_full_cost)) {
      min_cost = castle[arr_building[i].code].up_full_cost;
      up_code = arr_building[i].code;
    }    
  }
  
  if ((castle[up_code].level_up_wood > castle.storage.wood_max) || ((castle.storage.worker_max * 1 <= Math.min(castle.farm.worker_max * 1, castle.sawmill.worker_max * 1, castle.mine.worker_max * 1)) && (up_code != 'town_hall') && (up_code != 'house'))) {
    up_code = 'storage';
  }
  
  return up_code;
}

function getDecision() {
  // we can't upgrade town hall and houses couse we have not resources
  // in case we have anought gold we should buy resources
  ai_timeout = 0;
  var reserved_gold = 0, daily_food_real = castle.food_daily - Math.min(castle.farm.produce, castle.storage.worker_max); need_buy_food = (daily_food_real > 0) && (castle.food / daily_food_real <= 5);
  console.log('getDecision', castle);
  if (need_buy_food) {
    console.log('getDecision food', castle.farm.produce, castle.food_daily, castle.food, castle.storage.food_max, castle.gold , reserved_gold);
    console.log('getDecision food', daily_food_real * 10, castle.storage.food_max, Math.floor((castle.gold - reserved_gold) / 2));
    var food_count = Math.min(daily_food_real * 10, castle.storage.food_max * 1, Math.floor((castle.gold - reserved_gold) / 2)) * 1;
    reserved_gold += food_count * 2;
    castle.task_list.push({place_command:command_trade,action_command:command_trade_buy,resource_command:command_trade_food,count:food_count});
  }
  
  var up_code = getBuildCodeForUp();
  console.log('getDecision', up_code, castle[up_code].up_full_cost);
  if (castle[up_code].up_full_cost * 1 <= castle.gold * 1 - reserved_gold) {
    for(var i = 1; i < 3; ++i) {
      var need_resource = castle[up_code]['level_up_' + arr_upgrade[i]] * 1 - castle[arr_upgrade[i]] * 1;
      var resource_count = Math.min(need_resource, castle.storage[arr_upgrade[i] + '_max'] * 1 - castle[arr_upgrade[i]] * 1, Math.floor((castle.gold - reserved_gold) / 2));
      console.log('getDecision', arr_upgrade[i], need_resource, castle.storage[arr_upgrade[i] + '_max'], castle[arr_upgrade[i]], Math.floor((castle.gold - reserved_gold) / 2));
      reserved_gold += resource_count * 2;
      if (resource_count > 0) {
        castle.task_list.push({place_command:command_trade,action_command:command_trade_buy,resource_command:arr_res_command[arr_upgrade[i]],count:resource_count});
      }
    }
  }
  console.log('getDecision', castle);
  if (castle.task_list.length > 0) {
    ai_task_id = ai_task_id_buy_resources;
    ai_step_id = ai_step_id_market;
    return command_trade;
  }
  
  ai_task_id = ai_task_id_get_info;
  console.log('timer check', (daily_food_real > 0 ? castle.food/daily_food_real - 4 : 10000000), 60, (castle[up_code].up_full_cost-(castle.gold-reserved_gold))/(castle.gold_daily + Math.min(castle.mine.produce, castle.storage.worker_max) * 2 + Math.min(castle.sawmill.produce, castle.storage.worker_max) * 2));
  ai_timeout = Math.max(0, Math.min(((daily_food_real > 0) ? castle.food/daily_food_real - 4 : 10000000), 60, (castle[up_code].up_full_cost-(castle.gold-reserved_gold))/(castle.gold_daily + Math.min(castle.mine.produce, castle.storage.worker_max) * 2 + Math.min(castle.sawmill.produce, castle.storage.worker_max) * 2))) * 60 * 1000;
  return arr_command_stack.length == 0 ? '' : command_top_level;
}

function getBuildingDecision(code, current_step_id, next_step_id) {
  if (castle[code].up_status /*&& ((code != 'storage') || (castle.house.level_up_wood > castle.storage.wood_max) || 
                                                        (castle.town_hall.level_up_wood > castle.storage.wood_max) || 
                                                        (castle.farm.level_up_wood > castle.storage.wood_max) || 
                                                        (castle.sawmill.level_up_wood > castle.storage.wood_max) || 
                                                        (castle.mine.level_up_wood > castle.storage.wood_max))*/
      && (((code != 'farm') && (code != 'mine') && (code != 'sawmill')) || (castle[code].worker_max < castle.storage.worker_max))) {
    ai_step_id = current_step_id;
    return command_upgrade;
  }
  
  if ((code != 'town_hall') && (code != 'house') && (castle[code].worker_current < castle[code].worker_max) && (castle.house.worker_current > 0)) {
    ai_step_id = ai_step_id_hire;
    castle.task_list.push({place_command:code,action_command:command_hire,count:Math.min(castle.house.worker_current, (castle[code].worker_max - castle[code].worker_current)),back_to_step:current_step_id});
    return command_hire;
  }
  
  ai_step_id = next_step_id;
  return next_step_id === ai_step_id_decision ? command_top_level : command_back;
}

function getTownHallDecision() {
  return getBuildingDecision('town_hall', ai_step_id_town_hall_decision, ai_step_id_house_info);
}

function getHouseDecision() {
  return getBuildingDecision('house', ai_step_id_house_decision, ai_step_id_storage_info);
}

function getStorageDecision() {
  return getBuildingDecision('storage', ai_step_id_storage_decision, ai_step_id_farm_info);
}

function getFarmDecision() {
  return getBuildingDecision('farm', ai_step_id_farm_decision, ai_step_id_sawmill_info);
}

function getSawmillDecision() {
  return getBuildingDecision('sawmill', ai_step_id_sawmill_decision, ai_step_id_mine_info);
}

function getMineDecision() {
  return getBuildingDecision('mine', ai_step_id_mine_decision, ai_step_id_decision);
}

var step_after_hire_id;
function getHireCount() {
  var task = castle.task_list.shift();
  step_after_hire_id = task.back_to_step;
  return task.count;
}

function getCommandForInfoTask() {
  var command = '';
  switch(ai_step_id) {
    case ai_step_id_initial:
      ai_step_id = ai_step_id_build_info;
      command = command_top_level; 
      break;
    case ai_step_id_build_info:
      ai_step_id = ai_step_id_town_hall_info;
      command = command_building; 
      break;
    case ai_step_id_town_hall_info: 
      ai_step_id = ai_step_id_town_hall_decision;
      command = command_town_hall;
      break;
    case ai_step_id_town_hall_decision:
      command = getTownHallDecision();
      break;
    case ai_step_id_house_info: 
      ai_step_id = ai_step_id_house_decision;
      command = command_house;
      break;      
    case ai_step_id_house_decision:
      command = getHouseDecision();
      break;
    case ai_step_id_storage_info:
      ai_step_id = ai_step_id_storage_decision;
      command = command_storage;
      break;
    case ai_step_id_storage_decision:
      command = getStorageDecision();
      break;
    case ai_step_id_farm_info:
      ai_step_id = ai_step_id_farm_decision;
      command = command_farm;
      break;
    case ai_step_id_farm_decision:
      command = getFarmDecision();
      break;
    case ai_step_id_sawmill_info:
      ai_step_id = ai_step_id_sawmill_decision;
      command = command_sawmill;
      break;
    case ai_step_id_sawmill_decision:
      command = getSawmillDecision();
      break;
    case ai_step_id_mine_info:
      ai_step_id = ai_step_id_mine_decision;
      command = command_mine;
      break;
    case ai_step_id_mine_decision:
      command = getMineDecision();
      break;
    case ai_step_id_hire:
      ai_step_id = ai_step_id_hire_complete;
      command = getHireCount();
      break;
    case ai_step_id_hire_complete:
      ai_step_id = step_after_hire_id;
      command = command_back;
      break;
    case ai_step_id_decision:
      command = getDecision();
      break;
  }
  return command;
}

function getCommadByMarketTask() {
  console.log('getCommadByMarketTask', castle.task_list.length, ai_step_id);
  if (castle.task_list.length == 0) {
    ai_step_id = ai_step_id_build_info;
    ai_task_id = ai_task_id_get_info;
    return command_top_level;
  } else if (ai_step_id == ai_step_id_market_buy) {
    ai_step_id = ai_step_id_market_buy_resource;
    return castle.task_list[0].resource_command;
  } else if (ai_step_id == ai_step_id_market_buy_resource) {
    ai_step_id = ai_step_id_market_complete;
    var res = castle.task_list[0].count;
    castle.task_list.shift();
    return res;
  } else if (ai_step_id == ai_step_id_market_complete) {
    ai_step_id = ai_step_id_market_buy;
    return command_back;
  }
}

function getCommandForMarketTask() {
  var command = '';
  switch(ai_step_id) {
    case ai_step_id_market:
      ai_step_id = ai_step_id_market_buy;
      command = command_trade_buy;
      break;
    case ai_step_id_market_buy:
      command = getCommadByMarketTask();
      break;
    case ai_step_id_market_buy_resource:
      command = getCommadByMarketTask();
      break;
    case ai_step_id_market_buy_count:
      command = getCommadByMarketTask();
      break;
    case ai_step_id_market_complete:
      command = getCommadByMarketTask();
      break;
  }
  return command;
}

function AIcycle() {
  if (!ai_step_id) {
    ai_step_id = ai_step_id_initial;
  }
  if (!ai_task_id) {
    ai_task_id = ai_task_id_get_info;
  }
  
  var step_before = ai_step_id;
  var command = '';
  console.log('AIcycle before', command, ai_step_id, ai_task_id);
  switch(ai_task_id) {
    case ai_task_id_get_info:
      command = getCommandForInfoTask();
      break;
    case ai_task_id_buy_resources:
      command = getCommandForMarketTask();
      break;
  }
  
  console.log('AIcycle after', command, ai_step_id, ai_task_id);
  
  if (command != '') {
    sendCommand(command);
  }
  
  if ((step_before === ai_step_id) && (ai_step_id != ai_step_id_town_hall_decision) && 
                                      (ai_step_id != ai_step_id_house_decision) && 
                                      (ai_step_id != ai_step_id_storage_decision) && 
                                      (ai_step_id != ai_step_id_farm_decision) && 
                                      (ai_step_id != ai_step_id_sawmill_decision) && 
                                      (ai_step_id != ai_step_id_mine_decision)) {
    ai_step_id = 0;
  }
  
  if (ai_step_id === 0) {
    var time = getAITimeout();
    console.log('AIcycle next round after', time/1000);
    setTimeout(AIcycle, time);
  }
}

function getAITimeout() {
  return  ai_timeout > 0 ? ai_timeout : (10 * 60 + getRandomInt(-60, 240)) * 1000;
}

function calcUpgradePrice(code) {
  var s = (castle[code].level_up_stone * 1 - castle.stone * 1) * 2;
  if (s < 0) {
    s = 0;
  }
  var w = (castle[code].level_up_wood * 1 - castle.wood * 1) * 2;
  if (w < 0) {
    w = 0;
  }
  console.log('calcUpgradePrice', code, s, w, castle[code]);
  return s + w;
}

// AI service functions
var msg_id = 0;

function parseCommandResult(command) {
  var msg = $('div.im_message_text').last()[0];
  var last_msg_id = msg.id;
  var txt = msg.innerHTML;
  if (last_msg_id || (last_send_command == txt) || !isRightUrl()) {
    setTimeout(parseCommandResult, 5000);
    return;
  }
  $(msg).attr('id', 'msg_id_' + (++msg_id));
  
  if (!command) {
    command = last_command;
  }
  
  console.log('parseCommandResult', ai_step_id, command, txt);
  if (ai_step_id === ai_step_id_hire_complete) {
    command = getPreLastCommandFromStack();
  }
  var result = false;
  switch(command) {
    case command_top_level:
    case command_info:
      result = parseBaseInfo(txt);
      break;
    case command_building:
      result = parseBuildingInfo(txt);
      break;
    case command_town_hall:
      result = parseTownHallInfo(txt);
      break;
    case command_house:
      result = parseHouseInfo(txt);
      break;
    case command_storage:
      result = parseStorageInfo(txt);
      break;
    case command_farm:
    case command_sawmill:
    case command_mine:
      result = parseResourceBuildingInfo(txt, command);
      break;
    case command_trade:
    case command_trade_buy:
      result = parseTradeInfo(txt);
      break;
    case command_trade_food:
    case command_trade_wood:
    case command_trade_stone:
    case command_hire:
      result = true;
      break;
    default:
      if (ai_step_id === ai_step_id_market_complete) {
        result = parseTradeInfo(txt);
      }
      /*if (ai_step_id === ai_step_id_hire_complete) {
        result = parseTradeInfo(txt);
      }*/
      break;
  }
  console.log('parseCommandResult', command, result, ai_step_id, castle);
  if (!result) {
    console.error('Something goes wrong check log. Try refresh page');
    ai_step_id = 0;
  }
  
  if (ai_step_id > 0) {
    AIcycle();
  }
}

function parseTradeInfo(info) {
  var arr = info.split('<br>');
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    console.log('parseTradeInfo', i, arr1);
    switch(i) {
      case 0:
        if (arr1[0].indexOf('Resources') == -1) {
          console.warn('parseTradeInfo try parse not Resources info');
          return false;
        }        
        break;
      case 1: // gold
        castle.gold = getInt(arr1[1]);
        break;
      case 2: // 
        castle.wood = getInt(arr1[1]);
        break;
      case 3: // 
        castle.stone = getInt(arr1[1]);
        break;
      case 4: // 
        castle.food = getInt(arr1[1]);
        break;
    }
  }
  
  return true;
}

function parseResourceBuildingInfo(info, command) {
  var building_code = command.toLowerCase();
  var arr = info.split('<br>');
  var upgrade_idx = -1, upgrade_section = false;
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    if (upgrade_section || (arr1[0].trim() === 'Upgrade')) {
      if (!upgrade_section) {
        upgrade_section = true;
        continue; 
      } else {
        if (++upgrade_idx >= 3) {
          upgrade_section = false;
        }
      }
    }
    
    switch(i) {
      case 0:
        /*if (arr1[0].indexOf('Storage') == -1) {
          console.warn('parseStorageInfo try parse not Storage info');
          return false;
        }*/
        break;
      case 2: // level
        castle[building_code][getCode(arr1[0])] = getInt(arr1[1]);
        break;
      case 3: // people
        var p = getIntInt(arr1[1]);
        castle[building_code].worker_current = p[0];
        castle[building_code].worker_max = p[1];
        break;
      case 5:
        castle[building_code].produce = getInt(arr1[0]);
        break;
      default:
        if (upgrade_section) {
          var p = getIntAndStatus(arr1[0]);
          castle[building_code]['level_up_'+arr_upgrade[upgrade_idx]] = p.value;
          castle[building_code].up_status = castle[building_code].up_status && p.status;
        }
        break;
    }
  }
  
  castle[building_code].up_add_cost = calcUpgradePrice(building_code);
  castle[building_code].up_full_cost = castle[building_code].up_add_cost * 1 + castle[building_code].level_up_gold * 1;
  
  return true;
}

function parseStorageInfo(info) {
  var building_code = 'storage';
  var arr = info.split('<br>');
  var upgrade_idx = -1, upgrade_section = false, resource_idx = 0, resource_section = false;
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    if (upgrade_section || (arr1[0].trim() === 'Upgrade')) {
      if (!upgrade_section) {
        upgrade_section = true;
        continue; 
      } else {
        if (++upgrade_idx >= 3) {
          upgrade_section = false;
        }
      }
    }
    if (resource_section || (arr1[0].trim() === 'Resources')) {
      if (!resource_section) {
        resource_section = true;
        continue; 
      } else {
        if (++resource_idx >= 4) {
          resource_section = false;
        }
      }
    }
    switch(i) {
      case 0:
        if (arr1[0].indexOf('Storage') == -1) {
          console.warn('parseStorageInfo try parse not Storage info');
          return false;
        }        
        break;
      case 2: // level
        castle[building_code][getCode(arr1[0])] = getInt(arr1[1]);
        break;
      case 3: // people
        var p = getIntInt(arr1[1]);
        castle[building_code].worker_current = p[0];
        castle[building_code].worker_max = p[1];
        break;
      case 4: // 
        castle.worker_daily = getInt(arr1[0]);
        break;
      case 5: // 
        castle.food_daily = getInt(arr1[0]);
        break;
      default:
        if (upgrade_section) {
          var p = getIntAndStatus(arr1[0]);
          castle[building_code]['level_up_'+arr_upgrade[upgrade_idx]] = p.value;
          castle[building_code].up_status = castle[building_code].up_status && p.status;
        } else if (resource_section) {
          var p = getIntInt(arr1[0]);
          castle[arr_upgrade[resource_idx]] = p[0];
          castle[building_code][arr_upgrade[resource_idx] + '_max'] = p[1];
        }
        break;
    }
  }
  
  castle[building_code].up_add_cost = calcUpgradePrice(building_code);
  castle[building_code].up_full_cost = castle[building_code].up_add_cost * 1 + castle[building_code].level_up_gold * 1;
  
  return true;
}

function parseHouseInfo(info) {
  var building_code = 'house';
  var arr = info.split('<br>');
  var upgrade_idx = -1, upgrade_section = false;
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    if (upgrade_section || (arr1[0].trim() === 'Upgrade')) {
      if (!upgrade_section) {
        upgrade_section = true;
        continue; 
      } else {
        if (++upgrade_idx >= 3) {
          upgrade_section = false;
        }
      }
    }
    console.log('parseHouseInfo', i, arr1, upgrade_section, upgrade_idx);
    switch(i) {
      case 0:
        if (arr1[0].indexOf('Houses') == -1) {
          console.warn('parseHouseInfo try parse not Houses info');
          return false;
        }        
        break;
      case 2: // level
        castle[building_code][getCode(arr1[0])] = getInt(arr1[1]);
        break;
      case 3: // people
        var p = getIntInt(arr1[1]);
        castle[building_code].worker_current = p[0];
        castle[building_code].worker_max = p[1];
        break;
      case 4: // 
        castle.worker_daily = getInt(arr1[0]);
        break;
      case 5: // gold_max
        castle.food_daily = getInt(arr1[0]);
        break;
      default:
        if (upgrade_section) {
          var p = getIntAndStatus(arr1[0]);
          castle[building_code]['level_up_'+arr_upgrade[upgrade_idx]] = p.value;
          castle[building_code].up_status = castle[building_code].up_status && p.status;
        }
        break;
    }
  }
  
  castle[building_code].up_add_cost = calcUpgradePrice(building_code);
  castle[building_code].up_full_cost = castle[building_code].up_add_cost * 1 + castle[building_code].level_up_gold * 1;
  
  return true;
}

function parseTownHallInfo(info) {
  var building_code = 'town_hall';
  var arr = info.split('<br>');
  var upgrade_idx = -1, upgrade_section = false;
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    if (upgrade_section || (arr1[0].trim() === 'Upgrade')) {
      if (!upgrade_section) {
        upgrade_section = true;
        continue; 
      } else {
        if (++upgrade_idx >= 3) {
          upgrade_section = false;
        }
      }
    }
    switch(i) {
      case 0:
        if (arr1[0].indexOf('Town hall') == -1) {
          console.warn('parseTownHallInfo try parse not Town hall info');
          return false;
        }        
        break;
      case 2: // level
        castle[building_code][getCode(arr1[0])] = getInt(arr1[1]);
        break;
      case 3: // gold
        castle.gold = getInt(arr1[1]);
        break;
      case 4: // gold_max
        castle.gold_max = getInt(arr1[1]);
        break;
      case 5: // gold_max
        castle.gold_daily = getInt(arr1[0]);
        break;
      default:
        if (upgrade_section) {
          var p = getIntAndStatus(arr1[0]);
          castle[building_code]['level_up_'+arr_upgrade[upgrade_idx]] = p.value;
          castle[building_code].up_status = castle[building_code].up_status && p.status;
        }
        break;
    }
  }
  
  castle[building_code].up_add_cost = calcUpgradePrice(building_code);
  castle[building_code].up_full_cost = castle[building_code].up_add_cost * 1 + castle[building_code].level_up_gold * 1;
  
  return true;
}

function parseBuildingInfo(info) {
  var arr = info.split('<br>');
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    switch(i) {
      case 0:
        if (arr1[0].trim() != 'Buildings') {
          console.warn('parseBuildingInfo try parse not Buildings info');
          return false;
        }        
        break;
      default:
        for(var j=0,LnJ = arr_building.length;j<LnJ;++j) {
          if (arr1[0].indexOf(arr_building[j].img) != -1) {
            console.log('parseBuildingInfo', arr_building[j].code, arr1);
            var t = getIntAndStatus(arr1[1]);
            if (!castle[arr_building[j].code]) {
              castle[arr_building[j].code] = {};
            }
            castle[arr_building[j].code].level = t.value;
            castle[arr_building[j].code].up_status = t.status;
            if ((arr1.length > 2) && (arr1[2] != '')) {
              t = getIntInt(arr1[2]);
              castle[arr_building[j].code].worker_current = t[0];
              castle[arr_building[j].code].worker_max = t[1];
            }
            break;
          }
        }
        break;
    }
  }
  return true;
}

function parseBaseInfo(info) {
  var arr = info.split('<br>');
  for(var i = 0, Ln = arr.length; i < Ln; ++i) {
    var arr1 = getInfoArray(arr[i]);
    if (arr1.length == 0) {
      continue;
    }
    switch(i) {
      case 0:
        castle.user_name = getStr(arr1[0]);
        break;
      case 1:
        castle.name = getStr(arr1[0]);
        break;
      default:
        var code = getCode(arr1[0]);
        var value;
        if (arr_numeric_val.indexOf(code) != -1) {
          value = getInt(arr1[1]);
        } else {
          value = getStr(arr1[1]);
        }
        castle[code] = value;
        break;
    }
  }
  
  return true;
}

function getPreLastCommandFromStack() {
  return arr_command_stack.length > 1 ? arr_command_stack[arr_command_stack.length - 2] : '';
}

function getLastCommandFromStack() {
  return arr_command_stack.length > 0 ? arr_command_stack[arr_command_stack.length - 1] : command_top_level;
}

var last_send_command = '';
function sendCommand(command, parse_command) {
  if (command === '') {
    return;
  }
  last_command = !parse_command ? command : parse_command;
  switch(command) {
    case command_top_level:
      arr_command_stack = [];
      break;
    case command_back:
      arr_command_stack.pop();
      last_command = getLastCommandFromStack();
      break;
    case command_upgrade:
      last_command = getLastCommandFromStack();
      break;
    default:
      if (arr_command.indexOf(command) != -1) {
        arr_command_stack.push(command);
      }
      break;
  }
  
  console.log('sendCommand', command, last_command, arr_command_stack);
  last_send_command = command;
  sendCommandEx(command);
}

//// SYSTEM
var message_text_id = 'mt_bsb_msg_text';
var message_button_id = 'mt_bsb_msg_btn';
var sys_href_check = '@BastionSiegeBot';

function isRightUrl() {
  return $(location).attr('href').indexOf(sys_href_check) != -1;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInfoArray(str) {
  var str0 = str.replace(new RegExp('<code>', 'g'), '').trim();
  if (str0 === '') {
    return [];
  }
  var res = str0.split('</code>');
  //console.log('getInfoArray', res);
  return res;
}

function getInt(str) {
  return str.replace(/\D/g,'') * 1;
}

function getCode(str) {
  return getStr(str).toLowerCase();
}

function getStr(str) {
  return str.replace(new RegExp('</code>', 'g'), '').trim();
}

function getIntInt(str) {
  var arr = str.split('/');
  return [getInt(arr[0]), getInt(arr[1])];
}

function getIntAndStatus(str) {
  return {value:getInt(str),status:str.indexOf('​✅') != -1};
}

var last_message_txt = '';

function sendCommandEx(message_txt) {
  if (!message_txt) {
    message_txt = last_message_txt;
  }
  if (!message_txt) {
    return;
  }
  console.log('bot.sendCommandEx', message_txt);
  if (isRightUrl()) {
    $('#' + message_text_id).html(message_txt);
    var e = jQuery.Event( "keydown", { keyCode: 13 } );
    jQuery( ".composer_rich_textarea" ).trigger( e );
    setTimeout(parseCommandResult, (3 + getRandomInt(0, 5)) * 1000);
    //fireEvent(document.getElementById(message_button_id), 'mousedown');
    //fireEvent(document.getElementById(message_button_id), 'mouseup');
  } else {
    last_message_txt = message_txt;
    setTimeout(sendCommandEx, 10000);
  }
}

function prepareField() {
  if (isRightUrl()) {
    console.log('Bot write page url', $(location).attr('href'));
    $('div.composer_rich_textarea').attr("id",message_text_id);
    $('button.btn.btn-md.im_submit').attr("id",message_button_id);
    //console.log('div.composer_rich_textarea', $('div.composer_rich_textarea'), $('button.btn.btn-md.im_submit'));
    setTimeout(AIcycle, 5000);
    // message.sendMessage(inputPeerSelf, 'test 001');
  } else {
    setTimeout(prepareField, 60000);
  }
}

$(document).ready(function() {
    prepareField();
});

function fireEvent(node, eventName) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9){
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
    }

     if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.
        switch (eventName) {
            case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;

            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;

            default:
                throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                break;
        }
        var event = doc.createEvent(eventClass);
        event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(event, true);
    } else  if (node.fireEvent) {
        // IE-old school style, you can drop this if you don't need to support IE8 and lower
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, event);
    }
};