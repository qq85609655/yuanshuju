/**
 * 元数据分析
 */
Ext.define('Dep.metadata.metadatamng.view.AnalyseWin', {
    extend : 'Ext.window.Window',
    modal : true,
    resizable : false,
    maximizable : true,
    autoDestroy : true,
    constrainHeader  : true,
    title : "元数据分析",
    autoScroll : true,
    width : 960,
    height : 600,
    layout: 'border',
    closeAction : "hide",
    buttonAlign :"center",
    bodyStyle:"background-color:#FFFFFF;",

    listeners : {
        close : function(){
            this.hide();
        },
        hide : function(){
            var me = this;
            d3.select("#metadata_analyseWinDiv").html(""); //清空d3画布
            if(me.imgDisplayPanel){

                me.remove(me.imgDisplayPanel,true);
            }
        },
        show:function(){

            this.renderImgs();

        }
    },
    initComponent: function() {
        var me = this;
        me.relationPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',

            html:"<div id='userAllInfo'><div id='metadata_analyseWinDiv'></div></div>",
            title: '',
        });


        Ext.applyIf(me, {
            items: [
                me.relationPanel
            ]
        });

        me.callParent(arguments);
    },
    /**
     *
     */
    setImages:function(imgs){
        var me = this;
        var me = this,imgDivs ='<div style="width: 100%;  height: 100%;">',panelWidth;
        if(!imgs || imgs.lenght ==0){//没有关联图片，不显示
            return;
        }
        $.each(imgs,function(index,svg){
            var image = new Image();
            image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
            var canvas = document.createElement('canvas');  //准备空画布
            canvas.width = 1000;
            canvas.height = 900;

            var context = canvas.getContext('2d');  //取得画布的2d绘图上下文
            context.drawImage(image, -100, -80);
            var url = 'url("'+canvas.toDataURL('image/png')+'")';
            //var url = '"data:image/svg+xml;'+svg+'"';
            imgDivs = imgDivs + "<div style='width: 100%;  height: 50%; overflow: scroll'><div style='width: 1000px;  height: 900px;background-repeat: no-repeat; border: solid 1px; border-color: gainsboro;background-size:100%; background-image :"+url+"'></div></div>" ;
            //imgDivs = imgDivs + "<div style='width: 100%;  height: 50%;background-repeat: no-repeat; background-size:100%; background :"+url+"'></div>" ;
            //imgDivs = imgDivs + "<div style='width: 100%;  height: 50%;overflow:hidden'>"+svg+"</div>" ;
        });
        imgDivs = imgDivs + '</div>';
        panelWidth = me.width/2;
        me.imgDisplayPanel = Ext.create('Ext.panel.Panel', {
            id:"imageDisplayDiv",
            region: 'east',
            layout : 'fit',
            border : false,
            header :false,
            collapseMode:"mini",
            collapsible : true,
            html:imgDivs,
            width: panelWidth,
            collapseFirst:false,
            split : true,
            title: ''
        });
        me.add(me.imgDisplayPanel);

        me.imgDisplayPanel.setVisible(true);


    },

    renderImgs:function(){
        if(!$("#imageDisplayDiv")){
            return;
        }
        var svgElements = $("#imageDisplayDiv").find("svg");
        $.each(svgElements,function(index,element){
            //$(element).css('width',$("#imageDisplayDiv-innerCt").width());
            //$(element).css('height',$("#imageDisplayDiv-innerCt").height()/2);
            //element.setAttribute('width',$("#imageDisplayDiv").width());
            //element.setAttribute('height',$("#imageDisplayDiv").height()/2);
            var sx = 1/$("#imageDisplayDiv").width()/element.getAttribute('width');
            var sy = 1/$("#imageDisplayDiv").height()/element.getAttribute('height')/2;
            element.setAttribute('transform',"scale("+sx+","+sy+")");
            //element.setAttribute('viewBox','0 0 '+$("#imageDisplayDiv").width()+' '+$("#imageDisplayDiv").height()/2);
        });
    },


});
