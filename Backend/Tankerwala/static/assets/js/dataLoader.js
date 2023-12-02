    const MemberData = () => {
    var trClass = "text-gray-700 dark:text-gray-400";
    var tdNameClass = "px-4 py-3";
    var nameDiv = "flex items-center text-sm";
    var imgDiv = "elative hidden w-8 h-8 mr-3 rounded-full md:block";
    var imgClass = "object-cover w-full h-full rounded-full";
    var pNameClass = "font-semibold";
    var tdPriceDateClass = "px-4 py-3 text-sm";
    var tdStatusClass = "px-4 py-3 text-xs";
    var tdActionClass="px-4 py-3";
    var divAction = "flex items-center space-x-4 text-sm";
    var buttonEditDel = "flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray";

  }
const newData = () =>
{
    var table = document.getElementById("tableMem");
        const trs = document.getElementById("trMain");
        
        const names =  trs.children[0].innerHTML;
        const prices =  trs.children[1].innerHTML;
        const status =  trs.children[2].innerHTML;
        const dates =  trs.children[3].innerHTML;
        const buttons =  trs.children[4].innerHTML;
        const newTR = document.createElement('tr');
        const row = table.insertRow(0);
        const newName = row.insertCell(0)
        newName = names;
        newName.innerText = "Adeel";
        


}
$(document).ready(function() {
    $("#gene").click(function() {
        newData();
        alert("SSS");
      });
});