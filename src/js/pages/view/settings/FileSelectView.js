var widgetPages = widgetPages || {};
(function(){
    "use strict";

    var ImageFileSelectView = widgetPages.ImageFileSelectView = function(file){
        this.tpl = '<tr><td>{{title}}</td><td id="file-selects"></td></tr>';
        this.file = file;
    };
    ImageFileSelectView.prototype = Object.create(widgetPages.View.prototype);
    ImageFileSelectView.prototype.constructor = ImageFileSelectView;
    ImageFileSelectView.prototype.render = function(){
        this.apply({
            title : this.file.label
        })._render();
        this.$el.find('#file-selects').append(
            (new FileSelectViewBase(this.file)).render()
        );
        if (KanColleWidget.Config.get(this.file.inputName)) {
            this.$el.find('#file-selects').append(
                $('<img>').attr({
                    'src' : KanColleWidget.Config.get(this.file.inputName),
                    'id'  : 'isset-img-' + this.file.inputName
                }).css({height:'40px'})
            );
        }
        return this.$el;
    };
    ImageFileSelectView.ofPopupBackground = function(){
        return new ImageFileSelectView(popupBackgroundImageFile);
    };
    ImageFileSelectView.ofNotificaionIcon = function(){
        return new ImageFileSelectView(notificationImageFile);
    };

    var SoundFileSelectListView = widgetPages.SoundFileSelectListView = function(){
        this.tpl = '<tr><td>{{title}}</td><td id="file-selects"></td></tr>';
    };
    SoundFileSelectListView.prototype = Object.create(widgetPages.View.prototype);
    SoundFileSelectListView.prototype.create = SoundFileSelectListView;
    SoundFileSelectListView.prototype.render = function(){
        this.apply({
            title : "通知時音設定"
        })._render();
        this.$el.find('#file-selects').append($.map(soundFileList, function(file){
            return FileSelectViewBase.createFromParam(file).render();
        }));
        return this.$el;
    };
    var FileSelectViewBase = widgetPages.FileSelectViewBase = function(file){
        this.file = file;
        this.tpl = '<div><span class="clickable to-file-modal" input-name="{{inputName}}">{{label}} : <span id="isset-{{inputName}}">{{isSet}}</span></span></div>';
        this.events = {
            'click .to-file-modal' : 'showFileModal'
        }
    };
    FileSelectViewBase.prototype = Object.create(widgetPages.View.prototype);
    FileSelectViewBase.prototype.constructor = FileSelectViewBase;
    FileSelectViewBase.prototype.render = function(){
        var isSet = "--";
        if (KanColleWidget.Config.get(this.file.inputName)) {
            isSet = "設定されています";
        }
        this.apply({
            label : this.file.label,
            inputName : this.file.inputName,
            isSet : isSet
        })._render();
        return this.$el;
    };
    FileSelectViewBase.prototype.showFileModal = function(ev,self){
        var $inner = (new widgetPages.FileSelectModalContentsView(self.file)).render();
        var modal = new widgetPages.ModalView($inner);
        modal.render().show();
    };
    FileSelectViewBase.createFromParam = function(file){
        return new FileSelectViewBase(file);
    };
    var FileSelectModalContentsView = widgetPages.FileSelectModalContentsView = function(file){
        this.file = file;
        this.tpl = '<div class="modal-contents">'
                  +'    <h1>{{label}}</h1>'
                  +'    <table>'
                  +'        <tr>'
                  +'            <td>現在の設定 → <span id="current-file">{{isSet}}</span></td>'
                  +'            <td><span class="do-test clickable">&gt;[テストします!]</span></td>'
                  +'        </tr>'
                  +'        <tr>'
                  +'            <td>新たに設定 → <input id="new-file" type="file" accept="{{accept}}"/></td>'
                  +'            <td><span class="done clickable">&gt;[これでおkです!]</span></td>'
                  +'        </tr>'
                  +'        <tr><td><span class="reset clickable">&gt;[削除します!]</span></td><td></td></tr>'
                  +'    </table>'
                  +'</div>';
        this.events = {
            // TODO: 複数イベントをViewでdelegateできてないよ問題
            //'click .do-test' : 'test',
            'click .done' : 'commit'
        };
    };
    FileSelectModalContentsView.prototype = Object.create(widgetPages.View.prototype);
    FileSelectModalContentsView.prototype.constructor = FileSelectModalContentsView;
    FileSelectModalContentsView.prototype.render = function(){
        this.file.isSet = '無し';
        if (KanColleWidget.Config.get(this.file.inputName)) this.file.isSet = '設定されています';
        this.apply(this.file)._render();

        if(this.file.doNotTest) this.$el.find('.do-test').remove();

        // {{{ TODO: 複数イベントをViewでdelegateできてないよ問題
        var self = this;
        this.$el.find('.do-test').on('click',function(ev){
            self['test'](ev,self);
        });
        this.$el.find('.reset').on('click',function(ev){
            self['reset'](ev,self);
        });
        // }}}

        return this.$el;
    };
    FileSelectModalContentsView.prototype.done = function(ev,self){
        $('#modal-wrapper').fadeOut(100, function(){
            $(this).remove();
        });
    };
    FileSelectModalContentsView.prototype.commit = function(ev,self){
        var fileObj = $('#new-file').prop('files')[0];
        KanColleWidget.Fs.update(self.file.inputName, fileObj, self.file.accept.split(','), function(res){
            console.log(res);
            if(res.status == 0) return self.done();

            KanColleWidget.Config.set(res.purpose, res.entry.toURL());
            var message = res.origin.name + 'に設定しました';
            $("#isset-" + self.file.inputName).text(message);
            self.done();
        });
    };
    FileSelectModalContentsView.prototype.reset = function(ev,self){
        KanColleWidget.Config.set(self.file.inputName, "");
        $("#isset-" + self.file.inputName).text('削除しました');
        $("#isset-img-" + self.file.inputName).remove();
        self.done();
    };
    FileSelectModalContentsView.prototype.test = function(ev,self){
        var d = new Date();
        console.log(self.file.kind);
        var text = "通知テスト\n" + d.toLocaleDateString() + " " + d.toLocaleTimeString();
        Util.presentation(text, {
            sound: {
                kind  : self.file.kind,
                force : true
            }
        });
    };
    var soundFileList = [
        {
            label:"デフォルト",inputName:"notification-sound-file",
            kind:"",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        },
        {
            label:"遠征出発",inputName:"notification-sound-mission-start-file",
            kind:"mission-start",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        },
        {
            label:"遠征帰投",inputName:"notification-sound-mission-finish-file",
            kind:"mission-finish",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        },
        {
            label:"入渠開始",inputName:"notification-sound-nyukyo-start-file",
            kind:"nyukyo-start",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        },
        {
            label:"入渠終了",inputName:"notification-sound-nyukyo-finish-file",
            kind:"nyukyo-finish",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        },
        {
            label:"建造開始",inputName:"notification-sound-createship-start-file",
            kind:"createship-start",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        },
        {
            label:"建造完了",inputName:"notification-sound-createship-finish-file",
            kind:"createship-finish",accept:"audio/mp3,audio/wav,audio/ogg,audio/m4a"
        }
    ];
    var notificationImageFile = {
        label:"通知アイコン画像",inputName:"notification-img-file",
        kind:"",accept:"image/*"
    };
    var popupBackgroundImageFile = {
        label:"アイコンポップアップの背景画像",inputName:"popup-bg-img-file",
        kind:"",accept:"image/*",doNotTest:true
    };
})();
