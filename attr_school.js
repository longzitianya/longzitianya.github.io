var vConsole = new VConsole();
//参数：传递过来的
var prodId      = $.getUrlParam("prodid") || '';                                    //产品ID
var from        = $.getUrlParam("from") || '';			                           //页面来源，用于区别客户端和H5，H5跳转from=h5,客户端没有此参数
var prodid      = '';
var prodorgid   = '';
var prodtype    = '';
var type        = '';
var utm_source = '';
var utm_content = '';
var utm_term    = '';
var ciytCode    = '024';
var cityName    = '沈阳市';
if(from=='h5'){
    //参数来自H5
    prodid      = $.getUrlParam("prodid") || '';
    prodorgid   = $.getUrlParam("prodorgid") || '';
    prodtype    = $.getUrlParam("prodtype") || '';
    type        = $.getUrlParam("type") || '';
    utm_source = $.getUrlParam("utm_source") || '';
    utm_content = $.getUrlParam("utm_content") || '';
    utm_term    = $.getUrlParam("utm_term") || '';
}else{
    //参数来自客户端
    ciytCode    = $.getUrlParam("ct") || '024';                                     //城市CODE
    cityName    = $.getUrlParam("cityname") || '沈阳市';                           //城市名称
    utm_source  = $.getUrlParam("u3") || '';			                               //一级渠道名
    utm_content = $.getUrlParam("u4") || '';			                               //二级渠道名
    utm_term    = $.getUrlParam("u1") || '';			                               //用户ID
}

//参数：JS处理用的
var attrList    = [];
var resObj      = null;
//初始化数据
init();
//【监听】错误框
$(".know").click(function(){
    $("#errmsg").fadeOut();
});

/**
 * 城市相关
 */
// 弹窗
$('#btn_sel_area,#btn_sel_area2').click(function(){
    $('#sel_area').show();
});
//选择
$('#sel_area').find('li').each(function(){
    var liObj = $(this);
    liObj.click(function(){
        ciytCode = liObj.attr('data');
        cityName = liObj.find('a').text();
        showCity();
        $('#sel_area').hide();
        showSchools();//显示学校列表
        //跳转step2
        $('#step1').hide();
        $('#step2').show();
    });
});

/**
 * step1
 */
//监听【办理】
$('#goAppBtn').click(function(){
    if(resObj){
        if(from=='h5'){
            //跳转确认订单
            var url = 'confirm.html';
            url+=(
                "?prodid="+prodid
                +"&prodorgid="+prodorgid
                +"&prodtype="+prodtype
                +"&utm_source="+encodeURIComponent(utm_source)
                +"&utm_content="+encodeURIComponent(utm_content)
                +"&utm_term="+encodeURIComponent(utm_term)
                +"&attr="+JSON.stringify(resObj)
            );

            window.location.href = url;
            return;
        }else{
            //跳转客户端
            /*if(MOB.utils.getOS()==1){
                var newMob=new NeusoftMob();
                var appParm = {"id":prodId,"param":[resObj]};
                console.log('传给客户端参数:'+JSON.stringify(appParm));
                newMob.setProductParam(appParm);
            }else if(MOB.utils.getOS()==2){
                var appParm = {"id":prodId,"param":[resObj]};
                console.log('传给客户端参数:'+JSON.stringify(appParm));
                mob.setProductParam(appParm,function(response){});
            }*/
            var mob=new NeusoftMob();
            var appParm = {"id":prodId,"param":[resObj]};
            console.log('1传给客户端参数:'+JSON.stringify(appParm));
            mob.setProductParam(appParm,function(response){});
        }
    }else{
        $("#errmsg").fadeIn();
    }
});
//监听【返回】
$('#goBackBtn').click(function(){
    if(from!='h5'){
        //返回客户端
       /* if(MOB.utils.getOS()==1){
            var newMob=new NeusoftMob();
            var appParm = {};
            console.log('传给客户端参数:'+JSON.stringify(appParm));
            newMob.setProductParam(appParm,function(response) {
                var status = response.status;//状态码
                console.log('客户端返回CODE：'+status);
            });
        }else if(MOB.utils.getOS()==2){
            var appParm = {};
            console.log('传给客户端参数:'+JSON.stringify(appParm));
            mob.setProductParam(appParm,function(response) {
                var status = response.status;//状态码
                console.log('客户端返回CODE：'+status);
            });
        }*/
        var Tmob=new NeusoftMob();
        var appParm = {};
        console.log('2传给客户端参数:'+JSON.stringify(appParm));
        Tmob.setProductParam(appParm,function(response) {
            var status = response.status;//状态码
            console.log('客户端返回CODE：'+status);
        });
    }
});

/**
 * step2
 */
//监听【返回】
$('#goPre').click(function () {
    //跳转step1
    $('#step1').show();
    $('#step2').hide();
});

//初始化
function init(){
    if(from=='h5'){
        $('#loading').show();
        $('.xiaof_head2').css('width','100%');
    }else{
        $('.xiaof_head1,.xiaof_head3').show();
    }
    $.visitCount();   //统计
    showCity();       //显示城市

    //【接口】产品
    var opts1={"prodid":prodId,"accesssource":"2",'utm_source':utm_source,'utm_content':utm_content,'utm_term':utm_term};
    $.ajaxPost(comm_proAPI,JSON.stringify(opts1),function(data){
        console.log('API:'+comm_proAPI);
        console.log("parms:");
        console.log(opts1);
        console.log("res:");
        console.log(data);
        if(data.error_code=='00000'){
            var product = data.result;
            var imgurl  = product.prodshareurl!==undefined?product.prodshareurl:'images/xiaofq2.png';
            $('#prodImg').attr('src',imgurl);
            $('.prodName').text(product.prodname);
            $('#prodSpec').text(product.prodspec!==undefined?product.prodspec:'');
            $('#prodDetail').html(product.proddetail!==undefined?$.formatText(product.proddetail):'');
            attrList = product.attrlist!==undefined?product.attrlist:[];
            showSchools();//显示学校列表
        }
        $('#loading').hide();
    },function(err){
        $('#loading').hide();
    });
}

//显示城市
function showCity(){
    if(ciytCode){
        cityName = comm_cityNames.hasOwnProperty(ciytCode)?comm_cityNames[ciytCode]:cityName;
        $('#sel_area li').siblings().find('a').removeClass('xiaof_tannr1q');
        $('li[data="'+ciytCode+'"]').find('a').addClass('xiaof_tannr1q');
        $('.cityName').text(cityName);
    }
}

//显示学校列表
function showSchools(){
    var html    = '';
    var sarr    = [];
    if(attrList.length>0){
        $.each(attrList, function (n, item) {
            if(item.attrgroup==cityName){
                sarr.push(item);
            }
        });

        if(sarr.length>0){
            sarr.sort(compare)
            $.each(sarr, function (n, item) {
                var mod  = $('#school').html();
                var temp = mod;
                temp = temp.replace(/@ARRTID@/g,item.attrid);
                temp = temp.replace(/@ATTRVAL@/g,item.attrvalue);
                temp = temp.replace(/@ATTRNAME@/g,item.attrname);
                html+= temp;
            });
        }
    }
    if(html==''){
        html = $('#noschool').html();
    }
    $('#result').html(html);
    //监听【学校】
    $("#result>div.school").each(function(){
        $(this).on('click',function(){
            var itemObj = $(this).find('p');
            var attrid = itemObj.attr('attrid');
            var attrval = itemObj.attr('attrval');
            var attrname = itemObj.text();
            $('#res_school').text(attrname);
            resObj = {"attrid":attrid,"attrvalue":attrval,"attrname":attrname};
            //跳转step1
            $('#step1').show();
            $('#step2').hide();
        });
    });
}

//数组排序
var compare = function (obj1, obj2) {
    var val1 = parseInt(obj1.attrorder);
    var val2 = parseInt(obj2.attrorder);
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}
