$(document).ready(function () {
    //load dữ liệu
    loadData();
    getData();
})
function loadData() {
    $.each(fakeData,function(index,item){
     
        var rowhtml =
            '<tr scope="row">'
            +'<th>Ngày</th>'
                    +'<th>'+item.Name+'</th>'
                    + '<th>' + item.redtype + '</th>'
                    + '<th>' + item.address + 'th>'
                    + '<th>' + item.date + '</th>'
                    + '<th>' + item.index + '</th>'
                    + '</tr>'
        for (var i = 0; i < 100; i++) {
            $('tbody').append(rowhtml);
        }
    })
    
    }
var fakeData = [
    {
        Name:"juna",
        address:"ha noi",
        include:false,
        hunademo:"nhap mua giay dep",
        date:"2019/94/12",
        reID:"fasdfas",
        refNo:"asdfasdf",
        redtype:312,
        totalMount:23423,
    
      
    }
]
function getData(){
    for( var i=0;i<100;i++){
        var obj = {
            Name:"juna",
            address:"ha noi",
            include:false,
            hunademo:"nhap mua giay dep",
            date:"2019/94/12",
            reID:"fasdfas",
            refNo:"asdfasdf",
            redtype:312,
            totalMount:23423+i*i
    
      
        }
        fakeData.push(obj);
    }
}
