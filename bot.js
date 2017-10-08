// sys constant
var const_bot_start_command = 'start working';
var const_bot_name = 'Bastion Siege';
var first_run = true;

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
var command_recruit = 'Recruit';
var command_barrack = 'Barracks';
var command_wall = 'Walls';
var command_workshop = 'Workshop';
var command_trebuchet = 'Trebuchet';
var command_war = 'War';

var arr_command = [command_top_level,command_info,command_building,command_town_hall,
                   command_house,command_trade,command_trade_buy,command_trade_food,
                   command_trade_wood,command_trade_stone,command_storage,command_upgrade,
                   command_back, command_farm, command_sawmill, command_mine, command_hire, 
                   command_barrack, command_wall, command_workshop, command_trebuchet,command_recruit,
                   command_war];
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

var ai_position_id_top = 1;
var ai_position_id_buildings = 2;
var ai_position_id_town_hall = 3;
var ai_position_id_storage = 16;
var ai_position_id_houses = 4;
var ai_position_id_barracks = 5;
var ai_position_id_walls = 6;
var ai_position_id_sawmill = 7;
var ai_position_id_mine = 8;
var ai_position_id_farm = 9;
var ai_position_id_trade = 10;
var ai_position_id_hire = 11;
var ai_position_id_trader_buy = 12;
var ai_position_id_trader_buy_food = 13;
var ai_position_id_trader_buy_wood = 14;
var ai_position_id_trader_buy_stone = 15;
var ai_position_id_workshop = 17;
var ai_position_id_trebuchet = 18;
var ai_position_id_recruit = 19;
var ai_position_id_war = 20;

var ai_task_id_get_info = 0;
var ai_task_id_buy_resources = 1;
var ai_task_id_upgrade_town_hall = 2;
var ai_task_id_upgrade_house = 3;
var ai_task_id_upgrade_storage = 4;
var ai_task_id_upgrade_wall = 5;
var ai_task_id_upgrade_barrack = 6;
var ai_task_id_upgrade_sawmill = 7;
var ai_task_id_upgrade_mine = 8;
var ai_task_id_upgrade_farm = 9;
var ai_task_id_upgrade_trebuchet = 10;
var ai_task_id_repair_wall = 12;
var ai_task_id_recruit_army = 13;

var TOWN = 0;
var STORAGE = 1;
var HOUSE = 2;
var SAWMILL = 3;
var MINES = 4;
var FARM = 5;
var BARRACKS = 6;
var WALL = 7;
var TREBUCHET = 8;

var arr_building = [
{code:'town_hall',img:'🏤',command:command_town_hall,search_key:'Town hall',position_id:ai_position_id_town_hall,index:0,hire_position:'',hire_count:0},
{code:'storage',img:'🏚',command:command_storage,search_key:'🏚Storage',position_id:ai_position_id_storage,index:1,hire_position:ai_position_id_hire,hire_count:10},
{code:'house',img:'🏘',command:command_house,search_key:'Houses',position_id:ai_position_id_houses,index:2,hire_position:'',hire_count:0},
{code:'barracks',img:'🛡',command:command_barrack,search_key:'Barracks',position_id:ai_position_id_barracks,index:6,hire_position:ai_position_id_recruit,hire_count:40},
{code:'walls',img:'🏰',command:command_wall,search_key:'Walls',position_id:ai_position_id_walls,index:7,hire_position:ai_position_id_recruit,hire_count:10},
{code:'sawmill',img:'🌲',command:command_sawmill,search_key:'Sawmill',position_id:ai_position_id_sawmill,index:3,hire_position:ai_position_id_hire,hire_count:10},
{code:'mine',img:'⛏️',command:command_mine,search_key:'Mine',position_id:ai_position_id_mine,index:4,hire_position:ai_position_id_hire,hire_count:10},
{code:'farm',img:'🌻',command:command_farm,search_key:'Farm',position_id:ai_position_id_farm,index:5,hire_position:ai_position_id_hire,hire_count:10},
{code:'trebuchet',img:'Trebuchet',command:command_trebuchet,search_key:'Farm',position_id:ai_position_id_farm,index:5,hire_position:ai_position_id_hire,hire_count:1},
{code:'info',img:'',command:command_top_level,search_key:'Status',position_id:ai_position_id_top,index:-1,hire_position:'',hire_count:0},
{code:'buildings',img:'',command:command_building,search_key:'Buildings',position_id:ai_position_id_buildings,index:-1,hire_position:'',hire_count:0},
{code:'delivered',img:'',command:command_trade_food,search_key:'delivered to',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'buy',img:'',command:command_trade_buy,search_key:'Buy',position_id:ai_position_id_trader_buy,index:-1,hire_position:'',hire_count:0},
{code:'trade',img:'',command:command_trade,search_key:'Resources',position_id:ai_position_id_trade,index:-1,hire_position:'',hire_count:0},
{code:'choose_number',img:'',command:command_trade_food,search_key:'Choose number.',position_id:0,index:-1,hire_position:'',hire_count:0},
{code:'workshop',img:'',command:command_workshop,search_key:'Workshop',position_id:ai_position_id_workshop,index:-1,hire_position:'',hire_count:0},
];

var arr_upgrade = ['gold', 'wood', 'stone', 'food'];
var arr_primary_buildings = ['town_hall', 'house', 'storage'];
var arr_war_buildings = ['barracks', 'walls', 'trebuchet'];
var arr_support_buildings = ['farm', 'mine', 'sawmill'];
var arr_numeric_val = ['army','food','gold','people','stone','territory','wood'];

var arr_buy_position = [ai_position_id_trader_buy_food, ai_position_id_trader_buy_wood, ai_position_id_trader_buy_stone];
var arr_building_child = [ai_position_id_town_hall, ai_position_id_storage, ai_position_id_houses, ai_position_id_barracks, ai_position_id_walls, ai_position_id_sawmill, ai_position_id_mine, ai_position_id_farm];
var arr_hire_pos = [ai_position_id_town_hall, ai_position_id_storage, ai_position_id_houses, ai_position_id_sawmill, ai_position_id_mine, ai_position_id_farm, ai_position_id_trebuchet];
var arr_recruit_pos = [ai_position_id_barracks, ai_position_id_walls];
var arr_buy_resource = {food:ai_position_id_trader_buy_food,wood:ai_position_id_trader_buy_wood,stone:ai_position_id_trader_buy_stone};
var arr_buy_resource_lst = [ai_position_id_trader_buy_food,ai_position_id_trader_buy_wood,ai_position_id_trader_buy_stone];


console.log("bot there!!!");

// VARIABLES
var arr_command_stack = [], last_command, ai_step_id = ai_step_id_initial, ai_task_id = ai_task_id_get_info, ai_timeout = 0;
var ai_position_id = ai_position_id_top;
var ai_position_parent_id = ai_position_id_top;
var castle={position_id:-1,reserved_gold:0,task_list:[],food_settings:{min_day:10,buy_on:100},build_settings:{build_array:['town_hall', 'house']}};

//AI core

function prepareBuildingParameters() {
  for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
    if ((arr_building[i].index >= 0) && (castle[arr_building[i].code])) {
      calculateUpLevelAmount(castle[arr_building[i].code], arr_building[i].index);
      setUpgradePrice(arr_building[i].code);     
      switch(arr_building[i].code) {
        case 'house':
          castle.food_daily = castle.house.worker_max / 2;
          break;
        default:
          if (arr_support_buildings.indexOf(arr_building[i].code) != -1) {
            castle[arr_building[i].code].produce = castle[arr_building[i].code].worker_current;
          }
          break;
      }
    }
  }
}

function getShortPathToDestination(new_position_id) {
  if (new_position_id === ai_position_id) {
    return '';
  }
  if (ai_position_id === ai_position_id_hire) {
    return command_back;
  }
  if (((arr_building_child.indexOf(new_position_id) != -1) && (arr_building_child.indexOf(ai_position_id) != -1)) ||
      ((arr_buy_resource_lst.indexOf(new_position_id) != -1) && (arr_buy_resource_lst.indexOf(ai_position_id) != -1))) {
    return command_back;
  }
  if ((ai_position_id === ai_position_id_top) && (arr_building_child.indexOf(new_position_id) != -1)) {
    return command_building;
  }
  switch (new_position_id) {
    case ai_position_id_top:
      return command_top_level;
      break;
    case ai_position_id_buildings:
      if (arr_building_child.indexOf(ai_position_id) != -1) {
        return command_back;
      }
      if (ai_position_id === ai_position_id_top) {
        return command_building;
      }
      break;
    case ai_position_id_town_hall:
      if (ai_position_id === ai_position_id_buildings) {
        return command_town_hall;
      }
      break;
    case ai_position_id_storage:
      if (ai_position_id === ai_position_id_buildings) {
        return command_storage;
      }
      break;
    case ai_position_id_houses:
      if (ai_position_id === ai_position_id_buildings) {
        return command_house;
      }
      break;
    case ai_position_id_barracks:
      if (ai_position_id === ai_position_id_buildings) {
        return command_barrack;
      }
      break;
    case ai_position_id_walls:
      if (ai_position_id === ai_position_id_buildings) {
        return command_wall;
      }
      break;
    case ai_position_id_sawmill:
      if (ai_position_id === ai_position_id_buildings) {
        return command_sawmill;
      }
      break;
    case ai_position_id_mine:
      if (ai_position_id === ai_position_id_buildings) {
        return command_mine;
      }
      break;
    case ai_position_id_farm:
      if (ai_position_id === ai_position_id_buildings) {
        return command_farm;
      }
      break;
    case ai_position_id_trade:
      if (ai_position_id === ai_position_id_buildings) {
        return command_storage;
      }
      break;
    case ai_position_id_hire:
      if (arr_hire_pos.indexOf(ai_position_id) != -1) {
        return command_hire;
      }
      break;
    case ai_position_id_recruit:
      if (arr_recruit_pos.indexOf(ai_position_id) != -1) {
        return command_recruit;
      } else {
        return '';
      }
      break;
    case ai_position_id_trader_buy:
      if (ai_position_id === ai_position_id_top) {
        return command_trade;
      }
      if (arr_buy_position.indexOf(ai_position_id) != -1) {
        return command_back;
      }
      break;
    case ai_position_id_trader_buy_food:
      if (ai_position_id === ai_position_id_top) {
        return command_trade;
      }
      if (ai_position_id === ai_position_id_trade) {
        return command_trade_buy;
      }
      if (ai_position_id === ai_position_id_trader_buy) {
        return command_trade_food;
      }
      if (arr_buy_position.indexOf(ai_position_id) != -1) {
        return command_back;
      }
      break;
    case ai_position_id_trader_buy_wood:
      if (ai_position_id === ai_position_id_top) {
        return command_trade;
      }
      if (ai_position_id === ai_position_id_trade) {
        return command_trade_buy;
      }
      if (ai_position_id === ai_position_id_trader_buy) {
        return command_trade_wood;
      }
      if (arr_buy_position.indexOf(ai_position_id) != -1) {
        return command_back;
      }
      break;
    case ai_position_id_trader_buy_stone:
      if (ai_position_id === ai_position_id_top) {
        return command_trade;
      }
      if (ai_position_id === ai_position_id_trade) {
        return command_trade_buy;
      }
      if (ai_position_id === ai_position_id_trader_buy) {
        return command_trade_stone;
      }
      if (arr_buy_position.indexOf(ai_position_id) != -1) {
        return command_back;
      }
      break;
    case ai_position_id_workshop:
      if (ai_position_id === ai_position_id_top) {
        return command_workshop;
      }
      if (ai_position_id === ai_position_id_trebuchet) {
        return command_back;
      }
      break;
    case ai_position_id_trebuchet:
      if (ai_position_id === ai_position_id_workshop) {
        return command_trebuchet;
      }
      if (ai_position_id === ai_position_id_hire) {
        return command_back;
      }
      break;    
  }
  return command_top_level
}

function getDecisionInfo() {
  if (!castle.name) {
    console.log('getDecisionInfo', 'no base info');
    return command_top_level;
  }
  if (!castle.town_hall) {
    console.log('getDecisionInfo', 'no building info');
    return getShortPathToDestination(ai_position_id_buildings);
  }
  if (!castle.gold_daily) {
    console.log('getDecisionInfo', 'no town hall info');
    return getShortPathToDestination(ai_position_id_town_hall);
  }
  if (!castle.storage.food_max) {
    console.log('getDecisionInfo', 'no storage info');
    return getShortPathToDestination(ai_position_id_storage);
  }
  if ((castle.position_id >= 0) && (ai_position_id != castle.position_id)) {
    console.log('getDecisionInfo', 'goto position', castle.position_id, ai_position_id);
    return getShortPathToDestination(castle.position_id);
  }
  
  return '';
}

function getFoodDecision() {
  castle.daily_food_real = castle.food_daily - Math.min(castle.farm.produce, castle.storage.worker_max); 
  castle.need_buy_food = (castle.daily_food_real > 0) && (castle.food / castle.daily_food_real <= castle.food_settings.min_day);
  console.log('getFoodDecision', castle);
  if (castle.need_buy_food) {
    console.log('getDecision food', castle.farm.produce, castle.food_daily, castle.food, castle.storage.food_max, castle.gold, castle.reserved_gold);
    console.log('getDecision food', castle.daily_food_real * castle.food_settings.buy_on, castle.storage.food_max, Math.floor((castle.gold - castle.reserved_gold) / 2));
    return Math.min(castle.daily_food_real * castle.food_settings.buy_on, castle.storage.food_max * 1, Math.floor((castle.gold - castle.reserved_gold) / 2)) * 1;
  }
  return 0;
}

function foodDecision() {
  var food_count = getFoodDecision();
  if (food_count > 0) {
    castle.reserved_gold = castle.reserved_gold * 1 + food_count * 2;
    castle.task_list.push({type:'command',position_id:ai_position_id_trader_buy_food,command:food_count});
  }
}

function getBuildCodeForUp() {
  var up_code;
  var min_cost = -1;
  for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
    if (!castle[arr_building[i].code]) {
      continue;
    }
    if (castle.build_settings.build_array.indexOf(arr_building[i].code) === -1) {
      console.log('getBuildCodeForUp', 'not found in build array', arr_building[i].code);
      continue;
    }
    
    console.log('getBuildCodeForUp', arr_building[i].code, min_cost, castle[arr_building[i].code].up_full_cost);
    if ((min_cost < 0) || (min_cost > castle[arr_building[i].code].up_full_cost)) {
      min_cost = castle[arr_building[i].code].up_full_cost;
      up_code = arr_building[i].code;
    }    
  }
  
  console.log('getBuildCodeForUp', up_code, min_cost);
  if ((Math.max(castle[up_code].level_up_wood, castle[up_code].level_up_stone) > castle.storage.wood_max) || ((castle.storage.worker_max * 1 <= Math.min(castle.farm.worker_max * 1, castle.sawmill.worker_max * 1, castle.mine.worker_max * 1)) && (arr_support_buildings.indexOf(up_code) != -1))) {
    up_code = 'storage';
  }
  
  return up_code;
}

function buildDecision() {
  var up_code = getBuildCodeForUp();
  castle.up_code = up_code;
  console.log('getDecision', up_code, castle[up_code].up_full_cost, castle.gold, castle.reserved_gold);
  if (castle[up_code].up_full_cost * 1 <= castle.gold * 1 - castle.reserved_gold) {
    for(var i = 1; i < 3; ++i) {
      var need_resource = castle[up_code]['level_up_' + arr_upgrade[i]] * 1 - castle[arr_upgrade[i]] * 1;
      var resource_count = Math.min(need_resource, castle.storage[arr_upgrade[i] + '_max'] * 1 - castle[arr_upgrade[i]] * 1, Math.floor((castle.gold - castle.reserved_gold) / 2)) * 1;
      console.log('getDecision', arr_upgrade[i], resource_count, need_resource, 'up_max = ' + castle.storage[arr_upgrade[i] + '_max'], 'have = ' + castle[arr_upgrade[i]], Math.floor((castle.gold - castle.reserved_gold) / 2), castle[up_code]);
      castle.reserved_gold += resource_count * 2;
      if (resource_count > 0) {
        castle.task_list.push({type:'command',position_id:arr_buy_resource[arr_upgrade[i]],command:resource_count});
        enought_gold = false;
      }
    }
    for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
      if (arr_building[i].code === up_code) {
        console.warn('before upgrade WFT');
        castle.task_list.push({type:'command',position_id:arr_building[i].position_id,command:command_upgrade});
        castle.task_list.push({type:'change_field',field:'gold',value:-castle[up_code].level_up_gold});
        castle.task_list.push({type:'change_field',field:'stone',value:-castle[up_code].level_up_stone});
        castle.task_list.push({type:'change_field',field:'wood',value:-castle[up_code].level_up_wood});
        if (arr_building[i].hire_count > 0) {
          castle.task_list.push({type:'command',position_id:arr_building[i].hire_position,command:arr_building[i].hire_count});
        }
      }
    }
  }
}

function hireDecision() {
  for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
    if ((arr_building[i].hire_count > 0) && castle[arr_building[i].code] && (castle[arr_building[i].code].worker_current < castle[arr_building[i].code].worker_max)) {
      castle.task_list.push({type:'command',position_id:arr_building[i].position_id,command:arr_building[i].hire_position === ai_position_id_hire ? command_hire : command_recruit});
      castle.task_list.push({type:'command',position_id:arr_building[i].hire_position,command:(castle[arr_building[i].code].worker_max - castle[arr_building[i].code].worker_current)});
    }
  }
}

function calcAITimeout() {
  var min_time = 0.017;
  var up_code = castle.up_code;
  var task_time = castle.task_list.length > 0 ? min_time : 10000000;
  if (task_time === min_time) {
    if (castle.task_list[0].type === 'wait') {
      task_time = Math.round((castle.task_list[0].until - time()) / 60);
    }
  }
  var food_time = castle.daily_food_real > 0 ? castle.food/castle.daily_food_real - 10 : 10000000;
  food_time = food_time > 0 ? food_time : min_time;
  var wait_time = (castle[up_code].up_full_cost-(castle.gold-castle.reserved_gold))/(castle.gold_daily + Math.min(castle.mine.produce, castle.storage.worker_max) * 2 + Math.min(castle.sawmill.produce, castle.storage.worker_max) * 2);
  wait_time = wait_time > 0 ? wait_time : min_time;
  console.log('timer check', task_time, food_time, wait_time);
  ai_timeout = Math.max(0, Math.min(task_time, food_time, wait_time));
  if (ai_timeout === min_time) {
    ai_timeout = -1;
  }
  ai_timeout *= 60 * 1000;
  if ((ai_timeout > 0) && (castle.task_list.length === 0)) {
    castle.task_list.push({type:'wait',until:time() + Math.round(ai_timeout/1000, 0)});
  }
}

function calcBaseParams() {
  var starving_koeff = castle.food > 0 ? 1 : 0.5;
  castle.farm.produce = castle.farm.worker_current * starving_koeff;
  castle.food_daily = castle.house.worker_max / 2;
  castle.gold_daily = castle.house.worker_current * (0.5 + 0.1 * castle.town_hall.level);  
}

function getDecision() {
  var exit = false;
  if (castle.task_list.length > 100) {
    castle.task_list = [];
  }
  while (!exit && (castle.task_list.length > 0)) {
    switch(castle.task_list[0].type) {
      case 'wait':
        if (time() >= castle.task_list[0].until) {
          castle.task_list.shift();
        } else {
          exit = true;
        }
        break;
      case 'change_field':
        var task = castle.task_list.shift();
        castle[task.field] += task.value;
        break;
      case 'command':
        castle.position_id = castle.task_list[0].position_id;
        if (castle.position_id === ai_position_id) {
          console.log('getDecision', 'task command', 'before', castle.task_list, castle.position_id);
          castle.position_id = -1;
          var task = castle.task_list.shift();
          console.log('getDecision', 'task command', 'after', castle.task_list, task);
          return task.command;
        } else {
          exit = true;
        }
        break;
    }
  }
  
  var command = getDecisionInfo();
  if (command != '') {
    return command;
  }
  
  ai_timeout = 0;
  castle.reserved_gold = 0;
  console.log('Decision before', castle);
  calcBaseParams();
  console.log('foodDecision before', castle);
  foodDecision();
  console.log('buildDecision before', castle);
  buildDecision();
  console.log('hireDecision before', castle);
  hireDecision();
  console.log('getDecision', castle);
  calcAITimeout();
  
  return '';
}

function getParamsFromStorage() {
  var l_min_day = localStorage.getItem('castle_settings_food_min_day');
  if (!l_min_day) {
    l_min_day = 10;
  }
  var l_buy_on = localStorage.getItem('castle_settings_food_buy_on');
  if (!l_buy_on) {
    l_buy_on = 100;
  }
  var l_build_array = localStorage.getItem('castle_settings_build_build_array');
  if (!l_build_array) {
    l_build_array = ['town_hall', 'house'];
  } else {
    l_build_array = l_build_array.split(',');
  }
  castle.food_settings.min_day = l_min_day;
  castle.food_settings.buy_on = l_buy_on;
  castle.build_settings.build_array = l_build_array;
}

function setParamsToStorage() {
  localStorage.setItem('castle_settings_food_min_day', castle.food_settings.min_day);
  localStorage.setItem('castle_settings_food_buy_on', castle.food_settings.buy_on);
  localStorage.setItem('castle_settings_build_build_array', castle.build_settings.build_array);
}

function AIcycle() {
  if (first_run) {
    castle.task_list = [];
    first_run = false;
    getParamsFromStorage();
    sendCommand(const_bot_start_command);
    setTimeout(prepareListener, 10000);
    return;
  }
  
  if (!ai_step_id) {
    ai_step_id = ai_step_id_initial;
  }
  if (!ai_task_id) {
    ai_task_id = ai_task_id_get_info;
  }
  
  var step_before = ai_step_id;
  var command = '';
  console.log('AIcycle before', command, ai_step_id, ai_task_id, castle.task_list);
  command = getDecision();
  /*switch(ai_task_id) {
    case ai_task_id_get_info:
      command = getCommandForInfoTask();
      break;
    case ai_task_id_buy_resources:
      command = getCommandForMarketTask();
      break;
  }*/  
  console.log('AIcycle after', command, ai_step_id, ai_task_id, castle.task_list);
  
  if (command != '') {
    sendCommand(command);
  } else {
    var time = getAITimeout();
    console.log('AIcycle next round after', time/1000);
    setTimeout(AIcycle, time);
  }
  /*
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
  }*/
}

function getAITimeout() {
  if (ai_timeout < 0) {
    ai_timeout = 1000;
  }
  return  ai_timeout > 0 ? ai_timeout : (10 * 60 + getRandomInt(-60, 240)) * 1000;
}

function setUpgradePrice(building_code) {
  castle[building_code].up_add_cost = calcUpgradePrice(building_code);
  castle[building_code].up_full_cost = castle[building_code].up_add_cost * 1 + castle[building_code].level_up_gold * 1;  
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


function calculateUpLevelAmount(building, index) {
	building.level_up_gold = getRequiredAmount(building.level, getGoldKoef(index));
	building.level_up_wood = getRequiredAmount(building.level, getWoodKoef(index));
	building.level_up_stone = getRequiredAmount(building.level, getStoneKoef(index));

	// process upgrade
}

function getRequiredAmount(currentLvl, koef) {
	var nextLvl = currentLvl + 1;
	return Math.round(koef*(nextLvl*(nextLvl-1)*((2*nextLvl+8)/6+2/nextLvl)-(currentLvl*(currentLvl-1)*((2*currentLvl+8)/6+2/currentLvl)))/2, 0);
}

function getGoldKoef(buildingIndex) {
	switch (buildingIndex) {
		case TOWN:
			return 500;
		case STORAGE:
			return 200;
		case HOUSE:
			return 200;
		case SAWMILL:
			return 100;
		case MINES:
			return 100;
		case FARM:
			return 100;
		case BARRACKS:
			return 200;
		case WALL:
			return 5000;
		case TREBUCHET:
			return 8000;
	}

	return -1; // throw exception?
}

function getWoodKoef(buildingIndex) {
	switch (buildingIndex) {
		case TOWN:
			return 200;
		case STORAGE:
			return 100;
		case HOUSE:
			return 100;
		case SAWMILL:
			return 50;
		case MINES:
			return 50;
		case FARM:
			return 50;
		case BARRACKS:
			return 100;
		case WALL:
			return 500;
		case TREBUCHET:
			return 1000;
	}

	return -1; // throw exception?
}

function getStoneKoef(buildingIndex) {
	switch (buildingIndex) {
		case TOWN:
			return 200;
		case STORAGE:
			return 100;
		case HOUSE:
			return 100;
		case SAWMILL:
			return 50;
		case MINES:
			return 50;
		case FARM:
			return 50;
		case BARRACKS:
			return 100;
		case WALL:
			return 1500;
		case TREBUCHET:
			return 300;
	}

	return -1; // throw exception?
}

// AI service functions

var msg_id = 0;

function getCommandFromTxt(txt) {
  for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
    if (txt.indexOf(arr_building[i].search_key) != -1) {
      switch(arr_building[i].position_id) {
        case -1:
          // do nothing
          break;
        case 0:
          switch(last_command) {
            case command_trade_food:
              ai_position_id = ai_position_id_trader_buy_food;
              break;
            case command_trade_wood:
              ai_position_id = ai_position_id_trader_buy_wood;
              break;
            case command_trade_stone:
              ai_position_id = ai_position_id_trader_buy_stone;
              break;
            case command_recruit:
              ai_position_id = ai_position_id_recruit;//arr_command_stack.indexOf(command_wall) != -1 ? ai_position_id_walls : ai_position_id_barracks;
              break;
          }
          break;
        default:
          ai_position_id = arr_building[i].position_id;
          break;
      }
      //if (arr_building[i].position_id != 0) {
      //  ai_position_parent_id = ai_position_id;
      //}
      console.log('getCommandFromTxt', arr_building[i].code, ai_position_id, arr_building[i].position_id, arr_building[i].search_key, last_command);
      return arr_building[i].command;
    }    
  }
  return '';
}

function parseCommandEx(command, txt) {
  command = getCommandFromTxt(txt);
  console.log('parseCommandEx', ai_step_id, command, txt);
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
    case command_wall:
    case command_barrack:
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
}

function getMsgNode(node) {
  var c1 = $(node).children('div.im_message_outer_wrap');
  if (!c1.length) {
    return '';
  }
  var c2 = $(c1).children('div.im_message_wrap');
  if (!c2.length) {
    return '';
  }
  var c3 = $(c2).children('div.im_content_message_wrap');
  if (!c3.length) {
    return '';
  }
  return $(c3).children('div.im_message_body');
}

function getTextByNode(node) {
  var c4 = getMsgNode(node);
  if (!c4.length) {
    return '';
  }
  var c5 = $(c4).children('div');
  if (!c5.length) {
    return '';
  }
  var c6 = $(c5).children('div.im_message_text');
  if (!c6.length) {
    return '';
  }
  
  return c6[0].innerHTML;
}

function getAuthorByNode(node) {
  var c4 = getMsgNode(node);
  if (!c4.length) {
    return '';
  }
  var c5 = $(c4).children('span.im_message_author_wrap');
  if (!c5.length) {
    return '';
  }
  var c6 = $(c5).children('a.im_message_author');
  if (!c6.length) {
    return '';
  }
  
  return c6[0].innerHTML;
}


function parseCommandResult() {
  //console.log('parseCommandResult');
  parseCommandResultDOM();
  setTimeout(parseCommandResult, 1000);
}

function addIntoBuildList(code) {
  console.log('addIntoBuildList', code, castle.build_settings.build_array);
  if (castle.build_settings.build_array.indexOf(code) === -1) {
    castle.build_settings.build_array.push(code);
  }
  console.log('addIntoBuildList', code, castle.build_settings.build_array);
  setParamsToStorage();
}

function kickOutBuildList(code) {
  console.log('kickOutBuildList', code, castle.build_settings.build_array);
  var idx = castle.build_settings.build_array.indexOf(code);
  if (idx != -1) {
    castle.build_settings.build_array.splice(idx, 1);
  }
  console.log('kickOutBuildList', code, castle.build_settings.build_array);
  setParamsToStorage();
}

function setMaxGold(max_gold) {
  console.log('setMaxGold', max_gold);
  if (castle.build_settings.build_array.indexOf(code) === -1) {
    castle.build_settings.build_array.push(code);
  }
  console.log('addIntoBuildList', code, castle.build_settings.build_array);
  setParamsToStorage();
}

function parseCommandResultDOM() {
  var msg = $('div.im_history_message_wrap');
  //console.log('parseCommandResultDOM', msg);
  if (!msg) {
    return;
  }
  
  var with_command = false;
  var first_command = true;
  for(var i = msg.length - 1; i >= 0; --i) {
    if (msg[i].id) {
      break;
    }
    
    var msg_text = getTextByNode(msg[i]);
    if (!msg_text) {
      continue;
    }
    var author = getAuthorByNode(msg[i]);
    var j = i;
    while(!author && (--j >= 0)) {
      author = $(msg[j]).children('span.im_message_author').text();
    }
    if (!msg_text) {
      continue;
    }
    
    console.log('parce comamnd cycle', i, msg_text);
    
    $(msg[i]).attr('id', 'msg_id_' + (++msg_id));
    if (author != const_bot_name) {
      if (first_command) {
        first_command = false;
        last_command = msg_text;
      }
      if (msg_text === const_bot_start_command) {
        with_command = with_command || (i === msg.length - 1);
        break;
      }
      if (msg_text.indexOf('build on') != -1) {
        addIntoBuildList(msg_text.replace('build on ', ''));
      } else if (msg_text.indexOf('build off') != -1) {
        kickOutBuildList(msg_text.replace('build off ', ''));
      } else if (msg_text.indexOf('start now') != -1) {
        while ((castle.task_list.length > 0) && (castle.task_list[0].type === 'wait')) {
          castle.task_list.shift();
        }
        with_command = true;
      } else if (msg_text.indexOf('stop now') != -1) {
        castle.task_list = [{type:'wait',until:time() + 100 * 24 * 60 * 60}];
        with_command = true;
      } else if (msg_text.indexOf('clean task') != -1) {
        castle.task_list = [];
        with_command = true;
      }
      continue;
    }
    
    parseCommandEx('', msg_text);
    with_command = true;
  }
  
  if (with_command) {
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
          if (arr_building[j].img === '') {
            continue;
          }
          if ((arr1[0].indexOf(arr_building[j].img) != -1) || ((i === 7) && (arr_building[j].code === 'mine'))) {
            console.log('parseBuildingInfo', i, arr_building[j].code, arr1);
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
  prepareBuildingParameters();
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
  
  var timeout = getRandomInt(2000, 5000);
  console.log('sendCommand', command, last_command, arr_command_stack, timeout);
  last_send_command = command;
  //last_message_txt
  setTimeout(sendCommandEx, timeout);
}

//// SYSTEM
var message_text_id = 'mt_bsb_msg_text';
var message_button_id = 'mt_bsb_msg_btn';
var sys_href_check = '@BastionSiegeBot';

function time() {
  return Math.floor(Date.now() / 1000);
}

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

function sendCommandEx(message_txt) {
  if (!message_txt) {
    message_txt = last_send_command;
    console.log('bot.sendCommandEx from last_send_command', message_txt);
  }
  if (!message_txt) {
    return;
  }
  console.log('bot.sendCommandEx', message_txt);
  if (isRightUrl()) {
    last_send_command = '';
    $('#' + message_text_id).html(message_txt);
    var e = jQuery.Event( "keydown", { keyCode: 13 } );
    jQuery( ".composer_rich_textarea" ).trigger( e );
    // setTimeout(parseCommandResult, (3 + getRandomInt(0, 5)) * 1000);
    //fireEvent(document.getElementById(message_button_id), 'mousedown');
    //fireEvent(document.getElementById(message_button_id), 'mouseup');
  } else {
    last_send_command = message_txt;
    setTimeout(sendCommandEx, 10000);
  }
}

function prepareListener() {
  console.log('prepareListener');
  setTimeout(parseCommandResult, 1000);
  // $("div.im_history_messages").bind("DOMSubtreeModified", function () { parseCommandResult()});
}

function prepareField() {
  if (isRightUrl()) {
    console.log('Bot write page url', $(location).attr('href'));
    $('div.composer_rich_textarea').attr("id",message_text_id);
    $('button.btn.btn-md.im_submit').attr("id",message_button_id);
    //console.log('div.composer_rich_textarea', $('div.composer_rich_textarea'), $('button.btn.btn-md.im_submit'));
    setTimeout(AIcycle, 5000);
    // setTimeout(prepareListener, 7000);
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