/**
 * Donal Moloney
 * Lab 4
 * Web Application and Development
 * Mark Hornick
 * 12/21/17
 */
class CoinFlipCharter {
    constructor() {
        var self = this;
        $(document).ready(function () {
            self.onload();
        });

    }// end constructor


    /**
     * This method is called when the document is done loading
     */
    onload() {
        var jqCanvas = $("#chart1"); // note: jqCanvas is a jQuery object
        var canvas = jqCanvas.get(0)  // the canvas element; similar to a java swing JFrame
        var context = canvas.getContext("2d"); // only 2d supported for now; 3d and more coming soon...
        var chart = null;   // the chartjs object (assuming you're using chartjs)
        var chartData;  // data object to be supplied to the chart (if using chartjs)
        canvas.width = 800; // specify width/height either here or in the <canvas> tag to avoid scaling of pixels
        canvas.height = 300;
        var count = 0;
        var countArray = [];
        var name = [];
        var time = [];
        var ip = [];
        var sessionId = [];
        var dataForTable = "<thead><tr id='tableHeader'><th>Index</th><th>Name</th><th>Time</th><th>IP</th><th>SessionId</th></tr></thead><tbody>";
        Chart.defaults.global.responsive = true; // make the chart responsive

        /**
         * This function parses the results for the default tables/graphs
         */
        function parseResuts() {
            results.forEach(function (element) {
                name.push(element.name);
                time.push(element.time);
                ip.push(element.ip);
                sessionId.push(element.sessionid);
                countArray.push(count);
                count++;
            });
        }

        parseResuts();
        createDefaultDisplay();
        $("#update").click(updateDisplay);

        /**
         * This inner funtion creates the default display
         */
        function createDefaultDisplay() {
            chartData = "";
            $("#table1").html("");

            /**
             * This innner function creates the default table
             */
            function defaultTable() {
                for (let i = 0; i < countArray.length; i++) {
                    dataForTable += "<tr><th>" + i + "</th><th class='name'>" + name[i] + "</th><th class='time'>" + time[i] + "</th><th class='ip'>" + ip[i] +
                        "</th><th class='sessionid'>" + sessionId[i] + "</th></tr>";
                }
                dataForTable += "</tbody>";
            }

            defaultTable();
            $("#table1").html(dataForTable);
            if (chart === null) { // this if-statement executed on first call to drawChart
                chartData = { // sample data 1
                    //todo create labels
                    labels: name,
                    datasets: [
                        {
                            fillColor: "salmon",
                            strokeColor: "teal",
                            //todo create data
                            data: time,
                        }
                    ]
                };
                chart = new Chart(context).Bar(chartData, {
                    responsive: true,
                });
            }

            if (chart !== null) { // if an old chart exists, destroy it before creating a new one
                chart.destroy();
                chart = new Chart(context).Bar(chartData);
            }// see http://www.chartjs.org/docs/#getting-started
        } // end createDefaultDisplay()

// This inner function is called whenever the Apply/Update button is pressed.
// When it is called, it applies the specified filter expression to the result set, and
// redraws the table and chart with only the filtered results.
// Note: You may add parameters to this function if needed, but be sure to document them.
        function updateDisplay() {


            var buttonClicked = $('input[type=radio]:checked').val();
            var input = $('#inputBox').val();
            var updatedCount = 0;
            var updatedCountArray = [];
            var updatedName = [];
            var updatedTime = [];
            var updatedIp = [];
            var updatedSessionId = [];

            /**
             * This inner function updates the graph displayed
             */
            function updateGraph(){
                results.forEach(function (element) {
                     console.log(element);
                     console.log(element.name)
                    if(element[buttonClicked].includes(input)) {
                        console.log(element[buttonClicked]);
                        console.log(element.name);
                        updatedName.push(element.name);
                        updatedTime.push(element.time);
                        updatedIp.push(element.ip);
                        updatedSessionId.push(element.sessionid);
                        updatedCountArray.push(updatedCount);
                        updatedCount++;
                    }
                });
                chart.destroy();
                chart =null;
                if (chart === null) { // this if-statement executed on first call to drawChart
                    chartData = { // sample data 1
                        //todo create labels
                        labels: updatedName,
                        datasets: [
                            {
                                fillColor: "red",
                                strokeColor: "teal",
                                //todo create data
                                data: updatedTime,
                            }
                        ]
                    };
                    chart = new Chart(context).Bar(chartData, {
                        responsive: true,
                    });                }
            }

            /**
             * This inner function hides rows of the table that do not contain the user specified constraints
             */
            function updateParse() {
                $("tr").hide();
                $("." + buttonClicked + ":contains(\"" + input + "\")").parent().show();


                updateGraph();
            }

            if (buttonClicked === "name") {
                updateParse();
            } else if ((buttonClicked === "time")) {
                updateParse();
            } else if ((buttonClicked === "ip")) {
                updateParse();
            } else if ((buttonClicked === "sessionid")) {
                updateParse();
            } else {
                //todo this button is extra credit
            }
        } // end updateDisplay()

    }
}// end CoinFlipCharter class
