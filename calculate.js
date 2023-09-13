//File reading
function init(){
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(evt.target.files[0])
}


function handleFileLoad(evt) {
    var names = [];
    var grades = [];
    var info = evt.target.result.split("\n")
    info = info.toString().split(",")
    console.log("Overall: " + info)
    
    info.shift() // getting rid of heads
    info.shift() 

    var k = 0;
    var l = 0;
    for (var i = 0; i<info.length; i++) {
        if (i%2!=0) {
            grades[k]=info[i]/1 // this converts string to number
            k++
        } else {
            names[l]=info[i]
            l++
        }
    }

    console.log("Names: " + names)
    console.log("Grades: " + grades)

    // finding max and min
    var minNum = grades[0]
    var maxNum = grades[0]
    var mean = 0
    var median = Math.floor(grades.length / 2)

    var maxIndex;
    var minIndex;
    for (i = 0; i<grades.length; i++) {
        if (minNum>grades[i]) {
            minNum = grades[i]
            minIndex = i
        }
        if (maxNum < grades[i]) {
            maxNum = grades[i]
            maxIndex = i
        }
        
        mean = mean + grades[i]
    }

    mean = mean/grades.length

    grades.sort((a,b) => a-b) // sort grades from lowest to highest
    if (grades.length % 2 == 0) {
        median = (grades[median-1]+grades[median])/2
    } else {
        median = grades[median]
    }
    
    document.getElementById("maxNum").textContent = names[maxIndex].trim() + " (" + maxNum + "%)"
    document.getElementById("minNum").textContent = names[minIndex].trim() + " (" + minNum + "%)"
    document.getElementById("mean").textContent = mean.toFixed(2)
    document.getElementById("median").textContent = median.toFixed(2)

    // histogram graph
    var max = document.getElementById("max").value;
    var aPlus = document.getElementById("aPlus").value;
    var a = document.getElementById("a").value;
    var aMinus = document.getElementById("aMinus").value;
    var bPlus = document.getElementById("bPlus").value;
    var b = document.getElementById("b").value;
    var bMinus = document.getElementById("bMinus").value;
    var cPlus = document.getElementById("cPlus").value;
    var c = document.getElementById("c").value;
    var cMinus = document.getElementById("cMinus").value;
    var d = document.getElementById("d").value;
    var f = document.getElementById("f").value;

    var lowerbound = [max/1, aPlus/1, a/1, aMinus/1, bPlus/1, b/1, bMinus/1, cPlus/1, c/1, cMinus/1, d/1, f/1];
    console.log("Lowerbounds: " + lowerbound)
    for (i=1; i<lowerbound.length; i++) {
        if (lowerbound[i-1] < lowerbound[i]) {
            alert("Bounds of grades overlap\nPlease try again")
            window.location.reload();
        }
    }
    

    var freq = [["A+",0],["A",0],["A-",0],["B+",0],["B",0],["B-",0],["C+",0],["C",0],["C-",0],["D",0],["F",0]]; 
    var outBoundGrades = [];
    var k = 0
    for (i = 0; i<grades.length; i++) {
        if (grades[i] < max && grades[i] >= aPlus) {
            freq[0][1]++;
        } else if (grades[i] < aPlus && grades[i] >= a) {
            freq[1][1]++
        } else if (grades[i] < a && grades[i] >= aMinus) {
            freq[2][1]++
        } else if (grades[i] < aMinus && grades[i] >= bPlus) {
            freq[3][1]++
        } else if (grades[i] < bPlus && grades[i] >= b) {
            freq[4][1]++
        } else if (grades[i] < b && grades[i] >= bMinus) {
            freq[5][1]++
        } else if (grades[i] < bMinus && grades[i] >= cPlus) {
            freq[6][1]++
        } else if (grades[i] < cPlus && grades[i] >= c) {
            freq[7][1]++
        } else if (grades[i] < c && grades[i] >= cMinus) {
            freq[8][1]++
        } else if (grades[i] < cMinus && grades[i] >= d) {
            freq[9][1]++
        } else if (grades[i] < d && grades[i] >= f) {
            freq[10][1]++
        } else if (grades[i] > max || grades[i] < f) {
            outBoundGrades[k] = grades[i];
            k++
        }
    }

    console.log("Out of Bound Grades: " + outBoundGrades)

    for (i = 0; i<freq.length; i++) {
        w = (freq[i][1]*50).toString() + "px"
        document.getElementById(freq[i][0]).style.height = w;
    }
}
