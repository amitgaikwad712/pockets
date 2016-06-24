var g_x1, g_x2, g_y1, g_y2,g_x3,g_y3;
var temp = 1;
(function($){
  $.fn.circleGraphic=function(options){
    $.fn.circleGraphic.defaults={
      color:'#F90',
      startAngle: 0,
      //endAngle:50
    };

    var opts = $.extend({},$.fn.circleGraphic.defaults,options);
    
    var percentage=76;
    var ID="c"+percentage+Math.random();
    //alert(ID);

    this.append("<canvas id='"+ID+"'></canvas>");

    var canvas=document.getElementById(ID),
      context=canvas.getContext('2d');

    var Width = this.width();
    this.height(Width);
    var Height = this.height();

    canvas.width = Width;
    canvas.height = Height;

    var startAngle = opts.startAngle,
      endAngle = percentage/100,
      angle = startAngle,
      radius = Width*0.4;

    function drawTrackArc(){
      context.beginPath();
      context.strokeStyle = '#c46d7f';
      context.lineWidth = 2;
      context.arc(Width/2,Height/2,radius,(Math.PI/180)*(startAngle*360-90),(Math.PI/180)*(endAngle*360+270),false);
      context.stroke();
      context.closePath();
    }

    function drawOuterArc(_angle,_color){
      var angle = _angle;
      var color = _color;
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.arc(Width/2,Height/2,radius,(Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (angle * 360 - 90), false);
      context.stroke();
     // context.font = "12px gothamrnd-book";
     // context.textAlign = "start";
     // context.fillText("|",(Width/2)-2,(Height/2)-radius+10);
      context.closePath();
    } 

    function numOfPercentage(_angle,_color){
      var angle = Math.floor(_angle*100)+1;
      var color=_color;
      //context.font = "18px gothamrnd-light";
      //context.fillStyle = color;
      context.textAlign = "center";
      var metrics = context.measureText(angle);
      var textWidth = metrics.width;
      var xPos = Width/2-textWidth/2,
      yPos = Height/2+textWidth/2;
      //context.fillText("Balance",xPos+12,yPos);
	  g_x1 = xPos+12;
	  g_y1 = yPos;
      //context.font = "12px gothamrnd-light";
      //context.textAlign = "right";
      //context.fillText("INR",xPos-15,yPos+15);
	  g_x2 = xPos-15;
	  g_y2 = yPos+19;
      //context.textAlign = "center";
      //context.font = "18px gothamrnd-light";
     // context.fillText("4,000",xPos+15,yPos+21);
	  g_x3= xPos+15;
	  g_y3= yPos+21;
	 
      setTimeout(function(){
		if(temp===1){
			temp ++;
		context.font = "18px gothamrnd-light";
     	  context.fillStyle = color;
		  context.textAlign = "center";
		  context.font = "18px gothamrnd-book";
		  context.fillText("Balance",g_x1,g_y1);
		  context.font = "15px gothamrnd-book";
		  context.textAlign = "right";
		  context.fillText("₹",g_x2,g_y2);
		  context.textAlign = "center";
		  context.font = "18px gothamrnd-book";
		  context.fillText("4,000",g_x3,g_y3);
		  context.font = "70px gothamrnd-book";
		  context.fillText(".",(Width/2)-radius,(Height/2));
		  context.font = "12px gothamrnd-book";
		  context.textAlign = "start";
		  context.fillText("|",(Width/2)-2,(Height/2)-radius+10);
      }
	  },1400);			
		
      
    }

    function draw(){
      var loop = setInterval(function(){
        context.clearRect(0,0,Width,Height);
        drawTrackArc();

        drawOuterArc(angle,opts.color);
        numOfPercentage(angle,opts.color);
        angle+=0.01;
        if(angle>endAngle){
          clearInterval(loop);
        }

      },1000/60);
    }
    draw();
    return this;
  };
})(jQuery);
function showHide(isHide){
  /*if(isHide){
    $("#login-empty")[0].style.height="150px"
  }else{
    $("#login-empty")[0].style.height="200px"; 
  }*/
}
function activeMonth(event){
 $("#statement-id").hide();
  setTimeout(function () {
      $("#statement-id").slideDown();
  },500);
  refreshHighchart();
  $(".gallery .active").removeClass("active");
  event.parentElement.classList.add("active");
}

function loginFunc(){ 
   if($("#mpinnumber").val()==="123123"){
    window.location="main.html";
   }else{
    alert("Wrong MPIN number")
   }
}

function viewstatement(){
  window.location.href="statement.html";
}

$(function() {
  var header = $(".header");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        header.removeClass('header').addClass("fixedheader");
    } else {
        header.removeClass("fixedheader").addClass('header');
    }
  });
});
$(".social-list").hide();
function showToolTip(element){
  $(".social-list").hide();
  element.parentElement.parentElement.childNodes[3].style.display='block';
  $("body").addClass("overlay");
  $(".social-active").removeClass("social-active");
  element.parentElement.classList.add("social-active");
  element.parentElement.classList.add("check-active");


}

$(document).ready(function(){
    //$('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').tooltip({title: "", placement: "auto"});


});

$(".social-list").on("click", function (e) {
    e.stopPropagation();
   });
   $(document).on("click", function (e) { 
    if($(".favourites-list").hasClass("check-active")){
      $(".favourites-list").removeClass("check-active")
   }else{
       $("body").removeClass("overlay");
       $(".social-list").hide();
   }
   });

function refreshHighchart(){

    $('#statement-graph').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true,
            backgroundColor: 'transparent',
            borderWidth: 0,
        },
        title: {
            text: 'Expense',
            align: 'center',
            verticalAlign: 'middle',
            font: 'gothamrnd-light',
            y: -10,
            x : 1,
            style : {
                color: '#fff',
                fontSize: '0.9em'
            },
        },
        header :{

        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: 'Rs 25000',
            align: 'center',
            verticalAlign: 'middle',
            y: 10,
            x : 1,
            style : {
                color: '#fff',
                fontSize: '1.2em'
            },
        },
        exporting: { enabled: false },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    style: {
                        color: 'white',
                        textShadow: '0px 0px 0px white',
                        fontWeight: '200',
                        font: '13px gothamrnd-light'
                    },
                    connectorColor: 'white',

                }
            },
            pie: {
                dataLabels: {
                    enabled: false
                },
                shadow: true,
                center: ['50%', '50%'],
                borderWidth: 0 // < set this option
            }
        },

        series: [{
            type: 'pie',
            name: '',
            innerSize: '50%',
            showInLegend: false,
            data: [
                {
                    name: 'Utilities', y: 45,
                    color : "#D2C993"
                },
                {
                    name: 'Clothing',
                    y: 30,
                    color : "#CD7D80"
                },
                { name: 'Entertainment', y: 15,
                    color : "#B486B1"
                },
                { name: 'Medical', y: 12,
                    color : "#5CB1CE"
                }, { name: 'Vactions', y: 23,
                    color : "#F2C56A"
                },
                { name: 'Hoteling', y: 30 ,
                    color : "#F78E58"
                }
            ]
        }]
    });

}

/* chart */

$(function () {
    $('#statement-graph').highcharts({
        chart: {
           plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true,
            backgroundColor: 'transparent',
            borderWidth: 0
        },
        title: {
            text: 'Expense',
            align: 'center',
            verticalAlign: 'middle',
            font: 'gothamrnd-light',
            y: -10,
            x : 1,
            style : {
            color: '#fff',
            fontSize: '0.9em'
                    },
        },
        header :{
       
        },
        credits: {
          enabled: false
        },
        subtitle: {
            text: 'Rs 25000',
            align: 'center',
            verticalAlign: 'middle',
            y: 10,
            x : 1,
            style : {
            color: '#fff',
            fontSize: '1.2em'
                    },
        },
        exporting: { enabled: false },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    style: {
                        color: 'white',
                        textShadow: '0px 0px 0px white',
                        fontWeight: '200',
                        font: '13px gothamrnd-light'
                    },
                   connectorColor: 'white',

                }
            },
              pie: {
        dataLabels: {
          enabled: false
        },
        shadow: true,
        center: ['50%', '50%'],
        borderWidth: 0 // < set this option
      }
        },
       
        series: [{
            type: 'pie',
            name: '',
            innerSize: '50%',
            showInLegend: false,
            data: [
                {
                name: 'Utilities', y: 45, 
                 color : "#D2C993"
                },
                {
                    name: 'Clothing',
                    y: 30,
                    color : "#CD7D80"
                },
                { name: 'Entertainment', y: 15, 
                 color : "#B486B1"
                },
                { name: 'Medical', y: 12, 
                 color : "#5CB1CE"
                }, { name: 'Vacations', y: 23, 
                 color : "#F2C56A"
                },
                { name: 'Food & Drinks', y: 30 ,
                 color : "#F78E58"
                }
            ]
        }]
    });
});


