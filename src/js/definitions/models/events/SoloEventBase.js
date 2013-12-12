var KanColleWidget = KanColleWidget || {};
(function(){
    "use strict";
    var SoloEventBase = KanColleWidget.SoloEventBase = function(){};
    /**
     * 時間がすでに来ているイベントを返す
     * @returns {boolean}
     */
    SoloEventBase.prototype.isUpToTime = function(){
        var now    = (new Date()).getTime();

        if(typeof this.finish != 'number') this.finish = (new Date(this.finish)).getTime();

        var notifyOffset = KanColleWidget.Config.get('notification-offset-millisec');
        var finish = this.finish - notifyOffset;

        return (finish < now);
    };
    /**
     * 終了時間を取得する
     * @returns {*}
     */
    SoloEventBase.prototype.getEndTime = function(){
        if(typeof this.finish != 'number') this.finish = (new Date(this.finish)).getTime();

        return this.finish;
    };
    /**
     * 注意)これはここで良いのか？
     * ノーティフィケーションをする
     */
    SoloEventBase.prototype.notify = function(){

        if(!KanColleWidget.Config.get('notification-on-reminder-finish')) return;

        Util.presentation(this.prefix + this.primaryId + this.suffix, {
            startOrFinish: 'finish',
            sound: {
                kind: this.kind
            }
        });
    };
})();
