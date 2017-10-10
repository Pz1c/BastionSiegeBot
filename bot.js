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
var command_repair = 'Repair';
var command_back = 'Back';
var command_farm = 'Farm';
var command_sawmill = 'Sawmill';
var command_mine = 'Mine';
var command_hire = 'Hire';
var command_recall = 'Recall';
var command_recruit = 'Recruit';
var command_barrack = 'Barracks';
var command_wall = 'Walls';
var command_workshop = 'Workshop';
var command_trebuchet = 'Trebuchet';
var command_war = 'War';
var command_before_battle = 'Before battle';
var command_search_anyone = 'Anyone';
var command_attack = 'Attack';
var command_after_battle = 'After battle';
var command_under_attack = 'Under attack';
var command_after_attack = 'After attack';

var arr_command = [command_top_level,command_info,command_building,command_town_hall,
                   command_house,command_trade,command_trade_buy,command_trade_food,
                   command_trade_wood,command_trade_stone,command_storage,command_upgrade,
                   command_back, command_farm, command_sawmill, command_mine, command_hire, 
                   command_barrack, command_wall, command_workshop, command_trebuchet,command_recruit,
                   command_war, command_repair];
var arr_res_command = {food:command_trade_food,wood:command_trade_wood,stone:command_trade_stone};

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
var ai_position_id_before_battle = 21;
var ai_position_id_attack = 21;
var ai_position_id_after_battle = 23;
var ai_position_id_under_attack = 24;
var ai_position_id_after_attack = 25;

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
{code:'war',img:'',command:command_war,search_key:'Wins',position_id:ai_position_id_war,index:-1,hire_position:'',hire_count:0},
{code:'find_money',img:'',command:command_trade_food,search_key:'find money',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'not_enough',img:'',command:command_trade_food,search_key:'not enough',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'joined',img:'',command:command_trade_food,search_key:'joined your',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'barracks',img:'🛡',command:command_barrack,search_key:'Barracks',position_id:ai_position_id_barracks,index:6,hire_position:ai_position_id_recruit,hire_count:40},
{code:'walls',img:'🏰',command:command_wall,search_key:'Walls',position_id:ai_position_id_walls,index:7,hire_position:ai_position_id_recruit,hire_count:10},
{code:'sawmill',img:'🌲',command:command_sawmill,search_key:'Sawmill',position_id:ai_position_id_sawmill,index:3,hire_position:ai_position_id_hire,hire_count:10},
{code:'mine',img:'⛏️',command:command_mine,search_key:'Mine',position_id:ai_position_id_mine,index:4,hire_position:ai_position_id_hire,hire_count:10},
{code:'farm',img:'🌻',command:command_farm,search_key:'Farm',position_id:ai_position_id_farm,index:5,hire_position:ai_position_id_hire,hire_count:10},
{code:'workshop',img:'',command:command_workshop,search_key:'Workshop',position_id:ai_position_id_workshop,index:-1,hire_position:'',hire_count:0},
{code:'trebuchet',img:'',command:command_trebuchet,search_key:'Trebuchet',position_id:ai_position_id_trebuchet,index:5,hire_position:ai_position_id_hire,hire_count:1},
{code:'info',img:'',command:command_top_level,search_key:'Status',position_id:ai_position_id_top,index:-1,hire_position:'',hire_count:0},
{code:'buildings',img:'',command:command_building,search_key:'Buildings',position_id:ai_position_id_buildings,index:-1,hire_position:'',hire_count:0},
{code:'delivered',img:'',command:command_trade_food,search_key:'delivered to',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'buy',img:'',command:command_trade_buy,search_key:'Buy',position_id:ai_position_id_trader_buy,index:-1,hire_position:'',hire_count:0},
{code:'trade',img:'',command:command_trade,search_key:'Resources',position_id:ai_position_id_trade,index:-1,hire_position:'',hire_count:0},
{code:'choose_number',img:'',command:command_trade_food,search_key:'Choose number.',position_id:0,index:-1,hire_position:'',hire_count:0},
{code:'before_battle',img:'',command:command_before_battle,search_key:'Our scouts found',position_id:ai_position_id_before_battle,index:-1,hire_position:'',hire_count:0},
{code:'attack1',img:'',command:command_attack,search_key:'Siege has started',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'attack2',img:'',command:command_attack,search_key:'not yet recovered from the last battle',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'after_battle',img:'',command:command_after_battle,search_key:'The battle with',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'under_attack',img:'',command:command_under_attack,search_key:'Your domain attacked',position_id:-1,index:-1,hire_position:'',hire_count:0},
{code:'after_attack',img:'',command:command_after_attack,search_key:'Your domain attacked',position_id:-1,index:-1,hire_position:'',hire_count:0}
];

var arr_upgrade = ['gold', 'wood', 'stone', 'food'];
var arr_primary_buildings = ['town_hall', 'house', 'storage'];
var arr_war_buildings = ['barracks', 'walls', 'trebuchet'];
var arr_support_buildings = ['farm', 'mine', 'sawmill'];
var arr_numeric_val = ['army','food','gold','people','stone','territory','wood'];

var arr_buy_position = [ai_position_id_trader_buy_food, ai_position_id_trader_buy_wood, ai_position_id_trader_buy_stone];
var arr_building_child = [ai_position_id_town_hall, ai_position_id_storage, ai_position_id_houses, ai_position_id_barracks, ai_position_id_walls, ai_position_id_sawmill, ai_position_id_mine, ai_position_id_farm];
var arr_hire_pos = [ai_position_id_storage, ai_position_id_houses, ai_position_id_sawmill, ai_position_id_mine, ai_position_id_farm, ai_position_id_trebuchet];
var arr_recruit_pos = [ai_position_id_barracks, ai_position_id_walls];
var arr_buy_resource = {food:ai_position_id_trader_buy_food,wood:ai_position_id_trader_buy_wood,stone:ai_position_id_trader_buy_stone};
var arr_buy_resource_lst = [ai_position_id_trader_buy_food,ai_position_id_trader_buy_wood,ai_position_id_trader_buy_stone];
var arr_build_menu = [ai_position_id_town_hall, ai_position_id_storage, ai_position_id_houses, ai_position_id_barracks, ai_position_id_walls, ai_position_id_sawmill, ai_position_id_mine, ai_position_id_farm, ai_position_id_buildings];
var arr_trade_menu = [ai_position_id_trader_buy_food, ai_position_id_trader_buy_wood, ai_position_id_trader_buy_stone, ai_position_id_trader_buy, ai_position_id_trade];
var arr_war_menu = [ai_position_id_war,ai_position_id_after_battle, ai_position_id_before_battle, ai_position_id_attack];
var arr_workshop_menu = [ai_position_id_workshop, ai_position_id_trebuchet];


console.log("bot there!!!");

// VARIABLES
var arr_command_stack = [], last_command, ai_timeout = 0;
var ai_position_id = ai_position_id_top;
var ai_position_parent_id = ai_position_id_top;
var castle={under_attack:false,in_battle:false,war_delay:-1,position_id:-1,reserved_gold:0,task_list:[],food_settings:{min_day:10,buy_on:100},build_settings:{build_array:['town_hall', 'house']},opponent:{},enemy:{},trebuchet:{}};

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

function existsInArrray(arr, item) {
  return arr.indexOf(item) === -1 ? false : true;
}

function getShortPathToDestination(new_position_id) {
  if (new_position_id === ai_position_id) {
    return '';
  }
  if ((ai_position_id === ai_position_id_top) && ((new_position_id === ai_position_id_hire) || (new_position_id === ai_position_id_recruit))) {
    return '';
  }
  if (((arr_building_child.indexOf(new_position_id) != -1) && (arr_building_child.indexOf(ai_position_id) != -1)) ||
      ((arr_buy_resource_lst.indexOf(new_position_id) != -1) && (arr_buy_resource_lst.indexOf(ai_position_id) != -1))) {
    return command_back;
  }
  if ((ai_position_id === ai_position_id_hire) || (ai_position_id === ai_position_id_recruit)) {
    return command_back;
  }
  if ((ai_position_id === ai_position_id_top) && (arr_building_child.indexOf(new_position_id) != -1)) {
    return command_building;
  }
  if ((existsInArrray(arr_build_menu, ai_position_id) != existsInArrray(arr_build_menu, new_position_id)) ||
      (existsInArrray(arr_war_menu, ai_position_id) != existsInArrray(arr_war_menu, new_position_id)) ||
      (existsInArrray(arr_workshop_menu, ai_position_id) != existsInArrray(arr_workshop_menu, new_position_id)) ||
      (existsInArrray(arr_trade_menu, ai_position_id) != existsInArrray(arr_trade_menu, new_position_id))) {
    if ((ai_position_id != ai_position_id_top) && (new_position_id != ai_position_id_hire) && (new_position_id != ai_position_id_recruit)) {
      return command_top_level;
    }
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
      if (ai_position_id === ai_position_id_top) {
        return command_workshop;
      }
      if (ai_position_id === ai_position_id_workshop) {
        return command_trebuchet;
      }
      if (ai_position_id === ai_position_id_hire) {
        return command_back;
      }
      break;
    case ai_position_id_war:
      if (ai_position_id === ai_position_id_top) {
        return command_war;
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
  /*if (!castle.gold_daily) {
    console.log('getDecisionInfo', 'no town hall info');
    return getShortPathToDestination(ai_position_id_town_hall);
  }*/
  if (!castle.storage.food_max) {
    console.log('getDecisionInfo', 'no storage info');
    return getShortPathToDestination(ai_position_id_storage);
  }
  if (!castle.walls.hp_max) {
    console.log('getDecisionInfo', 'no wall info');
    return getShortPathToDestination(ai_position_id_walls);
  }
  if (!castle.trebuchet.level) {
    console.log('getDecisionInfo', 'no trebuchet info');
    return getShortPathToDestination(ai_position_id_trebuchet);
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
  castle.up_code = '';
  castle.up_command = command_upgrade;
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
      castle.up_code = arr_building[i].code;
    }    
  }
  
  console.log('getBuildCodeForUp', castle.up_code, min_cost);
  if ((Math.max(castle[castle.up_code].level_up_wood, castle[castle.up_code].level_up_stone) > castle.storage.wood_max) || ((castle.storage.worker_max * 1 <= Math.min(castle.farm.worker_max * 1, castle.sawmill.worker_max * 1, castle.mine.worker_max * 1)) && (arr_support_buildings.indexOf(castle.up_code) != -1))) {
    castle.up_code = 'storage';
  }
  
  if (castle.walls.hp_current < castle.walls.hp_max) {
    castle.walls.level_up_gold = castle.walls.repair_gold;
    castle.walls.level_up_wood = castle.walls.repair_wood;
    castle.walls.level_up_stone = castle.walls.repair_stone;
    castle.walls.up_full_cost = castle.walls.level_up_gold * 1 + castle.walls.level_up_wood * 2 + castle.walls.level_up_stone * 2;
    castle.up_code = 'walls';
    castle.up_command = command_repair;
  }
  
  return castle.up_code;
}

/*function repairDecision() {
  if (castle.walls.hp_current < castle.walls.hp_max) {
    castle.task_list.push({type:'command',position_id:ai_position_id_wall,command:command_repair});
  }
}*/

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
        castle.task_list.push({type:'command',position_id:arr_building[i].position_id,command:castle.up_command});
        castle.task_list.push({type:'change_field',field:'gold',value:-castle[up_code].level_up_gold});
        castle.task_list.push({type:'change_field',field:'stone',value:-castle[up_code].level_up_stone});
        castle.task_list.push({type:'change_field',field:'wood',value:-castle[up_code].level_up_wood});
        if (arr_building[i].hire_count > 0) {
          castle.task_list.push({type:'command',parent_position_id:arr_building[i].position_id,position_id:arr_building[i].hire_position,command:arr_building[i].hire_count});
        }
      }
    }
  }
}

function hireDecision() {
  var p = Math.min(castle.house.level * 1, castle.house.worker_current * 1);
  var hr_level = (castle.house.worker_max - castle.house.worker_current) / castle.house.level;
  for (var i = 0, Ln = arr_building.length; i < Ln; ++i) {
    if (!castle[arr_building[i].code]) {
      continue;
    }
    if (castle[arr_building[i].code].worker_current >= castle[arr_building[i].code].worker_max) {
      continue;
    }
    if (!(arr_building[i].hire_count > 0)) {
      continue;
    }
    if ((hr_level < 3) || (arr_building[i].code === 'barracks') || (arr_building[i].code === 'walls')) {
      var need = Math.min(p, castle[arr_building[i].code].worker_max - castle[arr_building[i].code].worker_current);
      if (need > 0) {
        castle.task_list.push({type:'command',parent_position_id:arr_building[i].position_id,position_id:arr_building[i].hire_position,command:need});
        p -= need;
      }
      if (p <= 0) {
        break;
      }
    }
  }
  
  if (hr_level > 4) {
    
  }
  
}

function calcAITimeout() {
  var min_time = 0.017, max_time = 100;
  var up_code = castle.up_code;
  var task_time = castle.task_list.length > 0 ? min_time : max_time;
  if (task_time === min_time) {
    if (castle.task_list[0].type === 'wait') {
      task_time = Math.round((castle.task_list[0].until - time()) / 60);
    }
  }
  
  var food_time = castle.daily_food_real > 0 ? castle.food/castle.daily_food_real - 10 : max_time;
  food_time = food_time > 0 ? food_time : min_time;
  
  if (up_code) {
    var wait_time = (castle[up_code].up_full_cost-(castle.gold-castle.reserved_gold))/(castle.gold_daily + Math.min(castle.mine.produce, castle.storage.worker_max) * 2 + Math.min(castle.sawmill.produce, castle.storage.worker_max) * 2);
    wait_time = wait_time > 0 ? wait_time + 3 : min_time;
  } else {
    var wait_time = max_time;
  }
  
  var war_time = castle.war_delay > 0 ? ((castle.war_delay - time())/60) : castle.war_delay;
  switch(war_time) {
    case -1:
      war_time = max_time;
      break;
    case 0:
      war_time = min_time;
      break;
    default:
      if (war_time < 0) {
        war_time = min_time;
      }
      break;
  }
  
  console.log('timer check', 'task_time', task_time, 'food_time', food_time, 'wait_time', wait_time, 'war_time', war_time);
  ai_timeout = Math.max(0, Math.min(task_time, food_time, wait_time, war_time));
  if (ai_timeout === min_time) {
    ai_timeout = -1;
  }
  ai_timeout *= 60 * 1000;
  if ((ai_timeout > 0) && (castle.task_list.length === 0)) {
    castle.task_list.push({type:'wait',until:time() + Math.round(ai_timeout/1000, 0)});
  }
}

var last_cycle_time = -1;
function collectResources() {
  if (last_cycle_time === -1) {
    last_cycle_time = time();
    return;
  }
  var game_day_count = Math.ceil((time() - last_cycle_time)/60);
  if (game_day_count <= 0) {
    return;
  }
  
  if (!castle.gold_max) {
    castle.gold_max = 10000000000000;
  }
  
  if (!castle.farm || !castle.farm.produce || !castle.sawmill.produce || !castle.mine.produce || !castle.gold || !castle.gold_daily|| !castle.gold_max || !castle.storage.wood_max) {
    return;
  }
  if (castle.gold < 0) {
   castle.gold = 0;
  }
  if (castle.wood < 0) {
   castle.wood = 0;
  }
  if (castle.stone < 0) {
   castle.stone = 0;
  }
  var food_coeff = castle.food > 0 ? 1 : 0.5;
  var food_plus = Math.round((castle.farm.produce - castle.food_daily) * game_day_count * food_coeff);
  if (!food_plus) {
    food_plus = 0;
  }
  var gold_plus = Math.round(game_day_count * castle.gold_daily * food_coeff);
  if (!gold_plus) {
    gold_plus = 0;
  }
  var wood_plus = Math.round(game_day_count * castle.sawmill.produce * food_coeff);
  if (!wood_plus) {
    wood_plus = 0;
  }
  var stone_plus = Math.round(game_day_count * castle.mine.produce * food_coeff);
  if (!stone_plus) {
    stone_plus = 0;
  }
  castle.gold = Math.min(castle.gold + gold_plus, castle.gold_max);
  castle.wood = Math.min(castle.wood + wood_plus, castle.storage.wood_max);
  castle.stone = Math.min(castle.stone + stone_plus, castle.storage.wood_max);
  castle.food += food_plus;
  if (castle.food < 0) {
    castle.food = 0;
  }
  
  
  last_cycle_time = time();
}

function calcBaseParams() {
  collectResources();
  
  var starving_koeff = castle.food > 0 ? 1 : 0.5;
  castle.farm.produce = castle.farm.worker_current * starving_koeff;
  castle.mine.produce = castle.mine.worker_current * starving_koeff;
  castle.sawmill.produce = castle.sawmill.worker_current * starving_koeff;
  castle.food_daily = castle.house.worker_max / 2;
  castle.gold_daily = castle.house.worker_current * (0.5 + 0.1 * castle.town_hall.level);
}

function taskDecision() {
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
        var with_parent_pos = !!castle.task_list[0].parent_position_id;
        if (with_parent_pos) {
          castle.position_id = castle.task_list[0].parent_position_id;
        } else {
          castle.position_id = castle.task_list[0].position_id;
        }
        if (with_parent_pos && (castle.position_id === ai_position_id)) {
          castle.position_id = castle.task_list[0].position_id;
          castle.task_list[0].parent_position_id = 0
        } else if (castle.position_id === ai_position_id) {
          castle.position_id = -1;
          var task = castle.task_list.shift();
          if (task.build_code) {
            task.command = castle[task.build_code].worker_max - castle[task.build_code].worker_current;
          }
          if (task.command != '') {
            return task.command;
          }
        } else {
          exit = true;
        }
        break;
    }
  }
  return '';
}

function hasTask() {
  return (castle.task_list.length > 0) && (castle.task_list[0].type != 'wait');
}

function spentGold() {
  if (!castle.up_code) {
    return;
  }
  var max_gold = Math.round(castle[castle.up_code].level_up_gold * 0.5);
  if (castle.gold < max_gold) {
    return;
  }
  
  if (hasTask()) {
    return;
  }
  
  castle.task_list = [];
  var resources_to_buy = Math.round((castle.gold - 5000) / 4);
  
  if (castle.wood < castle[castle.up_code].level_up_wood) {
    var wood_to_buy = Math.min(resources_to_buy, castle.storage.wood_max - castle.wood, castle[castle.up_code].level_up_wood - castle.wood);
    if (wood_to_buy > 0) {
      castle.task_list.push({type:'command',position_id:arr_buy_resource['wood'],command:wood_to_buy});
    }
  }
  if (castle.stone < castle[castle.up_code].level_up_stone) {
    var stone_to_buy = Math.min(resources_to_buy, castle.storage.stone_max - castle.stone, castle[castle.up_code].level_up_stone - castle.stone);
    if (stone_to_buy > 0) {
      castle.task_list.push({type:'command',position_id:arr_buy_resource['stone'],command:stone_to_buy});
    }
  }
}

function defenceDecision() {
  if (!castle.under_attack) {
    return;
  }
  if ((castle.task_list.length > 0) && (castle.task_list[0].type === 'command') && castle.task_list[0].build_code && (castle.task_list[0].build_code === 'walls')) {
    return;
  }
  castle.task_list = [{type:'command',parent_position_id:ai_position_id_walls,position_id:ai_position_id_recruit,command:0,build_code:'walls'}];
}

function attackDecision() {
  if (castle.war_delay > time()) {
    return;
  }
  
  if (castle.in_battle) {
    return;
  }
  
  if (castle.barracks.worker_current < castle.barracks.worker_max) {
    return;
  }
  
  if (castle.walls.hp_current < castle.walls.hp_max) {
    return;
  }
  
  if (hasTask()) {
    return;
  }
  castle.task_list = [];
  
  if ((ai_position_id != ai_position_id_war) && (ai_position_id != ai_position_id_before_battle) && (ai_position_id != ai_position_id_after_battle) && (ai_position_id != ai_position_id_attack)) {
    castle.task_list.push({type:'command',position_id:ai_position_id_war,command:''});
    return;
  }
  
  if (!castle.opponent.btn_id || !((castle.opponent.karma >= 0) && (castle.opponent.karma <= 2) && (castle.opponent.territory <= castle.territory * 0.8) && (castle.opponent.territory >= castle.territory * 0))) {
    var new_position_id = arr_war_menu.indexOf(ai_position_id) != -1 ? ai_position_id : ai_position_id_war;
    castle.task_list.push({type:'command',position_id:new_position_id,command:command_search_anyone});
    return;
  }
  
  if (!castle.opponent.btn_id) {
    return;
  }
  
  clickButton(castle.opponent.btn_id);
  castle.opponent.btn_id = '';
  castle.war_delay = time() + 60;
}

function getDecision() {
  var command = taskDecision();
  if (command != '') {
    return command;
  }
    
  command = getDecisionInfo();
  if (command != '') {
    return command;
  }
  
  ai_timeout = 0;
  castle.reserved_gold = 0;
  console.log('Decision before', castle);
  calcBaseParams();  
  console.log('defence before', castle);
  defenceDecision();
  console.log('foodDecision before', castle);
  if (!castle.in_battle) {
    foodDecision();
    console.log('buildDecision before', castle);
    buildDecision();
    console.log('hireDecision before', castle);
    hireDecision();
    console.log('spentGold before', castle);
    spentGold();
    console.log('attack before', castle);
    attackDecision();
  }
  console.log('getDecision', castle);
  calcAITimeout();
  setParamsToStorage();
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
  var l_enemy = localStorage.getItem('castle_enemies');
  if (!l_enemy) {
    l_enemy = {};
  }
  castle.food_settings.min_day = l_min_day;
  castle.food_settings.buy_on = l_buy_on;
  castle.build_settings.build_array = l_build_array;
  castle.enemy = l_enemy;
  
}

function setParamsToStorage() {
  localStorage.setItem('castle_settings_food_min_day', castle.food_settings.min_day);
  localStorage.setItem('castle_settings_food_buy_on', castle.food_settings.buy_on);
  localStorage.setItem('castle_settings_build_build_array', castle.build_settings.build_array);
  localStorage.setItem('castle_enemies', castle.enemy);
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
  
  var command = '';
  console.log('AIcycle before', command, castle.task_list);
  command = getDecision();
  console.log('AIcycle after', command, castle.task_list);
  
  if (command != '') {
    sendCommand(command);
  } else {
    var time = getAITimeout();
    console.log('AIcycle next round after', time/1000);
    setTimeout(AIcycle, time);
  }
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
          ai_position_parent_id = ai_position_id;
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
            case command_hire:
              ai_position_id = ai_position_id_hire;
              break;
            case command_recruit:
              ai_position_id = ai_position_id_recruit;
              break;
          }
          
          break;
        default:
          ai_position_id = arr_building[i].position_id;
          ai_position_parent_id = ai_position_id;
          break;
      }
      console.log('getCommandFromTxt', arr_building[i].code, ai_position_id, arr_building[i].position_id, arr_building[i].search_key, last_command);
      return arr_building[i].command;
    }    
  }
  return '';
}

function parseCommandEx(command, txt) {
  command = getCommandFromTxt(txt);
  console.log('parseCommandEx', command, txt);
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
    case command_trebuchet:
      result = parseResourceBuildingInfo(txt, command);
      break;
    case command_trade:
    case command_trade_buy:
    case command_trade_food:
    case command_trade_wood:
    case command_trade_stone:
      result = parseTradeInfo(txt);
      break;
    case command_hire:
    case command_recruit:
    case command_workshop:
      result = true;
      break;
    case command_war:
      result = parseWarInfo(txt);
      break;
    case command_before_battle:
      result = parseBeforeBattleInfo(txt);
      break;
    case command_attack:
      result = parseAttackInfo(txt);
      break;
    case command_after_battle:
      result = parseAfterBattleInfo(txt);
      break;
    case command_under_attack:
      result = parseUnderAttackInfo(txt);
      break;
    case command_after_attack:
      result = parseAfterAttackInfo(txt);
      break;
    default:
      break;
  }
  console.log('parseCommandResult', command, result, castle);
  if (!result) {
    console.error('Something goes wrong check log. Try refresh page');
  }
  
  return command;
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
  if (isRightUrl()) {
    parseCommandResultDOM();
  }
  setTimeout(parseCommandResult, 1000);
}

function addIntoBuildList(code) {
  console.log('addIntoBuildList', code, castle.build_settings.build_array);
  if (castle.build_settings.build_array.indexOf(code) === -1) {
    castle.build_settings.build_array.push(code);
  }
  console.log('addIntoBuildList', code, castle.build_settings.build_array);
}

function kickOutBuildList(code) {
  console.log('kickOutBuildList', code, castle.build_settings.build_array);
  var idx = castle.build_settings.build_array.indexOf(code);
  if (idx != -1) {
    castle.build_settings.build_array.splice(idx, 1);
  }
  console.log('kickOutBuildList', code, castle.build_settings.build_array);
}

function setMaxGold(max_gold) {
  /*console.log('setMaxGold', max_gold);
  if (castle.build_settings.build_array.indexOf(code) === -1) {
    castle.build_settings.build_array.push(code);
  }
  console.log('addIntoBuildList', code, castle.build_settings.build_array);*/
}

var first_parsing = 0;
function parseCommandResultDOM() {
  var msg = $('div.im_history_message_wrap:not([id])');
  //console.log('parseCommandResultDOM', msg);
  if (!msg) {
    return;
  }
  
  var with_command = false;
  var first_command = true;
  for(var i = 0, Ln = msg.length; i < Ln; ++i) {
    if (msg[i].id) {
      break;
    }
    
    var msg_text = getTextByNode(msg[i]);
    if (!msg_text) {
      continue;
    }
    var author = getAuthorByNode(msg[i]);
    if (!msg_text) {
      continue;
    }
    
    console.log('parce comamnd cycle', i, msg_text);
    
    $(msg[i]).attr('id', 'msg_id_' + (++msg_id));
    var check_command = msg_text.toLowerCase();
    if ((first_parsing === 0) && (check_command != const_bot_start_command)) {
      continue;
    }
    
    if (author != const_bot_name) {
      last_command = msg_text;
      
      if (check_command === const_bot_start_command) {
        with_command = true;
        if (first_parsing === 0) {
          first_parsing = 1;
        }
        break;
      }
      if (check_command.indexOf('build on') != -1) {
        addIntoBuildList(check_command.replace('build on ', ''));
      } else if (check_command.indexOf('build off') != -1) {
        kickOutBuildList(check_command.replace('build off ', ''));
      } else if (check_command.indexOf('start now') != -1) {
        while ((castle.task_list.length > 0) && (castle.task_list[0].type === 'wait')) {
          castle.task_list.shift();
        }
        with_command = true;
      } else if (check_command.indexOf('stop now') != -1) {
        castle.task_list = [{type:'wait',until:time() + 100 * 24 * 60 * 60}];
        with_command = true;
      } else if (check_command.indexOf('clean task') != -1) {
        castle.task_list = [];
        with_command = true;
      }
      continue;
    }
    
    var command = parseCommandEx('', msg_text);
    if (command === command_before_battle) {
      var btn = $('#msg_id_'+msg_id+' button.btn.reply_markup_button')[0];
      $(btn).attr('id', 'btn_id_' + (++msg_id));
      castle.opponent.btn_id = 'btn_id_' + msg_id;
    }
    
    with_command = true;
  }
  
  if (first_parsing === 1) {
    first_parsing = 2;
    for(var i = msg.length - 1; i >= 0; --i) {
      if (msg[i].id) {
        continue;
      }
      $(msg[i]).attr('id', 'msg_id_' + (++msg_id));
    }
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
  last_cycle_time = time();
  return true;
}

function parseBuildingRow(code, arr) {
  switch(getCode(arr[0])) {
    case 'durability':
      var ii = getIntInt(arr[1]);
      castle[code].hp_current = ii[0];
      castle[code].hp_max = ii[1];
      break;
    case 'gold':
      var amount = getInt(arr[1]);
      if (amount >= 0) {
        castle.gold = amount;
      }
      break;
  }
}

function parseResourceBuildingInfo(info, command) {
  var building_code = command.toLowerCase();
  var arr = info.split('<br>');
  var upgrade_idx = -1, upgrade_section = false, repair_idx = -1, repair_section = false;
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
    if (repair_section || (arr1[0].trim() === 'Repair')) {
      if (!repair_section) {
        repair_section = true;
        continue; 
      } else {
        if (++repair_idx >= 4) {
          repair_section = false;
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
        } else if (repair_section) {
          var p = getIntAndStatus(arr1[0]);
          castle[building_code]['repair_'+arr_upgrade[repair_idx]] = p.value;
          castle[building_code].repair_status = castle[building_code].repair_status && p.status;
        } else {
          parseBuildingRow(building_code, arr1);
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
  last_cycle_time = time();
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
  last_cycle_time = time();
  return true;
}

function getDelayInSec(txt) {
  var t = getInt(txt);
  var k = txt.indexOf('min.') != -1 ? 60 : 1;
  t += k === 60 ? 1 : 60;
  return t * k;
}

function parseWarInfo(info) {
  var arr = info.match(/<code>(.*?)<\/code>/g).map(function(val){
     return val.replace(/<\/?code>/g,'');
  });
  
  castle.wins = getInt(arr[1]);
  castle.karma = getInt(arr[3]);
  castle.territory = getInt(arr[5]);
  var ii = getIntInt(arr[7]);
  castle.walls.hp_current = ii[0];
  castle.walls.hp_max = ii[1];
  ii = getIntInt(arr[8]);
  castle.walls.worker_current = ii[0];
  castle.walls.worker_max = ii[1];
  ii = getIntInt(arr[11]);
  castle.barracks.worker_current = ii[0];
  castle.barracks.worker_max = ii[1];
  castle.food = getInt(arr[12]);
  
  if (arr[arr.length - 1].indexOf('Next attack') != -1) {
    castle.war_delay = time() + getDelayInSec(arr[arr.length - 1]);
  }
  
  return true;
}

function parseAttackInfo(info) {
  if (info.indexOf('Siege has started') != -1) {
    castle.in_battle = true;
  }
  if (info.indexOf('yet recovered from the last battle') != -1) {
    castle.war_delay = time() + getDelayInSec(info);
  }
  
  return true;
}

function parseAfterBattleInfo(info) {
  var idx1 = info.indexOf('The battle with');
  var idx2 = info.indexOf('complete');
  if ((idx1 != -1) && (idx2 != -1) && (idx1 < idx2)) {
    castle.in_battle = false;
    castle.war_delay = time() + 11 * 60;
  }
  
  var result = info.match(/<code>(.*?)<\/code>/g).map(function(val){
     return val.replace(/<\/?code>/g,'');
  });
  
  var win = info.indexOf('Your army won') != -1;
  if (win) {
    castle.barracks.worker_current = getInt(result[2]);
    
    var e = {name:result[0],gold_last:getInt(result[3]),gold_total:getInt(result[3])};
    
    if (castle.enemy[e.name]) {
      castle.enemy[e.name].gold_last = e.gold_last;
      castle.enemy[e.name].gold_total += e.gold_last;
    } else {
      castle.enemy[e.name] = e;
    }
    castle.task_list = [{type:'command',position_id:ai_position_id_top,command:''}];
    return true;
  }
}

function parseUnderAttackInfo(info) {
  castle.in_battle = true;
  castle.under_attack = true;
}

function parseAfterAttackInfo(info) {
  castle.in_battle = false;
  castle.under_attack = false;
  castle.war_delay = time() + 61 * 60;
  castle.walls.hp_current = 0;
}

function parseBeforeBattleInfo(info) {
  var result = info.match(/<code>(.*?)<\/code>/g).map(function(val){
     return val.replace(/<\/?code>/g,'');
  });
  
  var title = result[0];
  castle.opponent.name = title.indexOf('[') != -1 ? title.substr(title.indexOf(']') + 1) : title;
  castle.opponent.alians = title.indexOf('[') != -1 ? title.substr(1, title.indexOf(']') - 1) : '';
  castle.opponent.domen = result[1];
  castle.opponent.territory = getInt(result[2]);
  castle.opponent.karma = getInt(result[3]);
  
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
  last_cycle_time = time();
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

function clickButton(id) {
  var e = jQuery.Event("click");
  jQuery('#' + id).trigger(e);
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
    //clickButton(message_button_id);
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