var data = {
    categories : [
        {title:"Operations",values: [{id:1,title:"Food & Beverages"},{id:2,title:"IT & Engineering"},{id:3,title:"Facility Management"},{id:4,title:"Asset Management"}]},
        {title:"Guest Facing",values: [{id:5,title:"Guest Management"},{id:6,title:"Guest Tablet"},{id:7,title:"Survey Tool"}]},
        {title:"Back Office",values: [{id:8,title:"Collaboration tools"},{id:9,title:"Talent Acquisition"},{id:10,title:"HR & Staffing"},{id:11,title:"Payroll"}]},
        {title:"Sales & Marketing",values: [{id:12,title:"Sales & Marketing Management"},{id:13,title:"Event Management"},{id:14,title:"Revenue Management"}]}
    ],
    companies: [
        {id:1,title:"dsa"},
        {id:2,title:"dsa"},
        {id:3,title:"dsa"},
        {id:4,title:"dsa"}
    ],
    products:[
        {id:1,title:'product 1',categoryid:1,companyid:1},
        {id:2,title:'product 2',categoryid:1,companyid:2}
    ]
}

var updateCounts = function(){
    $('#tdcategories .categoryClass').each(function(){
        var id = $(this).attr("data-id");
        var count = $("#tdresults div[data-cat='" + id + "'][data-visible='true']").length;
        $(this).find(".count").html(count);
    })

    $('#tdcompanies .companyClass').each(function(){
        var id = $(this).attr("data-id");
        var count = $("#tdresults div[data-com='" + id + "'][data-visible='true']").length;
        $(this).find(".count").html(count);
    })

}

var filterData = function(filter){
    var compFilter = filter.company;
    var subcategoryFilter = filter.subcategory;

    $('#tdresults .productClass').each(function(){
        debugger;
        var hide = false;
        var company = $(this).attr('data-com');
        var subcategory  = $(this).attr('data-cat');
        if(compFilter != undefined && compFilter != null)
        {
            hide = !(compFilter == company);
        }
        if(!hide)
        {
            if(subcategoryFilter != undefined && subcategoryFilter != null)
            {
                hide = !(subcategoryFilter == subcategory);
            }
        }
        if(hide)
        {
            $(this).hide();
            $(this).attr('data-visible','false');
        }
        else
        {
            $(this).show();
            $(this).attr('data-visible','true');
        }
    })

}

var generateFilters = function(){

    var selectedCompany = null;
    var selectedCategory = null;
    if($("#tdcompanies div[data-filter='true']").length == 1)
        selectedCompany = $("#tdcompanies div[data-filter='true']").eq(0).attr('data-id');
    if($("#tdcategories div[data-filter='true']").length == 1)
        selectedCategory = $("#tdcategories div[data-filter='true']").eq(0).attr('data-id');

    filterData({company:selectedCompany,subcategory:selectedCategory});
    
}

var clearFilters = function(type){
    if(type == 'cat')
    {
        $('#tdcategories .categoryClass').each(function(){
            $(this).removeClass('filterSelected');
            $(this).attr('data-filter','false');
        })
    }
    else
    {
        $('#tdcompanies .companyClass').each(function(){
            $(this).removeClass('filterSelected');
            $(this).attr('data-filter','false');
        })
    }
    $('#tdresults .productClass').each(function(){$(this).show()})

}

var toggleFilter = function(element,type){

    var isSelected = $(element).attr('data-filter');

    clearFilters(type);
    
    
    isSelected = isSelected == "true" ? "false" : "true";
    $(element).attr('data-filter',isSelected);
    $(element).addClass(isSelected == "true" ? "filterSelected" : "filterNotSelected");
    $(element).removeClass(isSelected == "true" ? "filterNotSelected" : "filterSelected");

    generateFilters();
}

var GenerateHtml = function(data){
    var source   = document.getElementById("productTemplate").innerHTML;
    var template = Handlebars.compile(source);   
    var html = template(data);
    $("#results").html(html);
    updateCounts();
}

$(document).ready(function(){
    GenerateHtml(data);
})
