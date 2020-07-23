const catalog: {
  [id: number]: {
    title: string;
    time: number; // ミリ秒
  };
} = {
  "0": {
    "title": "マニュアル登録されたやつ",
    "time": 1000 * 2
  },
  "1": {
    "title": "練習航海",
    "time": 900000
  },
  "2": {
    "title": "長距離練習航海",
    "time": 1800000
  },
  "3": {
    "title": "警備任務",
    "time": 1200000
  },
  "4": {
    "title": "対潜警戒任務",
    "time": 3000000
  },
  "5": {
    "title": "海上護衛任務",
    "time": 5400000
  },
  "6": {
    "title": "防空射撃演習",
    "time": 2400000
  },
  "7": {
    "title": "観艦式予行",
    "time": 3600000
  },
  "8": {
    "title": "観艦式",
    "time": 10800000
  },
  "9": {
    "title": "タンカー護衛任務",
    "time": 14400000
  },
  "10": {
    "title": "強行偵察任務",
    "time": 5400000
  },
  "11": {
    "title": "ボーキサイト輸送任務",
    "time": 18000000
  },
  "12": {
    "title": "資源輸送任務",
    "time": 28800000
  },
  "13": {
    "title": "鼠輸送作戦",
    "time": 14400000
  },
  "14": {
    "title": "包囲陸戦隊撤収作戦",
    "time": 21600000
  },
  "15": {
    "title": "囮機動部隊支援作戦",
    "time": 43200000
  },
  "16": {
    "title": "艦隊決戦援護作戦",
    "time": 54000000
  },
  "17": {
    "title": "敵地偵察作戦",
    "time": 2700000
  },
  "18": {
    "title": "航空機輸送作戦",
    "time": 18000000
  },
  "19": {
    "title": "北号作戦",
    "time": 21600000
  },
  "20": {
    "title": "潜水艦哨戒任務",
    "time": 7200000
  },
  "21": {
    "title": "北方鼠輸送作戦",
    "time": 8400000
  },
  "22": {
    "title": "艦隊演習",
    "time": 10800000
  },
  "23": {
    "title": "航空戦艦運用演習",
    "time": 14400000
  },
  "24": {
    "title": "北方航路海上護衛",
    "time": 30000000
  },
  "25": {
    "title": "通商破壊作戦",
    "time": 144000000
  },
  "26": {
    "title": "敵母港空襲作戦",
    "time": 288000000
  },
  "27": {
    "title": "潜水艦通商破壊作戦",
    "time": 72000000
  },
  "28": {
    "title": "西方海域封鎖作戦",
    "time": 90000000
  },
  "29": {
    "title": "潜水艦派遣演習",
    "time": 86400000
  },
  "30": {
    "title": "潜水艦派遣作戦",
    "time": 172800000
  },
  "31": {
    "title": "海外艦との接触",
    "time": 7200000
  },
  "32": {
    "title": "遠洋練習航海",
    "time": 86400000
  },
  "33": {
    "title": "前衛支援任務(南方)",
    "time": 900000
  },
  "34": {
    "title": "決戦支援任務(南方)",
    "time": 1800000
  },
  "35": {
    "title": "MO作戦",
    "time": 25200000
  },
  "36": {
    "title": "水上機基地建設",
    "time": 32400000
  },
  "37": {
    "title": "東京急行",
    "time": 9900000
  },
  "38": {
    "title": "東京急行（弐）",
    "time": 10500000
  },
  "39": {
    "title": "遠洋潜水艦作戦",
    "time": 108000000
  },
  "40": {
    "title": "水上機前線輸送",
    "time": 24600000
  },
  "41": {
    "title": "ブルネイ泊地沖哨戒",
    "time": 3600000
  },
  "42": { // マンスリー遠征
    "title": "ミ船団護衛(一号船団)",
    "time": 28800000
  },
  "43": { // マンスリー遠征
    "title": "ミ船団護衛(二号船団)",
    "time": 43200000
  },
  "44": { // マンスリー遠征
    "title": "航空装備輸送任務",
    "time": 36000000
  },
  "45": {
    "title": "ボーキサイト船団護衛",
    "time": 12000000
  },
  "100": {
    "title": "兵站強化任務",
    "time": 1500000
  },
  "101": {
    "title": "海峡警備行動",
    "time": 3300000
  },
  "102": {
    "title": "長時間対潜警戒",
    "time": 8100000
  },
  "103": { // マンスリー遠征
    "title": "南西方面連絡線哨戒",
    "time": 6600000
  },
  "104": { // マンスリー遠征
    "title": "小笠原沖哨戒線",
    "time": 10800000
  },
  "105": { // マンスリー遠征
    "title": "小笠原沖戦闘哨戒",
    "time": 12600000
  },
  "110": {
    "title": "南西方面航空偵察作戦",
    "time": 2100000
  },
  "111":{ // マンスリー遠征
    "title": "敵泊地強襲反撃作戦",
    "time": 31200000
  },
  "112":{ // マンスリー遠征
    "title": "南西諸島離島哨戒作戦",
    "time": 10200000
  },
  "113":{ // マンスリー遠征
    "title": "南西諸島離島防衛作戦",
    "time": 27000000
  },
  "114":{ // マンスリー遠征
    "title": "南西諸島捜索撃滅戦",
    "time": 23400000
  },
  "131": {
    "title": "西方海域偵察作戦",
    "time": 7200000
  },
  "132": { // マンスリー遠征
    "title": "西方潜水艦作戦",
    "time": 36000000
  },
  "141": { // マンスリー遠征
    "title": "ラバウル方面艦隊進出",
    "time": 27000000
  },
  "197": {
    "title": "前衛支援任務(イベント)",
    "time": 900000
  },
  "198": {
    "title": "決戦支援任務(イベント)",
    "time": 1800000
  },
  "-1": {
    "title": "DEBUG: 今すぐのやつ",
    "time": 0
  }
};

export default catalog;
