var bars = $(".bar");
var barsCount = 256;
var heights = [];

var sorted = false;

setRandomBars();

function setRandomBars(slowSort) {
    heights = [];
    for (let i = 1; i <= barsCount / 2; i++) {
        heights.push(i * 3);
    }

    //Shuffle the bars
    async function shuffle(heights) {
        var currentIndex = heights.length,
        temporaryValue,
        randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = heights[currentIndex];
        heights[currentIndex] = heights[randomIndex];
        heights[randomIndex] = temporaryValue;
        $(bars[currentIndex]).height(heights[currentIndex]);
        $(bars[randomIndex]).height(heights[randomIndex]);
        await timer(1);
        }
    
        for (let i = 0; i < bars.length; i++) {
        $(bars[i]).height(heights[i]);
        }
        return heights;
    }

    shuffle(heights);
}


function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}


function swap(heights, first_Index, second_Index) {
  var temp = heights[first_Index];
  heights[first_Index] = heights[second_Index];
  heights[second_Index] = temp;
}

// BUBBLE SORT
async function bubbleSort(heights){
    var len = heights.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(ahead == false)
            return;
        if(heights[j-1]>heights[j]){
            var temp = heights[j-1];
            heights[j-1] = heights[j];
            heights[j] = temp;
            $(bars[j]).height(heights[j]);
            $(bars[j-1]).height(heights[j-1]);
            await timer(1);
         }
      }
    }
    return heights;
 }

// QUICKSORT
async function quickSort(heights, left, right) {
  var index;
  if (heights.length > 1) {
    var pivot = heights[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
        if(ahead == false)
            return;
      while (heights[i] < pivot) {
        if(ahead == false)
        return;
        i++;
      }
      while (heights[j] > pivot) {
        if(ahead == false)
        return;
        j--;
      }
      if (i <= j) {
        swap(heights, i, j); //sawpping two elements
        $(bars[i]).height(heights[i]);
        $(bars[j]).height(heights[j]);
        await timer(50);
        i++;
        j--;
      }
    }

    index = i;

    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(heights, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(heights, index, right);
    }
  }
  return heights;
}

// SELECTION SORT
async function selectionSort(heights){
    var minIdx, temp, 
        len = heights.length;
    for(var i = 0; i < len; i++){
      minIdx = i;
      for(var  j = i+1; j<len; j++){
        if(ahead == false)
            return;
         if(heights[j]<heights[minIdx]){
            minIdx = j;
         }
      }
      temp = heights[i];
      heights[i] = heights[minIdx];
      heights[minIdx] = temp;
      $(bars[i]).height(heights[i]);
      $(bars[minIdx]).height(heights[minIdx]);
      await timer(50);
    }
    return heights;
  }

// INSERTION SORT
async function insertionSort(heights){
    var i, len = heights.length, el, j;
  
    for(i = 1; i<len; i++){
      el = heights[i];
      j = i;
  
      while(j>0 && heights[j-1]>el){
        if(ahead == false)
            return;
        heights[j] = heights[j-1];
        $(bars[j]).height(heights[j]);
        await timer(1);
        j--;
     }
  
     heights[j] = el;
     $(bars[j]).height(heights[j]);
     await timer(1);
    }
  
    return heights;
  }  


 
 async function radixSortLSD(heights) {
    var counter = [
        []
      ]; 
    var max = 0,
      mod = 10,
      dev = 1; //max
    for (var i = 0; i < heights.length; i++) {
        if(ahead == false)
            return;
      if (heights[i] > max) {
        max = heights[i];
      }
    }
    // determine the large item length
    var maxDigitLength = (max + '').length;
    for (var i = 0; i < maxDigitLength; i++, dev *= 10, mod *= 10) {
      for (var j = 0; j < heights.length; j++) {
        if(ahead == false)
            return;
        var bucket = Math.floor((heights[j] % mod) / dev); // Formula to get the significant digit
        if (counter[bucket] == undefined) {
          counter[bucket] = [];
        }
        counter[bucket].push(heights[j]);
      }
      var pos = 0;
      for (var j = 0; j < counter.length; j++) {
        var value = undefined;
        if (counter[j] != undefined) {
          while ((value = counter[j].shift()) != undefined) {
            if(ahead == false)
                return;
            heights[pos++] = value;
            //console.log(heights[pos - 1]);
            $(bars[pos - 1]).height(heights[pos - 1]);
            await timer(1);
          }
        }
      }
    }
  };


async function cocktailShaker(heights) {
    let isSorted = true;
    while (isSorted){
        for (let i = 0; i< heights.length - 1;i++){
            if(ahead == false)
                return;
            if (heights[i] > heights[i + 1])
            {
                let temp = heights[i];
                heights[i] = heights[i + 1];
                heights[i+1] = temp;
                $(bars[i]).height(heights[i]);
                $(bars[i + 1]).height(heights[i + 1]);
                await timer(1);
                isSorted = true;
            }
        }
    
        if (!isSorted)
            break;
    
        isSorted = false;
    
        for (let j = heights.length - 1; j > 0; j--){
            if(ahead == false)
                return;
            if (heights[j-1] > heights[j])
            {
                let temp = heights[j];
                heights[j] = heights[j - 1];
                heights[j - 1] = temp;
                $(bars[j]).height(heights[j]);
                $(bars[j - 1]).height(heights[j - 1]);
                await timer(1);
                isSorted = true;
            }
        }
    }
}

//quickSort(heights, 0, heights.length - 1);

//bubbleSort(heights);

//insertionSort(heights);

//selectionSort(heights, 0, heights.length - 1);

var ahead = false;

$("#init").click(function(e) {
    e.preventDefault();
    if(sorted)
        return;
    sorted = true;
    ahead = true;
    var option = $("#list").val();
    if(option == "bubble") {
        bubbleSort(heights);
    } else if(option == "insertion") {
        insertionSort(heights);
    } else if(option == "selection") {
        selectionSort(heights, 0, heights.length - 1);
    } else if(option == "quick") {
        quickSort(heights, 0, heights.length - 1);
    } else if(option == "radix") {
        radixSortLSD(heights);
    } else if(option == "cocktail") {
        cocktailShaker(heights);
    }
    $("#shuffle").removeClass('disabled');
    console.log(heights);
});

$("#shuffle").click(function(e) {
    e.preventDefault();
    ahead = false;
    setRandomBars();
    sorted = false;
});