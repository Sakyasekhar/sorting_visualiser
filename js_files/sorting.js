const def = "#fd0081", chng = "#431f91", finished = "#8ef511", selected = "yellow";

let arraySize = document.querySelector('#size_input');
let speed = document.querySelector('#speed_input');
const bars=document.getElementById("all-bars")
var n = parseInt(arraySize.value);

let bubblesort = document.querySelector("#bubbleSort");
let selectionsort = document.querySelector("#selectionSort")
let insertionsort = document.querySelector("#insertionSort")
let quicksort = document.querySelector("#quickSort")
let mergesort = document.querySelector("#mergeSort")

let delay=150;

function delayTime(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

function swap(el1,el2) {
    const small=el1.style.height;
    el1.style.height=el2.style.height;
    el2.style.height=small;
}



function disableSortingBtn(){
    bubblesort.disabled = true; bubblesort.style.cursor='not-allowed';
    selectionsort.disabled = true; selectionsort.style.cursor='not-allowed';
    insertionsort.disabled = true; insertionsort.style.cursor='not-allowed';
    quicksort.disabled = true; quicksort.style.cursor='not-allowed';
    mergesort.disabled = true; mergesort.style.cursor='not-allowed';


    document.querySelector("#size_input").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    bubblesort.disabled = false; bubblesort.style.cursor='pointer';
    selectionsort.disabled = false; selectionsort.style.cursor='pointer';
    insertionsort.disabled = false; insertionsort.style.cursor='pointer';
    quicksort.disabled = false; quicksort.style.cursor='pointer';
    mergesort.disabled = false; mergesort.style.cursor='pointer';


    document.querySelector("#size_input").disabled = false;
}

function disableNewarraybtn(){
    document.querySelector('#new_array').style.cursor='not-allowed';
    document.querySelector('#new_array').disabled=true;
}

function enableNewarraybtn(){
    document.querySelector('#new_array').style.cursor='pointer';
    document.querySelector('#new_array').disabled=false;
}





// array button
document.getElementById('new_array').addEventListener('click',()=>{
    const arr = [];
    for(let i=0;i<n;i++){
        let val=Math.round(Math.random()*101);
        arr.push('<div class="bar" id="' + i + '" style="height:' + val + '%"></div>');  
    }
    document.getElementById("all-bars").innerHTML=arr.join(''); //removes commas
    enableSortingBtn();
})



//size bar
arraySize.addEventListener('input',()=>{
        // console.log(arraySize.value, typeof(arraySize.value));
        const arr = [];
        n= parseInt(arraySize.value);
        for(let i=0;i<parseInt(arraySize.value);i++){
            let val=Math.round(Math.random()*101);
            arr.push('<div class="bar" id="' + i + '" style="height:' + val + '%"></div>');  
        }
        document.getElementById("all-bars").innerHTML=arr.join(''); //removes commas
       
});



// speed bar
speed.addEventListener('input',()=>{
    delay =370 - parseInt(speed.value);  //300 to 20 ms
    console.log(delay);  
});



//bubbleSort
document.getElementById('bubbleSort').addEventListener('click',async ()=>{
    disableSortingBtn();
    disableNewarraybtn();

    //algorithm
    for(let i = 0; i < n-1; i++){
        for(let j = 0; j < n-i-1; j++){

            bars.childNodes[j].style.background = 'cyan';
            bars.childNodes[j+1].style.background = 'cyan';
            if(parseInt(bars.childNodes[j].style.height) > parseInt(bars.childNodes[j+1].style.height)){
                await delayTime(delay);
                swap(bars.childNodes[j], bars.childNodes[j+1]);
            }
            bars.childNodes[j].style.background = 'yellow';
            bars.childNodes[j+1].style.background = 'yellow';
        }
        bars.childNodes[n-1-i].style.background = 'green';
    }
    bars.childNodes[0].style.background = 'green';

    enableNewarraybtn(); 
})





//selectionSort
document.getElementById('selectionSort').addEventListener('click',async ()=>{
    disableSortingBtn();
    disableNewarraybtn();

    //algorithm
    for (let i = 0; i < n-1; i++) {
        let min = i;
        bars.childNodes[i].style.background = 'red';

        for (let j = i + 1; j < n; j++) {

            bars.childNodes[j].style.backgroundColor = 'cyan';
            await delayTime(delay);

            if (parseInt(bars.childNodes[j].style.height) < parseInt(bars.childNodes[min].style.height)) {
                if(min !== i){
                    // new min_index is found so change prev min_index color back to normal
                    bars.childNodes[min].style.background = selected;
                }
                min = j;// searching for lowest index
            }
            else{
                // if the currnent comparision is more than min_index change is back to normal
                bars.childNodes[j].style.background = selected;
            }
        } 
        await delayTime(delay)

       swap(bars.childNodes[min],bars.childNodes[i]);
       // change the min element index back to normal as it is swapped 
       bars.childNodes[min].style.background = selected;
       // change the sorted elements color to green
       bars.childNodes[i].style.background = 'green';
    }   

    enableNewarraybtn(); 
})





//insertionSort
document.getElementById('insertionSort').addEventListener('click',async ()=>{
    disableSortingBtn();
    disableNewarraybtn();

    //algorithm
    for(let i = 1;i<n;i++){
        let key =bars.childNodes[i] ;

        key.style.background = 'cyan';
        await delayTime(delay);
        var j = i-1;
        var temp = bars.childNodes[j];

        
        while(j>=0 && parseInt(bars.childNodes[j].style.height)>parseInt(key.style.height)){
            key.style.background = 'cyan'

            await delayTime(delay);

            swap(bars.childNodes[j],key)
            key=bars.childNodes[j];
            temp.style.background = 'yellow';
            j = j - 1;

            for(let k = i; k >= 0; k--){
                bars.childNodes[k].style.background = 'green';
            }
        }

        bars.childNodes[i].style.background = 'green';
    }
    enableNewarraybtn(); 
})






//quickSort
async function partition(low,high){
    let i = low - 1;
    let pivot = bars.childNodes[high];
    pivot.style.background="red";
    await delayTime(delay);
    for(let j = low;j<=high-1;j++){
        bars.childNodes[j].style.background = 'cyan'; //current element
        await delayTime(delay);
        if(parseInt(bars.childNodes[j].style.height) < parseInt(pivot.style.height)){
            i++;
            swap(bars.childNodes[j],bars.childNodes[i]);
            bars.childNodes[i].style.background = 'orange';
            if(i != j){bars.childNodes[j].style.background = 'orange';} 
            await delayTime(delay);
        }
        else{
            // color if not less than pivot
            bars.childNodes[j].style.background = 'pink';
        }
    }
    swap(bars.childNodes[i+1],pivot);
    bars.childNodes[high].style.background = 'pink';
    if(i!=-1){bars.childNodes[i].style.background = 'green';}
    for(let k = high; k < n; k++){
        bars.childNodes[k].style.background = 'yellow';

    }
    return i+1;
    
}

async function quick_sort(low,high){
    if(low<high){
        var pi =await partition(low,high);
        await quick_sort(low,pi-1);
        await quick_sort(pi+1,high);
    }
    else{
        if( low >= 0 && high >= 0 && low <n && high <n){
            bars.childNodes[high].style.background = 'green';
            bars.childNodes[low].style.background = 'green';
        }
    }    
}

document.getElementById('quickSort').addEventListener('click',async ()=>{
    disableSortingBtn();
    disableNewarraybtn();

    //algorithm
    
    await quick_sort(0,n-1); //call
    
    // color
    for(let k = 0; k < n; k++){
        if(bars.childNodes[k].style.background != 'green')
        bars.childNodes[k].style.background = 'green';
    }

    enableNewarraybtn(); 
})






//mergeSort
async function merge(low,mid,high){
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = [n1];
    let right = [n2];

    for(let i=0;i<n1;i++){
        await delayTime(delay);
        bars.childNodes[low+1].style.background='orange';
        left[i]=bars.childNodes[low+i].style.height;
    }
    for(let i = 0; i < n2; i++){
    
        await delayTime(delay);
        bars.childNodes[mid + 1 + i].style.background = 'yellow';
        right[i] = bars.childNodes[mid + 1 + i].style.height;
    }

    await delayTime(delay);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        await delayTime(delay);
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            if((n1 + n2) === n){
                bars.childNodes[k].style.background = 'green';
            }
            else{
                bars.childNodes[k].style.background = 'lightgreen';
            }
            
            bars.childNodes[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            if((n1 + n2) === n){
                bars.childNodes[k].style.background = 'green';
            }
            else{
                bars.childNodes[k].style.background = 'lightgreen';
            } 
            bars.childNodes[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        await delayTime(delay);
        if((n1 + n2) === n){
            bars.childNodes[k].style.background = 'green';
        }
        else{
            bars.childNodes[k].style.background = 'lightgreen';
        }
        bars.childNodes[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        await delayTime(delay);
        if((n1 + n2) === n){
            bars.childNodes[k].style.background = 'green';
        }
        else{
            bars.childNodes[k].style.background = 'lightgreen';
        }
        bars.childNodes[k].style.height = right[j];
        j++;
        k++;
    }
}
async function merge_sort(low, high){
    if(low<high){
        let m = low + Math.floor((high - low) / 2);
        await merge_sort(low, m);
        await merge_sort(m + 1, high);
        await merge(low, m, high);
    }  
}
document.getElementById('mergeSort').addEventListener('click',()=>{
    disableSortingBtn();
    disableNewarraybtn();

    //algorithm
    merge_sort(0,n-1);
    enableNewarraybtn(); 
})





